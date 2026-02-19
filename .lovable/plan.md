

# Fix KPI Counter Animation and Update Values

## 1. Fix the Counter Animation Bug

**Root cause:** Each `AnimatedNumber` component creates its own `useInView` observer. Because KPI data loads asynchronously from the database, the section may scroll into view before the number spans mount. With `once: true`, the observer never re-triggers, leaving everything at 0.

**Fix:** Remove the per-element `useInView` from `AnimatedNumber`. Instead, use the parent section's existing `isInView` state (already computed on `sectionRef`) and pass it down as a prop. This way, the animation triggers based on the section being visible, regardless of when the data finishes loading.

**File:** `src/components/home/KPISection.tsx`

Changes:
- `AnimatedNumber` accepts an `isInView` boolean prop instead of creating its own observer
- Remove the internal `ref` and `useInView` from `AnimatedNumber`
- `KPICard` receives and passes `isInView` from the parent
- The parent `KPISection` passes its existing `isInView` value to each card

## 2. Update Database Values

Run SQL to update the `kpis` table with the correct values:

| key | current value | new value | suffix |
|-----|--------------|-----------|--------|
| sqft_managed | 455 | 400 | M+ |
| years | 15 | 25 | + |
| inspections | 1200 | 10000 | + |

## 3. Fix "Founded" Year in Detail Text

In the `kpiDetails` object, update the "years" entry from "Founded 2010" to "Founded 2002".

## 4. Remove Lovable Badge

This is a project setting, not a code change. Toggle "Hide 'Lovable' Badge" in Project Settings.

---

## Technical Detail

```text
Current flow (broken):
  Page loads -> KPI section in DOM (loading skeleton)
  -> Data fetches from DB
  -> Skeleton replaced by KPICards with AnimatedNumber spans
  -> Each span creates its own useInView observer
  -> If section already scrolled past, observer never fires
  -> Numbers stay at 0

Fixed flow:
  Page loads -> Section ref tracks viewport (useInView on section)
  -> Data fetches from DB
  -> KPICards render with isInView passed as prop
  -> If section is already visible, animation starts immediately
  -> Numbers count up correctly
```

## Files Modified
| File | Change |
|------|--------|
| `src/components/home/KPISection.tsx` | Pass `isInView` from section to AnimatedNumber; fix "Founded 2002" text |

## Database Update
| Table | Column | Where | New Value |
|-------|--------|-------|-----------|
| kpis | value | key = 'sqft_managed' | 400 |
| kpis | value | key = 'years' | 25 |
| kpis | value | key = 'inspections' | 10000 |

