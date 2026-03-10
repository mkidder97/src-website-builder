

## Header Rewrite, Footer Updates & CSS Additions

### Correction Applied
- **CLIENTS** nav link → external link to `https://portal.roofcontroller.com` (target="_blank", noopener noreferrer), styled identically to other nav links
- **Right side** simplified: remove CLIENT LOGIN entirely (redundant with CLIENTS nav link), keep only REQUEST CONSULTATION outlined button

### Files to Change

**1. `src/components/layout/Header.tsx` — Full rewrite**
- Scroll listener: `isScrolled` state at 60px threshold, transparent → `rgba(10,20,14,0.97)` transition. Mobile always dark.
- Logo: bold "SRC" + 1px divider + thin uppercase "Southern Roof Consultants"
- Desktop nav (6 items, gap-7): SERVICES (dropdown), FEATURED PROJECTS, PLATFORM, ABOUT, CONTACT, CLIENTS (external link, new tab)
- All nav text: 11px, 600 weight, 0.14em tracking, uppercase. Active = `nav-link-active` class. No `link-underline`, no ChevronDown.
- Services dropdown: dark panel `rgba(10,20,14,0.98)`, teal dot on Construction Management, no Popular badge
- Right side: only REQUEST CONSULTATION outlined button → calls `openGetStartedModal`
- Mobile: dark panel, all pages (including Blog/Calculator), REQUEST CONSULTATION at bottom. No ThemeToggle.
- Container: `max-w-7xl mx-auto px-8`, py-20px

**2. `src/components/layout/Footer.tsx` — Style updates**
- Background `#060f09`, wordmark logo matching header style
- Headings: 11px/700/0.18em/uppercase/`rgba(255,255,255,0.40)`
- Links: 13px, `rgba(255,255,255,0.55)`, hover 0.90
- Bottom bar: `rgba(0,0,0,0.25)` bg, subtle border, 12px text
- Add "Featured Projects" link in Quick Links

**3. `src/index.css` — Add utilities**
- `.nav-link-active` with teal bottom border
- `html { scroll-behavior: smooth; }`

