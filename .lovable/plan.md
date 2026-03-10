

## Full Site Audit & Proposals

### 1. Below-the-hero momentum problem

**Current flow:** Hero → KPISection (dark, animated numbers with click-for-details modals) → ClientLogos (white bg, text-only names) → Testimonials → FeaturedProjects → VideoShowcase → ServicesOverview → DataVisualization → StormResponse → CalculatorTeaser → BlogPreview → CTABanner

**Problems:**
- KPISection has hover-to-reveal icons, "click any stat for more details" tooltips, and pop-up modals. This is widget behavior — it breaks the cinematic scroll. An institutional investor is not clicking stats.
- ClientLogos is plain text in a grid. No logos, no visual weight. Reads as placeholder.
- The section order front-loads stats and logos before showing what SRC actually does. No visual proof of work until FeaturedProjects, which is the 5th section.

**Proposal — Reorder and redesign the post-hero flow:**

```text
Hero
  ↓
Authority Strip (NEW) — a slim, dark horizontal bar with 3–4 stats inline
  ↓
ClientLogos — redesigned with actual SVG logos or professional text treatment
  ↓
Testimonial (Pete Hoffman) — full-width cinematic quote
  ↓
FeaturedProjects — move up, it's the visual proof
  ↓
ServicesOverview
  ↓
Platform Teaser (NEW) — Roof Controller preview
  ↓
ROI / Calculator CTA (redesigned)
  ↓
StormResponse
  ↓
CTABanner
```

- **Kill the KPISection component entirely.** Replace with an "Authority Strip" — a single dark bar (navy background) with 4 stats laid out horizontally: `$3B+ Assets Protected | 4,600+ Roofs Managed | 28 States | 23 Years`. Same typographic style as the hero trust indicators (large light numbers, tiny uppercase labels). No hover effects, no modals, no "click for details." Just confidence.
- **Remove VideoShowcase and BlogPreview from the homepage.** Blog is accessible via footer/mobile nav. The VideoShowcase placeholder ("Company overview coming soon") actively hurts credibility — it signals unfinished work. Add it back only when there's a real video.
- **Remove DataVisualization section.** The recharts widgets (bar charts, pie charts, coverage grid) look like a dashboard demo, not a consulting firm's homepage. This content belongs on the Roof Controller page, where it's contextualized. On the homepage it reads as filler.

---

### 2. No visual proof of fieldwork — placeholder strategy

**Current state:** Services use stock photos of office buildings, generic cityscapes, and one stormy sky. Projects data uses Unsplash warehouse/hospital exteriors. None show rooftops, inspections, tablets, or people.

**Proposal — curated Unsplash images that read as field-credible:**

Replace stock images with these specific Unsplash categories:
- **Flat commercial rooftops** (TPO/EPDM membrane, HVAC units visible): search "commercial roof," "flat roof building top"
- **Workers with hard hats on rooftops**: search "roof inspection," "construction worker roof"
- **Tablet/tech in field**: search "engineer tablet construction," "inspector tablet"
- **Aerial/drone views of commercial buildings**: search "aerial warehouse," "drone commercial building"

Specific image recommendations for services:
- Due Diligence: aerial view of commercial property complex
- Survey Inspections: close-up of flat roof membrane with equipment
- Annual Inspections: keep the existing custom asset
- Storm Inspections: damaged commercial roof (not just a stormy sky)
- Construction Management: keep the existing custom asset

For FeaturedProjects, replace the current Unsplash images with aerial/rooftop views rather than building facades. The current images show lobbies, storefronts, and office buildings — none suggest roofing work.

**Layout suggestion:** On the Services page, consider full-bleed hero images for each service card rather than small 192px thumbnails. Larger images = more credibility.

---

### 3. Testimonial section — making one quote hit harder

**Current:** Centered quote with a teal Quote icon, initials avatar, standard layout. It works but doesn't command attention.

**Proposal — cinematic single-testimonial treatment:**

