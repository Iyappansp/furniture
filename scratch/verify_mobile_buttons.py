import os
import re

html_files = [
    "gallery.html", "home-2.html", "index.html", "furniture-shop.html",
    "decor-shop.html", "furniture-store.html", "decor-store.html",
    "services.html", "about.html", "contact.html", "login.html", "signup.html"
]

print("Checking button containers across HTML files...")
for hf in html_files:
    if os.path.exists(hf):
        with open(hf, "r", encoding="utf-8") as f:
            content = f.read()
            actions_matches = re.findall(r'class="[^"]*actions[^"]*"', content)
            print(f"{hf}: found {len(actions_matches)} action container matches")

with open("assets/css/responsive.css", "r", encoding="utf-8") as f:
    css = f.read()
    if ".story-footer-actions" in css and ".hero-actions" in css and ".cta-band-actions" in css:
        print("responsive.css contains all critical 1-by-1 mobile button stacking rules!")
    else:
        print("WARNING: missing rules in responsive.css")
