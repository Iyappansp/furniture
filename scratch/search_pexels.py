import urllib.request
import re
import json

def search_pexels(query):
    url = f"https://www.pexels.com/search/{urllib.parse.quote(query)}/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'})
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8')
            matches = re.findall(r'https://images\.pexels\.com/photos/\d+/pexels-photo-\d+\.jpeg[^\"]*', html)
            unique = list(dict.fromkeys(matches))
            print(f"Found {len(unique)} for '{query}':")
            for u in unique[:4]:
                print("  ", u)
            return unique
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

search_pexels("delivery sofa")
search_pexels("woodworking chisel joint")
search_pexels("bedroom bench bed")
search_pexels("vanity mirror makeup desk")
