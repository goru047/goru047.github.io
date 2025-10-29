// ==========================================================================
// Interactive Map Application
// ==========================================================================

(function() {
  'use strict';
  
  // Ensure siteData exists (fallback if include doesn't load)
  if (typeof window.siteData === 'undefined') {
    window.siteData = {
      map: {
        center: [20, 0],
        initialZoom: 2,
        minZoom: 2,
        maxZoom: 18
      },
      colors: {
        visited: '#10b981',
        unvisited: '#e5e7eb',
        hover: '#34d399',
        active: '#059669'
      }
    };
  }
  
  // Configuration
  const config = {
    map: null,
    currentLevel: 'world',
    currentCountry: null,
    currentCity: null,
    mapData: null,
    layers: {
      countries: null,
      cities: null,
      pois: null
    }
  };
  
  // Initialize map when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
  });
  
  // ==========================================================================
  // Map Initialization
  // ==========================================================================
  
  function initializeMap() {
    const mapElement = document.getElementById('map');
    const loadingIndicator = document.getElementById('map-loading');
    
    if (!mapElement) {
      console.log('Map element not found');
      return;
    }
    
    // Hide loading indicator
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
    
    // Get site configuration from Jekyll
    const mapConfig = window.siteData?.map || {
      center: [20, 0],
      initialZoom: 2,
      minZoom: 2,
      maxZoom: 18
    };
    
    // Initialize Leaflet map
    config.map = L.map('map', {
      center: mapConfig.center,
      zoom: mapConfig.initialZoom,
      minZoom: mapConfig.minZoom,
      maxZoom: mapConfig.maxZoom,
      zoomControl: true
    });
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(config.map);
    
    // Load map data
    loadMapData();
    
    // Set up event listeners
    setupEventListeners();
  }
  
  // ==========================================================================
  // Data Loading
  // ==========================================================================
  
  function loadMapData() {
    // Try to load map data from Jekyll-generated JSON
    fetch('/assets/data/map-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Map data not found');
        }
        return response.json();
      })
      .then(data => {
        config.mapData = data;
        loadCountries();
        loadBlogCards();
      })
      .catch(error => {
        console.log('Map data not available yet:', error.message);
        showPlaceholder();
      });
  }
  
  function showPlaceholder() {
    // Show placeholder message until Part 5 (blog posts exist)
    const placeholder = L.marker([20, 0], {
      icon: L.divIcon({
        className: 'map-placeholder-icon',
        html: '<div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; white-space: nowrap;"><strong>🗺️ Interactive Map Ready!</strong><br><small>Add blog posts in Part 5 to see your travels</small></div>',
        iconSize: [250, 80]
      })
    }).addTo(config.map);
    
    // Show empty state for blog cards
    const emptyState = document.getElementById('empty-state');
    if (emptyState) {
      emptyState.style.display = 'block';
    }
  }
  
  // ==========================================================================
  // Country Layer
  // ==========================================================================
  
  function loadCountries() {
    if (!config.mapData || !config.mapData.countries) {
      console.log('No map data available');
      return;
    }
    
    console.log('Loading countries from map-data.json:', Object.keys(config.mapData.countries));
    
    // Load country boundaries from Natural Earth GeoJSON
    fetch('/assets/geo/countries.geojson')
      .then(response => {
        if (!response.ok) throw new Error('GeoJSON not found');
        return response.json();
      })
      .then(geojson => {
        console.log(`GeoJSON loaded: ${geojson.features.length} countries`);
        
        // Store country layers for later access
        const countryLayers = {};
        
        config.layers.countries = L.geoJSON(geojson, {
          style: function(feature) {
            // Use NAME_EN directly from Natural Earth GeoJSON
            const countryName = feature.properties.NAME_EN || feature.properties.NAME;
            
            // Check if this country is visited in your blog data
            const isVisited = config.mapData.countries[countryName]?.visited || false;
            
            return {
              fillColor: isVisited ? window.siteData.colors.visited : window.siteData.colors.unvisited,
              fillOpacity: isVisited ? 0.5 : 0.2,
              color: '#ffffff',
              weight: 1,
              opacity: 0.8
            };
          },
          onEachFeature: function(feature, layer) {
            // Use NAME_EN directly from Natural Earth GeoJSON
            const countryName = feature.properties.NAME_EN || feature.properties.NAME;
            const countryData = config.mapData.countries[countryName];
            
            // Store the layer for this country
            countryLayers[countryName] = layer;
            
            // Log visited countries for debugging
            if (countryData && countryData.visited) {
              console.log(`✓ Loaded visited country: ${countryName}`);
            }
            
            // Add hover effect
            layer.on('mouseover', function(e) {
              const isVisited = countryData?.visited || false;
              layer.setStyle({
                fillOpacity: isVisited ? 0.7 : 0.3,
                weight: 2
              });
            });
            
            layer.on('mouseout', function(e) {
              const isVisited = countryData?.visited || false;
              layer.setStyle({
                fillOpacity: isVisited ? 0.5 : 0.2,
                weight: 1
              });
            });
            
            // Add click handler for visited countries
            if (countryData && countryData.visited) {
              layer.on('click', function(e) {
                // Get bounds from the layer geometry (polygon coordinates)
                const bounds = layer.getBounds();
                // Store bounds in countryData for centering
                countryData.bounds = bounds;
                zoomToCountry(countryName, countryData, layer);
              });
              
              // Tooltip for visited countries
              layer.bindTooltip(countryName, {
                sticky: true,
                className: 'country-tooltip'
              });
            } else {
              // Tooltip for unvisited countries
              layer.bindTooltip(countryName, {
                sticky: true,
                className: 'country-tooltip-unvisited'
              });
            }
          }
        }).addTo(config.map);
        
        // Store country layers reference for highlighting
        config.countryLayers = countryLayers;
        
        console.log('Visited countries loaded on map:', 
          Object.keys(countryLayers).filter(name => config.mapData.countries[name]?.visited));
      })
      .catch(error => {
        console.error('GeoJSON error:', error);
        console.log('Falling back to country markers');
        // Fallback: Create markers for visited countries
        createCountryMarkers();
      });
  }
  
  function createCountryMarkers() {
    console.log('Creating country markers as fallback');
    // Fallback: Create markers for visited countries
    let markerCount = 0;
    Object.keys(config.mapData.countries).forEach(countryName => {
      const country = config.mapData.countries[countryName];
      console.log(`Country: ${countryName}, visited: ${country.visited}, center:`, country.center);
      
      if (country.visited && country.center) {
        const marker = L.circleMarker(country.center, {
          radius: 15,
          fillColor: window.siteData.colors.visited,
          fillOpacity: 0.8,
          color: '#ffffff',
          weight: 3
        }).addTo(config.map);
        
        marker.bindTooltip(countryName);
        marker.on('click', function() {
          zoomToCountry(countryName, country);
        });
        
        markerCount++;
      }
    });
    console.log(`Created ${markerCount} country markers`);
  }
  
  // ==========================================================================
  // City Layer
  // ==========================================================================
  
  function loadCities(countryName) {
    const country = config.mapData.countries[countryName];
    if (!country || !country.cities) {
      return;
    }
    
    // Clear existing city layer
    if (config.layers.cities) {
      config.map.removeLayer(config.layers.cities);
    }
    
    // Create layer group for cities
    config.layers.cities = L.layerGroup().addTo(config.map);
    
    country.cities.forEach(cityName => {
      const city = config.mapData.cities[cityName];
      if (!city) return;
      
      const marker = L.circleMarker(city.coordinates, {
        radius: 8,
        fillColor: city.visited ? window.siteData.colors.visited : window.siteData.colors.unvisited,
        fillOpacity: 0.8,
        color: '#ffffff',
        weight: 2
      });
      
      marker.bindTooltip(cityName);
      
      if (city.visited) {
        marker.on('click', function() {
          zoomToCity(cityName, city);
        });
      }
      
      config.layers.cities.addLayer(marker);
    });
  }
  
  // ==========================================================================
  // POI Layer
  // ==========================================================================
  
  function loadPOIs(cityName) {
    const city = config.mapData.cities[cityName];
    if (!city || !city.pois) {
      return;
    }
    
    // Clear existing POI layer
    if (config.layers.pois) {
      config.map.removeLayer(config.layers.pois);
    }
    
    // Create layer group for POIs
    config.layers.pois = L.layerGroup().addTo(config.map);
    
    city.pois.forEach(poiId => {
      const poi = config.mapData.pois[poiId];
      if (!poi) return;
      
      const marker = L.marker(poi.coordinates, {
        icon: L.divIcon({
          className: 'poi-marker',
          html: '<div style="background: ' + window.siteData.colors.visited + '; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
      });
      
      marker.bindPopup(`
        <div style="padding: 10px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px;">${poi.name}</h3>
          <p style="margin: 0; color: #666; font-size: 14px;">${poi.city}, ${poi.country}</p>
        </div>
      `);
      
      config.layers.pois.addLayer(marker);
    });
  }
  
  // ==========================================================================
  // Navigation & Zoom
  // ==========================================================================
  
  function zoomToCountry(countryName, countryData, layer) {
    config.currentLevel = 'country';
    config.currentCountry = countryName;
    config.currentCity = null;
    
    // Update breadcrumb
    updateBreadcrumb();
    
    // Clear city and POI layers
    if (config.layers.cities) {
      config.map.removeLayer(config.layers.cities);
    }
    if (config.layers.pois) {
      config.map.removeLayer(config.layers.pois);
    }
    
    // Highlight selected country
    if (config.countryLayers) {
      // Reset all countries to default style
      Object.keys(config.countryLayers).forEach(name => {
        const l = config.countryLayers[name];
        const visited = config.mapData.countries[name]?.visited || false;
        l.setStyle({
          fillColor: visited ? window.siteData.colors.visited : window.siteData.colors.unvisited,
          fillOpacity: visited ? 0.5 : 0.2,
          weight: 1
        });
      });
      
      // Highlight selected country
      if (config.countryLayers[countryName]) {
        config.countryLayers[countryName].setStyle({
          fillColor: '#3b82f6',
          fillOpacity: 0.6,
          weight: 3
        });
      }
    }
    
    // Zoom to country with proper bounds fitting
    if (countryData.bounds) {
      // Use bounds from the GeoJSON geometry for accurate centering
      config.map.fitBounds(countryData.bounds, {
        padding: [80, 80],  // Increased padding for better view
        maxZoom: 7,  // Zoom in more for drill-down capability
        animate: true,
        duration: 0.8
      });
    } else if (layer && layer.getBounds) {
      // Get bounds from layer if not already stored
      const bounds = layer.getBounds();
      config.map.fitBounds(bounds, {
        padding: [80, 80],
        maxZoom: 7,
        animate: true,
        duration: 0.8
      });
    } else if (countryData.center) {
      // Fallback to center point with higher zoom
      config.map.setView(countryData.center, 6, {
        animate: true,
        duration: 0.8
      });
    }
    
    // Load cities after zoom animation
    setTimeout(() => loadCities(countryName), 500);
    
    // Update blog cards
    loadBlogCards(countryName);
  }
  
  function zoomToCity(cityName, cityData) {
    config.currentLevel = 'city';
    config.currentCity = cityName;
    
    // Update breadcrumb
    updateBreadcrumb();
    
    // Clear POI layer
    if (config.layers.pois) {
      config.map.removeLayer(config.layers.pois);
    }
    
    // Zoom to city
    config.map.setView(cityData.coordinates, 13);
    
    // Load POIs
    setTimeout(() => loadPOIs(cityName), 300);
    
    // Update blog cards
    loadBlogCards(config.currentCountry, cityName);
  }
  
  function resetToWorld() {
    config.currentLevel = 'world';
    config.currentCountry = null;
    config.currentCity = null;
    
    // Update breadcrumb
    updateBreadcrumb();
    
    // Clear layers
    if (config.layers.cities) {
      config.map.removeLayer(config.layers.cities);
    }
    if (config.layers.pois) {
      config.map.removeLayer(config.layers.pois);
    }
    
    // Reset all country styles
    if (config.countryLayers) {
      Object.keys(config.countryLayers).forEach(name => {
        const layer = config.countryLayers[name];
        const visited = config.mapData.countries[name]?.visited || false;
        layer.setStyle({
          fillColor: visited ? window.siteData.colors.visited : window.siteData.colors.unvisited,
          fillOpacity: visited ? 0.5 : 0.2,
          weight: 1
        });
      });
    }
    
    // Reset view
    const mapConfig = window.siteData?.map || { center: [20, 0], initialZoom: 2 };
    config.map.setView(mapConfig.center, mapConfig.initialZoom, {
      animate: true,
      duration: 0.8
    });
    
    // Show all blog cards
    loadBlogCards();
  }
  
  // ==========================================================================
  // Breadcrumb Navigation
  // ==========================================================================
  
  function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;
    
    let html = '<button class="breadcrumb-item" data-level="world">🌍 World</button>';
    
    if (config.currentCountry) {
      html += `<button class="breadcrumb-item" data-level="country" data-name="${config.currentCountry}">${config.currentCountry}</button>`;
    }
    
    if (config.currentCity) {
      html += `<button class="breadcrumb-item active" data-level="city">${config.currentCity}</button>`;
    } else if (config.currentCountry) {
      html = html.replace('data-level="country"', 'class="breadcrumb-item active" data-level="country"');
    } else {
      html = html.replace('data-level="world"', 'class="breadcrumb-item active" data-level="world"');
    }
    
    breadcrumb.innerHTML = html;
  }
  
  // ==========================================================================
  // Blog Cards
  // ==========================================================================
  
  function loadBlogCards(country, city) {
    const container = document.getElementById('blog-cards');
    const emptyState = document.getElementById('empty-state');
    const titleEl = document.getElementById('blog-section-title');
    const subtitleEl = document.getElementById('blog-section-subtitle');
    
    if (!container) return;
    
    // Clear existing cards
    container.innerHTML = '';
    
    if (!config.mapData || !config.mapData.blogPosts) {
      if (emptyState) emptyState.style.display = 'block';
      return;
    }
    
    // Filter posts based on current view
    let filteredPosts = Object.values(config.mapData.blogPosts);
    
    if (city) {
      filteredPosts = filteredPosts.filter(post => 
        post.cities && post.cities.includes(city)
      );
      if (titleEl) titleEl.textContent = `Posts about ${city}`;
      if (subtitleEl) subtitleEl.textContent = `Explore ${city} through my travels`;
    } else if (country) {
      filteredPosts = filteredPosts.filter(post => 
        post.countries && post.countries.includes(country)
      );
      if (titleEl) titleEl.textContent = `Posts about ${country}`;
      if (subtitleEl) subtitleEl.textContent = `Explore ${country} through my travels`;
    } else {
      if (titleEl) titleEl.textContent = 'Recent Adventures';
      if (subtitleEl) subtitleEl.textContent = 'Explore the world through my travels';
    }
    
    // Sort by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (filteredPosts.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      
      // Render cards
      filteredPosts.forEach(post => {
        container.innerHTML += createBlogCardHTML(post);
      });
    }
  }
  
  function createBlogCardHTML(post) {
    const imageHTML = post.featured_image 
      ? `<img src="${post.featured_image}" alt="${post.title}" class="card-image" loading="lazy">`
      : `<div class="card-image-placeholder"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;
    
    const locations = [];
    if (post.countries) {
      post.countries.forEach(c => locations.push(`<span class="location-badge">${c}</span>`));
    }
    if (post.cities && post.cities.length > 0) {
      post.cities.slice(0, 2).forEach(c => locations.push(`<span class="location-badge">${c}</span>`));
    }
    
    const tags = post.tags ? post.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('') : '';
    
    return `
      <article class="post-card">
        <a href="${post.url}" class="post-card-link">
          <div class="card-image-wrapper">${imageHTML}</div>
          <div class="card-content">
            <div class="card-meta">
              <time datetime="${post.date}">${formatDate(post.date)}</time>
              ${post.tags && post.tags.length > 0 ? `<span class="separator">•</span><span class="card-category">${post.tags[0]}</span>` : ''}
            </div>
            <h3 class="card-title">${post.title}</h3>
            ${post.excerpt ? `<p class="card-excerpt">${post.excerpt}</p>` : ''}
            ${locations.length > 0 ? `<div class="card-locations"><svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>${locations.join('')}</div>` : ''}
            ${tags ? `<div class="card-tags">${tags}</div>` : ''}
            <div class="card-footer">
              <span class="read-more">Read More <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></span>
            </div>
          </div>
        </a>
      </article>
    `;
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  
  // ==========================================================================
  // Event Listeners
  // ==========================================================================
  
  function setupEventListeners() {
    // Breadcrumb clicks
    document.addEventListener('click', function(e) {
      if (e.target.matches('.breadcrumb-item[data-level="world"]')) {
        resetToWorld();
      } else if (e.target.matches('.breadcrumb-item[data-level="country"]')) {
        const countryName = e.target.dataset.name;
        const countryData = config.mapData?.countries[countryName];
        if (countryData) {
          zoomToCountry(countryName, countryData);
        }
      }
    });
    
    // Reset view button
    const resetBtn = document.getElementById('reset-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetToWorld);
    }
  }
  
})();