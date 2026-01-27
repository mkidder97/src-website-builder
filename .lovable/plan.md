
# High-Priority Site Fixes - Implementation Plan

## Summary
Implementing 6 high-priority fixes across accessibility, data persistence, SEO, performance, security, and error handling. Issue 7 (TODO placeholder) is already resolved.

---

## Issue 1: Accessibility - Images & ARIA

### 1.1 Image Alt Text Updates

| File | Line | Current Alt | Updated Alt |
|------|------|-------------|-------------|
| `MeetTheTeam.tsx` | 69 | `{member.name}` | `Professional headshot of {member.name}, {member.title}` |
| `WhyChooseUs.tsx` | 87 | `"Commercial building"` | `"Modern commercial office building with glass facade"` |
| `CalculatorTeaser.tsx` | 29 | `"Financial analysis"` | `"Financial charts and analysis on computer screen"` |
| `RoofController.tsx` | 145-146 | `"Roof Controller Dashboard"` | `"Roof Controller platform dashboard showing portfolio analytics"` |
| `RoofController.tsx` | 246 | `{screenshot.title}` | `{screenshot.title} - screenshot of Roof Controller interface` |
| `RoofController.tsx` | 312 | `"Commercial buildings"` | `"Aerial view of commercial buildings in urban landscape"` |
| `ServicesOverview.tsx` | 88 | `{service.title}` | `{service.title} - commercial roof inspection service` |
| `ServiceDetail.tsx` | 335 | `{step.title}` | `{step.title} - process step illustration` |
| `ServiceDetail.tsx` | 394 | `"Sample report preview"` | `"Sample roof inspection report showing condition ratings and findings"` |
| `VideoShowcase.tsx` | 73 | `{title}` | `Video thumbnail for {title}` |
| `OurStory.tsx` | 51-52 | Already descriptive | Add `loading="lazy"` |

### 1.2 Background Images - Add ARIA Roles

These sections use inline CSS backgroundImage and need `role="img"` and `aria-label`:

| File | Line | aria-label Value |
|------|------|------------------|
| `Hero.tsx` | ~34 | `"Aerial view of modern commercial building skyline"` |
| `StormResponse.tsx` | 25-32 | `"Dark stormy sky over commercial property"` |
| `CalculatorTeaser.tsx` | 8-15 | `"Industrial warehouse facility exterior"` |
| `AboutHero.tsx` | Hero section | `"Professional office building interior"` |
| `Contact.tsx` | 96-102 | `"Modern office workspace interior"` |
| `ServiceDetail.tsx` | 246-252 | Dynamic: `{service.title} service hero image` |

### 1.3 ChatWidget.tsx - ARIA Fixes

**Floating button (line 35-46):** Add `aria-label="Open chat support"`

**Chat container (line 64-76):** Add:
- `role="dialog"`
- `aria-label="Chat support"` 
- `aria-modal="true"`

---

## Issue 2: Contact Form - Submit to Database

### Database Migration
Create `contact_submissions` table:

```sql
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public insert (anyone can submit the form)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admin-only read access
CREATE POLICY "Admin view contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin-only delete
CREATE POLICY "Admin delete contact submissions"
  ON public.contact_submissions FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));
```

### Code Changes in `Contact.tsx`

Replace lines 48-52 (the setTimeout simulation):

```typescript
// Before
await new Promise((resolve) => setTimeout(resolve, 1000));
setLoading(false);
setSubmitted(true);

// After
try {
  const { error: insertError } = await supabase
    .from("contact_submissions")
    .insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      company: result.data.company || null,
      message: result.data.message,
    });

  if (insertError) throw insertError;

  setSubmitted(true);
  toast({
    title: "Message Sent",
    description: "We'll get back to you within 24 hours.",
  });
} catch (err) {
  toast({
    title: "Error",
    description: "Failed to send message. Please try again.",
    variant: "destructive",
  });
} finally {
  setLoading(false);
}
```

Add import: `import { supabase } from "@/integrations/supabase/client";`

---

## Issue 3: SEO - Dynamic URL (Simplified)

### Changes in `SEO.tsx` (lines 4-5)

Replace:
```typescript
// Base URL - update this when connecting a custom domain
const BASE_URL = 'https://src-foundry-hub.lovable.app';
```

With:
```typescript
// Base URL - uses VITE_SITE_URL env var if set, otherwise window.location.origin
const getBaseUrl = () => {
  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL;
  }
  return window.location.origin;
};

const BASE_URL = getBaseUrl();
```

---

## Issue 4: Image Performance - Lazy Loading