- Full-width section with a dark background image (subtle, desaturated commercial rooftop aerial)
- Remove the generic Quote icon — let the quotation marks be typographic (large " in a serif font, 120px, very low opacity)
- Make the quote text larger (3xl on desktop) and use a slightly different font weight (light/300) for editorial feel
- Add the Sealy & Company logo next to Pete Hoffman's name (we have it or can create a text treatment)
- Add a subtle horizontal line above and below the quote for framing
- Consider adding "— Since 2015" or similar tenure indicator to show relationship longevity

Do NOT add placeholder testimonials with fake names. One real quote from a VP at a major client is worth more than three fabricated ones. Keep it as a single, confident statement.

---

### 4. Footer cleanup — reduce redundancy

**Current:** Quick Links column has Home, Services, Featured Projects, Blog, About, Contact. Our Services column has all 5 service types. Copyright bar has Privacy/Terms.

**Proposal:**
- Merge into two columns: "Company" (About, Contact, Blog, Projects, Calculator) and "Services" (keep the 5 services)
- Remove "Home" — the logo links home
- Remove "Services" from Quick Links since the full services list is in the adjacent column
- Add a third column: "Resources" with Blog, Savings Calculator, and Roof Controller Platform — this solves the discoverability problem for pages removed from desktop nav
- Keep contact info in the left column as-is

---

### 5. Savings Calculator — driving urgency

**Current:** CalculatorTeaser is buried 9th in the scroll order with a generic Unsplash financial chart thumbnail and muted styling.

**Proposal:**
- Move it higher — place it directly after ServicesOverview or after FeaturedProjects
- Redesign as a bold split section: left side has the value prop ("Our clients typically see 10–15x ROI"), right side has a large styled number treatment ("$847K" or "10–15x") as a visual anchor
- Change the CTA from "Calculate My Savings" to something more direct: "See What You're Overspending" or "Get Your Portfolio Assessment"
- Consider making the ROI claim the section heading rather than burying it in body text

Do NOT add a sticky banner — it would feel like adware on an institutional site.

---

### 6. Blog and Calculator discoverability without cluttering nav

**Proposal:**
- **Footer "Resources" column** (described above) — this is the cleanest solution
- **Homepage sections** serve as entry points: the blog preview section (if kept) links to /blog, the calculator teaser links to /savings-calculator
- On mobile nav, they're already present — leave as-is
- Do NOT add a "Resources" dropdown to desktop nav — 6 items is the right count, more would dilute the clean look

---

### 7. Platform / Roof Controller teaser on homepage

**Current:** The DataVisualization section sort of does this but with embedded recharts widgets that look like a demo, not a product preview.

**Proposal — "Roof Controller" teaser section:**
- Dark background section with a headline like "Your Entire Portfolio. One Dashboard."
- Left side: 2–3 bullet features (Real-time condition data, Capital planning forecasts, Automated reporting)
- Right side: a browser-frame mockup containing a screenshot or designed mock of the Roof Controller dashboard. Use a simple CSS browser chrome (gray bar with dots) around a static image.
- CTA: "Learn More" linking to /roof-controller
- This replaces the DataVisualization section entirely on the homepage

Until a real screenshot exists, design a mock dashboard image using a clean dark UI with a coverage map, a few stat cards, and a table — rendered as a static image, not interactive recharts.

---

### 8. Top 3 additional issues an institutional client would notice

**1. The hero video is looping a very short clip and appears to stutter/restart frequently.** The `hero-construction.mp4` file restarts visibly. If the clip is short (<10s), it needs a longer edit or a crossfade. Alternatively, replace with a high-res still image with a subtle Ken Burns (slow zoom) animation — this is what most institutional sites do and it's more reliable than video.

**2. Light mode / theme inconsistency.** The site has a dark header/hero but then drops into bright white sections (ClientLogos, ServicesOverview, BlogPreview). The alternation between dark navy sections and pure white sections creates a jarring accordion effect. Consider making the non-hero sections use more consistent tones: warm gray (`#f8f8f6`) for light sections instead of pure white, or lean fully into a dark theme throughout.

**3. The "Get Started" modal (GetStartedModal) is the primary conversion mechanism but its trigger has been reduced to a single outlined button.** The modal should be excellent — clean, fast, professional. Verify it's not using a chatbot-style flow or asking too many questions. For an institutional site, the modal should be a short form: Name, Company, Email, Phone, "How can we help?" dropdown, Submit. Nothing else.

---

### Summary — Proposed build order

1. Kill KPISection, DataVisualization, VideoShowcase, BlogPreview from homepage. Add Authority Strip.
2. Add Roof Controller teaser section (browser mockup + features).
3. Redesign Testimonial for cinematic impact.
4. Replace stock images site-wide with field-credible Unsplash photos.
5. Restructure footer into Company / Services / Resources columns.
6. Redesign Calculator teaser and move it higher.
7. Reorder homepage sections per the new flow.
8. Address light/dark section contrast consistency.

