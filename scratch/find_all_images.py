import os
from PIL import Image

def find_photo_assets():
    root = 'assets/images'
    photo_files = []
    for dirpath, _, filenames in os.walk(root):
        for f in filenames:
            if f.endswith(('.png', '.jpg', '.jpeg', '.webp')):
                full_path = os.path.join(dirpath, f)
                try:
                    img = Image.open(full_path)
                    photo_files.append((full_path, img.size, img.mode))
                except Exception as e:
                    pass
    
    print(f"Total image files found: {len(photo_files)}")
    for path, size, mode in sorted(photo_files):
        print(f"{path} -> {size} ({mode})")

if __name__ == '__main__':
    find_photo_assets()
