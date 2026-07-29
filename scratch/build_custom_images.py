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
    
    # Draw pill badge
    draw.rectangle([x, y, x + tw + pad_x*2, y + th + pad_y*2], fill=(20, 18, 15, 220))
    draw.rectangle([x, y, x + tw + pad_x*2, y + th + pad_y*2], outline=(212, 175, 55, 200), width=1)
    draw.text((x + pad_x, y + pad_y), label, fill=(245, 242, 235), font=font)

# ==========================================
# 1. BUILD FURNITURE STORE HERO (FURNITURE ONLY)
# ==========================================
print("Creating Furniture Store Hero (Furniture Only)...")
canvas_furn = Image.new('RGB', (WIDTH, HEIGHT), (20, 18, 15))

# Pure luxury furniture images
img_sofa = Image.open('assets/images/home1/gallery_01.png')       # Curved Sofa Living Room
img_dining = Image.open('assets/images/home1/gallery_03.png')     # Marble Dining Table
img_bedroom = Image.open('assets/images/home1/gallery_02.png')    # Upholstered Bed
img_armchair = Image.open('assets/images/home1/gallery_04.png')   # Leather Accent Chair
img_office = Image.open('assets/images/room-collections/cat_office.png') # Solid Walnut Desk

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

add_badge(t1, "LIVING ROOM", "top-left")
add_badge(t2, "DINING COLLECTION", "top-left")
add_badge(t3, "BEDROOM", "top-left")
add_badge(t4, "ARMCHAIRS", "top-left")
add_badge(t5, "EXECUTIVE WORKSPACE", "top-left")

canvas_furn.paste(t1, (0, 0))
canvas_furn.paste(t2, (w_left + gap, 0))

x_bot_start = w_left + gap
y_bot_start = h_top_right + gap

canvas_furn.paste(t3, (x_bot_start, y_bot_start))
canvas_furn.paste(t4, (x_bot_start + w_bot_tile + gap, y_bot_start))
canvas_furn.paste(t5, (x_bot_start + (w_bot_tile + gap)*2, y_bot_start))

# Gradient overlay for text legibility
overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

for x in range(WIDTH):
    if x < 1150:
        alpha = int(185 * (1 - (x / 1150) ** 1.8))
        draw.line([(x, 0), (x, HEIGHT)], fill=(12, 10, 8, alpha))

for y in range(HEIGHT):
    if y < 160:
        alpha = int(90 * (1 - y / 160))
        draw.line([(0, y), (WIDTH, y)], fill=(12, 10, 8, alpha))
    elif y > HEIGHT - 200:
        alpha = int(130 * ((y - (HEIGHT - 200)) / 200))
        draw.line([(0, y), (WIDTH, y)], fill=(12, 10, 8, alpha))

# Gold accent dividers
draw.rectangle([w_left, 0, w_left + gap, HEIGHT], fill=(212, 175, 55, 140))
draw.rectangle([w_left, h_top_right, WIDTH, h_top_right + gap], fill=(212, 175, 55, 140))
draw.rectangle([x_bot_start + w_bot_tile, y_bot_start, x_bot_start + w_bot_tile + gap, HEIGHT], fill=(212, 175, 55, 120))
draw.rectangle([x_bot_start + w_bot_tile*2 + gap, y_bot_start, x_bot_start + w_bot_tile*2 + gap*2, HEIGHT], fill=(212, 175, 55, 120))

final_furn_hero = Image.alpha_composite(canvas_furn.convert('RGBA'), overlay)

os.makedirs('assets/images/furniture_shop', exist_ok=True)
os.makedirs('assets/images/furniture_store', exist_ok=True)
os.makedirs('assets/images/home1', exist_ok=True)

final_furn_hero.convert('RGB').save('assets/images/furniture_shop/hero_furniture_only.png', quality=95)
final_furn_hero.convert('RGB').save('assets/images/furniture_store/hero_furniture_main.png', quality=95)
final_furn_hero.convert('RGB').save('assets/images/home1/hero_living.png', quality=95)

