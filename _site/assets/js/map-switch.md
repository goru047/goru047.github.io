# Manual Map Tile Switching - Copy & Paste

Just replace the tile layer code block with any option below!

---

## Current Code (Boring):

```javascript
// Add tile layer - fixed to use OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(config.map);
```

---

## Option 1: CartoDB Voyager (Travel) 🗺️ ⭐ RECOMMENDED

**Best for travel blogs!** Clean, warm colors, travel-focused.

```javascript
// Add tile layer - CartoDB Voyager (Travel style)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(config.map);
```

---

## Option 2: CartoDB Positron (Minimal) ✨

**Very clean and minimal.** Light, modern, not cluttered.

```javascript
// Add tile layer - CartoDB Positron (Minimal style)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(config.map);
```

---

## Option 3: CartoDB Dark Matter (Dark) 🌙

**Perfect for dark mode.** Dark background, light labels.

```javascript
// Add tile layer - CartoDB Dark Matter (Dark style)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(config.map);
```

---

## Option 4: Stamen Terrain (Natural) ⛰️

**Beautiful terrain.** Mountains, rivers, natural features.

```javascript
// Add tile layer - Stamen Terrain (Natural landscape)
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  maxZoom: 18
}).addTo(config.map);
```

---

## Option 5: Stamen Toner Lite (Ink Style) 🖊️

**Artistic, minimal.** Black and white, ink-style map.

```javascript
// Add tile layer - Stamen Toner Lite (Ink style)
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  maxZoom: 18
}).addTo(config.map);
```

---

## Option 6: Esri World Imagery (Satellite) 🛰️

**Real satellite photos.** Dramatic, realistic imagery.

```javascript
// Add tile layer - Esri Satellite (Real imagery)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  maxZoom: 18
}).addTo(config.map);
```

---

## Option 7: Esri World Street Map (Professional) 🏙️

**Clean professional.** Business-style map with clear labels.

```javascript
// Add tile layer - Esri Street Map (Professional style)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles © Esri — Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom',
  maxZoom: 18
}).addTo(config.map);
```

---

## Option 8: NO TILES - Just Beautiful Ocean 🌊

**Fastest option!** No external tiles, just gradient background.

```javascript
// NO tile layer - just ocean gradient background
// (Comment out or remove the L.tileLayer code entirely)
```

**Then add ocean background in `_sass/_map.scss`:**

```scss
#map {
  background: radial-gradient(
    ellipse at 30% 40%,
    #c3e8ff 0%,
    #89d0f5 50%,
    #5eb3e0 100%
  );
  
  @media (prefers-color-scheme: dark) {
    background: radial-gradient(
      ellipse at 30% 40%,
      #1a3a52 0%,
      #0f2537 50%,
      #051624 100%
    );
  }
}
```

---

## Comparison Table

| Option | Style | Speed | Data Usage | Best For |
|--------|-------|-------|------------|----------|
| **Voyager** ⭐ | Travel-focused | Fast | Low | Your blog! |
| **Positron** | Minimal | Fast | Low | Clean design |
| **Dark Matter** | Dark | Fast | Low | Dark mode |
| **Terrain** | Natural | Medium | Medium | Outdoor |
| **Toner Lite** | Ink style | Medium | Low | Artistic |
| **Satellite** | Real photos | Slow | High | Dramatic |
| **Street Map** | Professional | Medium | Medium | Business |
| **Ocean Only** | Custom | Fastest | None | Full control |

---

## How to Use

### 1. Find the code block in your `map-app.js`:

Look for:
```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
```

### 2. Replace entire block:

Delete from `L.tileLayer(` to `}).addTo(config.map);`

### 3. Paste your chosen option:

Copy one of the options above.

### 4. Save and restart:

```bash
bundle exec jekyll serve
```

### 5. Refresh browser:

Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## Add Ocean Background (Optional but Recommended)

For any tile style, you can add a beautiful ocean background underneath!

**In `_sass/_map.scss`**, find `#map {` and add:

```scss
#map {
  // Add this for beautiful ocean
  background: radial-gradient(
    ellipse at 30% 40%,
    #c3e8ff 0%,
    #89d0f5 50%,
    #5eb3e0 100%
  );
  
  // Dark mode ocean
  @media (prefers-color-scheme: dark) {
    background: radial-gradient(
      ellipse at 30% 40%,
      #1a3a52 0%,
      #0f2537 50%,
      #051624 100%
    );
  }
  
  // Your existing styles...
  width: 100%;
  height: 100%;
  // etc...
}
```

---

## Ocean Background Options

### Ocean 1: Bright Blue (Recommended)
```scss
background: radial-gradient(ellipse at 30% 40%, #c3e8ff, #89d0f5, #5eb3e0);
```

### Ocean 2: Realistic Deep Blue
```scss
background: linear-gradient(135deg, #a8dadc, #457b9d, #1d3557);
```

### Ocean 3: Turquoise
```scss
background: linear-gradient(135deg, #7dd3c0, #5fb3a1, #449388);
```

### Ocean 4: Soft Pastel
```scss
background: linear-gradient(180deg, #dbeafe, #bfdbfe, #93c5fd);
```

### Ocean 5: Dark Ocean (for dark tiles)
```scss
background: linear-gradient(135deg, #0d1b2a, #1b263b, #0d1b2a);
```

---

## My Recommendation

### For Your Travel Blog:

**Tiles**: CartoDB Voyager  
**Ocean**: Bright Blue gradient

**Copy this:**

```javascript
// In map-app.js
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(config.map);
```

```scss
// In _sass/_map.scss, inside #map { }
background: radial-gradient(ellipse at 30% 40%, #c3e8ff, #89d0f5, #5eb3e0);
```

---

## Test Different Styles

Want to try them all? Just:

1. Copy one option
2. Paste in map-app.js
3. Save
4. Refresh browser
5. Repeat with different option

Takes 30 seconds to switch! Try all 8 and pick your favorite.

---

## Before & After

**Before**: 
- Gray OpenStreetMap
- Cluttered with roads
- Boring

**After** (Voyager + Ocean):
- Clean travel colors
- Beautiful ocean background
- Professional look
- 10x better! ✨

---

## Common Questions

**Q: Can I use multiple tile layers?**  
A: Yes! Add multiple `L.tileLayer()` calls. Last one shows on top.

**Q: Which is fastest?**  
A: Ocean Only (no tiles) > CartoDB (Voyager/Positron/Dark) > Others

**Q: Which uses least data?**  
A: Ocean Only (zero) > CartoDB (light tiles) > Satellite (heavy)

**Q: Can I make my own tiles?**  
A: Yes, but requires tile server. These free options are easier!

**Q: Will this break anything?**  
A: No! Just changing the background map. Your countries still work.

---

## Troubleshooting

**Tiles not loading?**
- Check browser console for errors
- Try different tile provider
- Check internet connection

**Ocean not showing?**
- Make sure CSS is in `#map` selector
- Check if map has background-color elsewhere
- Inspect element in browser DevTools

**Tiles loading slow?**
- Satellite is slowest
- Try CartoDB (faster)
- Or use Ocean Only (instant!)

---

**That's it! Just copy & paste one option. 30 seconds to beautiful map!** 🎨