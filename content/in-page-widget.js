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
        <span class="ts-dock-logo"></span>
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
          <span>🎨 GitHub Theme Studio</span>
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
            <button class="ts-menu-action-btn" id="ts-quick-confetti" title="Celebrate!">
              🎉 Confetti
            </button>
            <button class="ts-menu-action-btn primary" id="ts-quick-share-card" title="Generate Shareable Stat Card">
              📸 Episode Card
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
