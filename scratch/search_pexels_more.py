import urllib.request
import re

def search_pexels_term(term):
    url = f"https://www.pexels.com/search/{term}/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'})
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8')
            matches = re.findall(r'https://images\.pexels\.com/photos/(\d+)/pexels-photo-\d+\.jpeg', html)
            unique_ids = list(dict.fromkeys(matches))
            print(f"Found {len(unique_ids)} photo IDs for '{term}': {unique_ids[:6]}")
            return unique_ids
    except Exception as e:
        print(f"Error {term}: {e}")
        return []

search_pexels_term("bedroom%20bench")
search_pexels_term("vanity%20table")
search_pexels_term("makeup%20vanity%20mirror")
search_pexels_term("bedroom%20ottoman")
