
# Toggleable "Warm Professional" Theme Implementation

## Overview
Add a second aesthetic variant to the SRC website that users can toggle between. The current "Navy Corporate" theme will remain the default, with a new "Warm Professional" theme using forest green and copper tones.

---

## Implementation Strategy

Rather than duplicating components, we'll leverage CSS custom properties (variables) with a theme class approach. This keeps the codebase maintainable and allows instant switching.

```text
+------------------+     +------------------+
|  Theme Toggle    |---->|  CSS Class       |
|  (Header button) |     |  .theme-warm     |
+------------------+     +------------------+
                               |
                               v
                    +--------------------+
                    |  CSS Variables     |
                    |  Override in       |
                    |  src/index.css     |
                    +--------------------+
                               |
                               v
                    +--------------------+
                    |  Components use    |
                    |  design tokens     |
                    |  (no changes)      |
                    +--------------------+
```

---

## Phase 1: Add Warm Theme CSS Variables

Add a new `.theme-warm` class to `src/index.css` with the complete color palette:

| Token | Navy Theme | Warm Theme |
|-------|-----------|------------|
| `--background` | White | Warm White (#FEFDFB) |
| `--foreground` | Navy | Charcoal (#374151) |
| `--primary` | Navy | Forest Green (#1E3A2F) |
| `--accent` | Teal | Forest Green (#1E3A2F) |
| `--cta` | Amber | Copper (#B45309) |
| `--navy` variants | Navy blues | Forest greens |
| `--teal` variants | Teals | Emerald greens |
| `--warm-gray` | Cool gray | Warm cream (#F5F3EF) |

This includes new custom properties:
- `--forest` / `--forest-dark` / `--forest-light`
- `--copper` / `--copper-dark`
- Hero gradient adjustments

---

## Phase 2: Create Theme Context & Toggle

### New File: `src/hooks/use-theme.tsx`

A simple React context to manage theme state with localStorage persistence:

```typescript
interface ThemeContext {
  theme: 'navy' | 'warm';
  toggleTheme: () => void;
}
```

Key behaviors:
- Persists choice to `localStorage`
- Applies `.theme-warm` class to document root
- Syncs across tabs

---

## Phase 3: Add Theme Toggle to Header

Add a subtle toggle button to the header navigation:

- **Desktop**: Small toggle switch near the "Client Login" link
- **Mobile**: Toggle in the mobile menu dropdown

Visual design:
- Navy theme: Moon/dark icon
- Warm theme: Sun/light icon
- Or: Two-tone indicator showing current mode

---

## Phase 4: Update Hardcoded Styles

Several components have inline styles that bypass CSS variables. These need updating to use the theme-aware approach:

| Component | Current Issue | Fix |
|-----------|--------------|-----|
| `Hero.tsx` | Hardcoded `rgba(15, 23, 42, ...)` in gradient | Use CSS variable via `hsl(var(--primary))` |
| `StormResponse.tsx` | Black overlay gradient | Keep as-is (works for both themes) |
| `Testimonials.tsx` | Hardcoded navy gradient | Use `hsl(var(--navy-dark))` etc. |
| `Header.tsx` | Uses `bg-primary` | Already token-based |
| `Footer.tsx` | Uses `bg-primary` | Already token-based |

---

## Phase 5: Tailwind Config Updates

Extend `tailwind.config.ts` to include the new color references:

```typescript
colors: {
  // ... existing
  forest: {
    DEFAULT: "hsl(var(--forest))",
    dark: "hsl(var(--forest-dark))",
    light: "hsl(var(--forest-light))",
  },
  copper: {
    DEFAULT: "hsl(var(--copper))",
    dark: "hsl(var(--copper-dark))",
  },
}
```

This ensures Tailwind utilities work with both themes.

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/hooks/use-theme.tsx` | Theme context provider and hook |
| `src/components/ThemeToggle.tsx` | Toggle button component |

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Add `.theme-warm` class with full variable overrides |
| `tailwind.config.ts` | Add forest/copper color tokens |
| `src/main.tsx` | Wrap app with ThemeProvider |
| `src/components/layout/Header.tsx` | Add ThemeToggle to navigation |
| `src/components/home/Hero.tsx` | Convert inline gradient to use CSS variables |
| `src/components/home/Testimonials.tsx` | Use CSS variables for gradient |

---

## Warm Theme Color Values (HSL)

```css
.theme-warm {
  /* Backgrounds */
  --background: 40 33% 99%;        /* #FEFDFB - warm white */
  --warm-gray: 36 20% 95%;         /* #F5F3EF - warm cream */
  
  /* Primary - Forest Green */
  --primary: 156 33% 17%;          /* #1E3A2F */
  --forest: 156 33% 17%;
  --forest-dark: 156 33% 12%;
  --forest-light: 156 33% 25%;
  
  /* Accent - Also Forest Green */
  --accent: 156 33% 17%;
  
  /* CTA - Copper */
  --cta: 28 92% 37%;               /* #B45309 */
  --cta-hover: 28 92% 30%;         /* #92400E */
  
  /* Mapping navy variables to forest */
  --navy: 156 33% 17%;
  --navy-dark: 156 33% 12%;
  --navy-light: 156 33% 25%;
  
  /* Teal mapped to emerald */
  --teal: 158 64% 35%;
  --teal-light: 158 64% 45%;
  --teal-dark: 158 64% 25%;
}
```

---

## User Experience

1. **Default**: Site loads with Navy Corporate theme
2. **Toggle**: User clicks theme toggle in header
3. **Switch**: Instant transition (CSS variables swap)
4. **Persist**: Choice saved to localStorage
5. **Return**: Next visit remembers preference

---

## Technical Notes

### Why CSS Variables Over Separate Stylesheets?
- Instant switching without page reload
- Single source of truth for components
- Smaller bundle size
- Easy to add more themes later

### Fallback Strategy
- If user has no preference, use Navy (default)
- If localStorage is blocked, still works (just doesn't persist)

### Performance
- Zero runtime cost - just a class toggle
- CSS transitions can smooth the color change

---

## Testing Checklist

After implementation, verify these pages in both themes:
- [ ] Homepage (Hero, KPIs, Services, Testimonial, CTA)
- [ ] Services page and detail pages
- [ ] Roof Controller page
- [ ] Blog listing and article pages
- [ ] Contact page
- [ ] About page
- [ ] Mobile navigation
- [ ] Admin panel (optional - may keep navy)