Add `loading="lazy"` to all `<img>` tags NOT in the initial viewport:

| File | Line(s) | Image Description |
|------|---------|-------------------|
| `BlogPreview.tsx` | 139 | Blog post cover images |
| `ServicesOverview.tsx` | 87-89 | Service card images |
| `OurStory.tsx` | 50-54 | Story section image |
| `MeetTheTeam.tsx` | 67-70 | Team member photos |
| `WhyChooseUs.tsx` | 85-88 | Section image |
| `ServiceDetail.tsx` | 335 | Process step images |
| `ServiceDetail.tsx` | 392-396 | Report preview image |
| `RoofController.tsx` | 244-248 | Gallery screenshots |
| `RoofController.tsx` | 310-313 | Benefits section image |
| `VideoShowcase.tsx` | 71-74 | Thumbnail image |

**Note:** Keep Hero images without lazy loading (above the fold).

---

## Issue 5: Rate Limit Security Fix

### Changes in `LeadCaptureForm.tsx` (lines 46-50)

**Current (insecure):**
```typescript
if (rateLimitError) {
  if (import.meta.env.DEV) {
    console.error("Rate limit check error:", rateLimitError);
  }
  // Continue anyway if rate limit check fails
}
```

**Fixed (blocks submission):**
```typescript
if (rateLimitError) {
  if (import.meta.env.DEV) {
    console.error("Rate limit check error:", rateLimitError);
  }
  toast.error("Unable to verify submission. Please try again.");
  setIsSubmitting(false);
  return;
}
```

---

## Issue 6: Root Error Boundary

### New File: `src/components/ErrorBoundary.tsx`

```typescript
import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, errorInfo);
    }
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6">
              Please refresh the page to try again.
            </p>
            <Button onClick={this.handleRefresh}>
              Refresh
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Update `main.tsx`

Wrap App with ErrorBoundary (around line 9-11):

```typescript
import { ErrorBoundary } from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </HelmetProvider>
);
```

---

## Issue 7: TODO Placeholder - ALREADY RESOLVED

Verified at `RoofController.tsx` lines 200-206. The VideoShowcase component is properly implemented with:
- Title: "See Roof Controller in Action"
- Placeholder subtitle: "Platform walkthrough & client testimonials"
- Styled empty state with play icon

No changes needed.

---

## Files Summary

### Create
| File | Purpose |
|------|---------|
| `src/components/ErrorBoundary.tsx` | Root error boundary with refresh button |

### Modify
| File | Changes |
|------|---------|
| `src/pages/Contact.tsx` | Supabase insert + ARIA for hero background |
| `src/components/SEO.tsx` | Dynamic BASE_URL using env var |
| `src/components/chatbot/ChatWidget.tsx` | ARIA attributes for button and dialog |
| `src/components/calculator/LeadCaptureForm.tsx` | Block submission on rate limit error |
| `src/main.tsx` | Wrap with ErrorBoundary |
| `src/components/home/Hero.tsx` | Add ARIA role/label to background |
| `src/components/home/StormResponse.tsx` | Add ARIA role/label to background |
| `src/components/home/CalculatorTeaser.tsx` | ARIA + lazy load + better alt text |
| `src/components/home/BlogPreview.tsx` | Add lazy loading |
| `src/components/home/ServicesOverview.tsx` | Better alt text + lazy loading |
| `src/components/about/AboutHero.tsx` | Add ARIA role/label to background |
| `src/components/about/OurStory.tsx` | Add lazy loading |
| `src/components/about/MeetTheTeam.tsx` | Better alt text + lazy loading |
| `src/components/about/WhyChooseUs.tsx` | Better alt text + lazy loading |
| `src/pages/RoofController.tsx` | Better alt text + lazy loading (except hero) |
| `src/pages/ServiceDetail.tsx` | Better alt text + lazy loading + ARIA for hero |
| `src/components/shared/VideoShowcase.tsx` | Better alt text + lazy loading |

### Database
| Change | Description |
|--------|-------------|
| Create table | `contact_submissions` with RLS policies |

---

## Notes

1. **Supabase Types**: After the migration runs, Lovable Cloud should auto-regenerate TypeScript types. If you see a type error on `.from("contact_submissions")`, that indicates types weren't regenerated.

2. **VITE_SITE_URL**: When connecting a custom domain, add this environment variable with your production URL for correct canonical URLs and OG tags.

3. **Lazy Loading Strategy**: All images below the fold get `loading="lazy"`. Hero section images remain eager-loaded for best LCP scores.
