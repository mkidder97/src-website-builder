

# Pre-Presentation Checklist - Remaining Fixes

## Overview
Based on a comprehensive site review, here are the remaining items to address before presentation. I've categorized them by priority.

---

## High Priority (Should Fix Before Presentation)

### 1. Missing Privacy & Terms Pages
The Footer links to `/privacy` and `/terms` but these pages don't exist, resulting in 404 errors.

**Solution:** Create simple placeholder pages for both, or remove the links from the Footer until the actual content is ready.

| Option | Approach |
|--------|----------|
| A - Create placeholders | Add basic Privacy Policy and Terms of Service pages with placeholder text |
| B - Remove links | Remove the links from the Footer temporarily |

---

### 2. Hardcoded Gradients Break Theme Toggle
Four components have hardcoded `rgba(15, 23, 42, ...)` navy colors in their inline styles, which don't respond to the Warm Professional theme:

| File | Issue |
|------|-------|
| `ServiceDetail.tsx` | Hero background gradient |
| `Services.tsx` | Hero background gradient |
| `Contact.tsx` | Hero background gradient |
| `CalculatorTeaser.tsx` | Section background gradient |

**Solution:** Update these to use `hsl(var(--navy-dark) / 0.92)` syntax like we did for `Hero.tsx`, so they adapt to the active theme.

---

## Medium Priority (Nice to Have)

### 3. Hardcoded URLs in index.html
The fallback meta tags in `index.html` still reference `src-foundry-hub.lovable.app`:

- Line 18: OG image URL
- Line 19: OG URL  
- Line 25: Twitter image
- Line 30: Canonical URL

**Note:** Helmet overrides these at runtime, so it mostly works. But if you're connecting a custom domain, these should be updated.

**Solution:** Update to match your production domain, or leave as-is (Helmet handles it).

---

### 4. Missing sitemap.xml
No sitemap exists for search engines. This helps with SEO indexing.

**Solution:** Create a static `public/sitemap.xml` with all main routes, or note it as a post-launch task.

---

### 5. Console Ref Warnings (Cosmetic)
React is logging warnings about function components receiving refs (Layout/ServiceDetail). This is a development-only warning related to framer-motion's AnimatePresence and doesn't affect production.

**Solution:** Can be safely ignored for presentation. To fix properly, would need to wrap Layout with `forwardRef`, but this is low priority.

---

## Post-Presentation (Per Project Memory)

### 6. Replace Placeholder Images
From project memory: Unsplash images on `RoofController.tsx` should be replaced with actual dashboard screenshots once available.

### 7. Client Logo Permissions
From project memory: Need written permission for client logos and video testimonials.

---

## Recommended Actions

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| High | Create Privacy/Terms pages | ~10 min | Prevents 404s |
| High | Fix hardcoded gradients | ~15 min | Full theme support |
| Medium | Update index.html URLs | ~5 min | Better SEO for custom domain |
| Medium | Add sitemap.xml | ~10 min | Better SEO indexing |
| Low | Console ref warnings | Skip | No user impact |

---

## Files to Create
| File | Purpose |
|------|---------|
| `src/pages/Privacy.tsx` | Privacy Policy page |
| `src/pages/Terms.tsx` | Terms of Service page |
| `public/sitemap.xml` | SEO sitemap |

## Files to Modify
| File | Changes |
|------|---------|
| `src/App.tsx` | Add routes for /privacy and /terms |
| `src/pages/Services.tsx` | Use CSS variables for gradient |
| `src/pages/ServiceDetail.tsx` | Use CSS variables for gradient |
| `src/pages/Contact.tsx` | Use CSS variables for gradient |
| `src/components/home/CalculatorTeaser.tsx` | Use CSS variables for gradient |
| `index.html` | Update hardcoded URLs (optional) |
| `public/robots.txt` | Add sitemap reference |

---

## Summary
The site is in good shape overall. The critical fixes are:
1. **Privacy/Terms pages** - Prevents visible 404 errors
2. **Gradient theme consistency** - Ensures the Warm theme works across all pages

Everything else is either cosmetic or post-launch polish.

