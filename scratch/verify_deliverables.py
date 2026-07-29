import os
from PIL import Image

def verify_all():
    print("================ VERIFYING ALL DELIVERABLES ================")
    all_passed = True

    # 1. Product Images Verification
    required_images = [
        'assets/images/decor_shop/ds_prod_fountain.png',
        'assets/images/decor/cascade_buddha_fountain.png',
        'assets/images/decor_shop/ds_prod_mirror.png',
        'assets/images/decor/artistry_brass_mirror.png',
        'assets/images/decor_shop/ds_prod_candleholder.png',
        'assets/images/decor_shop/ds_prod_noor_alabaster_glass.png',
        'assets/images/decor/noor_alabaster_glass.png',
        'assets/images/home1/hero_collab_furniture_decor.png',
        'assets/images/home1/hero_collab_furniture_decor.webp',
        'assets/images/furniture_shop/hero_collab_furniture_decor.png'
    ]

    print("\n--- 1. Image Files Check ---")
    for img_path in required_images:
        if os.path.exists(img_path) and os.path.getsize(img_path) > 0:
            with Image.open(img_path) as im:
                print(f"[PASS] {img_path} ({im.width}x{im.height}, {os.path.getsize(img_path)} bytes)")
        else:
            print(f"[FAIL] Missing or empty image: {img_path}")
            all_passed = False

    # 2. Check furniture-store.js description removal
    print("\n--- 2. JS Logic Check (furniture-store.js) ---")
    with open('assets/js/furniture-store.js', 'r', encoding='utf-8') as f:
        js_content = f.read()

    if '<p class="furniture-card-desc">${prod.description}</p>' not in js_content:
        print("[PASS] Product descriptions successfully removed from card markup in assets/js/furniture-store.js")
    else:
        print("[FAIL] Product descriptions are still present in assets/js/furniture-store.js")
        all_passed = False

    # 3. Check index.html hero image reference
    print("\n--- 3. Hero Section Markup Check (index.html) ---")
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    if 'hero_collab_furniture_decor.png' in html_content:
        print("[PASS] index.html hero correctly references hero_collab_furniture_decor.png")
    else:
        print("[FAIL] index.html does not reference hero_collab_furniture_decor.png")
        all_passed = False

    print("\n================ FINAL VERIFICATION RESULT ================")
    if all_passed:
        print("ALL VERIFICATIONS PASSED SUCCESSFULLY!")
    else:
        print("SOME VERIFICATIONS FAILED!")
        exit(1)

if __name__ == '__main__':
    verify_all()
