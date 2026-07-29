import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

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

def add_badge(img, label, position='top-left'):
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 14)
    except:
        font = ImageFont.load_default()
    
    bbox = draw.textbbox((0, 0), label, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    pad_x, pad_y = 12, 6
    if position == 'top-left':
        x, y = 16, 16
    elif position == 'top-right':
        x, y = img.width - tw - pad_x*2 - 16, 16
    
    draw.rectangle([x, y, x + tw + pad_x*2, y + th + pad_y*2], fill=(20, 18, 15, 220))
    draw.rectangle([x, y, x + tw + pad_x*2, y + th + pad_y*2], outline=(212, 175, 55, 200), width=1)
    draw.text((x + pad_x, y + pad_y), label, fill=(245, 242, 235), font=font)

def main():
    print("--- GENERATING DELIVERABLE IMAGES ---")
    os.makedirs('assets/images/furniture_shop', exist_ok=True)
    os.makedirs('assets/images/furniture_store', exist_ok=True)
    os.makedirs('assets/images/decor_shop', exist_ok=True)
    os.makedirs('assets/images/decor_store', exist_ok=True)
    os.makedirs('assets/images/shop', exist_ok=True)
    os.makedirs('assets/images/product', exist_ok=True)

    # 1. Outdoor Category Image
    print("1. Building Outdoor Category Image...")
    img_outdoor_src = Image.open('assets/images/room-collections/cat_outdoor.png')
    outdoor_cat_img = crop_to_aspect(img_outdoor_src, 600, 450)
    outdoor_cat_img.save('assets/images/furniture_shop/fs_cat_outdoor.png', quality=95)
    outdoor_cat_img.save('assets/images/shop/shop_cat_outdoor.png', quality=95)

    # 2. Sterling Desktop Product Image
    print("2. Building Sterling Desktop Product Image...")
    img_desk_src = Image.open('assets/images/room-collections/cat_office.png')
    desk_prod_img = crop_to_aspect(img_desk_src, 600, 600)
    desk_prod_img.save('assets/images/furniture_shop/fs_prod_desk.png', quality=95)
    desk_prod_img.save('assets/images/product/desk_walnut.png', quality=95)

    # 3. Noor Alabaster Glass Product Image
    print("3. Building Noor Alabaster Glass Product Image...")
    if os.path.exists('assets/images/decor/noor_alabaster_glass.png'):
        img_alabaster_src = Image.open('assets/images/decor/noor_alabaster_glass.png')
    else:
        img_alabaster_src = Image.open('assets/images/decor/jessica_white_lamp.png')
    alabaster_prod_img = crop_to_aspect(img_alabaster_src, 600, 600)
    alabaster_prod_img.save('assets/images/decor_shop/ds_prod_candleholder.png', quality=95)
    alabaster_prod_img.save('assets/images/decor_shop/ds_prod_noor_alabaster_glass.png', quality=95)
    alabaster_prod_img.save('assets/images/decor/noor_alabaster_glass.png', quality=95)

    # 4. Furniture Store Lookbook Background Image (Furniture Focus)
    print("4. Building Furniture Store Lookbook Background Image...")
    canvas_furn = Image.new('RGB', (WIDTH, HEIGHT), (20, 18, 15))
    img_sofa = Image.open('assets/images/home1/gallery_01.png')
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

    t1 = crop_to_aspect(img_sofa, w_left, h_left)
    t2 = crop_to_aspect(img_dining, w_top_right, h_top_right)
    t3 = crop_to_aspect(img_bedroom, w_bot_tile, h_bot)
    t4 = crop_to_aspect(img_armchair, w_bot_tile, h_bot)
    t5 = crop_to_aspect(img_office, w_bot_tile, h_bot)

    add_badge(t1, "VELVET LIVING SANCTUARY", "top-left")
    add_badge(t2, "MARBLE DINING SUITE", "top-left")
    add_badge(t3, "BOUCLÉ BEDROOM", "top-left")
    add_badge(t4, "LEATHER LOUNGE", "top-left")
    add_badge(t5, "WALNUT WORKSPACE", "top-left")

    canvas_furn.paste(t1, (0, 0))
    canvas_furn.paste(t2, (w_left + gap, 0))
    x_bot = w_left + gap
    y_bot = h_top_right + gap
    canvas_furn.paste(t3, (x_bot, y_bot))
    canvas_furn.paste(t4, (x_bot + w_bot_tile + gap, y_bot))
    canvas_furn.paste(t5, (x_bot + (w_bot_tile + gap)*2, y_bot))

    overlay_furn = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_furn = ImageDraw.Draw(overlay_furn)
    draw_furn.rectangle([w_left, 0, w_left + gap, HEIGHT], fill=(212, 175, 55, 140))
    draw_furn.rectangle([w_left, h_top_right, WIDTH, h_top_right + gap], fill=(212, 175, 55, 140))

    final_furn_lookbook = Image.alpha_composite(canvas_furn.convert('RGBA'), overlay_furn)
    final_furn_lookbook.convert('RGB').save('assets/images/furniture_store/lookbook_furniture_sanctuary.png', quality=95)

    # 5. Decor Store Lookbook Background Image (Decor Focus)
    print("5. Building Decor Store Lookbook Background Image...")
    img_decor_hero = Image.open('assets/images/decor/decor_hero.png')
    img_buddha = Image.open('assets/images/decor/enlighten_sitting_buddha.png')
    img_lamp = Image.open('assets/images/decor/jessica_white_lamp.png')
    img_art = Image.open('assets/images/decor/artistry_canvas_frame.png')
    img_fountain = Image.open('assets/images/decor/cascade_buddha_fountain.png')

    d_canvas = Image.new('RGB', (WIDTH, HEIGHT), (20, 18, 15))
    dt1 = crop_to_aspect(img_decor_hero, w_left, h_left)
    dt2 = crop_to_aspect(img_art, w_top_right, h_top_right)
    dt3 = crop_to_aspect(img_buddha, w_bot_tile, h_bot)
    dt4 = crop_to_aspect(img_lamp, w_bot_tile, h_bot)
    dt5 = crop_to_aspect(img_fountain, w_bot_tile, h_bot)

    add_badge(dt1, "LUXURY DECOR ARRANGEMENT", "top-left")
    add_badge(dt2, "ARTISTRY & WALL CANVASES", "top-left")
    add_badge(dt3, "BRASS SCULPTURES", "top-left")
    add_badge(dt4, "ALABASTER LIGHTING", "top-left")
    add_badge(dt5, "WATER FEATURES", "top-left")

    d_canvas.paste(dt1, (0, 0))
    d_canvas.paste(dt2, (w_left + gap, 0))
    d_canvas.paste(dt3, (x_bot, y_bot))
    d_canvas.paste(dt4, (x_bot + w_bot_tile + gap, y_bot))
    d_canvas.paste(dt5, (x_bot + (w_bot_tile + gap)*2, y_bot))

    overlay_decor = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_decor = ImageDraw.Draw(overlay_decor)
    draw_decor.rectangle([w_left, 0, w_left + gap, HEIGHT], fill=(212, 175, 55, 140))
    draw_decor.rectangle([w_left, h_top_right, WIDTH, h_top_right + gap], fill=(212, 175, 55, 140))

    final_decor_lookbook = Image.alpha_composite(d_canvas.convert('RGBA'), overlay_decor)
    final_decor_lookbook.convert('RGB').save('assets/images/decor_store/lookbook_decor_gallery.png', quality=95)

    print("--- ALL IMAGES GENERATED SUCCESSFULLY ---")

if __name__ == '__main__':
    main()
