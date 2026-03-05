# Performance Guide

Detailed documentation of all performance optimizations applied across the project.

---

## Overview

The site renders 10,000+ WebGL particles, multiple 3D scenes, scroll-driven animations, and complex CSS effects. Without careful optimization, this would cause frame drops, WebGL context loss, and laggy transitions. This document covers every optimization applied.

---

## WebGL / Three.js Optimizations

### 1. Limited WebGL Contexts
**File:** `RobotCarousel.tsx`

**Problem:** The carousel had 6 `<Canvas>` instances (one per card). Browsers limit WebGL contexts to ~8–16 total. Having 6+ canvases caused `WebGLRenderer: Context Lost` errors.

**Solution:** Only mount `<Canvas>` for cards within `absDisplayOffset <= 1` (active card ± 1 neighbor). Distant cards render a simple CSS gradient placeholder.

```tsx
{absDisplayOffset <= 1 ? (
    <Canvas ...>...</Canvas>
) : (
    <div className="w-20 h-20 rounded-full opacity-40 blur-xl" />
)}
```

**Impact:** Maximum 3 WebGL contexts active at once (down from 6).

### 2. Frame Loop Control
**File:** `RobotCarousel.tsx`

Non-active cards use `frameloop="demand"` to stop the Three.js render loop entirely:

```tsx
<Canvas frameloop={isActive ? 'always' : 'demand'}>
```

**Impact:** Only 1 canvas runs the animation loop. Others are frozen until they become active.

### 3. DPR Limiting
**Files:** `WebGLBackground.tsx`, `RobotCarousel.tsx`

Device pixel ratio capped at 1.5 to prevent 2x/3x rendering on high-DPI displays:

```tsx
<Canvas dpr={[1, 1.5]}>
```

**Impact:** ~50% fewer pixels rendered on Retina displays vs unbounded DPR.

### 4. Removed External HDRI Fetches
**File:** `RobotCarousel.tsx`

**Problem:** `<Environment preset="city" />` from `@react-three/drei` fetched `potsdamer_platz_1k.hdr` from `raw.githack.com`, causing:
- 404 errors when CDN was unreachable
- Connection timeout blocking render
- 1MB+ download per canvas instance

**Solution:** Replaced with local lighting:

```tsx
<ambientLight intensity={0.6} />
<hemisphereLight args={['#b1e1ff', '#080820', 0.5]} />
```

**Impact:** Zero network requests for 3D lighting. Instant render.

### 5. Baked Shadows
**File:** `RobotCarousel.tsx`

`<BakeShadows />` computes shadow maps once and freezes them, preventing per-frame shadow recalculation.

### 6. Canvas Configuration
**File:** `WebGLBackground.tsx`

```tsx
<Canvas
    gl={{ alpha: false, antialias: false, powerPreference: 'high-performance' }}
>
```

