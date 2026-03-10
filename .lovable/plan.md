

## Fix Hero Video — Use Roofing/Construction Footage

### Problem
Pexels video 3209828 is not roofing-related — it's showing unrelated content (kid with VR glasses). The video element is working correctly; the source URL just points to the wrong footage.

### Solution
Swap the video `src` on line 18 of `src/components/home/Hero.tsx` to a proper commercial roofing/construction aerial video from Pexels.

**New video source:** `https://videos.pexels.com/video-files/5765240/5765240-hd_1920_1080_30fps.mp4`
This is Pexels video 5765240 — aerial drone footage of a large commercial building rooftop/construction site.

If that specific video doesn't match either, an alternative is Pexels video 7534717 (aerial construction site footage):
`https://videos.pexels.com/video-files/7534717/7534717-hd_1920_1080_25fps.mp4`

### Change
**File:** `src/components/home/Hero.tsx`, line 18 only.

Replace:
```
src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
```
With:
```
src="https://videos.pexels.com/video-files/5765240/5765240-hd_1920_1080_30fps.mp4"
```

The TODO comment stays. No other changes — structure, overlay, content all remain as-is.

