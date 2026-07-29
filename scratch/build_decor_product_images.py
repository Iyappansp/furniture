import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

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

def build_fountain_image():
    # Base: ds_cat_sculptures or indoor fountain source with enhanced warm lighting and stone texture
    if os.path.exists('assets/images/decor/cascade_buddha_fountain.png'):
        src = Image.open('assets/images/decor/cascade_buddha_fountain.png').convert('RGB')
    else:
        src = Image.open('assets/images/decor_shop/ds_cat_sculptures.png').convert('RGB')
    img = crop_to_aspect(src, 800, 800)
    
    enhancer_contrast = ImageEnhance.Contrast(img)
    img = enhancer_contrast.enhance(1.15)
    enhancer_color = ImageEnhance.Color(img)
    img = enhancer_color.enhance(1.1)
    
    os.makedirs('assets/images/decor_shop', exist_ok=True)
    os.makedirs('assets/images/decor', exist_ok=True)
    
    img.save('assets/images/decor_shop/ds_prod_fountain.png', quality=95)
    img.save('assets/images/decor/cascade_buddha_fountain.png', quality=95)
    print("Saved Cascade Sculptural Fountain image.")

def build_mirror_image():
    if os.path.exists('assets/images/decor_shop/ds_cat_mirrors.png'):
        src = Image.open('assets/images/decor_shop/ds_cat_mirrors.png').convert('RGB')
    else:
        src = Image.open('assets/images/gallery/gallery_04.png').convert('RGB')
    
    img = crop_to_aspect(src, 800, 800)
    
    enhancer_sharp = ImageEnhance.Sharpness(img)
    img = enhancer_sharp.enhance(1.25)
    enhancer_contrast = ImageEnhance.Contrast(img)
    img = enhancer_contrast.enhance(1.1)
    
    img.save('assets/images/decor_shop/ds_prod_mirror.png', quality=95)
    img.save('assets/images/decor/artistry_brass_mirror.png', quality=95)
    print("Saved Artistry Brass Mirror image.")

def build_noor_alabaster_image():
    if os.path.exists('assets/images/decor/noor_buddha_tlight.png'):
        src = Image.open('assets/images/decor/noor_buddha_tlight.png').convert('RGB')
    else:
        src = Image.open('assets/images/decor/jessica_white_lamp.png').convert('RGB')
    
    img = crop_to_aspect(src, 800, 800)
    
    enhancer_color = ImageEnhance.Color(img)
    img = enhancer_color.enhance(1.12)
    enhancer_contrast = ImageEnhance.Contrast(img)
    img = enhancer_contrast.enhance(1.08)
    
    img.save('assets/images/decor_shop/ds_prod_candleholder.png', quality=95)
    img.save('assets/images/decor_shop/ds_prod_noor_alabaster_glass.png', quality=95)
    img.save('assets/images/decor/noor_alabaster_glass.png', quality=95)
    print("Saved Noor Alabaster Glass image.")

if __name__ == '__main__':
    build_fountain_image()
    build_mirror_image()
    build_noor_alabaster_image()
