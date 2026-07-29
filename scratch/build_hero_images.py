import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

WIDTH = 1920
HEIGHT = 1080

def crop_to_aspect(img, target_width, target_height):
    if img.mode != 'RGB':
        img = img.convert('RGB')
    img_aspect = img.width / img.height
    target_aspect = target_width / target_height

    if img_aspect > target_aspect:
        new_width = int(img.height * target_aspect)
        left = (img.width - new_width) // 2
        img = img.crop((left, 0, left + new_width, img.height))
    else:
        new_height = int(img.width / target_aspect)
        top = (img.height - new_height) // 2
        img = img.crop((0, top, img.width, top + new_height))
    
    return img.resize((target_width, target_height), Image.Resampling.LANCZOS)

def load_font(name_list, size):
    for f in name_list:
        try:
            return ImageFont.truetype(f, size)
        except Exception:
            pass
    return ImageFont.load_default()

font_badge = load_font(["C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/segoeuib.ttf", "arial.ttf"], 13)

def create_hero_montage(tiles_spec, output_path, badge_labels=None):
    canvas = Image.new('RGB', (WIDTH, HEIGHT), (18, 16, 14))
    
    gap = 6
    w_left = 1056
    h_left = HEIGHT
    
    w_top_right = WIDTH - w_left - gap
    h_top_right = (HEIGHT - gap) // 2
    
    w_bot_tile = (w_top_right - gap * 2) // 3
    h_bot = HEIGHT - h_top_right - gap

    # Crop and assemble tiles
    # Tile 0: Left main (1056 x 1080)
    # Tile 1: Right top (858 x 537)
    # Tile 2, 3, 4: Right bottom row (282 x 537 each)
    
    img0 = crop_to_aspect(Image.open(tiles_spec[0]), w_left, h_left)
    img1 = crop_to_aspect(Image.open(tiles_spec[1]), w_top_right, h_top_right)
    img2 = crop_to_aspect(Image.open(tiles_spec[2]), w_bot_tile, h_bot)
    img3 = crop_to_aspect(Image.open(tiles_spec[3]), w_bot_tile, h_bot)
    img4 = crop_to_aspect(Image.open(tiles_spec[4]), w_bot_tile, h_bot)

    canvas.paste(img0, (0, 0))
    canvas.paste(img1, (w_left + gap, 0))

    x_bot_start = w_left + gap
    y_bot_start = h_top_right + gap

    canvas.paste(img2, (x_bot_start, y_bot_start))
    canvas.paste(img3, (x_bot_start + w_bot_tile + gap, y_bot_start))
    canvas.paste(img4, (x_bot_start + (w_bot_tile + gap) * 2, y_bot_start))

    # Dark gradient overlay for hero text legibility on left side & top/bottom
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Left gradient for text legibility
    for x in range(WIDTH):
        if x < 1200:
            alpha = int(195 * (1 - (x / 1200) ** 1.8))
            draw.line([(x, 0), (x, HEIGHT)], fill=(10, 8, 6, alpha))

    # Top & bottom gradients
    for y in range(HEIGHT):
        if y < 160:
            alpha = int(90 * (1 - y / 160))
            draw.line([(0, y), (WIDTH, y)], fill=(10, 8, 6, alpha))
        elif y > HEIGHT - 200:
            alpha = int(130 * ((y - (HEIGHT - 200)) / 200))
            draw.line([(0, y), (WIDTH, y)], fill=(10, 8, 6, alpha))

    # Gold architectural trim lines
    # Vertical main divider
    draw.rectangle([w_left, 0, w_left + gap, HEIGHT], fill=(212, 175, 55, 140))
    # Horizontal right divider
    draw.rectangle([w_left, h_top_right, WIDTH, h_top_right + gap], fill=(212, 175, 55, 140))
    # Bottom vertical dividers
    draw.rectangle([x_bot_start + w_bot_tile, y_bot_start, x_bot_start + w_bot_tile + gap, HEIGHT], fill=(212, 175, 55, 110))
    draw.rectangle([x_bot_start + (w_bot_tile + gap)*2 - gap, y_bot_start, x_bot_start + (w_bot_tile + gap)*2, HEIGHT], fill=(212, 175, 55, 110))

    # Add floating luxury badges on tiles if provided
    if badge_labels:
        # Positions for badges:
        # Tile 0: top left (35, 35)
        # Tile 1: top right area (w_left + gap + 25, 25)
        # Tile 2: bottom row 1 (x_bot_start + 15, y_bot_start + 15)
        # Tile 3: bottom row 2 (x_bot_start + w_bot_tile + gap + 15, y_bot_start + 15)
        # Tile 4: bottom row 3 (x_bot_start + (w_bot_tile + gap)*2 + 15, y_bot_start + 15)
        coords = [
            (35, 35),
            (w_left + gap + 25, 25),
            (x_bot_start + 15, y_bot_start + 15),
            (x_bot_start + w_bot_tile + gap + 15, y_bot_start + 15),
            (x_bot_start + (w_bot_tile + gap)*2 + 15, y_bot_start + 15)
        ]
        
        for text, (bx, by) in zip(badge_labels, coords):
            if not text:
                continue
            text_bbox = font_badge.getbbox(text)
            tw = text_bbox[2] - text_bbox[0]
            th = text_bbox[3] - text_bbox[1]
            padding_h = 14
            padding_v = 6
            bg_rect = [bx, by, bx + tw + padding_h * 2, by + th + padding_v * 2]
            
            # Badge shadow/background
            draw.rectangle(bg_rect, fill=(15, 14, 12, 220), outline=(212, 175, 55, 200), width=1)
            draw.text((bx + padding_h, by + padding_v - 1), text, fill=(245, 235, 220), font=font_badge)

    canvas_final = Image.alpha_composite(canvas.convert('RGBA'), overlay)
    
    # Ensure target directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    canvas_final.convert('RGB').save(output_path, quality=95)
    print(f"Saved: {output_path}")

