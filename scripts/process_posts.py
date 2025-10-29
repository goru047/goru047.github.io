"""
Process Blog Posts and Generate Map Data
Extracts location data from markdown posts and creates JSON for the map
"""

import os
import json
import yaml
import re
from pathlib import Path
from datetime import datetime
from collections import defaultdict

# Coordinates database (you can expand this)
CITY_COORDINATES = {
    "Paris": [48.8566, 2.3522],
    "Tokyo": [35.6762, 139.6503],
    "New York City": [40.7128, -74.0060],
    "Barcelona": [41.3874, 2.1686],
    "London": [51.5074, -0.1278],
    "Rome": [41.9028, 12.4964],
    "Amsterdam": [52.3676, 4.9041],
    "Berlin": [52.5200, 13.4050],
    "Prague": [50.0755, 14.4378],
    "Vienna": [48.2082, 16.3738],
}

COUNTRY_DATA = {
    "France": {
        "center": [46.2276, 2.2137],
        "bounds": [[41.3253, -5.1406], [51.0891, 9.6625]]
    },
    "Japan": {
        "center": [36.2048, 138.2529],
        "bounds": [[24.3966, 122.9346], [45.5226, 153.9870]]
    },
    "United States": {
        "center": [37.0902, -95.7129],
        "bounds": [[24.5210, -125.0011], [49.3845, -66.9346]]
    },
    "Spain": {
        "center": [40.4637, -3.7492],
        "bounds": [[27.6377, -18.1606], [43.7913, 4.3271]]
    },
    "United Kingdom": {
        "center": [55.3781, -3.4360],
        "bounds": [[49.8700, -8.6500], [60.8600, 1.7700]]
    },
    "Italy": {
        "center": [41.8719, 12.5674],
        "bounds": [[36.6199, 6.6267], [47.0920, 18.5203]]
    },
}

def extract_frontmatter(content):
    """Extract YAML frontmatter from markdown content"""
    pattern = r'^---\s*\n(.*?)\n---\s*\n'
    match = re.match(pattern, content, re.DOTALL)
    
    if match:
        try:
            frontmatter = yaml.safe_load(match.group(1))
            body = content[match.end():]
            return frontmatter, body
        except yaml.YAMLError as e:
            print(f"Error parsing YAML: {e}")
            return None, content
    
    return None, content

