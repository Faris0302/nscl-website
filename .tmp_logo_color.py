import os
from PIL import Image
os.chdir(r'C:\Users\Faris\OneDrive\Documents\NSCL\Website React\national-steel-complex-limited-(nscl)')
img = Image.open(r'public\NSCL_Final_Logo-1.png').convert('RGBA')
counts = {}
for px in img.getdata():
    r,g,b,a = px
    if a < 128:
        continue
    if r < 30 and g < 30 and b < 30:
        continue
    counts[(r,g,b)] = counts.get((r,g,b), 0) + 1
for color, count in sorted(counts.items(), key=lambda kv: kv[1], reverse=True)[:20]:
    print(color, count)
