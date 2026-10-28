# 🎨 Theme Studio for GitHub - Dark Themes & Anime Backgrounds

> Supercharge your GitHub with custom anime & aesthetic backgrounds, frosted glassmorphism, curated dark themes, procedural sound effects, interactive celebrations, and custom contribution graphs.

Inspired by **Theme Studio for LeetCode**, built specifically for developers who love coding on GitHub in style.

---

## ✨ Features

### 1. 🎭 12 Curated Aesthetic & Dark Themes
- **Catppuccin Mocha**: Soothing pastel colors on a deep charcoal-lavender canvas.
- **Tokyo Night**: Electric blue & purple night lights inspired by downtown Shibuya.
- **Cyberpunk 2077**: High voltage neon yellow (`#fee715`), magenta (`#ff007f`), and electric cyan.
- **Sakura Blossom**: Anime cherry blossom petals and warm dusk.
- **Midnight OLED**: Ultra-deep pitch black (`#000000`) for maximum OLED contrast and battery saving.
- **Dracula Pro**: Glowing purple, coral pink, and mint accents.
- **Nordic Frost**: Arctic blue and polar night gray.
- **Matrix Terminal**: Phosphor green glow on an ominous terminal void.
- **Synthwave '84**: 80s outrun neon pink, sunset orange, and violet grid.
- **Vintage Sepia**: Warm antique book tones to reduce eye fatigue.
- **Monokai Pro**: Vibrant coder palette with amber, rose, mint, and sky on charcoal.
- **Abyss Deep Blue**: Bioluminescent aquamarine on deep oceanic depths.

### 2. 🌸 Aesthetic Background Engine (Glassmorphism)
- **14 Built-in Aesthetic Wallpapers**: Nordic Aurora Fjord, Ghibli Forest Sanctuary, Neo Kowloon Skyline, Dark Topographic Contours, Orion Stellar Nebula, Zen Fuji Sunset, Anime Sunset Lofi, Makoto Starry Sky, Outrun Synth Grid, Cozy Lofi Study, Sakura Night Shrine, Minimal Deep Space, and Rainy City Glass.
- **Custom Image URL Support**: Paste any wallpaper link from Unsplash, Imgur, Danbooru, or Google Images.
- **Local File Upload**: Upload your own anime wallpaper from your computer (saved locally in browser storage).
- **Glassmorphism Controls**:
  - **Glass Blur Slider**: From 0px to 30px smooth backdrop blur.
  - **Glass Opacity Slider**: Fine-tune GitHub card transparency from 20% to 100%.
  - **Brightness & Contrast Sliders**: Calibrate your wallpaper to ensure code readability is always 100% crisp.

### 3. 🔊 Procedural Web Audio Effects (Zero Latency)
- **Star Sound**: Arcade coin chime / level-up arpeggio upon starring a repository.
- **Fork Sound**: Dual-tone warp effect.
- **Merge PR Victory Fanfare**: Celebratory brass fanfare upon merging a pull request!
- **Commit / Push**: Tactile mechanical click and chime.
- **Sound Packs**: *8-Bit Retro Arcade*, *Modern Studio Chime*, *Cyberpunk Synth*, *Anime Sparkle*, and *Tactile Mechanical*.
- **Volume Slider** & Mute toggle.

### 4. 🎉 Visual Celebrations & Confetti
- **Particle Explosions**: Starbursts and 60fps canvas confetti showers when you star a repo or merge a pull request.
- **Dynamic Repo Language Tint**: Automatically tints accent colors to match the primary language of the repo you're viewing (JavaScript yellow, TypeScript blue, Python blue/gold, Rust copper, Go cyan, etc.).

### 5. 🟩 Custom Contribution Graph Palettes
- **GitHub Classic Green**
- **Sakura Petals** (Pink/Magenta)
- **Cyberpunk Neon** (Violet to Neon Yellow)
- **Solar Flare** (Dark Embers to Blazing Fire)
- **Electric Glacier** (Navy to Glowing Ice Cyan)
- **Royal Amethyst** (Obsidian to Lilac Purple)
- **Matrix Phosphor** (Jet Black to Green Phosphor)
- **Crimson Blood** (Dark Crimson to Fiery Red)
- Interactive hover effects and neon glow on active contribution squares.

### 6. 🔤 Code Typography
- Select your preferred monospace font for all GitHub code blobs, PR diffs, and markdown blocks:
  - **JetBrains Mono**
  - **Fira Code**
  - **Cascadia Code**
  - **Source Code Pro**
  - **Space Mono**
  - **Roboto Mono**

### 7. ⚡ Focus Mode (`Alt+Shift+F`)
- Need to present during a meeting, interview, or clean screen sharing?
- Press `Alt+Shift+F` (or click the Focus Mode button) to immediately hide wallpapers, blur, and audio effects for a pristine, minimalist GitHub view.

### 8. 📸 Shareable Episode Card / Profile Card
- Generate a beautiful stat card showcasing your username, avatar, active theme badge, and current vibe to download or share directly on **X (Twitter)** or **LinkedIn**!

### 9. 🚀 In-Page Floating Quick HUD
- A sleek floating pill dock on the bottom-right of GitHub lets you tweak blur, switch themes, or trigger celebrations without having to click the extension popup.

---

## 📦 How to Install in 10 Seconds

1. Open your Chromium browser (**Google Chrome**, **Brave**, **Microsoft Edge**, **Arc**, etc.).
2. Navigate to:
   ```text
   chrome://extensions
   ```
   *(or `edge://extensions` / `brave://extensions`)*
3. Enable **"Developer mode"** via the toggle switch in the top-right corner.
4. Click the **"Load unpacked"** button in the top-left.
5. Select this directory:
   ```text
   E:\All Projects\heroku-github-theme
   ```
6. Open [github.com](https://github.com) and enjoy your brand new Theme Studio!

---

## ⌨️ Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Alt + Shift + F` | Toggle **Focus Mode** (clean presentation view) |
| Click **Star ⭐** | Play level-up chime & starburst confetti |
| Click **Merge PR 🚀** | Play victory fanfare & celebration confetti shower |

---

## 🛠️ Tech Stack & Architecture

- **Manifest V3** compliant.
- **Web Audio API** procedural synthesizer (no external audio files, works 100% offline).
- **Hardware-accelerated CSS Glassmorphism** with backdrop-filter.
- **Vanilla JavaScript (ES6+)** with zero heavy frameworks for instant 60fps load times.
- **GitHub Turbo / PJAX Observer**: Never breaks across SPA page navigation.

---

## 📁 Project Structure

```text
heroku-github-theme/
├── assets/
│   └── wallpapers/                  # 14 curated built-in SVG wallpapers
├── background/
│   └── background.js                # Background service worker (shortcuts & storage)
├── content/
│   ├── audio-synthesizer.js         # Web Audio procedural sound synthesis
│   ├── confetti.js                  # Particle celebration effects
│   ├── content.js                   # Main content observer & event listeners
│   ├── in-page-widget.js            # Floating quick controls HUD dock
│   ├── theme-engine.css             # Glassmorphism & custom variables
│   └── themes.js                    # Curated themes & wallpaper definitions
├── icons/                           # Extension toolbar & store icons
├── popup/
│   ├── popup.html                   # Extension popup interface
│   ├── popup.css                    # GitHub Primer Dark stylesheet
│   └── popup.js                     # Dashboard controller & live sync
├── manifest.json                    # Extension Manifest V3 configuration
└── README.md                        # Documentation
```