def process_posts(posts_dir):
    """Process all blog posts and extract location data"""
    
    posts_path = Path(posts_dir)
    if not posts_path.exists():
        print(f"Posts directory not found: {posts_dir}")
        return None
    
    data = {
        "countries": {},
        "cities": {},
        "pois": {},
        "blogPosts": {}
    }
    
    # Process each markdown file
    for post_file in posts_path.glob("*.md"):
        print(f"Processing: {post_file.name}")
        
        with open(post_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        frontmatter, body = extract_frontmatter(content)
        
        if not frontmatter:
            print(f"  ⚠️  No frontmatter found, skipping")
            continue
        
        # Extract basic post info
        post_id = post_file.stem
        post_data = {
            "id": post_id,
            "title": frontmatter.get("title", "Untitled"),
            "date": str(frontmatter.get("date", "")),
            "excerpt": frontmatter.get("excerpt", ""),
            "featured_image": frontmatter.get("featured_image", ""),
            "tags": frontmatter.get("tags", []),
            "url": f"/blog/{frontmatter.get('date', datetime.now()).strftime('%Y/%m/%d')}/{post_file.stem.split('-', 3)[-1]}/" if 'date' in frontmatter else f"/blog/{post_file.stem}/",
            "countries": [],
            "cities": [],
            "pois": []
        }
        
        # Process countries
        if "countries" in frontmatter:
            for country in frontmatter["countries"]:
                post_data["countries"].append(country)
                
                if country not in data["countries"]:
                    country_info = COUNTRY_DATA.get(country, {
                        "center": [0, 0],
                        "bounds": None
                    })
                    data["countries"][country] = {
                        "visited": True,
                        "center": country_info["center"],
                        "bounds": country_info["bounds"],
                        "cities": []
                    }
        
        # Process cities
        if "cities" in frontmatter:
            for city in frontmatter["cities"]:
                post_data["cities"].append(city)
                
                if city not in data["cities"]:
                    coordinates = CITY_COORDINATES.get(city, [0, 0])
                    data["cities"][city] = {
                        "visited": True,
                        "coordinates": coordinates,
                        "country": post_data["countries"][0] if post_data["countries"] else "Unknown",
                        "pois": []
                    }
                
                # Add city to country's cities list
                for country in post_data["countries"]:
                    if country in data["countries"] and city not in data["countries"][country]["cities"]:
                        data["countries"][country]["cities"].append(city)
        
        # Process POIs
        if "pois" in frontmatter:
            for poi in frontmatter["pois"]:
                poi_id = f"{poi['name'].lower().replace(' ', '-')}-{post_id}"
                
                data["pois"][poi_id] = {
                    "name": poi["name"],
                    "coordinates": poi.get("location", [0, 0]),
                    "description": poi.get("description", ""),
                    "city": post_data["cities"][0] if post_data["cities"] else "Unknown",
                    "country": post_data["countries"][0] if post_data["countries"] else "Unknown"
                }
                
                post_data["pois"].append(poi_id)
                
                # Add POI to city's POIs list
                if post_data["cities"]:
                    city = post_data["cities"][0]
                    if city in data["cities"] and poi_id not in data["cities"][city]["pois"]:
                        data["cities"][city]["pois"].append(poi_id)
        
        # Add post to data
        data["blogPosts"][post_id] = post_data
        print(f"  ✓ Processed: {post_data['title']}")
        print(f"    Countries: {', '.join(post_data['countries'])}")
        print(f"    Cities: {', '.join(post_data['cities'])}")
        print(f"    POIs: {len(post_data['pois'])}")
    
    return data

def save_map_data(data, output_file):
    """Save processed data to JSON file"""
    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Map data saved to: {output_file}")
    print(f"   Countries: {len(data['countries'])}")
    print(f"   Cities: {len(data['cities'])}")
    print(f"   POIs: {len(data['pois'])}")
    print(f"   Blog posts: {len(data['blogPosts'])}")

def generate_site_data(data, output_file):
    """Generate site data for Jekyll to include"""
    site_data = {
        "map": {
            "center": [20, 0],
            "initialZoom": 2,
            "minZoom": 2,
            "maxZoom": 18
        },
        "colors": {
            "visited": "#10b981",
            "unvisited": "#e5e7eb",
            "hover": "#34d399",
            "active": "#059669"
        },
        "stats": {
            "countries": len([c for c, d in data["countries"].items() if d["visited"]]),
            "cities": len([c for c, d in data["cities"].items() if d["visited"]]),
            "pois": len(data["pois"]),
            "posts": len(data["blogPosts"])
        }
    }
    
    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(site_data, f, indent=2)
    
    print(f"✅ Site data saved to: {output_file}")

def main():
    """Main function"""
    print("=" * 60)
    print("Travel Map Blog - Data Processor")
    print("=" * 60)
    print()
    
    # Get the project root directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    posts_dir = project_root / "_posts"
    output_dir = project_root / "assets" / "data"
    
    print(f"Posts directory: {posts_dir}")
    print(f"Output directory: {output_dir}")
    print()
    
    # Process posts
    data = process_posts(posts_dir)
    
    if data:
        # Save map data
        save_map_data(data, output_dir / "map-data.json")
        
        # Generate site data
        generate_site_data(data, output_dir / "site-data.json")
        
        print()
        print("=" * 60)
        print("✨ Processing complete!")
        print("=" * 60)
        print()
        print("Next steps:")
        print("1. Run: bundle exec jekyll serve")
        print("2. Visit: http://localhost:4000")
        print("3. Click on countries/cities on the map!")
    else:
        print("❌ No data processed. Check your posts directory.")

if __name__ == "__main__":
    main()