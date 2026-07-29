import urllib.request
import re
from PIL import Image
import os

def search_photos(query):
    url = f"https://unsplash.com/s/photos/{urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8')
            matches = re.findall(r'https://images\.unsplash\.com/photo-[0-9a-zA-Z\-]+', html)
            unique = list(dict.fromkeys(matches))
            print(f"Found {len(unique)} for '{query}':")
            for u in unique[:4]:
                print("  ", u)
            return unique
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

delivery_urls = search_photos("delivery-person-moving-furniture")
woodworking_urls = search_photos("woodworking-chisel-craftsman")
bench_urls = search_photos("bedroom-bench")
vanity_urls = search_photos("vanity-mirror-makeup-desk")
