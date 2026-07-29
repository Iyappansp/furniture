import urllib.request
import re
from PIL import Image
import io

# Let's search Pexels for vanity desk, vanity mirror, makeup table
def get_pexels_ids(query):
    url = f"https://www.pexels.com/search/{urllib.parse.quote(query)}/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8')
            matches = re.findall(r'https://images\.pexels\.com/photos/(\d+)/pexels-photo-\d+\.jpeg', html)
            return list(dict.fromkeys(matches))
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

vanity_ids = get_pexels_ids("vanity mirror") + get_pexels_ids("vanity table") + get_pexels_ids("makeup table mirror")
print(f"Total vanity IDs found: {len(vanity_ids)}")

for pid in vanity_ids[:8]:
    url = f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=1000"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data))
            out_path = f"scratch/img_test/vanity_{pid}.jpg"
            img.save(out_path)
            print(f"Saved {out_path} - size: {img.size}")
    except Exception as e:
        print(f"Failed {pid}: {e}")
