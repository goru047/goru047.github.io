#!/usr/bin/env python3
"""
Download Country Boundaries GeoJSON
Downloads simplified country boundaries from Natural Earth Data
"""

import json
import urllib.request
from pathlib import Path

def download_countries_geojson(output_file):
    """Download simplified country boundaries"""
    
    print("Downloading country boundaries from Natural Earth Data...")
    print("This may take a minute...")
    
    # Natural Earth 110m (simplified) countries
    url = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
    
    try:
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode())
        
        print(f"✅ Downloaded {len(data['features'])} countries")
        
        # Save to file
        output_path = Path(output_file)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f)
        
        print(f"✅ Saved to: {output_file}")
        print(f"   File size: {output_path.stat().st_size / 1024:.1f} KB")
        
        return True
        
    except Exception as e:
        print(f"❌ Error downloading GeoJSON: {e}")
        print("\nAlternative: You can manually download from:")
        print("https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson")
        print(f"And save it to: {output_file}")
        return False

def main():
    print("=" * 60)
    print("Country Boundaries GeoJSON Downloader")
    print("=" * 60)
    print()
    
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    output_file = project_root / "assets" / "geo" / "countries.geojson"
    
    print(f"Output: {output_file}")
    print()
    
    if download_countries_geojson(output_file):
        print()
        print("=" * 60)
        print("✨ Download complete!")
        print("=" * 60)
        print()
    else:
        print("\n⚠️  Could not download automatically.")
        print("Please download manually and restart Jekyll.")

if __name__ == "__main__":
    main()