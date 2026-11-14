(function () {
  'use strict';

  // Save settings and broadcast
  async function saveSettings(partial) {
    const currentSettings = { ...(await chrome.storage.local.get()), ...partial };
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

  // File upload handler
  document.getElementById("input-upload-file").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        await saveSettings({
          uploadedWallpaperData: ev.target.result,
          customWallpaperUrl: '',
          wallpaperEnabled: true,
        });
        window.close();
      };
      reader.readAsDataURL(file);
    }
  });
})();
