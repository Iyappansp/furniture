import os
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ImageOps
import numpy as np

def create_photorealistic_buddha_tlight():
    # 1. Base Buddha sculpture photo
    buddha_path = 'assets/images/decor/enlighten_sitting_buddha.png'
    if not os.path.exists(buddha_path):
        print("Base photo not found")
        return
        
    buddha_img = Image.open(buddha_path).convert('RGBA')
    width, height = buddha_img.size # 1024, 1024
    
    # Create dark luxury studio backdrop
    bg = Image.new('RGBA', (width, height), (15, 10, 6, 255))
    bg_draw = ImageDraw.Draw(bg)
    
    # Create warm background radial glow
    glow_layer = Image.new('RGBA', (width, height), (0,0,0,0))
    glow_draw = ImageDraw.Draw(glow_layer)
    
    # Draw radial gradient for warm room aura
    center_x, center_y = width // 2, int(height * 0.55)
    for radius in range(500, 0, -10):
        alpha = int(120 * (1 - (radius / 500)**1.5))
        glow_draw.ellipse([center_x - radius, center_y - radius, center_x + radius, center_y + radius], fill=(255, 130, 20, alpha))
        
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(40))
    bg = Image.alpha_composite(bg, glow_layer)
    
    # 2. Adjust color tone of Buddha sculpture towards rich warm bronze & gold
    # Enhance warmth
    r, g, b, a = buddha_img.split()
    r = r.point(lambda p: min(255, int(p * 1.15)))
    g = g.point(lambda p: min(255, int(p * 0.98)))
    b = b.point(lambda p: int(p * 0.82))
    buddha_warm = Image.merge('RGBA', (r, g, b, a))
    
    # Blend Buddha onto background
    comp = Image.alpha_composite(bg, buddha_warm)
    
    # 3. Add glowing Tea Light Candle Holder Bowl at Buddha's lap/hands
    candle_layer = Image.new('RGBA', (width, height), (0,0,0,0))
    cdraw = ImageDraw.Draw(candle_layer)
    
    # Tea light position (center lap)
    tx, ty = width // 2, int(height * 0.64)
    
    # Radial candle light bloom
    for r_bloom in range(250, 0, -5):
        alpha = int(180 * (1 - (r_bloom / 250)**0.8))
        cdraw.ellipse([tx - r_bloom, ty - r_bloom, tx + r_bloom, ty + r_bloom], fill=(255, 160, 30, alpha))
        
    candle_layer = candle_layer.filter(ImageFilter.GaussianBlur(25))
    comp = Image.alpha_composite(comp, candle_layer)
    
    # Draw Brass Tea Light Bowl
    bowl_layer = Image.new('RGBA', (width, height), (0,0,0,0))
    bdraw = ImageDraw.Draw(bowl_layer)
    
    # Outer brass rim
    bdraw.ellipse([tx - 75, ty - 25, tx + 75, ty + 35], fill=(212, 175, 55, 255), outline=(255, 235, 170, 255), width=3)
    # Inner candle cavity
    bdraw.ellipse([tx - 60, ty - 18, tx + 60, ty + 24], fill=(30, 20, 10, 255))
    # Wax container / Tea light metal cup
    bdraw.ellipse([tx - 40, ty - 12, tx + 40, ty + 15], fill=(240, 240, 230, 255), outline=(180, 150, 50, 255), width=2)
    # Molten wax pool
    bdraw.ellipse([tx - 34, ty - 9, tx + 34, ty + 10], fill=(255, 248, 210, 255))
    # Wick
    bdraw.line([tx, ty - 5, tx, ty - 15], fill=(40, 30, 20, 255), width=3)
    
    # Glowing Flame
    # Outer flame aura
    bdraw.ellipse([tx - 25, ty - 55, tx + 25, ty - 5], fill=(255, 120, 0, 220))
    # Mid flame
    bdraw.ellipse([tx - 15, ty - 50, tx + 15, ty - 10], fill=(255, 200, 0, 240))
    # Inner core flame
    bdraw.ellipse([tx - 8, ty - 42, tx + 8, ty - 14], fill=(255, 255, 240, 255))
    
    bowl_layer = bowl_layer.filter(ImageFilter.GaussianBlur(2))
    comp = Image.alpha_composite(comp, bowl_layer)
    
    # Final enhancements
    final_img = comp.convert('RGB')
    enh_contrast = ImageEnhance.Contrast(final_img)
    final_img = enh_contrast.enhance(1.2)
    enh_color = ImageEnhance.Color(final_img)
    final_img = enh_color.enhance(1.15)
    
    target_1 = 'assets/images/decor/noor_buddha_tlight.png'
    target_2 = 'assets/images/decor_shop/ds_prod_candleholder.png'
    target_3 = 'assets/images/decor_shop/ds_prod_noor_buddha_tlight.png'
    
    os.makedirs(os.path.dirname(target_1), exist_ok=True)
    os.makedirs(os.path.dirname(target_2), exist_ok=True)
    os.makedirs(os.path.dirname(target_3), exist_ok=True)
    
    final_img.save(target_1, quality=95)
    final_img.save(target_2, quality=95)
    final_img.save(target_3, quality=95)
    print(f"Successfully generated photorealistic Meditating Buddha Tea Light image to {target_1}")

if __name__ == '__main__':
    create_photorealistic_buddha_tlight()
