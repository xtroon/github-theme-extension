/**
 * Theme Studio for GitHub - Popup Controller
 */

(function () {
  'use strict';

  let currentSettings = { ...window.ThemeStudio.DEFAULT_SETTINGS };

  // DOM Elements
  const masterToggle = document.getElementById('master-toggle');
  const btnFocusMode = document.getElementById('btn-focus-mode');
  const btnSoundToggle = document.getElementById('btn-sound-toggle');
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

  // Audio & Effects
  const audioEnableToggle = document.getElementById('audio-enable-toggle');
  const selectSoundPack = document.getElementById('select-sound-pack');
  const sliderVolume = document.getElementById('slider-volume');
  const lblVolume = document.getElementById('lbl-volume');
  const confettiToggle = document.getElementById('confetti-toggle');
  const dynamicTintToggle = document.getElementById('dynamic-tint-toggle');

  // Typography & Studio
  const selectFont = document.getElementById('select-font');
  const widgetToggle = document.getElementById('widget-toggle');
  const btnFireConfetti = document.getElementById('btn-fire-confetti');
  const btnOpenEpisodeCard = document.getElementById('btn-open-episode-card');

  // Backup & Reset
  const btnExportSettings = document.getElementById('btn-export-settings');
  const inputImportSettings = document.getElementById('input-import-settings');
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
    btnSoundToggle.classList.toggle('active', currentSettings.soundEnabled);

    wallpaperToggle.checked = currentSettings.wallpaperEnabled;
    sliderBlur.value = currentSettings.blur || 6;
    lblBlur.innerText = `${currentSettings.blur || 6}px`;

    sliderGlassOpacity.value = currentSettings.glassOpacity || 76;
    lblGlassOpacity.innerText = `${currentSettings.glassOpacity || 76}%`;

    sliderBrightness.value = currentSettings.brightness || 85;
    lblBrightness.innerText = `${currentSettings.brightness || 85}%`;

    inputCustomUrl.value = currentSettings.customWallpaperUrl || '';

    audioEnableToggle.checked = currentSettings.soundEnabled;
    selectSoundPack.value = currentSettings.soundPack || 'arcade-8bit';
    sliderVolume.value = Math.round((currentSettings.soundVolume || 0.7) * 100);
    lblVolume.innerText = `${Math.round((currentSettings.soundVolume || 0.7) * 100)}%`;

    confettiToggle.checked = currentSettings.confettiEnabled;
    dynamicTintToggle.checked = currentSettings.dynamicRepoTint;

    selectFont.value = currentSettings.fontId || 'jetbrains';
    widgetToggle.checked = currentSettings.floatingWidgetEnabled;

    highlightActiveTheme();
    highlightActiveWallpaper();
    highlightActivePalette();
    renderMiniGraphPreview();

    // Set local audio volume for preview
    if (window.themeAudio) {
      window.themeAudio.setVolume(currentSettings.soundVolume);
      window.themeAudio.setSoundPack(currentSettings.soundPack);
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
        <div class="ts-theme-top">
          <div class="ts-theme-name">${theme.name}</div>
          <span class="ts-theme-badge">${theme.badge}</span>
        </div>
        <div class="ts-theme-desc">${theme.description}</div>
        <div class="ts-theme-chips">${chipsHtml}</div>
      `;

      card.addEventListener('click', () => {
        saveSettings({ themeId: theme.id });
        highlightActiveTheme();
        if (window.themeAudio) window.themeAudio.playStar();
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
      card.className = `ts-wallpaper-card ${wp.id === currentSettings.wallpaperId && !currentSettings.customWallpaperUrl && !currentSettings.uploadedWallpaperData ? 'active' : ''}`;
      card.setAttribute('data-id', wp.id);
      card.style.backgroundImage = `url("${wp.thumbnail}")`;

      card.innerHTML = `
        <div class="ts-wallpaper-label">${wp.name}</div>
      `;

      card.addEventListener('click', () => {
        selectWallpaper(wp);
      });

      wallpapersContainer.appendChild(card);
    });
  }

  function highlightActiveWallpaper() {
    const isPresetActive = !currentSettings.customWallpaperUrl && !currentSettings.uploadedWallpaperData;
    document.querySelectorAll('.ts-wallpaper-card').forEach(c => {
      c.classList.toggle('active', isPresetActive && c.getAttribute('data-id') === currentSettings.wallpaperId);
    });
  }

  function selectWallpaper(wallpaper) {
    saveSettings({
      wallpaperId: wallpaper.id,
      customWallpaperUrl: '',
      uploadedWallpaperData: '',
      wallpaperEnabled: true
    });
    wallpaperToggle.checked = true;
    inputCustomUrl.value = '';
    highlightActiveWallpaper();
  }

  // Render Contribution Palettes
  function renderContributionPalettes() {
    palettesContainer.innerHTML = '';
    window.ThemeStudio.CONTRIBUTION_PALETTES.forEach(pal => {
      const card = document.createElement('div');
      card.className = `ts-palette-card ${pal.id === currentSettings.contributionPaletteId ? 'active' : ''}`;
      card.setAttribute('data-id', pal.id);

      let swatchesHtml = '';
      pal.levels.forEach(col => {
        swatchesHtml += `<div class="ts-swatch" style="background: ${col};"></div>`;
      });

      card.innerHTML = `
        <div class="ts-palette-name">${pal.name}</div>
        <div class="ts-palette-swatches">${swatchesHtml}</div>
      `;

      card.addEventListener('click', () => {
        saveSettings({ contributionPaletteId: pal.id });
        highlightActivePalette();
        renderMiniGraphPreview();
      });

      palettesContainer.appendChild(card);
    });
  }

  function highlightActivePalette() {
    document.querySelectorAll('.ts-palette-card').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-id') === currentSettings.contributionPaletteId);
    });
  }

  // Render Mini Contribution Graph (14 columns x 5 rows)
  function renderMiniGraphPreview() {
    graphPreviewGrid.innerHTML = '';
    const pal = window.ThemeStudio.CONTRIBUTION_PALETTES.find(p => p.id === currentSettings.contributionPaletteId) || window.ThemeStudio.CONTRIBUTION_PALETTES[0];

    // Seeded random distribution for aesthetic look
    for (let i = 0; i < 70; i++) {
      const cell = document.createElement('div');
      cell.className = 'ts-graph-cell';

      // Distribute levels 0..4 realistically
      const rand = Math.sin(i * 999) * 10000;
      const frac = rand - Math.floor(rand);
      let level = 0;
      if (frac > 0.85) level = 4;
      else if (frac > 0.65) level = 3;
      else if (frac > 0.45) level = 2;
      else if (frac > 0.25) level = 1;

      cell.style.background = pal.levels[level];
      if (level >= 3) {
        cell.style.boxShadow = `0 0 3px ${pal.levels[level]}`;
      }

      graphPreviewGrid.appendChild(cell);
    }
  }

  // Attach event listeners
  function attachListeners() {
    masterToggle.addEventListener('change', (e) => {
      saveSettings({ enabled: e.target.checked });
    });

    btnFocusMode.addEventListener('click', () => {
      const newFocus = !currentSettings.focusMode;
      saveSettings({ focusMode: newFocus });
      btnFocusMode.classList.toggle('active', newFocus);
      if (window.themeAudio) window.themeAudio.playFocusMode(newFocus);
    });

    btnSoundToggle.addEventListener('click', () => {
      const newSound = !currentSettings.soundEnabled;
      saveSettings({ soundEnabled: newSound });
      audioEnableToggle.checked = newSound;
      btnSoundToggle.classList.toggle('active', newSound);
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

    audioEnableToggle.addEventListener('change', (e) => {
      saveSettings({ soundEnabled: e.target.checked });
      btnSoundToggle.classList.toggle('active', e.target.checked);
    });

    selectSoundPack.addEventListener('change', (e) => {
      saveSettings({ soundPack: e.target.value });
      if (window.themeAudio) {
        window.themeAudio.setSoundPack(e.target.value);
        window.themeAudio.playStar();
      }
    });

    sliderVolume.addEventListener('input', (e) => {
      const vol = parseInt(e.target.value, 10) / 100;
      lblVolume.innerText = `${e.target.value}%`;
      saveSettings({ soundVolume: vol });
      if (window.themeAudio) window.themeAudio.setVolume(vol);
    });

    // Sound test buttons
    document.getElementById('btn-test-star').addEventListener('click', () => {
      if (window.themeAudio) window.themeAudio.playStar();
    });

    document.getElementById('btn-test-fork').addEventListener('click', () => {
      if (window.themeAudio) window.themeAudio.playFork();
    });

    document.getElementById('btn-test-merge').addEventListener('click', () => {
      if (window.themeAudio) window.themeAudio.playMerge();
    });

    confettiToggle.addEventListener('change', (e) => {
      saveSettings({ confettiEnabled: e.target.checked });
    });

    dynamicTintToggle.addEventListener('change', (e) => {
      saveSettings({ dynamicRepoTint: e.target.checked });
    });

    selectFont.addEventListener('change', (e) => {
      saveSettings({ fontId: e.target.value });
    });

    widgetToggle.addEventListener('change', (e) => {
      saveSettings({ floatingWidgetEnabled: e.target.checked });
    });

    btnFireConfetti.addEventListener('click', async () => {
      if (window.themeAudio) window.themeAudio.playMerge();
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'TRIGGER_CONFETTI' }).catch(() => {});
      }
    });

    btnOpenEpisodeCard.addEventListener('click', async () => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'OPEN_EPISODE_CARD' }).catch(() => {
          alert('Please navigate to an open GitHub tab to view your Episode Card!');
        });
      }
    });

    // Backup & Restore
    btnExportSettings.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentSettings, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "theme-studio-github-settings.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });

    inputImportSettings.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (ev) => {
          try {
            const imported = JSON.parse(ev.target.result);
            await saveSettings(imported);
            syncUIWithSettings();
            alert('Settings imported successfully!');
          } catch (err) {
            alert('Invalid JSON configuration file.');
          }
        };
        reader.readAsText(file);
      }
    });

    btnResetSettings.addEventListener('click', async () => {
      if (confirm('Reset all Theme Studio settings to default?')) {
        await saveSettings(window.ThemeStudio.DEFAULT_SETTINGS);
        syncUIWithSettings();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
