import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageDraw

def build_decor_hero():
    print("Building high-res luxury home decor hero image...")

    # Load high quality decor gallery elements or base decor hero
    base_paths = [
        'assets/images/home2/home2_decor_hero.png',
        'assets/images/decor/decor_hero.png',
        'assets/images/home2/comfort_living.png'
    ]
    
    # We will construct a 1600x1200 high resolution canvas (4:3 ratio for hero right panel)
    TARGET_W, TARGET_H = 1600, 1200
    
    # Check available sources
    src_img = None
    for p in base_paths:
        if os.path.exists(p):
            src_img = Image.open(p)
            print(f"Using source: {p} ({src_img.size})")
            break

    if src_img is None:
        canvas = Image.new('RGB', (TARGET_W, TARGET_H), (244, 239, 234))
    else:
        if src_img.mode != 'RGB':
            src_img = src_img.convert('RGB')

        # Crop to target aspect ratio (1600:1200 = 4:3)
        img_aspect = src_img.width / src_img.height
        target_aspect = TARGET_W / TARGET_H

        if img_aspect > target_aspect:
            new_w = int(src_img.height * target_aspect)
            left = (src_img.width - new_w) // 2
            cropped = src_img.crop((left, 0, left + new_w, src_img.height))
        else:
            new_h = int(src_img.width / target_aspect)
            top = (src_img.height - new_h) // 2
            cropped = src_img.crop((0, top, src_img.width, top + new_h))

        canvas = cropped.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

    # Enhance clarity, contrast, and warm luxury tones
    enhancer_contrast = ImageEnhance.Contrast(canvas)
    canvas = enhancer_contrast.enhance(1.08)
    
    enhancer_color = ImageEnhance.Color(canvas)
    canvas = enhancer_color.enhance(1.06)

    enhancer_sharp = ImageEnhance.Sharpness(canvas)
    canvas = enhancer_sharp.enhance(1.15)

    # Create subtle vignette on edges for seamless join framing
    vignette = Image.new('RGBA', (TARGET_W, TARGET_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(vignette)
    
    # Subtle left edge shadow for seamless join with left column
    for x in range(80):
        alpha = int(35 * (1 - x / 80))
        draw.line([(x, 0), (x, TARGET_H)], fill=(20, 18, 15, alpha))

    # Convert canvas to RGBA and composite vignette
    canvas_rgba = canvas.convert('RGBA')
    canvas_final = Image.alpha_composite(canvas_rgba, vignette).convert('RGB')

    output_path = 'assets/images/home2/home2_decor_hero.png'
    canvas_final.save(output_path, quality=95)
    print(f"Successfully generated decor hero image at {output_path} ({TARGET_W}x{TARGET_H})")

if __name__ == '__main__':
    build_decor_hero()
