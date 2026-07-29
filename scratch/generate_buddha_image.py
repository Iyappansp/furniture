import subprocess
import os
from PIL import Image, ImageEnhance, ImageFilter

def generate_buddha_render():
    html_content = '''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1024px;
    height: 1024px;
    background: radial-gradient(circle at 50% 55%, #342315 0%, #1A110A 50%, #0A0604 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .container {
    position: relative;
    width: 1024px;
    height: 1024px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* Warm table surface reflection */
  .table {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 300px;
    background: linear-gradient(to bottom, #1F140C 0%, #0C0704 100%);
    box-shadow: inset 0 3px 15px rgba(255,160,50,0.1);
    border-top: 1px solid rgba(212, 175, 55, 0.2);
  }
  /* Soft candle ambient glow */
  .warm-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -42%);
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(255, 150, 20, 0.35) 0%, rgba(255, 90, 0, 0.12) 40%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    filter: blur(35px);
  }
  .aura {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(255, 180, 50, 0.25) 0%, rgba(212, 175, 55, 0.08) 50%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    filter: blur(20px);
  }
</style>
</head>
<body>
<div class="container">
  <div class="warm-glow"></div>
  <div class="aura"></div>
  <div class="table"></div>
  <svg width="850" height="850" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" style="z-index: 10;">
    <defs>
      <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFF59D" stop-opacity="1"/>
        <stop offset="25%" stop-color="#FFB74D" stop-opacity="0.9"/>
        <stop offset="60%" stop-color="#F57C00" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>

      <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFE79A"/>
        <stop offset="20%" stop-color="#D4AF37"/>
        <stop offset="55%" stop-color="#997520"/>
        <stop offset="85%" stop-color="#543E0C"/>
        <stop offset="100%" stop-color="#241904"/>
      </linearGradient>

      <linearGradient id="bronzeDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#6B521E"/>
        <stop offset="50%" stop-color="#3D2D0F"/>
        <stop offset="100%" stop-color="#1B1306"/>
      </linearGradient>

      <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="softFlameGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="15" result="blur1" />
        <feGaussianBlur stdDeviation="5" result="blur2" />
        <feMerge>
          <feMergeNode in="blur1" />
          <feMergeNode in="blur2" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Base Pedestal (Double Lotus Tier) -->
    <path d="M 130 490 C 130 440, 190 420, 300 420 C 410 420, 470 440, 470 490 C 470 535, 130 535, 130 490 Z" fill="url(#goldMetallic)" stroke="#FFE79A" stroke-width="1"/>
    <!-- Lotus Petal Engravings -->
    <path d="M 150 495 C 190 460, 240 450, 300 450 C 360 450, 410 460, 450 495 C 410 525, 190 525, 150 495 Z" fill="url(#bronzeDark)" opacity="0.75"/>

    <!-- Meditating Legs Position -->
    <path d="M 155 480 C 175 395, 235 375, 300 375 C 365 375, 425 395, 445 480 Z" fill="url(#bronzeDark)"/>

    <!-- Main Torso & Robes -->
    <path d="M 195 385 C 185 295, 230 240, 300 230 C 370 240, 415 295, 405 385 Z" fill="url(#goldMetallic)"/>

    <!-- Elegant Robe Folds -->
    <path d="M 205 330 C 260 360, 340 360, 395 330 C 375 410, 225 410, 205 330 Z" fill="url(#bronzeDark)" opacity="0.8" />
    <path d="M 225 270 Q 300 325 375 285" stroke="#FFE79A" stroke-width="3" fill="none" opacity="0.85"/>
    <path d="M 235 290 Q 300 340 365 305" stroke="#D4AF37" stroke-width="2" fill="none" opacity="0.7"/>

    <!-- Neck & Head Assembly -->
    <rect x=\"284\" y=\"215\" width=\"32\" height=\"24\" rx=\"6\" fill=\"url(#goldMetallic)\"/>
    
    <!-- Buddha Head -->
    <ellipse cx="300" cy="180" rx="50" ry="60" fill="url(#goldMetallic)"/>
    
    <!-- Ushnisha (Spiritual Crown) -->
    <path d="M 282 122 C 282 95, 318 95, 318 122 Z" fill="url(#goldMetallic)"/>
    <circle cx="300" cy="94" r="9" fill="#FFE79A" filter="url(#glowFilter)"/>

    <!-- Serene Eyes & Facial Features -->
    <!-- Third Eye Bindi -->
    <circle cx="300" cy="160" r="4" fill="#FFE79A" filter="url(#glowFilter)"/>
    <!-- Closed Meditative Eyebrows & Lids -->
    <path d="M 273 176 Q 287 184 295 177" stroke="#3D2D0F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M 305 177 Q 313 184 327 176" stroke="#3D2D0F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- Nose Contour -->
    <path d="M 300 166 L 297 195 L 303 195" stroke="#7A5A1B" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Peaceful Soft Smile -->
    <path d="M 286 204 Q 300 214 314 204" stroke="#3D2D0F" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Elongated Earlobes -->
    <path d="M 246 168 Q 239 192 247 208" stroke="#D4AF37" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M 354 168 Q 361 192 353 208" stroke="#D4AF37" stroke-width="4.5" fill="none" stroke-linecap="round"/>

    <!-- Hand Posture Holding Tea Light Holder Bowl -->
    <!-- Arms -->
    <path d="M 195 320 C 210 390, 240 420, 265 420" stroke="url(#goldMetallic)" stroke-width="22" stroke-linecap="round" fill="none"/>
    <path d="M 405 320 C 390 390, 360 420, 335 420" stroke="url(#goldMetallic)" stroke-width="22" stroke-linecap="round" fill="none"/>

    <!-- Tea Light Holder Bowl (Sculpted Brass Lotus Bowl) -->
    <ellipse cx="300" cy="405" rx="70" ry="32" fill="url(#goldMetallic)" stroke="#FFE79A" stroke-width="2.5" filter="url(#glowFilter)"/>
    <ellipse cx="300" cy="400" rx="56" ry="22" fill="#1C120A"/>

    <!-- Metal Candle Cup Inside Bowl -->
    <ellipse cx="300" cy="398" rx="30" ry="12" fill="#D4AF37"/>
    <ellipse cx="300" cy="395" rx="26" ry="9" fill="#FFFDE7"/>

    <!-- Radiant Ambient Candle Light Bloom -->
    <circle cx="300" cy="370" r="75" fill="url(#candleGlow)" filter="url(#softFlameGlow)"/>

    <!-- Tea Light Flame Core -->
    <path d="M 300 340 C 290 368, 294 382, 300 386 C 306 382, 310 368, 300 340 Z" fill="#FFFFFF" filter="url(#glowFilter)"/>
    <path d="M 300 348 C 294 368, 296 378, 300 382 C 304 378, 306 368, 300 348 Z" fill="#FFF176"/>
    <path d="M 300 358 C 296 370, 298 376, 300 379 C 302 376, 304 370, 300 358 Z" fill="#FF7043"/>
    <path d="M 300 368 C 298 374, 299 377, 300 379 C 301 377, 302 374, 300 368 Z" fill="#D32F2F"/>
  </svg>
</div>
</body>
</html>'''

    os.makedirs('scratch', exist_ok=True)
    html_path = os.path.abspath('scratch/buddha_gen.html')
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    out_png = os.path.abspath('scratch/buddha_rendered.png')
    edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    
    cmd = [
        edge_path,
        '--headless',
        '--disable-gpu',
        f'--screenshot={out_png}',
        '--window-size=1024,1024',
        html_path
    ]
    
    print("Running Edge headless screenshot...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    print("Return code:", res.returncode)
    
    if os.path.exists(out_png):
        print(f"Successfully generated screenshot: {out_png}")
        # Post-process with PIL for optimal contrast, sharpness and warmth
        img = Image.open(out_png).convert('RGB')
        
        # Crop to square 1024x1024 if needed
        if img.size != (1024, 1024):
            img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
            
        enh_contrast = ImageEnhance.Contrast(img)
        img = enh_contrast.enhance(1.15)
        enh_sharp = ImageEnhance.Sharpness(img)
        img = enh_sharp.enhance(1.2)
        
        # Save to targets
        target_path_1 = 'assets/images/decor/noor_buddha_tlight.png'
        target_path_2 = 'assets/images/decor_shop/ds_prod_candleholder.png'
        
        os.makedirs(os.path.dirname(target_path_1), exist_ok=True)
        os.makedirs(os.path.dirname(target_path_2), exist_ok=True)
        
        img.save(target_path_1, quality=95)
        img.save(target_path_2, quality=95)
        print(f"Saved optimized image to {target_path_1} and {target_path_2}")
    else:
        print("Failed to generate screenshot file")

if __name__ == '__main__':
    generate_buddha_render()
