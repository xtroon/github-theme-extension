/**
 * Theme Studio for GitHub - Core Content Script
 * Applies CSS variables, background wallpapers, event listeners for stars/merges/forks,
 * Turbo navigation observers, and the Shareable Episode Card modal.
 */

(function () {
  'use strict';

  class ThemeStudioContent {
    constructor() {
      this.settings = window.ThemeStudio ? { ...window.ThemeStudio.DEFAULT_SETTINGS } : {};
      this.bgLayer = null;
      this.bgOverlay = null;
      this.modalEl = null;
    }

    async init() {
      await this.loadSettings();
      this.setupDOM();
      this.applyAll();
      this.attachEventListeners();
      this.observeNavigations();

      // Listen for Chrome runtime messages
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
          if (msg.type === 'SETTINGS_UPDATED') {
            this.settings = { ...this.settings, ...msg.settings };
            this.applyAll();
            sendResponse({ success: true });
          } else if (msg.type === 'TOGGLE_FOCUS_MODE') {
            this.toggleFocusMode();
            sendResponse({ focusMode: this.settings.focusMode });
          } else if (msg.type === 'TRIGGER_CONFETTI') {
            if (window.themeConfetti) {
              window.themeConfetti.burst(window.innerWidth / 2, window.innerHeight / 2, 'mixed');
            }
            if (window.themeAudio) {
              window.themeAudio.playStar();
            }
            sendResponse({ success: true });
          } else if (msg.type === 'OPEN_EPISODE_CARD') {
            this.openEpisodeCardModal();
            sendResponse({ success: true });
          }
        });
      }

      // In-page keyboard shortcut fallback (Alt+Shift+F)
      window.addEventListener('keydown', (e) => {
        if (e.altKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
          e.preventDefault();
          this.toggleFocusMode();
        }
      });
    }

    async loadSettings() {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        return new Promise((resolve) => {
          chrome.storage.local.get(['themeStudioSettings'], (result) => {
            if (result && result.themeStudioSettings) {
              this.settings = { ...this.settings, ...result.themeStudioSettings };
            }
            resolve();
          });
        });
      }
    }

    async updateSettings(partial) {
      this.settings = { ...this.settings, ...partial };
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ themeStudioSettings: this.settings });
      }
      this.applyAll();
    }

    setupDOM() {
      if (!this.bgLayer) {
        this.bgLayer = document.getElementById('theme-studio-bg-layer');
        if (!this.bgLayer) {
          this.bgLayer = document.createElement('div');
          this.bgLayer.id = 'theme-studio-bg-layer';
          document.documentElement.appendChild(this.bgLayer);
        }
      }

      if (!this.bgOverlay) {
        this.bgOverlay = document.getElementById('theme-studio-bg-overlay');
        if (!this.bgOverlay) {
          this.bgOverlay = document.createElement('div');
          this.bgOverlay.id = 'theme-studio-bg-overlay';
          document.documentElement.appendChild(this.bgOverlay);
        }
      }

      if (this.settings.floatingWidgetEnabled && window.themeStudioWidget) {
        window.themeStudioWidget.init();
      }
    }

    applyAll() {
      const root = document.documentElement;

      // Check if disabled or in Focus Mode
      if (!this.settings.enabled) {
        root.removeAttribute('data-theme-studio-active');
        root.removeAttribute('data-theme-studio-focus');
        if (this.bgLayer) this.bgLayer.style.display = 'none';
        if (this.bgOverlay) this.bgOverlay.style.display = 'none';
        if (window.themeStudioWidget) window.themeStudioWidget.remove();
        return;
      }

      root.setAttribute('data-theme-studio-active', 'true');

      if (this.settings.focusMode) {
        root.setAttribute('data-theme-studio-focus', 'true');
        if (this.bgLayer) this.bgLayer.style.display = 'none';
        if (this.bgOverlay) this.bgOverlay.style.display = 'none';
      } else {
        root.removeAttribute('data-theme-studio-focus');
        if (this.bgLayer) this.bgLayer.style.display = 'block';
        if (this.bgOverlay) this.bgOverlay.style.display = 'block';
      }

      // Configure Audio
      if (window.themeAudio) {
        window.themeAudio.setEnabled(this.settings.soundEnabled && !this.settings.focusMode);
        window.themeAudio.setVolume(this.settings.soundVolume);
        window.themeAudio.setSoundPack(this.settings.soundPack);
      }

      // Apply Theme Colors
      const theme = this.findTheme(this.settings.themeId);
      if (theme) {
        const c = theme.colors;
        root.style.setProperty('--ts-bg', c.bg);
        root.style.setProperty('--ts-canvas-subtle', c.canvasSubtle);
        root.style.setProperty('--ts-canvas-inset', c.canvasInset);
        root.style.setProperty('--ts-border', c.border);
        root.style.setProperty('--ts-border-muted', c.borderMuted);
        root.style.setProperty('--ts-fg', c.fg);
        root.style.setProperty('--ts-fg-muted', c.fgMuted);
        root.style.setProperty('--ts-accent', c.accent);
        root.style.setProperty('--ts-accent-emphasis', c.accentEmphasis);
        root.style.setProperty('--ts-success', c.success);
        root.style.setProperty('--ts-danger', c.danger);
        root.style.setProperty('--ts-warning', c.warning);

        // Glassmorphism properties
        const glassOpacity = (this.settings.glassOpacity || 76) / 100;
        const hexToRgba = (hex, alpha) => {
          let clean = hex.replace('#', '');
          if (clean.length === 3) clean = clean.split('').map(x => x + x).join('');
          if (clean.length >= 6) {
            const r = parseInt(clean.substring(0, 2), 16);
            const g = parseInt(clean.substring(2, 4), 16);
            const b = parseInt(clean.substring(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          }
          return hex;
        };

        const glassBg = hexToRgba(c.bg, glassOpacity);
        root.style.setProperty('--ts-glass-bg', glassBg);
        root.style.setProperty('--ts-glass-border', c.glassBorder);
        root.style.setProperty('--ts-glass-blur', `${this.settings.blur || 6}px`);
      }

      // Dynamic repo language tint
      if (this.settings.dynamicRepoTint) {
        this.detectAndApplyRepoLanguage();
      }

      // Apply Background Wallpaper
      this.applyWallpaper();

      // Apply Contribution Graph Palette
      this.applyContributionPalette();

      // Apply Code Font
      this.applyFont();

      // Floating Widget toggle
      if (this.settings.floatingWidgetEnabled && !this.settings.focusMode) {
        if (window.themeStudioWidget) window.themeStudioWidget.init();
      } else {
        if (window.themeStudioWidget) window.themeStudioWidget.remove();
      }
    }

    findTheme(id) {
      if (!window.ThemeStudio) return null;
      return window.ThemeStudio.THEMES.find(t => t.id === id) || window.ThemeStudio.THEMES[0];
    }

    applyWallpaper() {
      if (!this.bgLayer) return;

      if (!this.settings.wallpaperEnabled || this.settings.focusMode) {
        this.bgLayer.style.display = 'none';
        if (this.bgOverlay) this.bgOverlay.style.display = 'none';
        return;
      }

      this.bgLayer.style.display = 'block';
      if (this.bgOverlay) this.bgOverlay.style.display = 'block';

      let imgUrl = '';
      if (this.settings.uploadedWallpaperData) {
        imgUrl = this.settings.uploadedWallpaperData;
      } else if (this.settings.customWallpaperUrl) {
        imgUrl = this.settings.customWallpaperUrl;
      } else {
        const wp = window.ThemeStudio ? window.ThemeStudio.WALLPAPERS.find(w => w.id === this.settings.wallpaperId) : null;
        imgUrl = wp ? wp.url : '';
      }

      if (imgUrl) {
        this.bgLayer.style.backgroundImage = `url("${imgUrl}")`;
      } else {
        // Fallback procedural starry dark gradient
        this.bgLayer.style.backgroundImage = 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)';
      }

      const blurVal = this.settings.blur || 6;
      const brightVal = this.settings.brightness || 85;
      const contrastVal = this.settings.contrast || 105;
      this.bgLayer.style.filter = `blur(${blurVal}px) brightness(${brightVal}%) contrast(${contrastVal}%)`;
    }

    applyContributionPalette() {
      const root = document.documentElement;
      let levels = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

      if (this.settings.contributionPaletteId === 'custom' && this.settings.customContributionLevels) {
        levels = this.settings.customContributionLevels;
      } else if (window.ThemeStudio) {
        const pal = window.ThemeStudio.CONTRIBUTION_PALETTES.find(p => p.id === this.settings.contributionPaletteId);
        if (pal) levels = pal.levels;
      }

      levels.forEach((color, i) => {
        root.style.setProperty(`--ts-contrib-${i}`, color);
        root.style.setProperty(`--color-calendar-graph-day-L${i}-bg`, color);
      });
    }

    applyFont() {
      const root = document.documentElement;
      const fontDef = window.ThemeStudio ? window.ThemeStudio.FONTS.find(f => f.id === this.settings.fontId) : null;
      if (fontDef) {
        root.style.setProperty('--ts-code-font', fontDef.css);
      }
    }

    detectAndApplyRepoLanguage() {
      // Find language badge on repository pages: .BorderGrid-cell span[itemprop="programmingLanguage"]
      const langEl = document.querySelector('[itemprop="programmingLanguage"], .repository-lang-stats-graph .language-color');
      if (langEl && window.ThemeStudio && window.ThemeStudio.LANGUAGE_COLORS) {
        const langName = (langEl.textContent || '').trim();
        const color = window.ThemeStudio.LANGUAGE_COLORS[langName];
        if (color) {
          document.documentElement.style.setProperty('--ts-accent', color);
        }
      }
    }

    toggleFocusMode() {
      const newFocus = !this.settings.focusMode;
      this.updateSettings({ focusMode: newFocus });
      if (window.themeAudio) {
        window.themeAudio.playFocusMode(newFocus);
      }
    }

    attachEventListeners() {
      // Star button listener
      document.addEventListener('click', (e) => {
        const starBtn = e.target.closest('button[data-hydro-click*="star"], form[action*="/star"] button, [aria-label*="Star this repository"], [aria-label*="star this repository"]');
        if (starBtn) {
          setTimeout(() => {
            if (this.settings.soundEnabled && window.themeAudio) {
              window.themeAudio.playStar();
            }
            if (this.settings.confettiEnabled && window.themeConfetti) {
              window.themeConfetti.burstFromElement(starBtn, 'star');
            }
          }, 60);
          return;
        }

        // Fork button listener
        const forkBtn = e.target.closest('form[action*="/fork"] button, a[href*="/fork"], [aria-label*="Fork your own copy"]');
        if (forkBtn) {
          if (this.settings.soundEnabled && window.themeAudio) {
            window.themeAudio.playFork();
          }
          return;
        }

        // Merge pull request listener
        const mergeBtn = e.target.closest('button.btn-primary[name="apply_commit"], button[value="merge"], .js-merge-commit-button');
        if (mergeBtn) {
          if (this.settings.soundEnabled && window.themeAudio) {
            window.themeAudio.playMerge();
          }
          if (this.settings.confettiEnabled && window.themeConfetti) {
            window.themeConfetti.burst(window.innerWidth / 2, window.innerHeight / 2, 'merge');
          }
          return;
        }
      });
    }

    observeNavigations() {
      // GitHub Turbo / PJAX event hooks
      const onNavigate = () => {
        this.setupDOM();
        this.applyAll();
      };

      document.addEventListener('turbo:load', onNavigate);
      document.addEventListener('turbo:render', onNavigate);
      document.addEventListener('pjax:end', onNavigate);
      window.addEventListener('popstate', onNavigate);
    }

    // Shareable Episode Card / Profile Card generator modal
    openEpisodeCardModal() {
      if (this.modalEl) this.modalEl.remove();

      // Scrape username, avatar, stats
      const userMeta = document.querySelector('meta[name="user-login"]');
      const username = userMeta ? userMeta.getAttribute('content') : (document.querySelector('.p-nickname')?.textContent.trim() || 'GitHub Developer');
      const avatarEl = document.querySelector('img.avatar-user, img.avatar');
      const avatarUrl = avatarEl ? avatarEl.getAttribute('src') : 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
      const activeTheme = this.findTheme(this.settings.themeId)?.name || 'Custom';

      this.modalEl = document.createElement('div');
      this.modalEl.id = 'theme-studio-episode-modal';
      this.modalEl.innerHTML = `
        <div style="position: fixed; inset: 0; background: rgba(1, 4, 9, 0.75); backdrop-filter: blur(6px); z-index: 1000000; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <div style="background: #161b22; border: 1px solid #30363d; border-radius: 10px; width: 440px; max-width: 90vw; padding: 20px; box-shadow: 0 16px 40px rgba(0,0,0,0.6); color: #f0f6fc;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <h3 style="margin: 0; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                Developer Profile Snapshot
              </h3>
              <button id="ts-close-card-modal" style="background: transparent; border: none; color: #8b949e; font-size: 14px; cursor: pointer;">✕</button>
            </div>
            
            <!-- Snapshot Preview Card -->
            <div id="ts-card-canvas-box" style="position: relative; overflow: hidden; border-radius: 8px; padding: 18px; border: 1px solid #30363d; background: #0d1117;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
                <img src="${avatarUrl}" style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #30363d;" />
                <div>
                  <div style="font-weight: 600; font-size: 15px; color: #f0f6fc;">@${username}</div>
                  <div style="font-size: 12px; color: #58a6ff; font-weight: 500;">Active Theme: ${activeTheme}</div>
                </div>
              </div>
              <div style="background: #161b22; border: 1px solid #21262d; border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-around; text-align: center; font-size: 11px; margin-bottom: 12px;">
                <div>
                  <div style="color: #8b949e;">Status</div>
                  <div style="font-weight: 600; color: #3fb950;">Active</div>
                </div>
                <div>
                  <div style="color: #8b949e;">Preset</div>
                  <div style="font-weight: 600; color: #58a6ff;">${activeTheme}</div>
                </div>
                <div>
                  <div style="color: #8b949e;">Engine</div>
                  <div style="font-weight: 600; color: #c9d1d9;">Theme Studio</div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #6e7681;">
                <span>Theme Studio for GitHub</span>
                <span style="color: #58a6ff;">github.com</span>
              </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button id="ts-share-twitter" style="flex: 1; padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(240, 246, 252, 0.1); background: #1f6feb; color: #fff; font-weight: 500; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
                Share on X
              </button>
              <button id="ts-copy-link" style="padding: 8px 14px; border-radius: 6px; border: 1px solid #30363d; background: #21262d; color: #c9d1d9; font-size: 12px; cursor: pointer;">
                Copy Text
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(this.modalEl);

      document.getElementById('ts-close-card-modal').addEventListener('click', () => {
        this.modalEl.remove();
        this.modalEl = null;
      });

      document.getElementById('ts-share-twitter').addEventListener('click', () => {
        const text = encodeURIComponent(`Coding with style on GitHub using Theme Studio ✨🎨 My current theme is ${activeTheme}! #GitHub #ThemeStudio #CodingAesthetic`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      });

      document.getElementById('ts-copy-link').addEventListener('click', (e) => {
        navigator.clipboard.writeText(`Coding on GitHub with Theme Studio (${activeTheme} theme) ✨`);
        e.target.innerText = 'Copied! ✓';
        setTimeout(() => e.target.innerText = 'Copy Text', 2000);
      });
    }
  }

  window.themeStudioContent = new ThemeStudioContent();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.themeStudioContent.init());
  } else {
    window.themeStudioContent.init();
  }
})();