- `alpha: false` — No alpha compositing overhead
- `antialias: false` — MSAA disabled (particles don't need it)
- `powerPreference: 'high-performance'` — Requests discrete GPU on dual-GPU systems

---

## Animation Optimizations

### 7. GPU-Composited Properties Only
**Files:** `ScrollytellingAbout.tsx`, `Approach.tsx`

All scroll-driven and transition animations only animate `opacity` and `transform` (CSS composite properties). These are handled entirely by the GPU compositor without triggering layout or paint.

**Never animated:** `width`, `height`, `top`, `left`, `backdrop-filter`, `box-shadow`.

### 8. `scaleX` Instead of `width` for Progress Bars
**File:** `Approach.tsx`

**Problem:** Animating `width` triggers CSS layout reflow every frame.

**Solution:** Animate `scaleX` from `0` to `1` with `originX: 0`:

```tsx
<motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    style={{ originX: 0, width: `${step.progress}%` }}
/>
```

**Impact:** Zero layout reflows during animation.

### 9. Removed `backdrop-blur` from Animated Elements
**Files:** `Approach.tsx`, `ScrollytellingAbout.tsx`

**Problem:** `backdrop-blur` forces the GPU to re-composite the entire blurred region every frame during animation, causing dropped frames.

**Solution:**
- Viewer card: `backdrop-blur-xl` → `bg-white/[0.04]` (solid color, no blur)
- Data node tiles: `backdrop-blur-sm` removed
- Floating data labels: `backdrop-blur-md` removed

**Impact:** Eliminates the most expensive CSS property during scroll/transition animations.

### 10. `popLayout` Mode for Instant Crossfades
**File:** `Approach.tsx`

**Problem:** `AnimatePresence mode="wait"` fully completes exit animation before starting enter — creating a visible empty-state gap (200-350ms of nothing).

**Solution:** `mode="popLayout"` removes the exiting element from layout flow immediately and runs enter/exit simultaneously:

```tsx
<AnimatePresence initial={false} mode="popLayout">
    <motion.div
        key={activeStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
    />
</AnimatePresence>
```

**Impact:** Zero perceived delay between panels.

### 11. Non-Overlapping Scroll Ranges
**File:** `ScrollytellingAbout.tsx`

**Problem:** Text blocks had overlapping `useTransform` ranges, causing two blocks to be visible simultaneously during transition zones.

**Solution:** Added 4% gaps between block ranges:

| Block | Visible | Fade Out Complete | Next Fade In Start |
|-------|---------|-------------------|--------------------|
| 1 | 0.05 – 0.25 | 0.30 | — |
| 2 | — | — | 0.34 |
| 2 | 0.39 – 0.58 | 0.63 | — |
| 3 | — | — | 0.67 |

**Impact:** Clean handoffs — only one text block visible at any time.

### 12. Passive Scroll Listeners
**File:** `FloatingContactCTA.tsx`

```tsx
window.addEventListener('scroll', onScroll, { passive: true });
```

**Impact:** Tells the browser the handler won't call `preventDefault()`, enabling scroll optimizations.

### 13. Direct Style Manipulation for Spotlight
**File:** `MotionKit.tsx` (`SpotlightCard`), `Services.tsx`

Mouse-tracking spotlight glow updates `element.style.background` directly instead of going through React state:

```tsx
const handleMouseMove = (e) => {
    // Direct DOM style update — no React re-render
    spotlightRef.current.style.background = `radial-gradient(...)`;
};
```

**Impact:** Zero React re-renders during mouse movement.

---

## CSS Optimizations

### 14. `will-change-transform` Hints
**Files:** `Approach.tsx`, `RobotCarousel.tsx`

Applied `will-change-transform` on elements that animate frequently to promote them to their own GPU layer.

### 15. CSS Mask for Marquee Edges
**File:** `TrustedBy.tsx`

Edge fade uses `mask-image: linear-gradient(...)` instead of overlaying gradient divs, avoiding extra DOM elements.

### 16. Film Grain as Data URI
**File:** `index.css`, `WebGLBackground.tsx`

Film grain noise is an inline SVG `feTurbulence` filter encoded as a data URI background, avoiding an external image request.

---

## React Optimizations

### 17. `useMemo` for Particle Data
**File:** `WebGLBackground.tsx`

Position arrays, color arrays, and reusable `THREE.Color` instances are memoized to prevent re-allocation on re-render:

```tsx
const { positions, basePositions, count } = useMemo(() => { ... }, []);
const colors = useMemo(() => { ... }, [count]);
```

### 18. `useCallback` for Event Handlers
**File:** `WebGLBackground.tsx`

Pointer event handlers are wrapped in `useCallback` to maintain referential stability.

### 19. THREE.Clock Warning Suppression
**File:** `main.tsx`

The `THREE.Clock` deprecation warning is emitted by `@react-three/fiber` internals (not user code). Suppressed via targeted `console.warn` filter to reduce console noise:

```tsx
const _warn = console.warn;
console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Clock')) return;
    _warn.apply(console, args);
};
```

---

## Measurement Tips

To measure performance on this site:

1. **Chrome DevTools → Performance tab** — Record while switching Approach tabs or scrolling through ScrollytellingAbout
2. **Frame rate** — Should stay at 60fps (look for dropped frames in the flame chart)
3. **GPU Memory** — Check `chrome://gpu` for WebGL context count (should be ≤4)
4. **Layout shifts** — Performance panel shows layout recalculations (should be near-zero during animations)
5. **Lighthouse** — Run on production build (`npm run build && npm run preview`)
