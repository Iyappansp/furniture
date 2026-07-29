import urllib.request
from PIL import Image
import io
import os

os.makedirs("scratch/img_test", exist_ok=True)

# Pexels direct image template: https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=1200

candidates = {
    'delivery': ['7464406', '7464405', '4506225', '7464395'],
    'shape_join': ['5974412', '5974400', '8985458', '5974384'],
    'bedroom_bench': ['8725595', '12715495', '8553209', '6958136', '7220521'],
    'vanity_mirror': ['17096253', '7018392', '7383150', '6315796', '8433509']
}

for cat, ids in candidates.items():
    print(f"=== Category: {cat} ===")
    for pid in ids:
        url = f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=1000"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as resp:
                data = resp.read()
                img = Image.open(io.BytesIO(data))
                out_path = f"scratch/img_test/{cat}_{pid}.jpg"
                img.save(out_path)
                print(f"Saved {out_path} - size: {img.size}")
        except Exception as e:
            print(f"Failed {pid}: {e}")
