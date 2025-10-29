# Travel Map Blog

An interactive travel blog with a map-based landing page that allows visitors to explore your travels by clicking through countries, cities, and points of interest.

## Features

- 🗺️ Interactive map with country → city → POI drill-down
- 🌙 Dark/Light theme toggle
- 📝 Markdown-based blog posts
- 🏷️ Many-to-many relationships (posts can reference multiple locations)
- 🎨 Responsive design
- 📱 Mobile-friendly
- 🚀 GitHub Pages compatible
- ⚡ Automatic data processing via GitHub Actions

## Project Structure

```
travel-map-blog/
├── _config.yml              # Jekyll configuration
├── _layouts/                # Page layouts
│   ├── default.html        # Base layout
│   ├── home.html          # Landing page with map
│   └── post.html          # Blog post layout
├── _includes/              # Reusable components
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   └── post-card.html
├── _sass/                  # Stylesheets (Sass)
│   ├── _variables.scss    # Colors, dark mode variables
│   ├── _base.scss         # Base styles
│   ├── _map.scss          # Map-specific styles
│   ├── _cards.scss        # Blog card styles
│   └── _layout.scss       # Layout and grid
├── assets/
│   ├── css/
│   │   └── main.scss      # Main stylesheet (imports all)
│   ├── js/
│   │   ├── map-app.js     # Map application logic
│   │   └── theme.js       # Dark mode toggle
│   ├── geo/               # GeoJSON files
│   └── images/            # Images
├── _posts/                # Blog posts (markdown)
├── _data/                 # Generated data
│   └── map-data.json     # Processed map data
├── scripts/               # Data processing scripts
│   ├── process_posts.py  # Main data processor
│   ├── fetch_geodata.py  # Download geo boundaries
│   └── requirements.txt  # Python dependencies
└── .github/
    └── workflows/
        └── process-data.yml  # GitHub Actions workflow
```

## Quick Start

### Prerequisites

- Ruby 2.7+ with Bundler
- Python 3.8+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/travel-map-blog.git
   cd travel-map-blog
   ```

2. **Install Ruby dependencies**
   ```bash
   bundle install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r scripts/requirements.txt
   ```

4. **Download base geographic data**
   ```bash
   python scripts/fetch_geodata.py
   ```

5. **Run Jekyll locally**
   ```bash
   bundle exec jekyll serve
   ```

6. **Open in browser**
   ```
   http://localhost:4000
   ```

## Creating a Blog Post

1. Create a new markdown file in `_posts/` with the format: `YYYY-MM-DD-title.md`

2. Add frontmatter with location data:
   ```markdown
   ---
   title: "Exploring Tokyo and Kyoto"
   date: 2024-03-15
   featured_image: /assets/images/tokyo-street.jpg
   countries: 
     - Japan
   cities:
     - name: Tokyo
       country: Japan
       coordinates: [35.6762, 139.6503]
     - name: Kyoto
       country: Japan
       coordinates: [35.0116, 135.7681]
   pois:
     - name: Senso-ji Temple
       city: Tokyo
       country: Japan
       coordinates: [35.7148, 139.7967]
     - name: Fushimi Inari Shrine
       city: Kyoto
       country: Japan
       coordinates: [34.9671, 135.7727]
   tags: [culture, temples, food]
   excerpt: "A wonderful journey through Japan's historic cities..."
   ---
   
   # Your blog content here
   ```

3. Process the data:
   ```bash
   python scripts/process_posts.py
   ```

4. Refresh your browser to see the changes

## Deployment to GitHub Pages

1. **Update `_config.yml`** with your GitHub username and repository name

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)
   - Save

4. **GitHub Actions will automatically**:
   - Process markdown files
   - Generate map data
   - Deploy the site

Your site will be live at: `https://yourusername.github.io/travel-map-blog/`

## Customization

### Colors and Theme

Edit `_sass/_variables.scss` to customize colors:
```scss
:root {
  --map-visited: #10b981;    // Color for visited locations
  --map-unvisited: #6b7280;  // Color for unvisited locations
  // ... more variables
}
```

### Map Settings

Edit `_config.yml`:
```yaml
theme_config:
  map:
    initial_zoom: 2
    center: [20, 0]  # Starting center point
```

### Site Information

Update in `_config.yml`:
- `title`: Your site title
- `description`: Site description
- `author`: Your name
- `email`: Your email

## Adding Geographic Data

### Countries
Country boundaries are automatically included.

### Cities
Cities use circular regions by default. To add custom city polygons:

1. Download from [OpenStreetMap](https://overpass-turbo.eu/)
2. Save as GeoJSON in `assets/geo/cities/`
3. Name it: `city-name.geojson`

The system will automatically use custom polygons if available.

## Development Workflow

```bash
# Local development
1. Write blog post in _posts/
2. python scripts/process_posts.py
3. bundle exec jekyll serve
4. View at localhost:4000

# Deploy
5. git add .
6. git commit -m "Add new post"
7. git push
# GitHub Actions handles the rest!
```

## Troubleshooting

### Jekyll won't start
```bash
bundle install
bundle exec jekyll clean
bundle exec jekyll serve
```

### Map not loading
- Check browser console for errors
- Verify `_data/map-data.json` exists
- Run `python scripts/process_posts.py`

### GitHub Actions failing
- Check `.github/workflows/process-data.yml`
- Verify `scripts/requirements.txt` is up to date
- Check Actions tab for error logs

## License

MIT License - Feel free to use this for your own travel blog!

## Credits

Built with:
- [Jekyll](https://jekyllrb.com/) - Static site generator
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Natural Earth](https://www.naturalearthdata.com/) - Geographic data
- Inspired by Minimal Mistakes, Chirpy, and Tale themes

## Support

For issues or questions, please open an issue on GitHub.

---

Happy travels! 🌍✈️
