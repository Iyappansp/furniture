import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
missing = []

for hf in html_files:
    with open(hf, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # find all src attributes
    matches = re.findall(r'src=["\']([^"\']+)["\']', content)
    for m in matches:
        if m.startswith('http') or m.startswith('//') or m.startswith('#') or m.startswith('data:'):
            continue
        # check file existence
        # remove anchor/query if any
        clean_path = m.split('?')[0].split('#')[0]
        if not os.path.exists(clean_path):
            missing.append((hf, m))

if missing:
    print(f"FOUND {len(missing)} BROKEN IMAGE / SRC REFERENCES:")
    for hf, path in missing:
        print(f"  [{hf}] -> {path}")
else:
    print("ALL HTML SRC REFERENCES ARE VALID AND EXIST ON DISK!")
