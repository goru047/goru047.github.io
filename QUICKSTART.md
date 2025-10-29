# Part 1: Quick Start Guide

## What's Included

✅ Complete project structure  
✅ Jekyll configuration  
✅ Git setup  
✅ Documentation  

## Installation Steps

### 1. Extract the ZIP
```bash
unzip travel-map-blog-part1.zip
cd travel-map-blog
```

### 2. Install Jekyll (if not already installed)

**On macOS:**
```bash
brew install ruby
gem install bundler jekyll
```

**On Ubuntu/Debian:**
```bash
sudo apt-get install ruby-full build-essential zlib1g-dev
gem install bundler jekyll
```

**On Windows:**
- Download RubyInstaller from https://rubyinstaller.org/
- Run installer with DevKit
- Open command prompt and run: `gem install bundler jekyll`

### 3. Install Project Dependencies
```bash
bundle install
```

### 4. Verify Installation
```bash
bundle exec jekyll --version
# Should output: jekyll 4.3.x
```

## Customize Before Part 2

### Update `_config.yml`
Open `_config.yml` and update:

```yaml
title: "Your Blog Name"
author: "Your Name"
email: "your@email.com"
url: "https://yourusername.github.io"

social:
  github: "yourusername"
  twitter: "yourusername"
  instagram: "yourusername"
```

### Personalize Colors
```yaml
theme_config:
  default_theme: "dark"  # or "light"
  colors:
    visited: "#10b981"   # Your preferred color
    unvisited: "#6b7280"
```

## Test Run (Will work after Part 2)

After Part 2 is complete, you'll be able to:
```bash
bundle exec jekyll serve
# Open: http://localhost:4000
```

## File Structure Overview

```
travel-map-blog/
├── _config.yml          # Main config - CUSTOMIZE THIS
├── Gemfile             # Ruby dependencies
├── .gitignore          # Git ignore rules
├── README.md           # Full documentation
├── index.html          # Landing page
├── PART-1-COMPLETE.md  # This part's summary
├── _layouts/           # 📁 HTML templates (Part 2)
├── _includes/          # 📁 Reusable components (Part 2)
├── _sass/              # 📁 Styles (Part 3)
├── assets/             # 📁 CSS, JS, images (Parts 3-4)
├── _posts/             # 📁 Blog posts (Part 5)
├── _data/              # 📁 Generated data (Part 4)
├── scripts/            # 📁 Python scripts (Part 4)
└── .github/workflows/  # 📁 CI/CD (Part 6)
```

## Troubleshooting

### "Command not found: bundle"
```bash
gem install bundler
```

### "Permission denied" when installing gems
```bash
# On macOS/Linux
gem install bundler --user-install

# Or use sudo (not recommended)
sudo gem install bundler
```

### Jekyll fails to install
Make sure you have:
- Ruby 2.7 or higher: `ruby --version`
- RubyGems: `gem --version`
- Build tools (gcc, make)

## What's Next?

**Part 2** will add:
- HTML layouts (default, home, post)
- Include components (header, footer, etc.)
- Basic structure for the site

## Need Help?

Check the full `README.md` for:
- Detailed installation guides
- Platform-specific instructions
- Common issues and solutions

---

**Ready for Part 2?** Let me know when you want to continue! 🚀
