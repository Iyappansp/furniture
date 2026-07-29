import os
from PIL import Image

def verify():
    targets = [
        'assets/images/furniture_shop/fs_prod_desk.png',
        'assets/images/product/desk_walnut.png',
        'assets/images/product/desk_walnut.webp',
        'assets/images/decor_shop/ds_prod_fountain.png',
        'assets/images/decor/cascade_buddha_fountain.png'
    ]
    
    print("--- VERIFYING REALTIME REBUILT ASSETS ---")
    all_ok = True
    for t in targets:
        if not os.path.exists(t):
            print(f"FAIL: {t} does NOT exist.")
            all_ok = False
        else:
            size_kb = os.path.getsize(t) / 1024
            img = Image.open(t)
            print(f"OK: {t} exists | Size: {size_kb:.1f} KB | Dimensions: {img.size}")
            
    with open('furniture-shop.html', 'r', encoding='utf-8') as f:
        html1 = f.read()
        if 'fs_prod_desk.png' in html1 and 'Sterling Tables' in html1:
            print("OK: furniture-shop.html links fs_prod_desk.png for Sterling Tables")
        else:
            print("FAIL: furniture-shop.html missing link for Sterling Tables")
            all_ok = False

    with open('decor-shop.html', 'r', encoding='utf-8') as f:
        html2 = f.read()
        if 'ds_prod_fountain.png' in html2 and 'Cascade Sculptural' in html2:
            print("OK: decor-shop.html links ds_prod_fountain.png for Cascade Sculptural")
        else:
            print("FAIL: decor-shop.html missing link for Cascade Sculptural")
            all_ok = False
            
    if all_ok:
        print(">>> ALL REALTIME REBUILT ASSET VERIFICATIONS PASSED SUCCESSFULLY <<<")

if __name__ == '__main__':
    verify()
