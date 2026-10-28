/**
 * Theme Studio for GitHub - In-Page Quick HUD Widget
 * Floating mini-studio dock on GitHub for instant tweaks, quick themes, focus mode & episode card.
 */

(function () {
  'use strict';

  class ThemeStudioWidget {
    constructor() {
      this.dockEl = null;
      this.menuEl = null;
      this.isOpen = false;
      this.isMinimized = false;
    }

    init() {
      if (document.getElementById('theme-studio-floating-dock')) return;
      this._createDock();
    }

    remove() {
      if (this.dockEl) this.dockEl.remove();
      if (this.menuEl) this.menuEl.remove();
      this.dockEl = null;
      this.menuEl = null;
      this.isOpen = false;
    }

    _createDock() {
      this.dockEl = document.createElement('div');
      this.dockEl.id = 'theme-studio-floating-dock';

      const pill = document.createElement('div');
      pill.className = 'ts-dock-pill';
      pill.title = 'Theme Studio: Quick Controls';
      pill.innerHTML = `
        <span class="ts-dock-logo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </span>
        <span class="ts-dock-label">Theme Studio</span>
      `;

      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });

      this.dockEl.appendChild(pill);
      document.body.appendChild(this.dockEl);
    }

    toggleMenu() {
      if (this.isOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }

    closeMenu() {
      if (this.menuEl) {
        this.menuEl.remove();
        this.menuEl = null;
      }
      this.isOpen = false;
    }

    openMenu() {
      if (this.isOpen) return;
      this.isOpen = true;

      const settings = window.themeStudioContent ? window.themeStudioContent.settings : (window.ThemeStudio ? window.ThemeStudio.DEFAULT_SETTINGS : {});
      const themes = window.ThemeStudio ? window.ThemeStudio.THEMES : [];

      this.menuEl = document.createElement('div');
      this.menuEl.id = 'theme-studio-floating-menu';

      let optionsHtml = '';
      themes.forEach(t => {
        const selected = t.id === settings.themeId ? 'selected' : '';
        optionsHtml += `<option value="${t.id}" ${selected}>${t.name}</option>`;
      });

      this.menuEl.innerHTML = `
        <div class="ts-menu-header">
          <div style="display: flex; align-items: center; gap: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span>Theme Studio Quick Controls</span>
          </div>
          <button class="ts-dock-btn" id="ts-close-menu-btn" title="Close">✕</button>
        </div>
        <div class="ts-menu-body">
          <div class="ts-menu-row">
            <span>Theme Preset:</span>
            <select class="ts-menu-select" id="ts-quick-theme-select">
              ${optionsHtml}
            </select>
          </div>
          <div class="ts-menu-row">
            <span>Glass Blur: <b id="ts-blur-val">${settings.blur || 6}px</b></span>
            <input type="range" class="ts-menu-slider" id="ts-quick-blur" min="0" max="25" value="${settings.blur || 6}">
          </div>
          <div class="ts-menu-row">
            <span>Glass Opacity: <b id="ts-opacity-val">${settings.glassOpacity || 76}%</b></span>
            <input type="range" class="ts-menu-slider" id="ts-quick-opacity" min="20" max="100" value="${settings.glassOpacity || 76}">
          </div>
          <div class="ts-menu-row">
            <span>Focus Mode (Alt+Shift+F):</span>
            <input type="checkbox" id="ts-quick-focus" ${settings.focusMode ? 'checked' : ''}>
          </div>
          <div class="ts-menu-row">
            <span>Sound FX:</span>
            <input type="checkbox" id="ts-quick-sound" ${settings.soundEnabled ? 'checked' : ''}>
          </div>
          <div class="ts-menu-actions">
            <button class="ts-menu-action-btn" id="ts-quick-confetti" title="Trigger Confetti">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/></svg>
              <span>Confetti</span>
            </button>
            <button class="ts-menu-action-btn primary" id="ts-quick-share-card" title="Generate Profile Snapshot Card">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              <span>Profile Card</span>
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(this.menuEl);

      // Event listeners
      document.getElementById('ts-close-menu-btn').addEventListener('click', () => this.closeMenu());

      const themeSelect = document.getElementById('ts-quick-theme-select');
      themeSelect.addEventListener('change', (e) => {
        window.themeStudioContent.updateSettings({ themeId: e.target.value });
      });

      const blurSlider = document.getElementById('ts-quick-blur');
      blurSlider.addEventListener('input', (e) => {
        document.getElementById('ts-blur-val').innerText = `${e.target.value}px`;
        window.themeStudioContent.updateSettings({ blur: parseInt(e.target.value, 10) });
      });

      const opacitySlider = document.getElementById('ts-quick-opacity');
      opacitySlider.addEventListener('input', (e) => {
        document.getElementById('ts-opacity-val').innerText = `${e.target.value}%`;
        window.themeStudioContent.updateSettings({ glassOpacity: parseInt(e.target.value, 10) });
      });

      const focusToggle = document.getElementById('ts-quick-focus');
      focusToggle.addEventListener('change', (e) => {
        window.themeStudioContent.updateSettings({ focusMode: e.target.checked });
        if (window.themeAudio) {
          window.themeAudio.playFocusMode(e.target.checked);
        }
      });

      const soundToggle = document.getElementById('ts-quick-sound');
      soundToggle.addEventListener('change', (e) => {
        window.themeStudioContent.updateSettings({ soundEnabled: e.target.checked });
      });

      const confettiBtn = document.getElementById('ts-quick-confetti');
      confettiBtn.addEventListener('click', () => {
        if (window.themeConfetti) {
          window.themeConfetti.burst(window.innerWidth / 2, window.innerHeight / 2, 'mixed');
        }
        if (window.themeAudio) {
          window.themeAudio.playStar();
        }
      });

      const shareBtn = document.getElementById('ts-quick-share-card');
      shareBtn.addEventListener('click', () => {
        this.closeMenu();
        if (window.themeStudioContent) {
          window.themeStudioContent.openEpisodeCardModal();
        }
      });

      // Close on clicking outside
      const onDocClick = (e) => {
        if (this.menuEl && !this.menuEl.contains(e.target) && !this.dockEl.contains(e.target)) {
          this.closeMenu();
          document.removeEventListener('click', onDocClick);
        }
      };
      setTimeout(() => document.addEventListener('click', onDocClick), 50);
    }
  }

  window.themeStudioWidget = new ThemeStudioWidget();
})();
