#!/usr/bin/env python3
"""
Download World Cities Database
Gets comprehensive city data from SimpleMaps (free dataset)
"""

import requests
import json
import csv
from io import StringIO
from pathlib import Path

def download_cities_data():
    """
    Download free world cities database from SimpleMaps
    Dataset: ~43,000 cities with coordinates
    License: Free for personal/commercial use
    """
    
    print("=" * 60)
    print("Downloading World Cities Database")
    print("=" * 60)
    print()
    
    # SimpleMaps Free World Cities Database
    # URL: https://simplemaps.com/data/world-cities
    url = "https://simplemaps.com/static/data/world-cities/basic/simplemaps_worldcities_basicv1.77/worldcities.csv"
    
    print(f"Downloading from: {url}")
    print("Please wait...")
    print()
    
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        print("✅ Downloaded successfully!")
        print(f"   Size: {len(response.content) / 1024 / 1024:.2f} MB")
        print()
        
        # Parse CSV
        csv_data = StringIO(response.text)
        reader = csv.DictReader(csv_data)
        
        cities_dict = {}
        
        print("Processing cities...")
        for row in reader:
            city_name = row.get('city', '').strip()
            country = row.get('country', '').strip()
            lat = row.get('lat', '')
            lng = row.get('lng', '')
            
            if city_name and lat and lng:
                try:
                    cities_dict[city_name] = {
                        "lat": float(lat),
                        "lng": float(lng),
                        "country": country
                    }
                except ValueError:
                    continue
        
        print(f"✅ Processed {len(cities_dict):,} cities")
        print()
        
        # Save to JSON
        script_dir = Path(__file__).parent
        project_root = script_dir.parent
        output_file = project_root / "assets" / "geo" / "world-cities.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(cities_dict, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Saved to: {output_file}")
        print(f"   Cities: {len(cities_dict):,}")
        print()
        
        # Show sample
        print("Sample cities:")
        for i, (city, data) in enumerate(list(cities_dict.items())[:5]):
            print(f"  {city}: {data}")
        
        print()
        print("=" * 60)
        print("✨ Download Complete!")
        print("=" * 60)
        
        return cities_dict
        
    except requests.RequestException as e:
        print(f"❌ Error downloading: {e}")
        print()
        print("Alternative methods:")
        print()
        print("1. Manual Download:")
        print("   - Visit: https://simplemaps.com/data/world-cities")
        print("   - Download: Basic (free) CSV")
        print("   - Save as: worldcities.csv")
        print("   - Run: python convert_csv_to_json.py")
        print()
        print("2. Use GeoNames (requires free account):")
        print("   - Visit: https://www.geonames.org/")
        print("   - Download: cities15000.zip (cities with 15k+ population)")
        print()
        print("3. Use Natural Earth Data:")
        print("   - Visit: https://www.naturalearthdata.com/")
        print("   - Download: Populated Places")
        print()
        return None

def convert_csv_to_json(csv_file="worldcities.csv"):
    """Convert downloaded CSV to JSON format"""
    
    print("Converting CSV to JSON...")
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    csv_file = project_root / "scripts" / "worldcities.csv"
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        cities_dict = {}
        
        for row in reader:
            city_name = row.get('city', '').strip()
            country = row.get('country', '').strip()
            lat = row.get('lat', '')
            lng = row.get('lng', '')
            
            if city_name and lat and lng:
                try:
                    cities_dict[city_name] = {
                        "lat": float(lat),
                        "lng": float(lng),
                        "country": country
                    }
                except ValueError:
                    continue
    
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    output_file = project_root / "assets" / "geo" / "world-cities.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(cities_dict, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Converted {len(cities_dict):,} cities")
    print(f"✅ Saved to: {output_file}")
    
    return cities_dict

if __name__ == "__main__":
    # Try to download
    # cities = download_cities_data()
    cities = None
    
    if not cities:
        print()
        print("If download failed, you can manually download and convert:")
        print("  python download_cities.py --convert worldcities.csv")
        print(("=" * 60), sep="\n")
        print("Converting from local CSV file 'worldcities.csv'...")
        cities = convert_csv_to_json("worldcities.csv")
        print("✅ Conversion complete!")