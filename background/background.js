/**
 * Theme Studio for GitHub - Background Service Worker
 * Manages default settings on install, command hotkeys, and active tab message broadcasts.
 */

importScripts('../content/themes.js');

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('[Theme Studio] Extension installed or updated:', details.reason);
  const data = await chrome.storage.local.get(['themeStudioSettings']);
  if (!data.themeStudioSettings) {
    await chrome.storage.local.set({
      themeStudioSettings: ThemeStudio.DEFAULT_SETTINGS
    });
    console.log('[Theme Studio] Initialized default settings.');
  }
});

// Handle shortcut commands (e.g., toggle-focus-mode: Alt+Shift+F)
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-focus-mode') {
    const data = await chrome.storage.local.get(['themeStudioSettings']);
    const current = data.themeStudioSettings || ThemeStudio.DEFAULT_SETTINGS;
    const updated = {
      ...current,
      focusMode: !current.focusMode
    };

    await chrome.storage.local.set({ themeStudioSettings: updated });

    // Broadcast to all GitHub tabs
    const tabs = await chrome.tabs.query({ url: ['https://github.com/*', 'https://*.github.com/*'] });
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, {
        type: 'SETTINGS_UPDATED',
        settings: updated
      }).catch(() => {
        // Tab might be in background or loading
      });
    }

    // Update extension badge
    if (updated.focusMode) {
      chrome.action.setBadgeText({ text: 'FOC' });
      chrome.action.setBadgeBackgroundColor({ color: '#ff4444' });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }
  }
});
