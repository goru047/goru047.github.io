# Implementation Checklist

Use this checklist to track your progress as you implement each part.

## Part 1: Setup & Configuration ✅

- [x] Download and extract Part 1 ZIP
- [ ] Install Ruby and Jekyll
- [ ] Run `bundle install`
- [ ] Customize `_config.yml` with your information
- [ ] Initialize git repository (optional)

  ```bash
  git init
  git add .
  git commit -m "Initial setup from Part 1"
  ```

**Verification:**

```bash
# Check Jekyll is installed
bundle exec jekyll --version

# Check project structure
ls -la
# Should see: _config.yml, Gemfile, README.md, etc.
```

---

## Part 2: HTML Layouts (Coming Next)

- [ ] Review layout structure
- [ ] Add `_layouts/default.html`
- [ ] Add `_layouts/home.html`
- [ ] Add `_layouts/post.html`
- [ ] Add `_includes/head.html`
- [ ] Add `_includes/header.html`
- [ ] Add `_includes/footer.html`
- [ ] Add `_includes/post-card.html`
- [ ] Test basic site structure

**Verification:**

```bash
bundle exec jekyll serve
# Visit http://localhost:4000
# Should see basic unstyled page
```

---

## Part 3: Styling (CSS/Sass)

- [ ] Add `_sass/_variables.scss`
- [ ] Add `_sass/_base.scss`
- [ ] Add `_sass/_layout.scss`
- [ ] Add `_sass/_map.scss`
- [ ] Add `_sass/_cards.scss`
- [ ] Add `assets/css/main.scss`
- [ ] Test dark/light theme switching

**Verification:**

```bash
# Check compiled CSS
ls -la _site/assets/css/
# Should see main.css
```

---

## Part 4: JavaScript & Python Processing

- [ ] Add `assets/js/map-app.js`
- [ ] Add `assets/js/theme.js`
- [ ] Add `scripts/process_posts.py`
- [ ] Add `scripts/fetch_geodata.py`
- [ ] Add `scripts/requirements.txt`
- [ ] Install Python dependencies

  ```bash
  pip install -r scripts/requirements.txt
  ```

- [ ] Download geographic data

  ```bash
  python scripts/fetch_geodata.py
  ```

- [ ] Test data processing

  ```bash
  python scripts/process_posts.py
  ```

**Verification:**

```bash
# Check generated data
cat _data/map-data.json
# Should see processed JSON structure
```

---

## Part 5: Content & Sample Posts

- [ ] Add sample blog post 1
- [ ] Add sample blog post 2
- [ ] Add sample blog post 3
- [ ] Add sample images to `assets/images/`
- [ ] Process posts to generate map data
- [ ] Test blog post display
- [ ] Test map interactions

**Verification:**

```bash
# Start server
bundle exec jekyll serve

# Visit site and verify:
# 1. Map loads
# 2. Countries are colored
# 3. Blog cards appear
# 4. Posts are readable
```

---

## Part 6: Deployment & GitHub Actions

- [ ] Create GitHub repository
- [ ] Add `.github/workflows/process-data.yml`
- [ ] Push to GitHub
- [ ] Enable GitHub Pages
- [ ] Configure Pages settings
- [ ] Verify GitHub Actions runs
- [ ] Visit live site

**Verification:**

```bash
# Check Actions tab in GitHub
# Green checkmark = successful build

# Visit your site
# https://yourusername.github.io/travel-map-blog
```

---

## Customization Checklist

### Before Going Live

- [ ] Update site title in `_config.yml`
- [ ] Update author name and bio
- [ ] Update social links
- [ ] Choose and test color scheme
- [ ] Add your first real blog post
- [ ] Add custom favicon
- [ ] Test on mobile devices
- [ ] Test dark/light theme
- [ ] Verify all links work
- [ ] Check map loads properly

### Optional Enhancements

- [ ] Add Google Analytics (or alternative)
- [ ] Add comments system (Giscus/Disqus)
- [ ] Add search functionality
- [ ] Add RSS feed link in header
- [ ] Create About page
- [ ] Add contact form
- [ ] Add newsletter signup
- [ ] Optimize images
- [ ] Add loading animations
- [ ] Implement breadcrumbs

---

## Testing Checklist

### Local Testing

- [ ] Home page loads
- [ ] Map renders correctly
- [ ] Click country → zooms to country
- [ ] Click city → zooms to city
- [ ] Blog cards display
- [ ] Blog posts are readable
- [ ] Images load
- [ ] Theme toggle works
- [ ] Responsive on mobile
- [ ] Links work

### Production Testing (After Deployment)

- [ ] Live site accessible
- [ ] All pages load
- [ ] No 404 errors
- [ ] Map works on live site
- [ ] Blog posts accessible
- [ ] Images load from CDN
- [ ] CSS/JS properly loaded
- [ ] Fast page load times

---

## Troubleshooting Guide

### Jekyll won't start

```bash
bundle install
bundle clean --force
bundle exec jekyll clean
bundle exec jekyll serve
```

### Map doesn't load

1. Check browser console for errors
2. Verify `map-data.json` exists in `_data/`
3. Check Leaflet CDN links in layout
4. Verify JavaScript has no syntax errors

### Posts not showing

1. Verify post filename format: `YYYY-MM-DD-title.md`
2. Check frontmatter is valid YAML
3. Run `python scripts/process_posts.py`
4. Rebuild Jekyll: `bundle exec jekyll build`

### CSS not applying

1. Check `assets/css/main.scss` exists
2. Verify imports in main.scss
3. Clear browser cache
4. Check browser dev tools for CSS errors

### GitHub Actions failing

1. Check Actions tab for error logs
2. Verify `requirements.txt` is correct
3. Check Python script syntax
4. Ensure all dependencies are listed

---

## Progress Tracking

| Part | Status | Date Completed | Notes |
|------|--------|----------------|-------|
| 1 - Setup | ✅ Complete | 2025-10-27 | |
| 2 - Layouts | ⏳ Pending | | |
| 3 - Styling | ⏳ Pending | | |
| 4 - JS/Python | ⏳ Pending | | |
| 5 - Content | ⏳ Pending | | |
| 6 - Deploy | ⏳ Pending | | |

---

## Resources

- Jekyll Documentation: https://jekyllrb.com/docs/
- Leaflet Documentation: https://leafletjs.com/reference.html
- Sass Guide: https://sass-lang.com/guide
- GitHub Pages: https://pages.github.com/
- Markdown Guide: https://www.markdownguide.org/

---

**Current Status:** Part 1 Complete ✅  
**Next Step:** Ready for Part 2 when you are! 🚀

Keep this file updated as you progress through each part.
