"""
Generate clean, valid PNG icons for Theme Studio for GitHub.
Uses standard library (zlib + struct) so no PIL or external dependencies needed.
"""
import struct
import zlib
import os
import math

def make_png(width, height, get_pixel_func):
    """
    get_pixel_func(x, y) -> (r, g, b, a) in 0..255
    """
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # filter type 0: None
        for x in range(width):
            r, g, b, a = get_pixel_func(x, y)
            raw_data.extend((r, g, b, a))

    compressed = zlib.compress(bytes(raw_data), 9)

    def chunk(chunk_type, data):
        return struct.pack('>I', len(data)) + chunk_type + data + struct.pack('>I', zlib.crc32(chunk_type + data) & 0xffffffff)

    header = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0) # 8-bit depth, RGBA
    ihdr = chunk(b'IHDR', ihdr_data)
    idat = chunk(b'IDAT', compressed)
    iend = chunk(b'IEND', b'')

    return header + ihdr + idat + iend

def draw_theme_studio_icon(size):
    center = size / 2.0
    radius = size * 0.46

    # Colors
    # Vibrant dark purple gradient background with neon cyan & magenta brush / star / octocat silhouette
    def pixel(x, y):
        dx = x - center
        dy = y - center
        dist = math.sqrt(dx*dx + dy*dy)

        # Anti-aliased outer rounded rectangle or circle
        corner_r = size * 0.22
        # Box from size*0.06 to size*0.94
        min_p = size * 0.08
        max_p = size * 0.92
        
        # Check rounded rect distance
        rx = max(min_p + corner_r - x, 0, x - (max_p - corner_r))
        ry = max(min_p + corner_r - y, 0, y - (max_p - corner_r))
        r_dist = math.sqrt(rx*rx + ry*ry)

        inside_rect = (x >= min_p and x <= max_p and y >= min_p and y <= max_p)
        if rx > 0 and ry > 0:
            edge_dist = r_dist - corner_r
        elif inside_rect:
            edge_dist = -min(x - min_p, max_p - x, y - min_p, max_p - y)
        else:
            edge_dist = 1.0

        if edge_dist > 1.0:
            return (0, 0, 0, 0)
        
        alpha = 1.0
        if edge_dist > 0.0:
            alpha = max(0.0, 1.0 - edge_dist)

        # Background gradient: Deep violet (#0f0c20) to neon purple/cyan
        norm_y = y / float(size)
        norm_x = x / float(size)
        
        # Base dark violet-indigo background
        bg_r = int(18 + 25 * norm_y)
        bg_g = int(14 + 10 * norm_x)
        bg_b = int(36 + 40 * norm_y)

        # Draw a glowing color palette / magic sparkle / GitHub octocat ear motif
        # Palette arc or sparkle star in center
        # Sparkle 1: Center-right
        s_cx = center + size * 0.05
        s_cy = center - size * 0.05
        s_dx = abs(x - s_cx)
        s_dy = abs(y - s_cy)

        # 4-pointed star
        star_glow = 0.0
        if s_dx < size * 0.35 and s_dy < size * 0.35:
            # Star shape equation: (x/a)^0.5 + (y/b)^0.5 <= 1
            star_val = (s_dx / (size * 0.32) + 0.01)**0.5 + (s_dy / (size * 0.32) + 0.01)**0.5
            if star_val < 1.0:
                star_glow = (1.0 - star_val) * 1.5

        # Palette color rings (3 color circles like a studio palette: Cyan, Magenta, Gold)
        c1 = (center - size * 0.22, center + size * 0.18, (0, 242, 254))   # Cyan
        c2 = (center + size * 0.18, center + size * 0.22, (255, 0, 127))   # Magenta
        c3 = (center - size * 0.05, center - size * 0.22, (255, 215, 0))   # Gold
        c4 = (center + size * 0.20, center - size * 0.18, (120, 255, 120)) # Mint

        fg_r, fg_g, fg_b = bg_r, bg_g, bg_b

        # Apply glowing dots
        for cx, cy, col in [c1, c2, c3, c4]:
            d = math.hypot(x - cx, y - cy)
            dot_r = size * 0.10
            if d < dot_r + 1.0:
                dot_a = max(0.0, min(1.0, dot_r + 1.0 - d))
                fg_r = int(fg_r * (1 - dot_a) + col[0] * dot_a)
                fg_g = int(fg_g * (1 - dot_a) + col[1] * dot_a)
                fg_b = int(fg_b * (1 - dot_a) + col[2] * dot_a)

        # Star sparkle blend
        if star_glow > 0.0:
            star_a = min(1.0, star_glow)
            fg_r = int(fg_r * (1 - star_a) + 255 * star_a)
            fg_g = int(fg_g * (1 - star_a) + 255 * star_a)
            fg_b = int(fg_b * (1 - star_a) + 255 * star_a)

        # Subtle border ring
        if -1.5 < edge_dist <= 0.5:
            border_a = min(1.0, 1.0 - abs(edge_dist + 0.5))
            fg_r = int(fg_r * (1 - border_a*0.6) + 168 * border_a*0.6)
            fg_g = int(fg_g * (1 - border_a*0.6) + 85 * border_a*0.6)
            fg_b = int(fg_b * (1 - border_a*0.6) + 247 * border_a*0.6)

        return (fg_r, fg_g, fg_b, int(alpha * 255))

    return make_png(size, size, pixel)

os.makedirs('icons', exist_ok=True)
for s in [16, 32, 48, 128]:
    png_bytes = draw_theme_studio_icon(s)
    path = os.path.join('icons', f'icon{s}.png')
    with open(path, 'wb') as f:
        f.write(png_bytes)
    print(f"Generated {path} ({s}x{s}, {len(png_bytes)} bytes)")
