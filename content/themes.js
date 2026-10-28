/**
 * Theme Studio for GitHub - Definitions & Presets
 * Curated Themes, Anime Backgrounds, Contribution Palettes, Fonts & Sounds
 */

(function () {
  'use strict';

  const THEMES = [
    {
      id: 'catppuccin-mocha',
      name: 'Catppuccin Mocha',
      badge: 'Cozy Slate',
      description: 'Soothing pastel colors on a deep charcoal lavender canvas.',
      colors: {
        bg: '#1e1e2e',
        canvasSubtle: '#181825',
        canvasInset: '#11111b',
        border: '#313244',
        borderMuted: '#45475a',
        fg: '#cdd6f4',
        fgMuted: '#a6adc8',
        accent: '#cba6f7', // Mauve
        accentEmphasis: '#89b4fa', // Blue
        success: '#a6e3a1', // Green
        danger: '#f38ba8', // Red
        warning: '#f9e2af', // Yellow
        glassBg: 'rgba(30, 30, 46, 0.72)',
        glassBorder: 'rgba(203, 166, 247, 0.18)'
      },
      syntax: {
        keyword: '#cba6f7',
        string: '#a6e3a1',
        constant: '#fab387',
        comment: '#6c7086',
        entity: '#89b4fa',
        variable: '#cdd6f4',
        tag: '#f38ba8',
        operator: '#89dceb'
      },
      previewChips: ['#cba6f7', '#89b4fa', '#a6e3a1', '#1e1e2e']
    },
    {
      id: 'tokyo-night',
      name: 'Tokyo Night',
      badge: 'Cyber Indigo',
      description: 'Clean dark neon theme celebrating the lights of downtown Shibuya.',
      colors: {
        bg: '#1a1b26',
        canvasSubtle: '#16161e',
        canvasInset: '#0f0f14',
        border: '#2f3549',
        borderMuted: '#414868',
        fg: '#c0caf5',
        fgMuted: '#7aa2f7',
        accent: '#7aa2f7', // Electric Blue
        accentEmphasis: '#bb9af7', // Purple
        success: '#9ece6a',
        danger: '#f7768e',
        warning: '#e0af68',
        glassBg: 'rgba(26, 27, 38, 0.75)',
        glassBorder: 'rgba(122, 162, 247, 0.22)'
      },
      syntax: {
        keyword: '#bb9af7',
        string: '#9ece6a',
        constant: '#ff9e64',
        comment: '#565f89',
        entity: '#7aa2f7',
        variable: '#c0caf5',
        tag: '#f7768e',
        operator: '#89ddff'
      },
      previewChips: ['#7aa2f7', '#bb9af7', '#7dcfff', '#1a1b26']
    },
    {
      id: 'cyberpunk-2077',
      name: 'Cyberpunk 2077',
      badge: 'High Voltage',
      description: 'High octane neon yellow, hot magenta, and electric cyan.',
      colors: {
        bg: '#0a0a12',
        canvasSubtle: '#12121f',
        canvasInset: '#050508',
        border: '#ff007f44',
        borderMuted: '#00f2fe33',
        fg: '#e0f7fa',
        fgMuted: '#00f2fe',
        accent: '#fee715', // Neon Yellow
        accentEmphasis: '#ff007f', // Hot Magenta
        success: '#00ff66',
        danger: '#ff0055',
        warning: '#fee715',
        glassBg: 'rgba(10, 10, 18, 0.78)',
        glassBorder: 'rgba(255, 0, 127, 0.35)'
      },
      syntax: {
        keyword: '#ff007f',
        string: '#00ff66',
        constant: '#fee715',
        comment: '#00f2fe88',
        entity: '#00f2fe',
        variable: '#e0f7fa',
        tag: '#ff0055',
        operator: '#fee715'
      },
      previewChips: ['#fee715', '#ff007f', '#00f2fe', '#0a0a12']
    },
    {
      id: 'sakura-blossom',
      name: 'Sakura Blossom',
      badge: 'Anime Dream',
      description: 'Soft cherry blossom pink petals, romantic rose gold, and warm dusk.',
      colors: {
        bg: '#1c1520',
        canvasSubtle: '#261b2c',
        canvasInset: '#140f17',
        border: '#4a2f52',
        borderMuted: '#5d3c67',
        fg: '#fce4ec',
        fgMuted: '#f48fb1',
        accent: '#ff80ab', // Cherry Pink
        accentEmphasis: '#f06292',
        success: '#81c784',
        danger: '#e57373',
        warning: '#ffd54f',
        glassBg: 'rgba(28, 21, 32, 0.72)',
        glassBorder: 'rgba(255, 128, 171, 0.25)'
      },
      syntax: {
        keyword: '#ff80ab',
        string: '#81c784',
        constant: '#ffd54f',
        comment: '#a1887f',
        entity: '#ba68c8',
        variable: '#fce4ec',
        tag: '#f06292',
        operator: '#4dd0e1'
      },
      previewChips: ['#ff80ab', '#f48fb1', '#f06292', '#1c1520']
    },
    {
      id: 'midnight-oled',
      name: 'Midnight OLED',
      badge: 'True Black',
      description: 'Pitch black #000000 for battery saving and maximum OLED contrast.',
      colors: {
        bg: '#000000',
        canvasSubtle: '#080808',
        canvasInset: '#030303',
        border: '#222222',
        borderMuted: '#333333',
        fg: '#ffffff',
        fgMuted: '#8b949e',
        accent: '#58a6ff',
        accentEmphasis: '#1f6feb',
        success: '#3fb950',
        danger: '#f85149',
        warning: '#d29922',
        glassBg: 'rgba(0, 0, 0, 0.85)',
        glassBorder: 'rgba(255, 255, 255, 0.12)'
      },
      syntax: {
        keyword: '#58a6ff',
        string: '#7ee787',
        constant: '#ffab70',
        comment: '#8b949e',
        entity: '#d2a8ff',
        variable: '#f0f6fc',
        tag: '#7ee787',
        operator: '#79c0ff'
      },
      previewChips: ['#ffffff', '#58a6ff', '#222222', '#000000']
    },
    {
      id: 'dracula-pro',
      name: 'Dracula Pro',
      badge: 'Gothic Neon',
      description: 'Iconic dark palette with glowing purple, pink, cyan, and lime accents.',
      colors: {
        bg: '#282a36',
        canvasSubtle: '#21222c',
        canvasInset: '#191a21',
        border: '#44475a',
        borderMuted: '#6272a4',
        fg: '#f8f8f2',
        fgMuted: '#6272a4',
        accent: '#bd93f9', // Purple
        accentEmphasis: '#ff79c6', // Pink
        success: '#50fa7b', // Green
        danger: '#ff5555',
        warning: '#f1fa8c',
        glassBg: 'rgba(40, 42, 54, 0.75)',
        glassBorder: 'rgba(189, 147, 249, 0.25)'
      },
      syntax: {
        keyword: '#ff79c6',
        string: '#f1fa8c',
        constant: '#bd93f9',
        comment: '#6272a4',
        entity: '#50fa7b',
        variable: '#f8f8f2',
        tag: '#ff79c6',
        operator: '#ff79c6'
      },
      previewChips: ['#bd93f9', '#ff79c6', '#50fa7b', '#282a36']
    },
    {
      id: 'nordic-frost',
      name: 'Nordic Frost',
      badge: 'Arctic Cool',
      description: 'Elegant arctic blue and polar night gray inspired by Nordic ice.',
      colors: {
        bg: '#2e3440',
        canvasSubtle: '#242933',
        canvasInset: '#1e222a',
        border: '#3b4252',
        borderMuted: '#4c566a',
        fg: '#eceff4',
        fgMuted: '#d8dee9',
        accent: '#88c0d0', // Frost Blue
        accentEmphasis: '#81a1c1',
        success: '#a3be8c',
        danger: '#bf616a',
        warning: '#ebcb8b',
        glassBg: 'rgba(46, 52, 64, 0.76)',
        glassBorder: 'rgba(136, 192, 208, 0.22)'
      },
      syntax: {
        keyword: '#81a1c1',
        string: '#a3be8c',
        constant: '#d08770',
        comment: '#616e88',
        entity: '#88c0d0',
        variable: '#eceff4',
        tag: '#bf616a',
        operator: '#81a1c1'
      },
      previewChips: ['#88c0d0', '#81a1c1', '#a3be8c', '#2e3440']
    },
    {
      id: 'matrix-terminal',
      name: 'Matrix Terminal',
      badge: 'Hacker Green',
      description: 'Phosphor green glow dripping over an ominous terminal void.',
      colors: {
        bg: '#050d08',
        canvasSubtle: '#09160d',
        canvasInset: '#020603',
        border: '#00ff6633',
        borderMuted: '#00ff661f',
        fg: '#99ffb2',
        fgMuted: '#4dd270',
        accent: '#00ff66',
        accentEmphasis: '#00c851',
        success: '#00ff66',
        danger: '#ff4444',
        warning: '#ffbb33',
        glassBg: 'rgba(5, 13, 8, 0.82)',
        glassBorder: 'rgba(0, 255, 102, 0.28)'
      },
      syntax: {
        keyword: '#00ff66',
        string: '#39d353',
        constant: '#7ee787',
        comment: '#196c2e',
        entity: '#00ffcc',
        variable: '#99ffb2',
        tag: '#00c851',
        operator: '#00ff66'
      },
      previewChips: ['#00ff66', '#00c851', '#4dd270', '#050d08']
    },
    {
      id: 'synthwave-84',
      name: 'Synthwave \'84',
      badge: 'Outrun Retro',
      description: 'Sunset chrome gradients, hot neon magenta, and 80s arcade vibes.',
      colors: {
        bg: '#262335',
        canvasSubtle: '#1d1a27',
        canvasInset: '#15131c',
        border: '#494361',
        borderMuted: '#615981',
        fg: '#fede5d',
        fgMuted: '#ff7edb',
        accent: '#ff7edb', // Neon Pink
        accentEmphasis: '#fe4450', // Neon Red/Orange
        success: '#72f1b8',
        danger: '#fe4450',
        warning: '#fede5d',
        glassBg: 'rgba(38, 35, 53, 0.76)',
        glassBorder: 'rgba(255, 126, 219, 0.28)'
      },
      syntax: {
        keyword: '#ff7edb',
        string: '#72f1b8',
        constant: '#fede5d',
        comment: '#848bbd',
        entity: '#36f9f6',
        variable: '#fe4450',
        tag: '#fe4450',
        operator: '#f92aad'
      },
      previewChips: ['#ff7edb', '#fe4450', '#fede5d', '#262335']
    },
    {
      id: 'vintage-sepia',
      name: 'Vintage Sepia',
      badge: 'Warm Parchment',
      description: 'Warm antique book tones for reduced eye fatigue during long code reads.',
      colors: {
        bg: '#1f1d19',
        canvasSubtle: '#2a2722',
        canvasInset: '#161411',
        border: '#453f36',
        borderMuted: '#5e564a',
        fg: '#ebdbb2',
        fgMuted: '#d5c4a1',
        accent: '#d79921', // Warm Gold
        accentEmphasis: '#b57614',
        success: '#b8bb26',
        danger: '#fb4934',
        warning: '#fabd2f',
        glassBg: 'rgba(31, 29, 25, 0.8)',
        glassBorder: 'rgba(215, 153, 33, 0.24)'
      },
      syntax: {
        keyword: '#d79921',
        string: '#b8bb26',
        constant: '#fabd2f',
        comment: '#928374',
        entity: '#b16286',
        variable: '#ebdbb2',
        tag: '#fb4934',
        operator: '#8ec07c'
      },
      previewChips: ['#d79921', '#ebdbb2', '#b8bb26', '#1f1d19']
    },
    {
      id: 'monokai-pro',
      name: 'Monokai Pro',
      badge: 'Iconic Code',
      description: 'Carefully tuned vibrancy with rose, amber, mint, and sky on charcoal.',
      colors: {
        bg: '#2d2a2e',
        canvasSubtle: '#221f22',
        canvasInset: '#19181a',
        border: '#403e41',
        borderMuted: '#5b595c',
        fg: '#fcfcfa',
        fgMuted: '#939293',
        accent: '#ffd866', // Amber
        accentEmphasis: '#ff6188', // Rose
        success: '#a9dc76',
        danger: '#fc9867',
        warning: '#ffd866',
        glassBg: 'rgba(45, 42, 46, 0.76)',
        glassBorder: 'rgba(255, 216, 102, 0.2)'
      },
      syntax: {
        keyword: '#ff6188',
        string: '#ffd866',
        constant: '#ab9df2',
        comment: '#727072',
        entity: '#a9dc76',
        variable: '#fcfcfa',
        tag: '#ff6188',
        operator: '#78dce8'
      },
      previewChips: ['#ffd866', '#ff6188', '#a9dc76', '#2d2a2e']
    },
    {
      id: 'abyss-blue',
      name: 'Abyss Deep Blue',
      badge: 'Deep Ocean',
      description: 'Calming oceanic depths with bioluminescent aquamarine highlights.',
      colors: {
        bg: '#0b1622',
        canvasSubtle: '#0f1f30',
        canvasInset: '#060c13',
        border: '#1a334d',
        borderMuted: '#244566',
        fg: '#d8ecf8',
        fgMuted: '#79b8ff',
        accent: '#00d2ff', // Aqua Cyan
        accentEmphasis: '#0099ff',
        success: '#34d399',
        danger: '#f43f5e',
        warning: '#fbbf24',
        glassBg: 'rgba(11, 22, 34, 0.78)',
        glassBorder: 'rgba(0, 210, 255, 0.25)'
      },
      syntax: {
        keyword: '#00d2ff',
        string: '#34d399',
        constant: '#fbbf24',
        comment: '#386b99',
        entity: '#38bdf8',
        variable: '#d8ecf8',
        tag: '#f43f5e',
        operator: '#00d2ff'
      },
      previewChips: ['#00d2ff', '#0099ff', '#79b8ff', '#0b1622']
    }
  ];

  function getWallpaperAssetUrl(filename) {
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.getURL === 'function') {
        return chrome.runtime.getURL(`assets/wallpapers/${filename}`);
      }
    } catch (e) {
      // Gracefully fall back if extension context was invalidated
    }
    return `../assets/wallpapers/${filename}`;
  }

  const WALLPAPERS = [
    {
      id: 'anime-sunset-lofi',
      name: 'Anime Sunset Lofi',
      category: 'Anime',
      url: getWallpaperAssetUrl('anime-sunset-lofi.svg'),
      thumbnail: getWallpaperAssetUrl('anime-sunset-lofi.svg'),
      description: 'Warm evening glow over painted anime horizon.'
    },
    {
      id: 'cyberpunk-neo-tokyo',
      name: 'Neo Tokyo Alley',
      category: 'Cyberpunk',
      url: getWallpaperAssetUrl('cyberpunk-neo-tokyo.svg'),
      thumbnail: getWallpaperAssetUrl('cyberpunk-neo-tokyo.svg'),
      description: 'Neon soaked rain reflections and cyberpunk towers.'
    },
    {
      id: 'sakura-temple-night',
      name: 'Sakura Night Shrine',
      category: 'Anime',
      url: getWallpaperAssetUrl('sakura-temple-night.svg'),
      thumbnail: getWallpaperAssetUrl('sakura-temple-night.svg'),
      description: 'Cherry blossom petals floating under moonlight.'
    },
    {
      id: 'lofi-cozy-room',
      name: 'Cozy Lofi Study',
      category: 'Lofi',
      url: getWallpaperAssetUrl('lofi-cozy-room.svg'),
      thumbnail: getWallpaperAssetUrl('lofi-cozy-room.svg'),
      description: 'Warm desk lamp, rain outside, and relaxing vibes.'
    },
    {
      id: 'shinkai-starry-sky',
      name: 'Makoto Starry Sky',
      category: 'Anime',
      url: getWallpaperAssetUrl('shinkai-starry-sky.svg'),
      thumbnail: getWallpaperAssetUrl('shinkai-starry-sky.svg'),
      description: 'Breathtaking anime cosmic nebula and shooting stars.'
    },
    {
      id: 'rainy-city-window',
      name: 'Rainy City Glass',
      category: 'Aesthetic',
      url: getWallpaperAssetUrl('rainy-city-window.svg'),
      thumbnail: getWallpaperAssetUrl('rainy-city-window.svg'),
      description: 'Melancholic raindrops running down high rise window.'
    },
    {
      id: 'minimal-deep-space',
      name: 'Minimal Deep Space',
      category: 'Dark',
      url: getWallpaperAssetUrl('minimal-deep-space.svg'),
      thumbnail: getWallpaperAssetUrl('minimal-deep-space.svg'),
      description: 'Earth orbit glowing with digital network nodes.'
    },
    {
      id: 'retro-synth-grid',
      name: 'Outrun Synth Grid',
      category: 'Cyberpunk',
      url: getWallpaperAssetUrl('retro-synth-grid.svg'),
      thumbnail: getWallpaperAssetUrl('retro-synth-grid.svg'),
      description: 'Retro wireframe 80s landscape with wireframe grid.'
    },
    {
      id: 'nordic-aurora-borealis',
      name: 'Nordic Aurora Fjord',
      category: 'Nature',
      url: getWallpaperAssetUrl('nordic-aurora-borealis.svg'),
      thumbnail: getWallpaperAssetUrl('nordic-aurora-borealis.svg'),
      description: 'Emerald and cyan polar night aurora dancing over arctic waters.'
    },
    {
      id: 'ghibli-forest-sanctuary',
      name: 'Ghibli Forest Canopy',
      category: 'Anime',
      url: getWallpaperAssetUrl('ghibli-forest-sanctuary.svg'),
      thumbnail: getWallpaperAssetUrl('ghibli-forest-sanctuary.svg'),
      description: 'Volumetric sunbeams piercing through lush mossy ancient woodland.'
    },
    {
      id: 'cyberpunk-rain-skyline',
      name: 'Neo Kowloon Night',
      category: 'Cyberpunk',
      url: getWallpaperAssetUrl('cyberpunk-rain-skyline.svg'),
      thumbnail: getWallpaperAssetUrl('cyberpunk-rain-skyline.svg'),
      description: 'Futuristic megastructures, maglev monorail, and rain-slicked neon.'
    },
    {
      id: 'dark-topographic-grid',
      name: 'Topographic Contours',
      category: 'Minimal',
      url: getWallpaperAssetUrl('dark-topographic-grid.svg'),
      thumbnail: getWallpaperAssetUrl('dark-topographic-grid.svg'),
      description: 'Matte dark charcoal elevation lines with electric cyan peak accents.'
    },
    {
      id: 'deep-space-nebula',
      name: 'Orion Stellar Nebula',
      category: 'Sci-Fi',
      url: getWallpaperAssetUrl('deep-space-nebula.svg'),
      thumbnail: getWallpaperAssetUrl('deep-space-nebula.svg'),
      description: 'Cosmic magenta and cyan swirling gas clouds with binary stars.'
    },
    {
      id: 'zen-mountain-dusk',
      name: 'Zen Fuji Sunset',
      category: 'Aesthetic',
      url: getWallpaperAssetUrl('zen-mountain-dusk.svg'),
      thumbnail: getWallpaperAssetUrl('zen-mountain-dusk.svg'),
      description: 'Mount Fuji silhouette, sunset dusk gradient, and falling sakura petals.'
    }
  ];

  const CONTRIBUTION_PALETTES = [
    {
      id: 'classic-green',
      name: 'GitHub Classic Green',
      levels: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
    },
    {
      id: 'sakura-pink',
      name: 'Sakura Petals',
      levels: ['#231728', '#5b264f', '#9b3378', '#d64d99', '#ff80ab']
    },
    {
      id: 'cyberpunk-neon',
      name: 'Cyberpunk Neon',
      levels: ['#140f26', '#4a154b', '#9b00e8', '#ff007f', '#fee715']
    },
    {
      id: 'solar-fire',
      name: 'Solar Flare',
      levels: ['#1f140e', '#59200c', '#a13b0c', '#e66000', '#ffd000']
    },
    {
      id: 'electric-ice',
      name: 'Electric Glacier',
      levels: ['#0d1b2a', '#1b4965', '#2a9d8f', '#48cae4', '#90e0ef']
    },
    {
      id: 'royal-amethyst',
      name: 'Royal Amethyst',
      levels: ['#151026', '#321c59', '#5c2b99', '#8e44ad', '#cba6f7']
    },
    {
      id: 'matrix-phosphor',
      name: 'Matrix Phosphor',
      levels: ['#051508', '#0b3d16', '#126625', '#1dd64b', '#00ff66']
    },
    {
      id: 'crimson-blood',
      name: 'Crimson Blood',
      levels: ['#200b0e', '#4d1219', '#8a1c26', '#c92a2a', '#ff4d4d']
    }
  ];

  const FONTS = [
    { id: 'default', name: 'Default GitHub Font', css: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace' },
    { id: 'jetbrains', name: 'JetBrains Mono', css: '"JetBrains Mono", monospace' },
    { id: 'fira-code', name: 'Fira Code', css: '"Fira Code", monospace' },
    { id: 'cascadia', name: 'Cascadia Code', css: '"Cascadia Code", monospace' },
    { id: 'source-code', name: 'Source Code Pro', css: '"Source Code Pro", monospace' },
    { id: 'space-mono', name: 'Space Mono', css: '"Space Mono", monospace' },
    { id: 'roboto-mono', name: 'Roboto Mono', css: '"Roboto Mono", monospace' }
  ];

  const DEFAULT_SETTINGS = {
    enabled: true,
    focusMode: false, // Shortcut (Alt+Shift+F) toggles focusMode: true for clean distraction-free view
    themeId: 'catppuccin-mocha',
    wallpaperEnabled: true,
    wallpaperId: 'anime-sunset-lofi',
    customWallpaperUrl: '',
    uploadedWallpaperData: '', // base64
    blur: 6, // px
    glassOpacity: 76, // %
    brightness: 85, // %
    contrast: 105, // %
    contributionPaletteId: 'sakura-pink',
    customContributionLevels: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    fontId: 'jetbrains',
    confettiEnabled: true
  };

  // Export to global / window for content scripts and popup
  const ThemeStudio = {
    THEMES,
    WALLPAPERS,
    CONTRIBUTION_PALETTES,
    FONTS,
    DEFAULT_SETTINGS
  };

  if (typeof window !== 'undefined') {
    window.ThemeStudio = ThemeStudio;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeStudio;
  }
})();
