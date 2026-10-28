# Theme Studio for GitHub

A lightweight browser extension that brings customizable dark themes, frosted glassmorphism, procedural audio feedback, contribution graph palettes, and code typography to GitHub.

Built with vanilla JavaScript and CSS. Requires no build tools, bundlers, external dependencies, or remote asset loading.

---

## Features

### Curated Dark and High-Contrast Themes
Includes 12 built-in color schemes calibrated for GitHub's UI components, pull request diffs, and code viewers:
- **Catppuccin Mocha**: Pastel accents on a charcoal lavender canvas.
- **Tokyo Night**: Indigo and electric blue accents inspired by downtown Shibuya.
- **Cyberpunk 2077**: High-contrast yellow, magenta, and cyan accents on deep obsidian.
- **Sakura Blossom**: Soft rose and twilight violet tones.
- **Midnight OLED**: Pure black (`#000000`) surfaces for OLED power efficiency and maximum contrast.
- **Dracula Pro**: Purple, coral, and mint tones on dark slate.
- **Nordic Frost**: Polar night blue-gray palette with arctic cyan accents.
- **Matrix Terminal**: Phosphor green monochrome on an obsidian void.
- **Synthwave '84**: Retro sunset orange and neon violet palette.
- **Vintage Sepia**: Low-contrast warm parchment tones to reduce eye strain during long sessions.
- **Monokai Pro**: Vibrant amber, rose, and sky blue accents on charcoal.
- **Abyss Deep Blue**: Deep oceanic navy with aquamarine highlights.

### Background Engine and Glassmorphism
- **14 Built-in Vector Wallpapers**: High-resolution SVGs included locally (Nordic Aurora Fjord, Ghibli Forest Sanctuary, Neo Kowloon Skyline, Dark Topographic Contours, Orion Stellar Nebula, Zen Fuji Sunset, Anime Sunset Lofi, Makoto Starry Sky, Outrun Synth Grid, Cozy Lofi Study, Sakura Night Shrine, Minimal Deep Space, and Rainy City Glass).
- **Custom Image URL**: Point to any remote image URL (Unsplash, personal CDN, direct link).
- **Local File Upload**: Load custom background images directly from your computer, stored locally in `chrome.storage.local`.
- **Glass Blur Slider**: Adjust backdrop filter diffusion from 0px to 30px.
- **Surface Opacity Slider**: Fine-tune card and container transparency between 20% and 100%.
- **Background Brightness Slider**: Calibrate wallpaper illumination to preserve text contrast.

### Procedural Audio Feedback
Synthesizes zero-latency audio cues using the browser's native Web Audio API (no external sound files, 100% offline):
- **Star Sound**: Synthesized level-up chime triggered when starring a repository.
- **Fork Sound**: Dual-tone warp effect triggered when forking a repository.
- **Merge PR Fanfare**: Celebratory brass fanfare triggered when merging a pull request.
- **Sound Profiles**: Choose between 8-Bit Retro Arcade, Modern Clean Chime, Cyberpunk Synth, Anime Acoustic, and Tactile Mechanical.
- **Volume Control**: Independent master gain adjustment and quick mute toggle.

### Interaction Celebrations
- **Confetti Particle Canvas**: 60fps canvas particle bursts on stars and merges.
- **Repository Language Tint**: Automatically adapts accent colors to match the primary language of the active repository (JavaScript yellow, TypeScript blue, Python blue/gold, Rust copper, Go cyan, etc.).

### Contribution Graph Palettes
Customize the contribution heatmap on GitHub profiles:
- Classic GitHub Green
- Sakura Petals (Pink/Magenta)
- Cyberpunk Neon (Violet to Neon Yellow)
- Solar Flare (Dark Embers to Amber Orange)
- Electric Glacier (Navy to Glowing Ice Cyan)
- Royal Amethyst (Obsidian to Lilac Purple)
- Matrix Phosphor (Black to Green Phosphor)
- Crimson Blood (Dark Crimson to Fiery Red)

### Code Typography
Override monospace fonts across all GitHub code blobs, PR diffs, and markdown blocks:
- JetBrains Mono
- Fira Code
- Cascadia Code
- Source Code Pro
- Space Mono
- Roboto Mono

### Focus Mode
Quick toggle via keyboard shortcut (`Alt + Shift + F`) or header button. Instantly hides background artwork and disables backdrop filters for a clean, minimal appearance suitable for screen sharing, meetings, and interviews.

### In-Page Floating HUD Dock
A compact, non-intrusive floating pill dock anchored to the bottom-right of GitHub pages. Provides instant access to theme switching, blur adjustments, focus mode, and celebrations without opening the extension popup.

---

## Installation and Setup

### Prerequisites
Any Chromium-based browser supporting Manifest V3:
- Google Chrome
- Brave Browser
- Microsoft Edge
- Arc Browser
- Opera / Vivaldi

### Step-by-Step Setup
1. Clone or download this repository to your machine:
   ```bash
   git clone https://github.com/xtroon/github-theme-extension.git
   ```
   *(Or download the ZIP file and extract it to a local folder).*

2. Open the Extensions management page in your browser:
   - Chrome / Brave: `chrome://extensions`
   - Microsoft Edge: `edge://extensions`
   - Arc: Open Settings > Extensions

3. Toggle on **Developer mode** using the switch in the top-right corner.

4. Click the **Load unpacked** button in the top-left toolbar.

5. Select the root folder of this project (`heroku-github-theme` or your cloned directory containing `manifest.json`).

6. Open or refresh any page on [github.com](https://github.com). Click the extension icon in your browser toolbar to configure your settings.

---

## Keyboard Shortcuts

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| `Alt + Shift + F` | Toggle Focus Mode | Instantly disables background artwork and blur for clean screen sharing. |
| Star repository | Star audio cue | Plays synthesized chime and starburst particle effect. |
| Merge pull request | Merge victory fanfare | Plays celebratory fanfare and confetti shower. |

---

## Architecture and Technical Details

- **Manifest V3**: Compliant with modern Chromium extension security standards using service workers (`background/background.js`).
- **No Build Tools**: Pure ES6+ JavaScript and Vanilla CSS. No `node_modules`, npm scripts, webpack, or transpilation required.
- **Zero Layout Shift (CLS)**: CSS variables are injected directly into the document root at `document_start` before page rendering begins.
- **Web Audio API**: All sound effects are mathematically generated via oscillators and gain nodes without downloading MP3 or WAV files.
- **GitHub SPA / Turbo Compatibility**: Uses DOM MutationObservers to track GitHub Turbo / PJAX page transitions and ensure themes and listeners never detach during client-side navigation.

---

## Project Structure

```text
heroku-github-theme/
├── assets/
│   └── wallpapers/                  # 14 built-in SVG wallpapers
├── background/
│   └── background.js                # Background service worker (shortcuts & storage)
├── content/
│   ├── audio-synthesizer.js         # Web Audio procedural sound synthesis
│   ├── confetti.js                  # Canvas particle celebration effects
│   ├── content.js                   # Main DOM observer & event listeners
│   ├── in-page-widget.js            # Floating quick controls HUD dock
│   ├── theme-engine.css             # Glassmorphism & custom variables
│   └── themes.js                    # Curated themes & wallpaper definitions
├── icons/                           # Extension toolbar & management icons
├── popup/
│   ├── popup.html                   # Extension popup interface
│   ├── popup.css                    # GitHub Primer Dark stylesheet
│   └── popup.js                     # Dashboard controller & live sync
├── manifest.json                    # Extension Manifest V3 configuration
└── README.md                        # Documentation
```

---

## License

MIT License. Free for personal and commercial use.