if __name__ == '__main__':
    # 1. FURNITURE ONLY HERO
    furniture_tiles = [
        'assets/images/room-collections/cat_living.png',     # Main left: Living room sofa & lounge
        'assets/images/room-collections/cat_dining.png',     # Top right: Solid oak dining table & chairs
        'assets/images/room-collections/cat_bedroom.png',    # Bot 1: Luxury bouclé platform bed & nightstand
        'assets/images/room-collections/cat_office.png',     # Bot 2: Executive walnut desk & armchair
        'assets/images/room-collections/cat_outdoor.png'     # Bot 3: Teak outdoor lounge patio
    ]
    furniture_badges = [
        "FURNITURE SHOWROOM",
        "DINING",
        "BEDROOM",
        "HOME OFFICE",
        "OUTDOOR"
    ]
    create_hero_montage(
        furniture_tiles, 
        'assets/images/furniture_shop/hero_furniture_only.png',
        furniture_badges
    )

    # 2. DECOR ONLY HERO
    decor_tiles = [
        'assets/images/decor/decor_hero.png',               # Main left: Artisanal decor ambient setting
        'assets/images/decor/artistry_canvas_frame.png',     # Top right: Fine art & canvas collection
        'assets/images/decor/riviera_dune_lamp.png',         # Bot 1: Designer ambient lighting
        'assets/images/decor/shizue_vase.png',               # Bot 2: Handcrafted ceramic vases
        'assets/images/decor/cascade_buddha_fountain.png'    # Bot 3: Sculptural objects & accents
    ]
    decor_badges = [
        "ARTISANAL DECOR",
        "FINE ART",
        "LIGHTING",
        "CERAMICS",
        "SCULPTURES"
    ]
    create_hero_montage(
        decor_tiles, 
        'assets/images/decor_shop/hero_decor_only.png',
        decor_badges
    )
