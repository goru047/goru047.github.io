// ==========================================================================
// Live Map Style Switcher - Let Users Choose!
// ==========================================================================

/**
 * Add to your map-app.js or create separate file: map-style-switcher.js
 */

// Map Style Definitions
const MAP_STYLES = {
  voyager: {
    name: 'Travel',
    description: 'Clean travel-focused design',
    tiles: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      options: {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }
    },
    ocean: 'radial-gradient(ellipse at 30% 40%, #c3e8ff 0%, #89d0f5 50%, #5eb3e0 100%)',
    icon: '🗺️'
  },
  
  positron: {
    name: 'Minimal',
    description: 'Light and clean',
    tiles: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      options: {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }
    },
    ocean: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)',
    icon: '✨'
  },
  
  dark: {
    name: 'Dark',
    description: 'Perfect for dark mode',
    tiles: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      options: {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }
    },
    ocean: 'radial-gradient(ellipse at 30% 40%, #1a3a52 0%, #0f2537 50%, #051624 100%)',
    icon: '🌙'
  },
  
  terrain: {
    name: 'Terrain',
    description: 'Natural landscape',
    tiles: {
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
      options: {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        subdomains: 'abcd',
        maxZoom: 18
      }
    },
    ocean: 'linear-gradient(180deg, #c8dde8 0%, #a8c9db 100%)',
    icon: '⛰️'
  },
  
  satellite: {
    name: 'Satellite',
    description: 'Real imagery',
    tiles: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18
      }
    },
    ocean: '#0a0a0a',
    icon: '🛰️'
  },
  
  ocean: {
    name: 'Ocean Only',
    description: 'No tiles, just ocean',
    tiles: null, // No tiles!
    ocean: 'linear-gradient(135deg, #a8dadc 0%, #457b9d 50%, #1d3557 100%)',
    icon: '🌊'
  }
};

// Current style tracking
let currentStyle = 'voyager';
let currentTileLayer = null;

// Initialize Map Style Switcher
function initMapStyleSwitcher(map) {
  // Create UI
  createStyleSwitcherUI();
  
  // Load saved preference or default
  const savedStyle = localStorage.getItem('mapStyle') || 'voyager';
  applyMapStyle(map, savedStyle);
  
  // Setup event listeners
  setupStyleSwitcherEvents(map);
}

// Create Style Switcher UI
function createStyleSwitcherUI() {
  const html = `
    <div class="map-style-switcher" id="map-style-switcher">
      <button class="style-switcher-toggle" id="style-switcher-toggle" title="Change map style">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
        </svg>
        <span>Map Style</span>
      </button>
      
      <div class="style-switcher-panel" id="style-switcher-panel">
        <div class="style-switcher-header">
          <h3>Map Style</h3>
          <button class="style-switcher-close" id="style-switcher-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="style-options" id="style-options">
          ${Object.keys(MAP_STYLES).map(styleKey => `
            <button class="style-option" data-style="${styleKey}">
              <span class="style-icon">${MAP_STYLES[styleKey].icon}</span>
              <div class="style-info">
                <div class="style-name">${MAP_STYLES[styleKey].name}</div>
                <div class="style-description">${MAP_STYLES[styleKey].description}</div>
              </div>
              <span class="style-check">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  // Insert into map wrapper
  const mapWrapper = document.getElementById('map-wrapper');
  if (mapWrapper) {
    mapWrapper.insertAdjacentHTML('beforeend', html);
  }
}

// Setup Event Listeners
function setupStyleSwitcherEvents(map) {
  const toggle = document.getElementById('style-switcher-toggle');
  const panel = document.getElementById('style-switcher-panel');
  const close = document.getElementById('style-switcher-close');
  const options = document.querySelectorAll('.style-option');
  
  // Toggle panel
  toggle.addEventListener('click', () => {
    panel.classList.toggle('active');
  });
  
  // Close panel
  close.addEventListener('click', () => {
    panel.classList.remove('active');
  });
  
  // Close on outside click
  document.addEventListener('click', (e) => {
    const switcher = document.getElementById('map-style-switcher');
    if (!switcher.contains(e.target)) {
      panel.classList.remove('active');
    }
  });
  
  // Style option clicks
  options.forEach(option => {
    option.addEventListener('click', () => {
      const styleKey = option.dataset.style;
      applyMapStyle(map, styleKey);
      panel.classList.remove('active');
    });
  });
}

// Apply Map Style
function applyMapStyle(map, styleKey) {
  if (!MAP_STYLES[styleKey]) return;
  
  const style = MAP_STYLES[styleKey];
  
  // Remove current tile layer
  if (currentTileLayer) {
    map.removeLayer(currentTileLayer);
    currentTileLayer = null;
  }
  
  // Add new tile layer (if exists)
  if (style.tiles) {
    currentTileLayer = L.tileLayer(style.tiles.url, style.tiles.options);
    currentTileLayer.addTo(map);
  }
  
  // Apply ocean background
  const mapElement = document.getElementById('map');
  if (mapElement) {
    mapElement.style.background = style.ocean;
  }
  
  // Update UI
  currentStyle = styleKey;
  updateStyleSwitcherUI(styleKey);
  
  // Save preference
  localStorage.setItem('mapStyle', styleKey);
  
  // Show notification
  showStyleChangeNotification(style.name);
}

// Update UI to show active style
function updateStyleSwitcherUI(activeStyle) {
  const options = document.querySelectorAll('.style-option');
  options.forEach(option => {
    if (option.dataset.style === activeStyle) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

// Show notification
function showStyleChangeNotification(styleName) {
  // Remove existing notification
  const existing = document.querySelector('.style-notification');
  if (existing) existing.remove();
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = 'style-notification';
  notification.innerHTML = `
    <span>${MAP_STYLES[Object.keys(MAP_STYLES).find(k => MAP_STYLES[k].name === styleName)].icon}</span>
    <span>Switched to <strong>${styleName}</strong> style</span>
  `;
  
  document.body.appendChild(notification);
  
  // Show animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Hide after 2 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Export for use in your main map initialization
// In your existing map-app.js, after creating the map:
// initMapStyleSwitcher(map);