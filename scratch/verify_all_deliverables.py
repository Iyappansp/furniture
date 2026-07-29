import os
from PIL import Image

def verify():
    targets = [
        ('Index Hero Image', 'assets/images/home1/hero_collab_furniture_decor.png', 'index.html'),
        ('Furniture Lookbook Image', 'assets/images/furniture_store/lookbook_furniture_sanctuary.png', 'furniture-store.html'),
        ('Decor Lookbook Image', 'assets/images/decor_store/lookbook_decor_gallery.png', 'decor-store.html')
    ]
    
    all_ok = True
    print("--- DELIVERABLES VERIFICATION ---")
    for name, img_path, html_file in targets:
        if not os.path.exists(img_path):
            print(f"[FAIL] {name}: Image path '{img_path}' does not exist.")
            all_ok = False
            continue
        
        img = Image.open(img_path)
        size_bytes = os.path.getsize(img_path)
        print(f"[PASS] {name}: {img_path} ({img.size[0]}x{img.size[1]}px, {size_bytes/1024:.1f} KB)")
        
        # Check HTML reference
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            img_basename = os.path.basename(img_path)
            if img_basename in content:
                print(f"       -> Reference in '{html_file}': VERIFIED")
            else:
                print(f"       -> Reference in '{html_file}': MISSING ({img_basename})")
                all_ok = False
                
    if all_ok:
        print("\nALL DELIVERABLES SUCCESSFULLY VERIFIED!")
    else:
        print("\nSOME VERIFICATIONS FAILED.")

if __name__ == '__main__':
    verify()
