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

# Create canvas with rich warm dark background
canvas = Image.new('RGB', (WIDTH, HEIGHT), (20, 18, 15))

# Images for Collaboration Collage
img_living_furniture = Image.open('assets/images/home1/hero_living.png')
img_decor_collection = Image.open('assets/images/decor/decor_hero.png')
img_dining_furniture = Image.open('assets/images/furniture_shop/fs_cat_dining.png')
img_decor_art = Image.open('assets/images/decor/artistry_canvas_frame.png')
img_decor_lighting = Image.open('assets/images/decor/riviera_dune_lamp.png')

gap = 6
# Layout geometry
# Left main panel: 55% width, full height (1056 x 1080)
w_left = 1056
h_left = HEIGHT

# Right top panel (decor collection): 858 x 534
w_top_right = WIDTH - w_left - gap
h_top_right = (HEIGHT - gap) // 2

# Right bottom row: 3 sub-tiles
w_bot_tile = (w_top_right - gap * 2) // 3
h_bot = HEIGHT - h_top_right - gap

# Crop and assemble tiles
tile1 = crop_to_aspect(img_living_furniture, w_left, h_left)
tile2 = crop_to_aspect(img_decor_collection, w_top_right, h_top_right)
tile3 = crop_to_aspect(img_dining_furniture, w_bot_tile, h_bot)
tile4 = crop_to_aspect(img_decor_art, w_bot_tile, h_bot)
tile5 = crop_to_aspect(img_decor_lighting, w_bot_tile, h_bot)

canvas.paste(tile1, (0, 0))
canvas.paste(tile2, (w_left + gap, 0))

x_bot_start = w_left + gap
y_bot_start = h_top_right + gap

canvas.paste(tile3, (x_bot_start, y_bot_start))
canvas.paste(tile4, (x_bot_start + w_bot_tile + gap, y_bot_start))
canvas.paste(tile5, (x_bot_start + (w_bot_tile + gap)*2, y_bot_start))

# Create overlay for dark gradient (to keep text legible on hero overlay)
overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# Gradient fill on left for text legibility
for x in range(WIDTH):
    if x < 1150:
        # Subtle dark gradient on left
        alpha = int(190 * (1 - (x / 1150) ** 1.8))
        draw.line([(x, 0), (x, HEIGHT)], fill=(12, 10, 8, alpha))

# Top and bottom subtle gradients
for y in range(HEIGHT):
    if y < 180:
        alpha = int(100 * (1 - y / 180))
        draw.line([(0, y), (WIDTH, y)], fill=(12, 10, 8, alpha))
    elif y > HEIGHT - 220:
        alpha = int(140 * ((y - (HEIGHT - 220)) / 220))
        draw.line([(0, y), (WIDTH, y)], fill=(12, 10, 8, alpha))

# Draw elegant gold/bronze divider lines
# Vertical main divider
draw.rectangle([w_left, 0, w_left + gap, HEIGHT], fill=(212, 175, 55, 120))
# Horizontal right divider
draw.rectangle([w_left, h_top_right, WIDTH, h_top_right + gap], fill=(212, 175, 55, 120))
# Bottom vertical dividers
draw.rectangle([x_bot_start + w_bot_tile, y_bot_start, x_bot_start + w_bot_tile + gap, HEIGHT], fill=(212, 175, 55, 100))
draw.rectangle([x_bot_start + w_bot_tile*2 + gap, y_bot_start, x_bot_start + w_bot_tile*2 + gap*2, HEIGHT], fill=(212, 175, 55, 100))

# Try loading standard font for collage labels
try:
    font_large = ImageFont.truetype("arial.ttf", 20)
    font_small = ImageFont.truetype("arial.ttf", 14)
except:
    font_large = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Add subtle aesthetic pill badges on top-right of collage tiles
def add_badge(draw_obj, text, x, y):
    bbox = draw_obj.textbbox((0, 0), text, font=font_small)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    px, py = 12, 6
    bx1, by1 = x, y
    bx2, by2 = x + tw + px * 2, y + th + py * 2
    # Semi-transparent dark pill with gold border
    draw_obj.rounded_rectangle([bx1, by1, bx2, by2], radius=12, fill=(20, 18, 16, 200), outline=(212, 175, 55, 220), width=1)
    draw_obj.text((x + px, y + py - 2), text, fill=(245, 235, 220, 255), font=font_small)

# Add badges on right collage tiles
add_badge(draw, "CURATED HOME DECOR", w_left + gap + 20, 20)
add_badge(draw, "DINING", x_bot_start + 12, y_bot_start + 12)
add_badge(draw, "FINE ART", x_bot_start + w_bot_tile + gap + 12, y_bot_start + 12)
add_badge(draw, "LIGHTING", x_bot_start + (w_bot_tile + gap)*2 + 12, y_bot_start + 12)
add_badge(draw, "LUXURY FURNITURE & DECOR COLLAB", 30, 30)

final_img = Image.alpha_composite(canvas.convert('RGBA'), overlay)

# Save image files
os.makedirs('assets/images/home1', exist_ok=True)
os.makedirs('assets/images/decor_shop', exist_ok=True)
os.makedirs('assets/images/furniture_shop', exist_ok=True)

final_img.convert('RGB').save('assets/images/home1/hero_collab_furniture_decor.png', quality=95)
final_img.convert('RGB').save('assets/images/home1/hero_collab_furniture_decor.webp', quality=90, format='WEBP')

# Update default hero paths as well so all index / shop pages reflect the collage hero image
final_img.convert('RGB').save('assets/images/home1/hero_living.png', quality=95)
final_img.convert('RGB').save('assets/images/home1/hero_living.webp', quality=90, format='WEBP')
final_img.convert('RGB').save('assets/images/decor_shop/hero_collab_furniture_decor.png', quality=95)
final_img.convert('RGB').save('assets/images/furniture_shop/hero_collab_furniture_decor.png', quality=95)

print("Synthesized 5-tile Hero Furniture & Decor Collage successfully!")
