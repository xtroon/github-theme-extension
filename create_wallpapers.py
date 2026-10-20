"""
Generate 8 high-aesthetic anime & cyberpunk SVG wallpapers.
Bundled locally into the extension so they NEVER violate GitHub's CSP and load instantly.
"""
import os

wallpapers = {}

# 1. Sakura Night Shrine (Torii gate, full glowing moon, Mt Fuji silhouette, cherry blossoms, fireflies)
wallpapers['sakura-temple-night.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0515"/>
      <stop offset="45%" stop-color="#1e1030"/>
      <stop offset="80%" stop-color="#3c1a4d"/>
      <stop offset="100%" stop-color="#64245e"/>
    </linearGradient>
    <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff5ea" stop-opacity="1"/>
      <stop offset="35%" stop-color="#ffd5b8" stop-opacity="0.9"/>
      <stop offset="65%" stop-color="#ff99bb" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#3c1a4d" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fujiMist" cx="50%" cy="100%" r="70%">
      <stop offset="0%" stop-color="#ff79c6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#1e1030" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Sky -->
  <rect width="1920" height="1080" fill="url(#skyGrad)"/>

  <!-- Stars -->
  <g fill="#ffffff" opacity="0.8">
    <circle cx="150" cy="80" r="1.5"/><circle cx="280" cy="140" r="1.2"/><circle cx="390" cy="95" r="2"/>
    <circle cx="520" cy="160" r="1"/><circle cx="710" cy="85" r="1.8"/><circle cx="890" cy="190" r="1.3"/>
    <circle cx="1080" cy="110" r="2.2"/><circle cx="1250" cy="70" r="1.4"/><circle cx="1420" cy="160" r="1.7"/>
    <circle cx="1590" cy="90" r="1.2"/><circle cx="1780" cy="130" r="2"/><circle cx="1850" cy="220" r="1.5"/>
    <circle cx="210" cy="310" r="1.6"/><circle cx="480" cy="280" r="1.2"/><circle cx="830" cy="340" r="1.8"/>
    <circle cx="1320" cy="310" r="1.5"/><circle cx="1680" cy="340" r="1.3"/><circle cx="1820" cy="410" r="1.6"/>
  </g>

  <!-- Giant Glowing Moon -->
  <circle cx="1380" cy="340" r="240" fill="url(#moonGlow)"/>
  <circle cx="1380" cy="340" r="130" fill="#fff7ed"/>

  <!-- Distant Mt Fuji Silhouette -->
  <polygon points="550,780 960,380 1060,380 1480,780" fill="#140b20" opacity="0.95"/>
  <polygon points="910,430 960,380 1060,380 1110,430 1070,470 1040,450 1010,480 980,450 950,470" fill="#f8e8f8" opacity="0.3"/>

  <!-- Mountain Mist -->
  <rect x="0" y="550" width="1920" height="400" fill="url(#fujiMist)"/>

  <!-- Midground Hills -->
  <path d="M0,860 Q400,740 900,820 T1920,800 L1920,1080 L0,1080 Z" fill="#0f0717"/>

  <!-- Foreground Hill & Torii Gate -->
  <path d="M0,940 Q500,880 1100,950 T1920,930 L1920,1080 L0,1080 Z" fill="#08030d"/>

  <!-- Torii Gate Silhouette on hill -->
  <g fill="#08030d" stroke="#ff79c6" stroke-width="1.5" opacity="0.95">
    <path d="M420,720 Q560,705 700,720 L690,735 Q560,722 430,735 Z"/>
    <rect x="445" y="748" width="230" height="12"/>
    <rect x="480" y="725" width="20" height="230"/>
    <rect x="620" y="725" width="20" height="230"/>
    <rect x="550" y="725" width="20" height="35"/>
  </g>

  <!-- Sakura Branches Silhouette (Top Right & Left) -->
  <g fill="#08030d">
    <path d="M1920,0 Q1700,80 1550,40 T1350,180 Q1450,160 1600,120 T1920,80 Z"/>
    <path d="M1650,90 Q1520,160 1420,280 Q1460,250 1580,180 Z"/>
    <path d="M0,0 Q250,90 400,60 T650,220 Q530,180 380,130 T0,90 Z"/>
  </g>

  <!-- Glowing Pink Cherry Blossom Petals & Fireflies -->
  <g fill="#ff80ab" filter="url(#glow)" opacity="0.85">
    <ellipse cx="1480" cy="180" rx="9" ry="5" transform="rotate(25 1480 180)"/>
    <ellipse cx="1390" cy="240" rx="8" ry="4" transform="rotate(-35 1390 240)"/>
    <ellipse cx="1520" cy="290" rx="10" ry="5" transform="rotate(50 1520 290)"/>
    <ellipse cx="1320" cy="350" rx="9" ry="4" transform="rotate(15 1320 350)"/>
    <ellipse cx="1240" cy="420" rx="11" ry="6" transform="rotate(-40 1240 420)"/>
    <ellipse cx="1150" cy="510" rx="8" ry="4" transform="rotate(30 1150 510)"/>
    <ellipse cx="980" cy="620" rx="10" ry="5" transform="rotate(-20 980 620)"/>
    <ellipse cx="820" cy="710" rx="9" ry="4" transform="rotate(45 820 710)"/>
    <ellipse cx="640" cy="780" rx="8" ry="5" transform="rotate(-15 640 780)"/>
    <ellipse cx="510" cy="840" rx="11" ry="5" transform="rotate(35 510 840)"/>
    <!-- Firefly orbs -->
    <circle cx="580" cy="800" r="3" fill="#ffe066"/>
    <circle cx="750" cy="760" r="2.5" fill="#ffe066"/>
    <circle cx="890" cy="820" r="3.5" fill="#ffe066"/>
    <circle cx="1040" cy="790" r="2.5" fill="#ffe066"/>
  </g>
</svg>'''

# 2. Anime Sunset Lofi Sky (Golden sun, Makoto Shinkai clouds, powerlines, flying birds)
wallpapers['anime-sunset-lofi.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1a103c"/>
      <stop offset="30%" stop-color="#46185c"/>
      <stop offset="55%" stop-color="#932b6c"/>
      <stop offset="75%" stop-color="#d9534f"/>
      <stop offset="90%" stop-color="#f39c12"/>
      <stop offset="100%" stop-color="#f1c40f"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff9d6" stop-opacity="1"/>
      <stop offset="30%" stop-color="#f39c12" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#e74c3c" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#1a103c" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#sunsetGrad)"/>

  <!-- Sun -->
  <circle cx="640" cy="620" r="260" fill="url(#sunGlow)"/>
  <circle cx="640" cy="620" r="90" fill="#fffdf2"/>

  <!-- Makoto Shinkai Cumulus Clouds -->
  <path d="M-50,680 Q100,560 300,600 Q450,480 650,530 Q850,430 1100,520 Q1300,470 1550,560 Q1750,510 1980,620 L1980,1080 L-50,1080 Z" fill="#36123d" opacity="0.85"/>
  <path d="M-50,750 Q200,650 500,700 Q800,600 1150,690 Q1500,620 1980,720 L1980,1080 L-50,1080 Z" fill="#200a26" opacity="0.95"/>

  <!-- Distant City Skyline Silhouette -->
  <g fill="#110515">
    <rect x="200" y="780" width="45" height="180"/>
    <rect x="260" y="740" width="60" height="220"/>
    <rect x="335" y="800" width="40" height="160"/>
    <rect x="420" y="720" width="80" height="240"/>
    <rect x="520" y="760" width="55" height="200"/>
    <rect x="680" y="710" width="90" height="250"/>
    <polygon points="725,640 720,710 730,710"/>
    <rect x="790" y="770" width="50" height="190"/>
    <rect x="860" y="730" width="70" height="230"/>
    <rect x="950" y="790" width="45" height="170"/>
    <rect x="1020" y="750" width="85" height="210"/>
    <rect x="1130" y="720" width="60" height="240"/>
    <rect x="1220" y="770" width="75" height="190"/>
  </g>

  <!-- Powerlines / Utility Poles (Classic Anime Aesthetic) -->
  <g stroke="#09020d" stroke-width="6" fill="none">
    <line x1="1450" y1="380" x2="1450" y2="1080"/>
    <line x1="1350" y1="440" x2="1550" y2="440" stroke-width="8"/>
    <line x1="1370" y1="490" x2="1530" y2="490" stroke-width="7"/>
    <line x1="1390" y1="540" x2="1510" y2="540" stroke-width="6"/>

    <line x1="1750" y1="520" x2="1750" y2="1080" stroke-width="5"/>
    <line x1="1680" y1="560" x2="1820" y2="560" stroke-width="6"/>
  </g>

  <!-- Power Cables Curving Across the Sky -->
  <g stroke="#09020d" stroke-width="2" fill="none" opacity="0.9">
    <path d="M0,320 Q700,520 1450,440"/>
    <path d="M0,350 Q700,560 1450,490"/>
    <path d="M0,390 Q700,600 1450,540"/>
    <path d="M1450,440 Q1600,540 1750,560"/>
    <path d="M1450,490 Q1600,580 1750,590"/>
    <path d="M1750,560 Q1850,610 1920,620"/>
  </g>

  <!-- Birds Flying into Sunset -->
  <g fill="#1a103c" stroke="#1a103c" stroke-width="2">
    <path d="M850,380 Q860,370 870,380 Q880,370 890,380" fill="none"/>
    <path d="M890,350 Q898,342 906,350 Q914,342 922,350" fill="none"/>
    <path d="M940,375 Q947,368 954,375 Q961,368 968,375" fill="none"/>
    <path d="M830,410 Q837,404 844,410 Q851,404 858,410" fill="none"/>
  </g>
</svg>'''

# 3. Neo Tokyo Cyberpunk Rain Alley
wallpapers['cyberpunk-neo-tokyo.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <linearGradient id="cbSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#05030a"/>
      <stop offset="50%" stop-color="#0d081f"/>
      <stop offset="100%" stop-color="#1f0a2e"/>
    </linearGradient>
    <linearGradient id="neonCyan" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="100%" stop-color="#4facfe"/>
    </linearGradient>
    <linearGradient id="neonPink" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ff007f"/>
      <stop offset="100%" stop-color="#7928ca"/>
    </linearGradient>
    <filter id="neonGlowPink">
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="neonGlowCyan">
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="1920" height="1080" fill="url(#cbSky)"/>

  <!-- Distant Cyberpunk Megastructures -->
  <g fill="#080512">
    <polygon points="120,200 220,150 320,200 320,1080 120,1080"/>
    <rect x="350" y="320" width="140" height="760"/>
    <polygon points="520,240 600,180 680,240 680,1080 520,1080"/>
    <rect x="1200" y="280" width="180" height="800"/>
    <polygon points="1440,160 1520,100 1600,160 1600,1080 1440,1080"/>
    <rect x="1640" y="220" width="200" height="860"/>
  </g>

  <!-- High-Rise Window Matrix Glow -->
  <g fill="#00f2fe" opacity="0.35">
    <rect x="150" y="240" width="4" height="6"/><rect x="165" y="240" width="4" height="6"/><rect x="180" y="240" width="4" height="6"/>
    <rect x="150" y="280" width="4" height="6"/><rect x="195" y="280" width="4" height="6"/><rect x="220" y="280" width="4" height="6"/>
    <rect x="1480" y="220" width="6" height="8"/><rect x="1510" y="220" width="6" height="8"/><rect x="1540" y="220" width="6" height="8"/>
    <rect x="1480" y="250" width="6" height="8"/><rect x="1530" y="250" width="6" height="8"/>
  </g>

  <!-- Foreground Cyber Alley Buildings with Perspective -->
  <polygon points="0,0 450,150 450,1080 0,1080" fill="#0b0817"/>
  <polygon points="1920,0 1470,150 1470,1080 1920,1080" fill="#080612"/>

  <!-- Neon Signs on Left Building -->
  <g filter="url(#neonGlowPink)">
    <rect x="380" y="220" width="35" height="160" rx="6" fill="none" stroke="#ff007f" stroke-width="4"/>
    <text x="397" y="260" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="24" fill="#ff007f" text-anchor="middle">電</text>
    <text x="397" y="300" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="24" fill="#ff007f" text-anchor="middle">脳</text>
    <text x="397" y="340" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="24" fill="#ff007f" text-anchor="middle">街</text>
  </g>

  <!-- Neon Billboard on Right Building -->
  <g filter="url(#neonGlowCyan)">
    <rect x="1510" y="280" width="160" height="70" rx="8" fill="rgba(0, 242, 254, 0.1)" stroke="#00f2fe" stroke-width="4"/>
    <text x="1590" y="325" font-family="'Segoe UI', sans-serif" font-weight="800" font-size="20" fill="#00f2fe" text-anchor="middle" letter-spacing="3">NEO TOKYO</text>
  </g>

  <!-- Yellow Hologram Warning -->
  <g>
    <rect x="400" y="440" width="120" height="25" fill="#fee715" rx="3" opacity="0.9"/>
    <text x="460" y="458" font-family="sans-serif" font-weight="900" font-size="12" fill="#000" text-anchor="middle">CYBER//DEV</text>
  </g>

  <!-- Wet Street Reflection Floor -->
  <polygon points="0,920 1920,920 1920,1080 0,1080" fill="#040208"/>
  <ellipse cx="400" cy="980" rx="140" ry="20" fill="#ff007f" opacity="0.25" filter="url(#neonGlowPink)"/>
  <ellipse cx="1580" cy="990" rx="160" ry="22" fill="#00f2fe" opacity="0.25" filter="url(#neonGlowCyan)"/>
  <ellipse cx="960" cy="1010" rx="280" ry="25" fill="#7928ca" opacity="0.2"/>

  <!-- Rain Streaks Angle -->
  <g stroke="#ffffff" stroke-width="1.2" opacity="0.25">
    <line x1="200" y1="100" x2="160" y2="220"/>
    <line x1="550" y1="150" x2="510" y2="280"/>
    <line x1="850" y1="80" x2="810" y2="210"/>
    <line x1="1200" y1="140" x2="1160" y2="270"/>
    <line x1="1600" y1="110" x2="1560" y2="240"/>
    <line x1="340" y1="400" x2="300" y2="540"/>
    <line x1="720" y1="460" x2="680" y2="600"/>
    <line x1="1050" y1="380" x2="1010" y2="520"/>
    <line x1="1420" y1="420" x2="1380" y2="560"/>
    <line x1="1780" y1="450" x2="1740" y2="590"/>
    <line x1="500" y1="700" x2="460" y2="840"/>
    <line x1="900" y1="720" x2="860" y2="860"/>
    <line x1="1300" y1="710" x2="1260" y2="850"/>
  </g>
</svg>'''

# 4. Cozy Lofi Study Room
wallpapers['lofi-cozy-room.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <linearGradient id="roomBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141124"/>
      <stop offset="100%" stop-color="#241935"/>
    </linearGradient>
    <linearGradient id="outsideNight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#080816"/>
      <stop offset="100%" stop-color="#1b1c3a"/>
    </linearGradient>
    <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffe699" stop-opacity="1"/>
      <stop offset="40%" stop-color="#f39c12" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#241935" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#roomBg)"/>

  <!-- Big Cozy Window (Center-Right) -->
  <rect x="780" y="140" width="760" height="540" rx="14" fill="url(#outsideNight)" stroke="#392b4d" stroke-width="12"/>

  <!-- Stars & Moon in Window -->
  <circle cx="1380" cy="240" r="45" fill="#fff9d6" opacity="0.95"/>
  <circle cx="1400" cy="230" r="40" fill="#0e0f24"/> <!-- Crescent shadow -->

  <!-- Stars outside -->
  <g fill="#ffffff" opacity="0.75">
    <circle cx="850" cy="220" r="1.5"/><circle cx="940" cy="180" r="2"/><circle cx="1020" cy="280" r="1.2"/>
    <circle cx="1120" cy="210" r="1.8"/><circle cx="1230" cy="190" r="1.4"/><circle cx="1300" cy="320" r="2"/>
    <circle cx="890" cy="360" r="1.5"/><circle cx="1180" cy="380" r="1.2"/><circle cx="1450" cy="360" r="1.6"/>
  </g>

  <!-- Window Frame Panes -->
  <line x1="1160" y1="140" x2="1160" y2="680" stroke="#392b4d" stroke-width="8"/>
  <line x1="780" y1="410" x2="1540" y2="410" stroke="#392b4d" stroke-width="8"/>

  <!-- Fairy Lights Draped Over Window -->
  <path d="M780,170 Q950,220 1160,180 Q1350,230 1540,170" fill="none" stroke="#5d4375" stroke-width="2"/>
  <g fill="#ffe066">
    <circle cx="840" cy="185" r="5"/><circle cx="910" cy="198" r="5"/><circle cx="990" cy="202" r="5"/>
    <circle cx="1080" cy="192" r="5"/><circle cx="1220" cy="195" r="5"/><circle cx="1310" cy="205" r="5"/>
    <circle cx="1410" cy="198" r="5"/><circle cx="1490" cy="182" r="5"/>
  </g>

  <!-- Bookshelf on Left -->
  <rect x="180" y="200" width="380" height="520" rx="8" fill="#1b152b" stroke="#362547" stroke-width="8"/>
  <line x1="180" y1="360" x2="560" y2="360" stroke="#362547" stroke-width="8"/>
  <line x1="180" y1="520" x2="560" y2="520" stroke="#362547" stroke-width="8"/>

  <!-- Books on shelves -->
  <rect x="220" y="260" width="22" height="96" fill="#cba6f7"/>
  <rect x="246" y="240" width="28" height="116" fill="#89b4fa"/>
  <rect x="278" y="270" width="18" height="86" fill="#f38ba8"/>
  <rect x="300" y="250" width="24" height="106" fill="#a6e3a1"/>
  <!-- Potted succulent -->
  <path d="M450,330 L480,330 L475,356 L455,356 Z" fill="#fab387"/>
  <ellipse cx="465" cy="320" rx="16" ry="12" fill="#a6e3a1"/>

  <!-- Cozy Wooden Desk -->
  <rect x="620" y="740" width="1120" height="26" rx="4" fill="#422942"/>
  <rect x="680" y="766" width="30" height="314" fill="#2b1a2b"/>
  <rect x="1660" y="766" width="30" height="314" fill="#2b1a2b"/>

  <!-- Desk Lamp & Warm Glow -->
  <circle cx="750" cy="620" r="180" fill="url(#lampGlow)" opacity="0.6"/>
  <path d="M720,740 L760,740 L745,660 L735,660 Z" fill="#d29922"/>
  <polygon points="710,660 770,660 790,620 690,620" fill="#f1c40f"/>

  <!-- Sleeping Cat Silhouette on Desk -->
  <ellipse cx="940" cy="728" rx="35" ry="16" fill="#181124"/>
  <circle cx="915" cy="722" r="14" fill="#181124"/>
  <polygon points="906,712 914,700 918,712" fill="#181124"/>
  <polygon points="918,712 926,702 928,714" fill="#181124"/>
  <!-- Warm coffee mug with steam -->
  <rect x="1100" y="700" width="26" height="38" rx="4" fill="#cdd6f4"/>
  <path d="M1108,685 Q1112,670 1108,655" stroke="#f5c2e7" stroke-width="2" fill="none" opacity="0.6"/>
</svg>'''

# 5. Makoto Shinkai Starry Sky & Twin Comets
wallpapers['shinkai-starry-sky.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <linearGradient id="shinkaiSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#02010a"/>
      <stop offset="40%" stop-color="#0a1233"/>
      <stop offset="70%" stop-color="#142852"/>
      <stop offset="90%" stop-color="#1b4d6e"/>
      <stop offset="100%" stop-color="#2d7f8a"/>
    </linearGradient>
    <radialGradient id="nebulaCyan" cx="40%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#7928ca" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#02010a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="nebulaPink" cx="70%" cy="40%" r="45%">
      <stop offset="0%" stop-color="#ff007f" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="#4facfe" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#02010a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cometTail" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#7dcfff"/>
      <stop offset="70%" stop-color="#bb9af7" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0a1233" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#shinkaiSky)"/>
  <rect width="1920" height="1080" fill="url(#nebulaCyan)"/>
  <rect width="1920" height="1080" fill="url(#nebulaPink)"/>

  <!-- Dense Milky Way Stars -->
  <g fill="#ffffff">
    <circle cx="120" cy="80" r="1.5"/><circle cx="210" cy="140" r="2"/><circle cx="340" cy="60" r="1.2"/>
    <circle cx="480" cy="180" r="2.2"/><circle cx="610" cy="90" r="1.6"/><circle cx="720" cy="220" r="1.4"/>
    <circle cx="890" cy="130" r="2.5"/><circle cx="1040" cy="80" r="1.8"/><circle cx="1180" cy="190" r="2"/>
    <circle cx="1320" cy="110" r="1.5"/><circle cx="1490" cy="240" r="2.3"/><circle cx="1650" cy="90" r="1.7"/>
    <circle cx="1780" cy="170" r="2"/><circle cx="1870" cy="130" r="1.4"/><circle cx="290" cy="310" r="2.4"/>
    <circle cx="560" cy="340" r="1.6"/><circle cx="830" cy="290" r="2.1"/><circle cx="1110" cy="350" r="1.5"/>
    <circle cx="1390" cy="310" r="2.2"/><circle cx="1620" cy="380" r="1.8"/><circle cx="1810" cy="330" r="1.3"/>
  </g>

  <!-- Splitting Twin Comet (Your Name / Kimi no Na wa Style) -->
  <g>
    <!-- Main Comet Stream -->
    <path d="M1650,40 Q1300,240 780,480" stroke="url(#cometTail)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M1650,40 Q1300,240 780,480" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="780" cy="480" r="6" fill="#ffffff"/>

    <!-- Split Secondary Comet -->
    <path d="M1350,210 Q1100,380 720,580" stroke="url(#cometTail)" stroke-width="4" fill="none" opacity="0.8"/>
    <circle cx="720" cy="580" r="4" fill="#7dcfff"/>
  </g>

  <!-- Rolling Mountain & Windblown Hilltop Silhouette -->
  <path d="M0,820 Q500,740 1000,810 T1920,780 L1920,1080 L0,1080 Z" fill="#0b172a"/>
  <path d="M0,910 Q450,840 950,910 T1920,880 L1920,1080 L0,1080 Z" fill="#050a14"/>
</svg>'''

# 6. Rainy City Neon Glass
wallpapers['rainy-city-window.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <linearGradient id="rainDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0e17"/>
      <stop offset="100%" stop-color="#141a29"/>
    </linearGradient>
    <filter id="bokehBlur">
      <feGaussianBlur stdDeviation="35"/>
    </filter>
  </defs>

  <rect width="1920" height="1080" fill="url(#rainDark)"/>

  <!-- Distant Blurred City Lights Bokeh -->
  <g filter="url(#bokehBlur)" opacity="0.6">
    <circle cx="280" cy="420" r="140" fill="#00f2fe"/>
    <circle cx="520" cy="580" r="180" fill="#ff007f"/>
    <circle cx="860" cy="380" r="150" fill="#fee715"/>
    <circle cx="1180" cy="520" r="190" fill="#7928ca"/>
    <circle cx="1520" cy="390" r="160" fill="#00d2ff"/>
    <circle cx="1740" cy="610" r="140" fill="#ff4450"/>
    <circle cx="700" cy="650" r="120" fill="#00ff66"/>
  </g>

  <!-- Clear Glass Highlights & Wet Drops -->
  <g fill="rgba(255, 255, 255, 0.45)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1">
    <ellipse cx="320" cy="180" rx="8" ry="14"/>
    <ellipse cx="322" cy="220" rx="4" ry="7"/>
    <ellipse cx="480" cy="290" rx="10" ry="18"/>
    <ellipse cx="640" cy="160" rx="6" ry="11"/>
    <ellipse cx="780" cy="340" rx="12" ry="22"/>
    <ellipse cx="920" cy="240" rx="9" ry="16"/>
    <ellipse cx="1140" cy="190" rx="7" ry="12"/>
    <ellipse cx="1280" cy="380" rx="11" ry="20"/>
    <ellipse cx="1460" cy="270" rx="8" ry="15"/>
    <ellipse cx="1620" cy="330" rx="10" ry="17"/>
    <ellipse cx="1780" cy="220" rx="6" ry="10"/>

    <ellipse cx="420" cy="520" rx="11" ry="19"/>
    <ellipse cx="580" cy="640" rx="9" ry="16"/>
    <ellipse cx="760" cy="580" rx="8" ry="14"/>
    <ellipse cx="1020" cy="620" rx="12" ry="21"/>
    <ellipse cx="1240" cy="540" rx="7" ry="13"/>
    <ellipse cx="1540" cy="680" rx="10" ry="18"/>
    <ellipse cx="1680" cy="590" rx="8" ry="14"/>

    <!-- Water Trickle Trails -->
    <path d="M480,308 Q482,340 480,380" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <path d="M1020,641 Q1024,680 1021,720" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <path d="M1280,400 Q1278,440 1280,490" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  </g>
</svg>'''

# 7. Minimal Deep Space Orbit
wallpapers['minimal-deep-space.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <radialGradient id="spaceDeep" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#091224"/>
      <stop offset="70%" stop-color="#04060d"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="orbitalArc" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe" stop-opacity="0"/>
      <stop offset="50%" stop-color="#00d2ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#7928ca" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#spaceDeep)"/>

  <!-- Distant Pinpoint Starfield -->
  <g fill="#ffffff" opacity="0.85">
    <circle cx="180" cy="120" r="1"/><circle cx="320" cy="260" r="1.5"/><circle cx="490" cy="80" r="1"/>
    <circle cx="680" cy="220" r="1.8"/><circle cx="850" cy="140" r="1.2"/><circle cx="1020" cy="90" r="2"/>
    <circle cx="1240" cy="190" r="1.4"/><circle cx="1450" cy="110" r="1.6"/><circle cx="1680" cy="240" r="1.2"/>
    <circle cx="1840" cy="160" r="1.8"/><circle cx="240" cy="480" r="1.5"/><circle cx="580" cy="420" r="1.2"/>
    <circle cx="910" cy="460" r="1.6"/><circle cx="1320" cy="410" r="1.4"/><circle cx="1690" cy="490" r="1.7"/>
  </g>

  <!-- Giant Planetary Horizon Arc -->
  <ellipse cx="960" cy="1700" rx="1400" ry="850" fill="#030814" stroke="url(#orbitalArc)" stroke-width="6"/>

  <!-- Network Constellation Mesh in Orbit -->
  <g stroke="#00d2ff" stroke-width="1" opacity="0.4" fill="none">
    <line x1="680" y1="620" x2="820" y2="580"/>
    <line x1="820" y1="580" x2="980" y2="610"/>
    <line x1="980" y1="610" x2="1140" y2="560"/>
    <line x1="1140" y1="560" x2="1280" y2="630"/>
    <circle cx="680" cy="620" r="4" fill="#00d2ff"/>
    <circle cx="820" cy="580" r="4" fill="#00f2fe"/>
    <circle cx="980" cy="610" r="5" fill="#ffffff"/>
    <circle cx="1140" cy="560" r="4" fill="#00f2fe"/>
    <circle cx="1280" cy="630" r="4" fill="#00d2ff"/>
  </g>
</svg>'''

# 8. Outrun Synthwave Grid
wallpapers['retro-synth-grid.svg'] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <linearGradient id="outrunSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0d0221"/>
      <stop offset="50%" stop-color="#240046"/>
      <stop offset="85%" stop-color="#7209b7"/>
      <stop offset="100%" stop-color="#f72585"/>
    </linearGradient>
    <linearGradient id="synthSun" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffe600"/>
      <stop offset="100%" stop-color="#ff007f"/>
    </linearGradient>
    <linearGradient id="gridFade" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe"/>
      <stop offset="70%" stop-color="#ff007f" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#240046" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#outrunSky)"/>

  <!-- Glowing Sun with Horizontal Slices -->
  <circle cx="960" cy="560" r="220" fill="url(#synthSun)"/>
  <!-- Dark Horizon cuts -->
  <rect x="700" y="580" width="520" height="6" fill="#240046"/>
  <rect x="700" y="605" width="520" height="10" fill="#240046"/>
  <rect x="700" y="635" width="520" height="16" fill="#240046"/>
  <rect x="700" y="675" width="520" height="24" fill="#240046"/>
  <rect x="700" y="725" width="520" height="34" fill="#240046"/>

  <!-- Dark Wireframe Mountains on Horizon -->
  <polygon points="120,780 380,560 580,780" fill="#130122" stroke="#ff007f" stroke-width="2"/>
  <polygon points="460,780 690,610 920,780" fill="#1b0230" stroke="#ff007f" stroke-width="2"/>
  <polygon points="1020,780 1280,590 1520,780" fill="#1b0230" stroke="#00f2fe" stroke-width="2"/>
  <polygon points="1380,780 1620,540 1860,780" fill="#130122" stroke="#00f2fe" stroke-width="2"/>

  <!-- Perspective 3D Wireframe Grid Floor -->
  <rect x="0" y="780" width="1920" height="300" fill="#080112"/>
  <!-- Horizontal Grid Lines -->
  <g stroke="url(#gridFade)" stroke-width="2">
    <line x1="0" y1="790" x2="1920" y2="790"/>
    <line x1="0" y1="805" x2="1920" y2="805"/>
    <line x1="0" y1="825" x2="1920" y2="825"/>
    <line x1="0" y1="855" x2="1920" y2="855"/>
    <line x1="0" y1="895" x2="1920" y2="895"/>
    <line x1="0" y1="950" x2="1920" y2="950"/>
    <line x1="0" y1="1025" x2="1920" y2="1025"/>
  </g>
  <!-- Vanishing Perspective Lines radiating from Sun Center -->
  <g stroke="#00f2fe" stroke-width="1.8" opacity="0.75">
    <line x1="960" y1="780" x2="960" y2="1080"/>
    <line x1="960" y1="780" x2="760" y2="1080"/>
    <line x1="960" y1="780" x2="520" y2="1080"/>
    <line x1="960" y1="780" x2="240" y2="1080"/>
    <line x1="960" y1="780" x2="-80" y2="1080"/>
    <line x1="960" y1="780" x2="1160" y2="1080"/>
    <line x1="960" y1="780" x2="1400" y2="1080"/>
    <line x1="960" y1="780" x2="1680" y2="1080"/>
    <line x1="960" y1="780" x2="2000" y2="1080"/>
  </g>
</svg>'''

for filename, content in wallpapers.items():
    path = os.path.join('assets', 'wallpapers', filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"Created {path} ({len(content)} chars)")
