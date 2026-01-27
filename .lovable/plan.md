
# Homepage Video Section Implementation

## Overview
Add a general company overview video section to the homepage while keeping the existing Roof Controller video section separate. We'll make the `VideoShowcase` component reusable by adding configurable props.

---

## Strategy

Rather than duplicate code, we'll enhance the existing `VideoShowcase` component to accept customizable content, then use it in both locations with different configurations:

| Location | Video Purpose | Content Focus |
|----------|---------------|---------------|
| Homepage (`/`) | Company overview | Who we are, what we do, nationwide coverage |
| Roof Controller (`/roof-controller`) | Platform demo | Software walkthrough, client testimonials |

---

## Phase 1: Generalize the VideoShowcase Component

### Update Props Interface
Add new props to make the component flexible:

```
interface VideoShowcaseProps {
  videoUrl?: string;
  eyebrow?: string;        // "Watch" by default
  title: string;           // Required - main heading
  description: string;     // Required - supporting text
  placeholderSubtitle?: string; // Text below "Video coming soon"
  thumbnailUrl?: string;   // Optional custom thumbnail image
  iframeTitle?: string;    // For accessibility
  className?: string;      // Custom background styling
}
```

### Move to Shared Location
Relocate from `src/components/roof-controller/` to `src/components/shared/VideoShowcase.tsx` since it's now used on multiple pages.

---

## Phase 2: Add to Homepage

### Placement
Insert the video section **after Testimonials** and **before ServicesOverview**:

```
Hero
KPISection
ClientLogos
Testimonials
VideoShowcase  <-- NEW
ServicesOverview
...
```

This placement works because:
- Social proof is established (logos + testimonial)
- Video adds depth before diving into services
- Natural storytelling flow

### Homepage Configuration

```tsx
<VideoShowcase
  title="Protecting Commercial Roofing Assets Nationwide"
  description="See how our team delivers institutional-grade inspections and construction management for some of the nation's largest REITs and property managers."
  placeholderSubtitle="Company overview coming soon"
  iframeTitle="Southern Roof Consultants Company Overview"
/>
```

---

## Phase 3: Update Roof Controller Page

Update the existing usage to use the new props format:

```tsx
<VideoShowcase
  title="See Roof Controller in Action"
  description="Watch our team walk through the platform and hear from portfolio managers who use Roof Controller to manage their roofing assets."
  placeholderSubtitle="Platform walkthrough & client testimonials"
  iframeTitle="Roof Controller Platform Overview"
/>
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/roof-controller/VideoShowcase.tsx` | Move to `src/components/shared/` and add props |
| `src/pages/Index.tsx` | Import and add `VideoShowcase` after `Testimonials` |
| `src/pages/RoofController.tsx` | Update import path, pass explicit props |

---

## Visual Result

**Homepage Video Section:**
- Eyebrow: "Watch"
- Title: "Protecting Commercial Roofing Assets Nationwide"
- Description: Company-focused messaging
- Placeholder with play button until real video is added

**Roof Controller Video Section:**
- Eyebrow: "Watch"
- Title: "See Roof Controller in Action"
- Description: Platform-focused messaging
- Same placeholder treatment

Both use the same design system tokens, animations, and structure for visual consistency.

---

## Future: Adding Real Videos

When videos are ready, simply pass the YouTube/Vimeo embed URL:

```tsx
// Homepage
<VideoShowcase
  videoUrl="https://www.youtube.com/embed/COMPANY_VIDEO_ID"
  title="..."
  description="..."
/>

// Roof Controller
<VideoShowcase
  videoUrl="https://www.youtube.com/embed/PLATFORM_DEMO_ID"
  title="..."
  description="..."
/>
```
