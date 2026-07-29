import os
from PIL import Image

def test_crop_real_photos():
    print("--- TESTING REAL PHOTO CROPS ---")
    
    # 1. Sterling Table Real Photo: table_oakridge.png (Luxury solid walnut table furniture, no people!)
    src_table = Image.open('assets/images/product/table_oakridge.png')
    print("src_table size:", src_table.size)
    
    # Crop to 1:1 ratio focusing on the table furniture
    w, h = src_table.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    table_crop = src_table.crop((left, top, left + min_dim, top + min_dim)).resize((800, 800), Image.Resampling.LANCZOS)
    
    table_crop.save('assets/images/furniture_shop/fs_prod_desk.png', quality=95)
    table_crop.save('assets/images/product/desk_walnut.png', quality=95)
    table_crop.save('assets/images/product/desk_walnut.webp', quality=95)
    print("Saved Sterling Table real photograph to fs_prod_desk.png & desk_walnut.png")

    # 2. Cascade Sculptural Fountain Real Photo: ds_cat_sculptures.png or alpine_carnival_fountain.png
    src_fountain = Image.open('assets/images/decor_shop/ds_cat_sculptures.png')
    print("src_fountain size:", src_fountain.size)
    
    w_f, h_f = src_fountain.size
    min_f = min(w_f, h_f)
    left_f = (w_f - min_f) // 2
    top_f = (h_f - min_f) // 2
    fountain_crop = src_fountain.crop((left_f, top_f, left_f + min_f, top_f + min_f)).resize((800, 800), Image.Resampling.LANCZOS)
    
    fountain_crop.save('assets/images/decor_shop/ds_prod_fountain.png', quality=95)
    fountain_crop.save('assets/images/decor/cascade_buddha_fountain.png', quality=95)
    print("Saved Cascade Sculptural Fountain real photograph to ds_prod_fountain.png & cascade_buddha_fountain.png")

if __name__ == '__main__':
    test_crop_real_photos()
