/**
 * Theme Studio for GitHub - Core Content Script
 * -----------------------------------------------------------
 * This script runs directly on GitHub pages. It is responsible for:
 * 1. Loading user theme preferences from chrome.storage.local
 * 2. Injecting CSS variables to theme GitHub (colors, fonts, glassmorphism)
 * 3. Applying syntax highlighting tokens across code views
 * 4. Rendering dynamic background wallpapers with blur & contrast filters
 * 5. Firing celebratory confetti on stars & pull request merges
 * 6. Re-applying themes seamlessly during GitHub Turbo / SPA page navigations
 */

(function () {
  'use strict';

  // =========================================================
  // 1. EXTENSION CONTEXT & SAFETY HELPERS
  // =========================================================

  /**
   * Checks whether the Chrome extension context is still active.
   * When an extension is reloaded or updated in chrome://extensions,
   * open tabs retain the old content script, but its context is invalidated.
   * This helper prevents calling Chrome APIs when invalidated, eliminating
   * "Error: Extension context invalidated" crashes.
   */
  function isExtensionAlive() {
    try {
      return Boolean(typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id);
    } catch (e) {
      return false;
    }
  }

  window.__themeStudioLoaded = true;

  // =========================================================
  // 2. THEME ENGINE CLASS
  // =========================================================

  class ThemeStudioContent {
    constructor() {
      // Load default settings as safe initial fallback
      this.settings = window.ThemeStudio ? { ...window.ThemeStudio.DEFAULT_SETTINGS } : {};
      this.bgLayer = null;
      this.bgOverlay = null;
    }

    /**
     * Initialize the theme engine on the page
     */
    async init() {
      // 1. Load saved preferences from storage
      await this.loadSettings();

      // 2. Setup background DOM elements
      this.setupDOM();

      // 3. Apply themes, wallpaper, font, and contribution graph colors
      this.applyAll();

      // 4. Attach interactive listeners (hotkeys, stars, merges)
      this.attachEventListeners();

      // 5. Watch for GitHub Turbo / Single-Page-App navigations
      this.observeNavigations();

      // 6. Listen for messages from the popup or background service worker
      this.setupMessageListener();
    }

    /**
     * Safely load settings from chrome.storage.local
     */
    async loadSettings() {
      if (!isExtensionAlive()) return;

      try {
        if (chrome.storage && chrome.storage.local) {
          const result = await chrome.storage.local.get(['themeStudioSettings']);
          if (result && result.themeStudioSettings) {
            this.settings = { ...this.settings, ...result.themeStudioSettings };
          }
        }
      } catch (err) {
        // Fail gracefully to default settings if context is invalidated
      }
    }

    /**
     * Update settings in memory and persist to chrome.storage.local
     */
    async updateSettings(partial) {
      this.settings = { ...this.settings, ...partial };
      this.applyAll();

      if (!isExtensionAlive()) return;

      try {
        if (chrome.storage && chrome.storage.local) {
          await chrome.storage.local.set({ themeStudioSettings: this.settings });
        }
      } catch (err) {
        // Fail gracefully if context is invalidated
      }
    }

    /**
     * Listen for messages from popup or background worker
     */
    setupMessageListener() {
      if (!isExtensionAlive() || !chrome.runtime || !chrome.runtime.onMessage) return;

      try {
        chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
          if (!isExtensionAlive()) return;

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
            sendResponse({ success: true });
          }
        });
      } catch (e) {
        // Ignore if runtime is not ready
      }
    }

    /**
     * Create the background image layer and tint overlay in the DOM
     */
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
    }

    /**
     * Apply all theme colors, CSS variables, wallpapers, and fonts to the page
     */
    applyAll() {
      const root = document.documentElement;

      // Handle disabled state or focus mode
      if (!this.settings.enabled) {
        root.removeAttribute('data-theme-studio-active');
        root.removeAttribute('data-theme-studio-focus');
        if (this.bgLayer) this.bgLayer.style.display = 'none';
        if (this.bgOverlay) this.bgOverlay.style.display = 'none';
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

      // Apply Theme Palette Colors
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

        // Glassmorphism background transparency
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

        // Code Syntax Highlighting Tokens
        const syn = theme.syntax || {
          keyword: c.accentEmphasis || c.accent,
          string: c.success,
          constant: c.warning,
          comment: c.fgMuted,
          entity: c.accent,
          variable: c.fg,
          tag: c.danger || c.accent,
          operator: c.accent
        };

        root.style.setProperty('--ts-syntax-keyword', syn.keyword);
        root.style.setProperty('--ts-syntax-string', syn.string);
        root.style.setProperty('--ts-syntax-constant', syn.constant);
        root.style.setProperty('--ts-syntax-comment', syn.comment);
        root.style.setProperty('--ts-syntax-entity', syn.entity);
        root.style.setProperty('--ts-syntax-variable', syn.variable);
        root.style.setProperty('--ts-syntax-tag', syn.tag);
        root.style.setProperty('--ts-syntax-operator', syn.operator);

        // Override GitHub Primer PrettyLights Syntax properties directly on root
        root.style.setProperty('--color-prettylights-syntax-comment', syn.comment);
        root.style.setProperty('--color-prettylights-syntax-constant', syn.constant);
        root.style.setProperty('--color-prettylights-syntax-entity', syn.entity);
        root.style.setProperty('--color-prettylights-syntax-storage-modifier-import', syn.keyword);
        root.style.setProperty('--color-prettylights-syntax-entity-tag', syn.tag);
        root.style.setProperty('--color-prettylights-syntax-keyword', syn.keyword);
        root.style.setProperty('--color-prettylights-syntax-string', syn.string);
        root.style.setProperty('--color-prettylights-syntax-variable', syn.variable);
        root.style.setProperty('--color-prettylights-syntax-string-regexp', syn.constant);
        root.style.setProperty('--color-prettylights-syntax-markup-heading', c.accent);
        root.style.setProperty('--color-prettylights-syntax-markup-italic', syn.keyword);
        root.style.setProperty('--color-prettylights-syntax-markup-bold', syn.entity);
        root.style.setProperty('--color-prettylights-syntax-markup-code', syn.string);
      }

      // Apply custom or preset wallpaper
      this.applyWallpaper();

      // Apply contribution graph palette
      this.applyContributionPalette();

      // Apply editor and code monospace font
      this.applyFont();
    }

    findTheme(id) {
      if (!window.ThemeStudio) return null;
      return window.ThemeStudio.THEMES.find(t => t.id === id) || window.ThemeStudio.THEMES[0];
    }

    /**
     * Apply background wallpaper image and CSS filters
     */
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
        this.bgLayer.style.backgroundImage = 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)';
      }

      const blurVal = this.settings.blur || 6;
      const brightVal = this.settings.brightness || 85;
      const contrastVal = this.settings.contrast || 105;
      this.bgLayer.style.filter = `blur(${blurVal}px) brightness(${brightVal}%) contrast(${contrastVal}%)`;
    }

    /**
     * Apply color palette to GitHub's contribution heat map grid
     */
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

    /**
     * Apply selected code font to code elements
     */
    applyFont() {
      const root = document.documentElement;
      const fontDef = window.ThemeStudio ? window.ThemeStudio.FONTS.find(f => f.id === this.settings.fontId) : null;
      if (fontDef) {
        root.style.setProperty('--ts-code-font', fontDef.css);
      }
    }

    /**
     * Toggle distraction-free focus mode
     */
    toggleFocusMode() {
      const newFocus = !this.settings.focusMode;
      this.updateSettings({ focusMode: newFocus });
    }

    /**
     * Attach interactive event listeners for stars, merges, and shortcuts
     */
    attachEventListeners() {
      // In-page keyboard shortcut fallback (Alt+Shift+F)
      window.addEventListener('keydown', (e) => {
        if (!isExtensionAlive()) return;
        if (e.altKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
          e.preventDefault();
          this.toggleFocusMode();
        }
      });

      // Interactive GitHub click listeners (Stars, Merges) for confetti
      document.addEventListener('click', (e) => {
        if (!isExtensionAlive()) return;

        // Star button
        const starBtn = e.target.closest('button[data-hydro-click*="star"], form[action*="/star"] button, [aria-label*="Star this repository"], [aria-label*="star this repository"]');
        if (starBtn) {
          setTimeout(() => {
            if (this.settings.confettiEnabled && window.themeConfetti) {
              window.themeConfetti.burstFromElement(starBtn, 'star');
            }
          }, 60);
          return;
        }

        // Merge pull request button
        const mergeBtn = e.target.closest('button.btn-primary[name="apply_commit"], button[value="merge"], .js-merge-commit-button');
        if (mergeBtn) {
          if (this.settings.confettiEnabled && window.themeConfetti) {
            window.themeConfetti.burst(window.innerWidth / 2, window.innerHeight / 2, 'merge');
          }
          return;
        }
      });
    }

    /**
     * Watch for GitHub Turbo / PJAX client-side navigations
     * GitHub is a Single Page Application (SPA), so clicking repos or files
     * triggers Turbo navigation instead of a full page reload.
     */
    observeNavigations() {
      const onNavigate = () => {
        if (!isExtensionAlive()) return;
        this.setupDOM();
        this.applyAll();
      };

      document.addEventListener('turbo:load', onNavigate);
      document.addEventListener('turbo:render', onNavigate);
      document.addEventListener('pjax:end', onNavigate);
      window.addEventListener('popstate', onNavigate);
    }
  }

  // =========================================================
  // 3. BOOTSTRAP INITIALIZATION
  // =========================================================

  window.themeStudioContent = new ThemeStudioContent();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.themeStudioContent.init());
  } else {
    window.themeStudioContent.init();
  }
})();
