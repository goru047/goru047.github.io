# Travel Map Blog - Project Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TRAVEL MAP BLOG                          │
│                                                              │
│  User visits site → Interactive Map → Click Location        │
│                           ↓                                  │
│                   Shows Blog Posts                          │
│                           ↓                                  │
│                   Read Full Article                         │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
Markdown Posts (.md)
        ↓
Python Processing Script
        ↓
JSON Data Structure
        ↓
Jekyll Build
        ↓
Static HTML + JS
        ↓
Interactive Map (Leaflet.js)
```

## Component Breakdown

### 1. Content Layer (Markdown Posts)
```
_posts/2024-03-15-tokyo-adventure.md
├── Frontmatter (YAML)
│   ├── Countries: [Japan]
│   ├── Cities: [Tokyo, Kyoto]
│   └── POIs: [Senso-ji Temple, ...]
└── Content (Markdown)
    └── Your blog post text
```

### 2. Processing Layer (Python Scripts)
```
scripts/process_posts.py
├── Reads all _posts/*.md
├── Extracts location data
├── Builds relationships
└── Generates _data/map-data.json
```

### 3. Presentation Layer (Jekyll + Leaflet)
```
Jekyll Site
├── Layouts (HTML structure)
├── Includes (Reusable components)
├── Sass (Styles)
└── JavaScript (Map logic)
    ├── Load map-data.json
    ├── Render countries
    ├── Handle clicks
    └── Display blog cards
```

## Navigation Flow

```
World Map (Zoom Level 2)
    ↓ [Click Japan]
Japan View (Zoom Level 6)
├── Shows: Tokyo, Kyoto, Osaka
└── Blog cards: All posts about Japan
    ↓ [Click Tokyo]
Tokyo View (Zoom Level 10)
├── Shows: Senso-ji, Shibuya, etc.
└── Blog cards: Posts about Tokyo
    ↓ [Click Senso-ji]
POI Detail
└── Blog cards: Posts mentioning Senso-ji
```

## File Organization by Purpose

### Configuration (Part 1) ✅
- `_config.yml` - Site settings
- `Gemfile` - Ruby dependencies
- `.gitignore` - Version control

### Structure (Part 2) 
- `_layouts/` - Page templates
- `_includes/` - Reusable HTML components

### Styling (Part 3)
- `_sass/` - Modular stylesheets
- `assets/css/` - Compiled CSS

### Functionality (Part 4)
- `assets/js/` - Interactive features
- `scripts/` - Data processing

### Content (Part 5)
- `_posts/` - Blog articles
- `assets/images/` - Photos
- `_data/` - Generated map data

### Deployment (Part 6)
- `.github/workflows/` - Automation
- GitHub Pages configuration

## Parts Overview

| Part | Focus | Files Created | What You'll Have |
|------|-------|--------------|------------------|
| 1 ✅ | Setup | Config, structure | Project foundation |
| 2 | HTML | Layouts, includes | Basic site structure |
| 3 | CSS | Sass files | Styled pages |
| 4 | JS + Python | Map logic, processing | Working interactive map |
| 5 | Content | Sample posts | Live example |
| 6 | Deploy | GitHub Actions | Auto-deployment |

## Technology Stack

```
Frontend
├── Jekyll (Static site generator)
├── Leaflet.js (Interactive maps)
├── Vanilla JavaScript (Logic)
└── Sass (Styling)

Backend/Processing
├── Python 3.8+ (Data processing)
└── GitHub Actions (Automation)

Data
├── GeoJSON (Geographic boundaries)
├── JSON (Processed blog data)
└── Markdown (Blog content)

Hosting
└── GitHub Pages (Free, automatic)
```

## Key Features Implementation

### Many-to-Many Relationships
```
Post 1: "Tokyo & Kyoto Trip"
├── References: Tokyo, Kyoto
│
Post 2: "Tokyo Food Tour"  
├── References: Tokyo
│
Post 3: "Japan Overview"
└── References: Tokyo, Kyoto, Osaka

Result:
Tokyo → Shows Posts 1, 2, 3
Kyoto → Shows Posts 1, 3
```

### Dark/Light Theme
```
CSS Variables
├── Light theme (default)
├── Dark theme (alternative)
└── System preference detection
    └── Automatically switches
```

### Responsive Design
```
Mobile (< 768px)
├── Stacked layout
├── Touch-friendly map
└── Simplified navigation

Desktop (> 768px)
├── Full map view
├── Sidebar option
└── Mouse interactions
```

## Development Workflow

```
1. Local Development
   Write post → Process data → View locally

2. Git Commit
   Push to GitHub

3. Automatic Build
   GitHub Actions → Process → Deploy

4. Live Site
   View at: yourusername.github.io
```

## Customization Points

### Easy to Change
- ✅ Colors (CSS variables)
- ✅ Map center/zoom
- ✅ Site title/description
- ✅ Social links

### Moderate Complexity
- 🔧 Layout structure
- 🔧 Card design
- 🔧 Navigation style
- 🔧 Typography

### Advanced
- ⚙️ Map behavior logic
- ⚙️ Data processing rules
- ⚙️ Custom features
- ⚙️ Performance optimization

---

## Current Status: Part 1 Complete ✅

**Next:** Part 2 - HTML Layouts & Structure

Ready to continue? Let me know! 🚀
