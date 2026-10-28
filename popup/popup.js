/**
 * Theme Studio for GitHub - Popup Controller
 */

(function () {
  'use strict';

  let currentSettings = { ...window.ThemeStudio.DEFAULT_SETTINGS };

  // DOM Elements
  const masterToggle = document.getElementById('master-toggle');
  const btnFocusMode = document.getElementById('btn-focus-mode');
  const themesContainer = document.getElementById('themes-container');
  const wallpapersContainer = document.getElementById('wallpapers-container');
  const palettesContainer = document.getElementById('palettes-container');
  const graphPreviewGrid = document.getElementById('graph-preview-grid');

  // Sliders
  const sliderBlur = document.getElementById('slider-blur');
  const sliderGlassOpacity = document.getElementById('slider-glass-opacity');
  const sliderBrightness = document.getElementById('slider-brightness');
  const lblBlur = document.getElementById('lbl-blur');
  const lblGlassOpacity = document.getElementById('lbl-glass-opacity');
  const lblBrightness = document.getElementById('lbl-brightness');

  // Wallpaper inputs
  const wallpaperToggle = document.getElementById('wallpaper-toggle');
  const btnRandomWallpaper = document.getElementById('btn-random-wallpaper');
  const inputCustomUrl = document.getElementById('input-custom-url');
  const btnApplyUrl = document.getElementById('btn-apply-url');
  const inputUploadFile = document.getElementById('input-upload-file');
  const btnClearCustomBg = document.getElementById('btn-clear-custom-bg');

  // Celebrations & Preferences
  const confettiToggle = document.getElementById('confetti-toggle');
  const btnFireConfetti = document.getElementById('btn-fire-confetti');
  const btnResetSettings = document.getElementById('btn-reset-settings');

  // Initialize
  async function init() {
    setupTabs();
    await loadSettings();
    renderThemes();
    renderWallpapers();
    renderContributionPalettes();
    renderMiniGraphPreview();
    syncUIWithSettings();
    attachListeners();
  }

  // Tab switching
  function setupTabs() {
    const tabButtons = document.querySelectorAll('.ts-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.ts-tab-pane').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  // Load settings from storage
  async function loadSettings() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      const data = await chrome.storage.local.get(['themeStudioSettings']);
      if (data && data.themeStudioSettings) {
        currentSettings = { ...window.ThemeStudio.DEFAULT_SETTINGS, ...data.themeStudioSettings };
      }
    }
  }

  // Save settings and broadcast
  async function saveSettings(partial) {
    currentSettings = { ...currentSettings, ...partial };
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ themeStudioSettings: currentSettings });

      // Notify active GitHub tabs
      const tabs = await chrome.tabs.query({ url: ['https://github.com/*', 'https://*.github.com/*'] });
      for (const tab of tabs) {
        chrome.tabs.sendMessage(tab.id, {
          type: 'SETTINGS_UPDATED',
          settings: currentSettings
        }).catch(() => {});
      }
    }
  }

  // Sync UI controls with current settings
  function syncUIWithSettings() {
    masterToggle.checked = currentSettings.enabled;
    btnFocusMode.classList.toggle('active', currentSettings.focusMode);

    wallpaperToggle.checked = currentSettings.wallpaperEnabled;
    sliderBlur.value = currentSettings.blur || 6;
    lblBlur.innerText = `${currentSettings.blur || 6}px`;

    sliderGlassOpacity.value = currentSettings.glassOpacity || 76;
    lblGlassOpacity.innerText = `${currentSettings.glassOpacity || 76}%`;

    sliderBrightness.value = currentSettings.brightness || 85;
    lblBrightness.innerText = `${currentSettings.brightness || 85}%`;

    inputCustomUrl.value = currentSettings.customWallpaperUrl || '';

    if (confettiToggle) confettiToggle.checked = currentSettings.confettiEnabled;

    highlightActiveTheme();
    highlightActiveWallpaper();
    highlightActivePalette();
    renderMiniGraphPreview();

    const footerText = document.getElementById('footer-status-text');
    if (footerText) {
      footerText.innerText = currentSettings.enabled
        ? (currentSettings.focusMode ? 'Focus Mode Active' : 'Active on GitHub')
        : 'Disabled';
    }
  }

  // Render Themes Grid
  function renderThemes() {
    themesContainer.innerHTML = '';
    window.ThemeStudio.THEMES.forEach(theme => {
      const card = document.createElement('div');
      card.className = `ts-theme-card ${theme.id === currentSettings.themeId ? 'active' : ''}`;
      card.setAttribute('data-id', theme.id);

      let chipsHtml = '';
      theme.previewChips.forEach(color => {
        chipsHtml += `<div class="ts-color-chip" style="background: ${color};"></div>`;
      });

      card.innerHTML = `
        <div class="ts-active-indicator" title="Active Theme">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="ts-theme-mockup" style="background: ${theme.colors.canvasInset}; border-color: ${theme.colors.border};">
          <div class="ts-mockup-header">
            <span class="ts-mockup-dot" style="background: #ff5f56;"></span>
            <span class="ts-mockup-dot" style="background: #ffbd2e;"></span>
            <span class="ts-mockup-dot" style="background: #27c93f;"></span>
            <span style="color: ${theme.colors.fgMuted}; margin-left: 2px;">theme.ts</span>
          </div>
          <div class="ts-mockup-line">
            <span style="color: ${theme.syntax ? theme.syntax.keyword : theme.colors.accentEmphasis};">export const</span> 
            <span style="color: ${theme.syntax ? theme.syntax.entity : theme.colors.accent};">theme</span> = 
            <span style="color: ${theme.syntax ? theme.syntax.string : theme.colors.success};">'${theme.name.split(' ')[0]}'</span>;
          </div>
        </div>
        <div class="ts-theme-info">
          <div class="ts-theme-name" title="${theme.name}">${theme.name}</div>
          <span class="ts-theme-badge">${theme.badge}</span>
        </div>
        <div class="ts-theme-chips">${chipsHtml}</div>
      `;

      card.addEventListener('click', () => {
        saveSettings({ themeId: theme.id });
        highlightActiveTheme();
      });

      themesContainer.appendChild(card);
    });
  }

  function highlightActiveTheme() {
    document.querySelectorAll('.ts-theme-card').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-id') === currentSettings.themeId);
    });
  }

  // Render Wallpapers Grid
  function renderWallpapers() {
    wallpapersContainer.innerHTML = '';
    window.ThemeStudio.WALLPAPERS.forEach(wp => {
      const card = document.createElement('div');
      const isActive = wp.id === currentSettings.wallpaperId && !currentSettings.customWallpaperUrl && !currentSettings.uploadedWallpaperData;
      card.className = `ts-wallpaper-card ${isActive ? 'active' : ''}`;
      card.setAttribute('data-id', wp.id);
      card.style.backgroundImage = `url("${wp.thumbnail}")`;

      card.innerHTML = `
        <div class="ts-active-indicator" title="Active Wallpaper">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="ts-wallpaper-overlay">
          <span class="ts-wallpaper-title" title="${wp.name}">${wp.name}</span>
          <span class="ts-wallpaper-category" style="font-size: 9px; opacity: 0.8; color: #8b949e; margin-left: 4px;">${wp.category}</span>
        </div>
      `;

      card.addEventListener('click', () => selectWallpaper(wp));
      wallpapersContainer.appendChild(card);
    });
  }

  function selectWallpaper(wp) {
    saveSettings({
      wallpaperId: wp.id,
      customWallpaperUrl: '',
      uploadedWallpaperData: '',
      wallpaperEnabled: true
    });
    wallpaperToggle.checked = true;
    highlightActiveWallpaper();
  }

  function highlightActiveWallpaper() {
    const isCustom = Boolean(currentSettings.customWallpaperUrl || currentSettings.uploadedWallpaperData);
    document.querySelectorAll('.ts-wallpaper-card').forEach(c => {
      const active = !isCustom && c.getAttribute('data-id') === currentSettings.wallpaperId;
      c.classList.toggle('active', active);
    });
  }

  // Render Contribution Palettes
  function renderContributionPalettes() {
    palettesContainer.innerHTML = '';
    window.ThemeStudio.CONTRIBUTION_PALETTES.forEach(pal => {
      const item = document.createElement('div');
      item.className = `ts-palette-card ${pal.id === currentSettings.contributionPaletteId ? 'active' : ''}`;
      item.setAttribute('data-id', pal.id);

      let swatches = '';
      pal.levels.forEach(c => {
        swatches += `<span class="ts-swatch" style="background: ${c};"></span>`;
      });

      item.innerHTML = `
        <span class="ts-palette-name">${pal.name}</span>
        <div class="ts-palette-swatches">${swatches}</div>
      `;

      item.addEventListener('click', () => {
        saveSettings({ contributionPaletteId: pal.id });
        highlightActivePalette();
        renderMiniGraphPreview();
      });

      palettesContainer.appendChild(item);
    });
  }

  function highlightActivePalette() {
    document.querySelectorAll('.ts-palette-card').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-id') === currentSettings.contributionPaletteId);
    });
  }

  // Render Mini Graph Preview
  function renderMiniGraphPreview() {
    graphPreviewGrid.innerHTML = '';
    const pal = window.ThemeStudio.CONTRIBUTION_PALETTES.find(p => p.id === currentSettings.contributionPaletteId)
      || window.ThemeStudio.CONTRIBUTION_PALETTES[0];

    // Update legend swatches to match active palette
    const legendCells = document.querySelectorAll('.ts-legend-cell');
    legendCells.forEach((cell, idx) => {
      if (pal.levels[idx]) {
        cell.style.background = pal.levels[idx];
      }
    });

    const weeks = 22;
    const days = 7;

    for (let w = 0; w < weeks; w++) {
      const col = document.createElement('div');
      col.className = 'ts-graph-col';
      for (let d = 0; d < days; d++) {
        const cell = document.createElement('div');
        cell.className = 'ts-graph-cell';

        const rand = Math.random();
        let lvl = 0;
        if (rand > 0.85) lvl = 4;
        else if (rand > 0.70) lvl = 3;
        else if (rand > 0.50) lvl = 2;
        else if (rand > 0.30) lvl = 1;

        cell.style.background = pal.levels[lvl];
        col.appendChild(cell);
      }
      graphPreviewGrid.appendChild(col);
    }
  }

  // Attach Event Listeners
  function attachListeners() {
    masterToggle.addEventListener('change', (e) => {
      saveSettings({ enabled: e.target.checked });
      const footerText = document.getElementById('footer-status-text');
      if (footerText) footerText.innerText = e.target.checked ? 'Active on GitHub' : 'Disabled';
    });

    btnFocusMode.addEventListener('click', () => {
      const newFocus = !currentSettings.focusMode;
      saveSettings({ focusMode: newFocus });
      btnFocusMode.classList.toggle('active', newFocus);
      const footerText = document.getElementById('footer-status-text');
      if (footerText) footerText.innerText = newFocus ? 'Focus Mode Active' : 'Active on GitHub';
    });

    wallpaperToggle.addEventListener('change', (e) => {
      saveSettings({ wallpaperEnabled: e.target.checked });
    });

    btnRandomWallpaper.addEventListener('click', () => {
      const wallpapers = window.ThemeStudio.WALLPAPERS;
      const available = wallpapers.filter(wp => wp.id !== currentSettings.wallpaperId);
      const wallpaper = (available.length ? available : wallpapers)[Math.floor(Math.random() * (available.length ? available.length : wallpapers.length))];
      selectWallpaper(wallpaper);
    });

    sliderBlur.addEventListener('input', (e) => {
      lblBlur.innerText = `${e.target.value}px`;
      saveSettings({ blur: parseInt(e.target.value, 10) });
    });

    sliderGlassOpacity.addEventListener('input', (e) => {
      lblGlassOpacity.innerText = `${e.target.value}%`;
      saveSettings({ glassOpacity: parseInt(e.target.value, 10) });
    });

    sliderBrightness.addEventListener('input', (e) => {
      lblBrightness.innerText = `${e.target.value}%`;
      saveSettings({ brightness: parseInt(e.target.value, 10) });
    });

    btnApplyUrl.addEventListener('click', () => {
      const url = inputCustomUrl.value.trim();
      if (url) {
        saveSettings({
          customWallpaperUrl: url,
          uploadedWallpaperData: '',
          wallpaperEnabled: true
        });
        wallpaperToggle.checked = true;
        highlightActiveWallpaper();
      }
    });

    inputUploadFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          saveSettings({
            uploadedWallpaperData: ev.target.result,
            customWallpaperUrl: '',
            wallpaperEnabled: true
          });
          wallpaperToggle.checked = true;
          highlightActiveWallpaper();
        };
        reader.readAsDataURL(file);
      }
    });

    btnClearCustomBg.addEventListener('click', () => {
      inputCustomUrl.value = '';
      saveSettings({
        customWallpaperUrl: '',
        uploadedWallpaperData: ''
      });
      highlightActiveWallpaper();
    });

    if (confettiToggle) {
      confettiToggle.addEventListener('change', (e) => {
        saveSettings({ confettiEnabled: e.target.checked });
      });
    }



    if (btnFireConfetti) {
      btnFireConfetti.addEventListener('click', async () => {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'TRIGGER_CONFETTI' }).catch(() => {});
        }
      });
    }

    // Reset to defaults
    if (btnResetSettings) {
      btnResetSettings.addEventListener('click', async () => {
        if (confirm('Reset all Theme Studio settings to default?')) {
          await saveSettings(window.ThemeStudio.DEFAULT_SETTINGS);
          syncUIWithSettings();
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