# Save webp version
final_furn_hero.convert('RGB').save('assets/images/home1/hero_living.webp', quality=90, format='WEBP')

print("Furniture Store Hero images saved successfully.")

# ==========================================
# 2. BUILD HOME 2 FURNITURE IMAGES
# ==========================================
print("Creating Home 2 Furniture Images...")

os.makedirs('assets/images/home2', exist_ok=True)

# Comfort Living Furniture (Living Room Showcase)
img_liv_full = crop_to_aspect(Image.open('assets/images/room-collections/cat_living.png'), 1200, 800)
img_liv_full.save('assets/images/home2/comfort_living.png', quality=95)
img_liv_full.save('assets/images/home2/comfort_living.webp', quality=90, format='WEBP')

# Rest Bedroom Furniture (Bedroom Showcase)
img_bed_full = crop_to_aspect(Image.open('assets/images/room-collections/cat_bedroom.png'), 1200, 800)
img_bed_full.save('assets/images/home2/rest_bedroom.png', quality=95)
img_bed_full.save('assets/images/home2/rest_bedroom.webp', quality=90, format='WEBP')

# Gathering Dining Furniture (Dining Showcase)
img_din_full = crop_to_aspect(Image.open('assets/images/room-collections/cat_dining.png'), 1200, 800)
img_din_full.save('assets/images/home2/gathering_dining.png', quality=95)
img_din_full.save('assets/images/home2/gathering_dining.webp', quality=90, format='WEBP')

# Showroom Living Set
img_show_liv = crop_to_aspect(Image.open('assets/images/home1/gallery_01.png'), 800, 600)
img_show_liv.save('assets/images/home2/showroom_living_set.png', quality=95)
img_show_liv.save('assets/images/home2/showroom_living_set.webp', quality=90, format='WEBP')

# Showroom Lounge Set
img_show_lng = crop_to_aspect(Image.open('assets/images/home1/gallery_04.png'), 800, 600)
img_show_lng.save('assets/images/home2/showroom_lounge.png', quality=95)
img_show_lng.save('assets/images/home2/showroom_lounge.webp', quality=90, format='WEBP')

# Hero Split background for Home 2
img_hero_split = crop_to_aspect(Image.open('assets/images/room-collections/cat_living.png'), 1920, 1080)
img_hero_split.save('assets/images/home2/hero_split.png', quality=95)
img_hero_split.save('assets/images/home2/hero_split.webp', quality=90, format='WEBP')

print("Home 2 Furniture images saved successfully.")

# ==========================================
# 3. BUILD SCULPTURES & ART CATEGORY IMAGE
# ==========================================
print("Creating Sculptures & Art Category Image...")
img_sculpt_src = Image.open('assets/images/decor/cascade_buddha_fountain.png')
sculpt_cat_img = crop_to_aspect(img_sculpt_src, 600, 450)

os.makedirs('assets/images/decor_shop', exist_ok=True)
os.makedirs('assets/images/shop', exist_ok=True)

sculpt_cat_img.save('assets/images/decor_shop/ds_cat_sculptures.png', quality=95)
sculpt_cat_img.save('assets/images/shop/shop_cat_sculptures.png', quality=95)

print("Sculptures & Art category images saved successfully.")

# ==========================================
# 4. BUILD NOOR ALABASTER GLASS PRODUCT IMAGE
# ==========================================
print("Creating Noor Alabaster Glass Product Image...")
img_alabaster_src = Image.open('assets/images/decor/jessica_white_lamp.png')
alabaster_prod_img = crop_to_aspect(img_alabaster_src, 600, 600)

alabaster_prod_img.save('assets/images/decor_shop/ds_prod_candleholder.png', quality=95)
alabaster_prod_img.save('assets/images/decor/noor_alabaster_glass.png', quality=95)
alabaster_prod_img.save('assets/images/decor_shop/ds_prod_noor_alabaster_glass.png', quality=95)

print("Noor Alabaster Glass product images saved successfully.")
