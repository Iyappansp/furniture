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

def build_hero_furniture_collage():
    print("Building 100% Luxury Furniture Hero Collage...")
    canvas = Image.new('RGB', (WIDTH, HEIGHT), (20, 18, 15))

    # Pure Furniture Assets
    img_living = Image.open('assets/images/home1/gallery_01.png')
    img_dining = Image.open('assets/images/home1/gallery_03.png')
    img_bedroom = Image.open('assets/images/home1/gallery_02.png')
    img_armchair = Image.open('assets/images/home1/gallery_04.png')
    img_office = Image.open('assets/images/room-collections/cat_office.png')

    gap = 6
    w_left = 1056
    h_left = HEIGHT

    w_top_right = WIDTH - w_left - gap
    h_top_right = (HEIGHT - gap) // 2

    w_bot_tile = (w_top_right - gap * 2) // 3
    h_bot = HEIGHT - h_top_right - gap

    t1 = crop_to_aspect(img_living, w_left, h_left)
    t2 = crop_to_aspect(img_dining, w_top_right, h_top_right)
    t3 = crop_to_aspect(img_bedroom, w_bot_tile, h_bot)
    t4 = crop_to_aspect(img_armchair, w_bot_tile, h_bot)
    t5 = crop_to_aspect(img_office, w_bot_tile, h_bot)

    canvas.paste(t1, (0, 0))
    canvas.paste(t2, (w_left + gap, 0))

    x_bot_start = w_left + gap
    y_bot_start = h_top_right + gap

    canvas.paste(t3, (x_bot_start, y_bot_start))
    canvas.paste(t4, (x_bot_start + w_bot_tile + gap, y_bot_start))
    canvas.paste(t5, (x_bot_start + (w_bot_tile + gap)*2, y_bot_start))

    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Dark left gradient for text readability in hero section
    for x in range(WIDTH):
        if x < 1150:
            alpha = int(195 * (1 - (x / 1150) ** 1.8))
            draw.line([(x, 0), (x, HEIGHT)], fill=(12, 10, 8, alpha))

    # Top & bottom subtle gradient overlays
    for y in range(HEIGHT):
        if y < 180:
            alpha = int(100 * (1 - y / 180))
            draw.line([(0, y), (WIDTH, y)], fill=(12, 10, 8, alpha))
        elif y > HEIGHT - 220:
            alpha = int(140 * ((y - (HEIGHT - 220)) / 220))
            draw.line([(0, y), (WIDTH, y)], fill=(12, 10, 8, alpha))

    # Luxury Gold Grid Dividers
    draw.rectangle([w_left, 0, w_left + gap, HEIGHT], fill=(212, 175, 55, 140))
    draw.rectangle([w_left, h_top_right, WIDTH, h_top_right + gap], fill=(212, 175, 55, 140))
    draw.rectangle([x_bot_start + w_bot_tile, y_bot_start, x_bot_start + w_bot_tile + gap, HEIGHT], fill=(212, 175, 55, 120))
    draw.rectangle([x_bot_start + w_bot_tile*2 + gap, y_bot_start, x_bot_start + w_bot_tile*2 + gap*2, HEIGHT], fill=(212, 175, 55, 120))

    try:
        font_small = ImageFont.truetype("arial.ttf", 14)
    except:
        font_small = ImageFont.load_default()

    def add_badge(draw_obj, text, x, y):
        bbox = draw_obj.textbbox((0, 0), text, font=font_small)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        px, py = 12, 6
        bx1, by1 = x, y
        bx2, by2 = x + tw + px * 2, y + th + py * 2
        draw_obj.rounded_rectangle([bx1, by1, bx2, by2], radius=12, fill=(20, 18, 16, 210), outline=(212, 175, 55, 230), width=1)
        draw_obj.text((x + px, y + py - 2), text, fill=(245, 235, 220, 255), font=font_small)

    # Add furniture badges
    add_badge(draw, "EXCLUSIVE FURNITURE COLLAB", 30, 30)
    add_badge(draw, "DINING ROOM", w_left + gap + 20, 20)
    add_badge(draw, "BEDROOM", x_bot_start + 12, y_bot_start + 12)
    add_badge(draw, "ACCENT CHAIRS", x_bot_start + w_bot_tile + gap + 12, y_bot_start + 12)
    add_badge(draw, "OFFICE & STUDY", x_bot_start + (w_bot_tile + gap)*2 + 12, y_bot_start + 12)

    final_img = Image.alpha_composite(canvas.convert('RGBA'), overlay)

    os.makedirs('assets/images/home1', exist_ok=True)
    os.makedirs('assets/images/furniture_shop', exist_ok=True)
    os.makedirs('assets/images/decor_shop', exist_ok=True)

    target_paths = [
        'assets/images/home1/hero_collab_furniture_decor.png',
        'assets/images/home1/hero_collab_furniture_decor.webp',
        'assets/images/home1/hero_living.png',
        'assets/images/home1/hero_living.webp',
        'assets/images/furniture_shop/hero_collab_furniture_decor.png',
        'assets/images/furniture_shop/fs_hero_main.png',
        'assets/images/shop/hero_furniture_shop.png'
    ]

    for p in target_paths:
        if p.endswith('.webp'):
            final_img.convert('RGB').save(p, quality=92, format='WEBP')
        else:
            final_img.convert('RGB').save(p, quality=95)
        print(f"Saved {p}")

if __name__ == '__main__':
    build_hero_furniture_collage()
