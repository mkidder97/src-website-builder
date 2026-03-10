

## Video Hero — Revised Plan

### File: `src/components/home/Hero.tsx`

**Section tag (line 10-18)** — Replace with:
- Class: `relative h-screen flex items-center overflow-hidden` (drop `min-h-[90vh]`, drop `hero-gradient`)
- Remove `role`, `aria-label`, and the entire inline `style` block

**Add video element** as first child inside section:
```tsx
{/* TODO: Replace src with actual SRC field footage file when available */}
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
  src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
/>
```

**Add gradient overlay div** after the video:
```tsx
<div
  className="absolute inset-0 z-[1]"
  style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)' }}
/>
```

**Content div (line 20)** — Change `z-10` to `z-[2]`. Everything else inside stays untouched.

### What's different from the previous plan
1. **`hero-gradient` class removed** from the section — prevents double-darkening from CSS gradient + inline overlay.
2. **Video URL changed** to the 1080p version (`-hd_1920_1080_25fps.mp4`) — much smaller file, loads fast.

