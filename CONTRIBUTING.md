# Contributing to Theme Studio for GitHub

Thank you for your interest in contributing to Theme Studio for GitHub. We welcome contributions from developers of all skill levels, whether you are submitting a bug fix, proposing a new color palette, or improving documentation.

---

## Guiding Principles

1. **Zero External Dependencies**: This project uses pure vanilla ES6+ JavaScript and native CSS. Do not introduce npm packages, bundlers, transpilers, or third-party libraries.
2. **Performance First**: Styling is applied using root CSS variables at `document_start` to guarantee zero Cumulative Layout Shift (CLS).
3. **No AI Tropes or Bloat**: Keep UI components aligned with developer-grade aesthetics (clean typography, crisp contrast, GitHub Primer dark styling).
4. **Manifest V3 Compliance**: All background service worker tasks and content scripts must conform strictly to Chromium Manifest V3 specifications.

---

## Local Development Setup

Theme Studio requires no build steps or installations. Any Chromium-based browser (Chrome, Brave, Edge, Arc, Opera, Vivaldi) can run the project directly.

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/<your-username>/github-theme-extension.git
   cd github-theme-extension
   ```

2. **Load the Unpacked Extension**:
   - In your browser, open the extensions manager (e.g. `chrome://extensions` or `edge://extensions`).
   - Enable **Developer mode** using the toggle in the top-right corner.
   - Click **Load unpacked** in the top-left toolbar.
   - Select the root folder of this repository.

3. **Test Changes**:
   - Open any page on `https://github.com`.
   - After editing files, click the **Reload** button on the extension card in `chrome://extensions`, then refresh the GitHub tab.

---

## How to Contribute

### 1. Adding a New Theme

All themes are defined as declarative objects in `content/themes.js`. To add a new theme:

1. Open `content/themes.js`.
2. Append a new theme object to the `THEMES` array:
   ```javascript
   {
     id: 'your-theme-id',
     name: 'Your Theme Name',
     badge: 'Style Descriptor',
     description: 'Short 1-sentence description of the palette.',
     colors: {
       bg: '#000000',
       canvasSubtle: '#111111',
       canvasInset: '#0a0a0a',
       border: '#222222',
       borderMuted: '#333333',
       fg: '#ffffff',
       fgMuted: '#888888',
       accent: '#58a6ff',
       accentEmphasis: '#1f6feb',
       success: '#3fb950',
       danger: '#f85149',
       warning: '#d29922',
       glassBg: 'rgba(0, 0, 0, 0.75)',
       glassBorder: 'rgba(255, 255, 255, 0.12)'
     },
     syntax: {
       keyword: '#ff7b72',
       string: '#a5d6ff',
       constant: '#79c0ff',
       comment: '#8b949e',
       entity: '#d2a8ff',
       variable: '#f0f6fc',
       tag: '#7ee787',
       operator: '#ff7b72'
     },
     previewChips: ['#58a6ff', '#3fb950', '#ff7b72', '#000000']
   }
   ```
3. Test the theme on both GitHub profile pages and code viewer diffs to verify text readability and contrast.

### 2. Adding a Contribution Graph Palette

1. Open `content/themes.js`.
2. Locate the `CONTRIBUTION_PALETTES` array.
3. Add your palette with 5 hex colors ordered from least to most active:
   ```javascript
   {
     id: 'palette-id',
     name: 'Palette Display Name',
     levels: [
       '#161b22', // Level 0 (no activity)
       '#0e4429', // Level 1
       '#006d32', // Level 2
       '#26a641', // Level 3
       '#39d353'  // Level 4 (highest activity)
     ]
   }
   ```

### 3. Adding a Built-in Wallpaper

1. Ensure the wallpaper asset is an optimized vector SVG file or lightweight compressed image.
2. Place the file in `assets/wallpapers/<filename>.svg`.
3. Register the wallpaper in `content/themes.js` under the `WALLPAPERS` array with a descriptive name and category.

### 4. Reporting Issues

When reporting an issue, include:
- Your browser and browser version (e.g. Chrome 124, Brave 1.65).
- OS version (Windows, macOS, Linux).
- Extension version.
- Step-by-step reproduction instructions.
- Screenshots or console logs from the GitHub page (`F12` -> Console tab) if applicable.

---

## Pull Request Process

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/theme-name
   ```
2. Keep changes focused and atomic. Avoid large refactors alongside simple palette additions.
3. Verify that:
   - No console errors are thrown on `https://github.com`.
   - The popup dashboard (`popup/popup.html`) renders correctly without horizontal scrollbars.
   - SPA / Turbo page transitions do not break styles when navigating repositories.
4. Commit your changes with a clear commit message:
   ```bash
   git commit -m "Add Nord Frost theme palette"
   ```
5. Push to your fork and submit a Pull Request against the `main` branch.

---

## License

By contributing to Theme Studio for GitHub, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
