# Changelog

All notable changes to this project, in reverse chronological order.

---

## [cb7ff7f] — 2026-03-05

### docs: Add comprehensive README
- Created full project README with tech stack, features, structure, setup, architecture, section breakdown, and performance documentation.

---

## [59fc77a] — 2026-03-02

### fix: Smooth scroll transitions, show one data label at a time
**File:** `ScrollytellingAbout.tsx`

**Problem:** The three floating data labels ("40% faster", "Zero errors", "24/7 uptime") were all positioned in the orb center and stacked on top of each other. Additionally, text blocks had overlapping scroll ranges causing simultaneous visibility.

**Changes:**
- Made each data label appear **exclusively during its matching narrative phase** with non-overlapping scroll ranges
- Positioned labels centered below the orb instead of scattered at different coordinates
- Adjusted text block scroll ranges to have clean 4% gaps between phases:
  - Block 1: `0.05–0.30` (was `0.05–0.38`)
  - Block 2: `0.34–0.63` (was `0.30–0.68`)
  - Block 3: `0.67–1.00` (was `0.60–1.00`)
- Reduced Y movement from ±40px to +30px/-20px for subtler transitions
- Removed conflicting `animate` + `style.y` on floating labels
- Removed `backdrop-blur-md` from scroll-driven elements (GPU compositor cost)

---

## [4b3c383] — 2026-03-02

### fix: Smooth Approach transitions, fix THREE.js errors, add floating contact CTA, link carousel to case studies

**Multiple files changed.** This was a large multi-fix commit addressing several issues:

#### Approach.tsx — Transition Jitter Fix
**Problem:** Tab switching felt laggy with visible stutter and empty-state gaps.

**Root causes identified:**
1. `AnimatePresence mode="wait"` — Fully plays exit before starting enter, creating visible empty gap
2. `backdrop-blur-xl` on animated viewer card — Forces GPU re-composition every frame
3. Spring-based content transitions — Overshoot/bounce caused perceived jitter
4. `width` animation on progress bars — Triggers layout reflow

**Fixes applied:**
- Changed to `AnimatePresence mode="popLayout"` — Crossfades simultaneously, zero gap
- Replaced `backdrop-blur-xl` with solid `bg-white/[0.04]` — No compositor thrash
- Switched to tween-based opacity-only transitions (180ms) — No Y movement
- Progress bars now use `scaleX` with `originX: 0` instead of `width` — GPU-composited
- Tab indicator spring: stiffness `200→500`, damping `25→40` — Snappier, less bouncy
- Corner glow uses CSS custom properties with `transition` instead of class-swap
- Removed `backdrop-blur-sm` from data node tiles
- Removed `scale` animation from data nodes (was causing jitter)
- Halved stagger delay from 80ms to 30ms

#### RobotCarousel.tsx — WebGL Console Errors Fix
**Problem:** Three console errors:
1. `404` on HDRI file fetch
2. `THREE.Clock deprecated` warning
3. `WebGLRenderer: Context Lost`

**Fixes:**
- **HDRI 404 / timeout:** Removed `<Environment preset="city" />` (fetched `potsdamer_platz_1k.hdr` from `raw.githack.com`). Replaced with `<hemisphereLight>` + bumped ambient intensity
- **WebGL Context Lost:** Limited Canvas instances to active ±1 cards only (`absDisplayOffset <= 1`). Distant cards show a CSS gradient placeholder. Reduced max contexts from 7 to 3
- **Inactive cards:** Added `frameloop="demand"` to stop render loop on non-active cards
- Removed `Environment` import from `@react-three/drei`

#### SuccessStories.tsx — Case Study Expansion
- Expanded from 3 to 6 case studies (one per agent type)
- Added `slug` field to each case study
- Added `id="case-{slug}"` to each card for anchor linking
- New case studies: FinEdge (IDP), Meridian (Finance), NovaCare (Customer Service)
- Changed grid from `md:grid-cols-3` to `md:grid-cols-2 lg:grid-cols-3`

#### RobotCarousel.tsx — Explore Button Linking
- Changed `<button>` to `<a href="#case-{agent.type}">` for each agent card
- Clicking "Explore Custom BPA" scrolls to `#case-bpa`, etc.

#### main.tsx — Clock Warning Suppression
- Added `console.warn` filter to suppress `THREE.Clock: This module has been deprecated` warning (emitted by R3F internals, not fixable without R3F update)

#### FloatingContactCTA.tsx — New Component
- Fixed bottom-right floating button
- Appears after 600px scroll
- Links to `#contact`
- Icon-only on mobile, shows "Contact Us" text on `sm+`

#### App.tsx
- Added `FloatingContactCTA` import and render
- Removed `Services` section import (was already removed from render)

---

## [0a0d0dd] — Earlier

### fix: Hero text-carousel overlap
- Reduced `lg` font size to `text-6xl`
- Added `overflow-hidden` to grid columns

---

## [bac234d] — Earlier

### feat: Replace shader gradient with interactive 3D particle field
- Replaced `shadergradient` hero background with `WebGLBackground`
- 10,000-particle grid with sine/cosine wave animation
- Mouse-driven repulsion with quadratic falloff
- Per-particle color lerp (deep blue → cyan near cursor)
- Fog spheres for volumetric depth
- Film grain SVG overlay

---

## [0bce19f] — Earlier

### fix: Hero text overflow
- Responsive font sizing with `break-words`
- Added `min-h-[160px]` wrapper
- Button `w-[90%]` mobile centering

---

## [aed5fd0] — Earlier

### fix: Hero layout shift
- Added min-height wrapper for CTA
- Mobile centering for buttons
- Navbar link visibility fix (`text-slate-300`)

---

## [19b02f7] — Earlier

### perf: GPU acceleration and rendering optimizations
- Added `will-change-transform` hints
- DPR limiter on canvases (`[1, 1.5]`)
- `BakeShadows` on carousel cards
- `useRef` for spotlight element access (no DOM query)
- Reduced mobile blur effects
- GPU acceleration hints for animated elements

---

## [556ca5f] — Earlier

### feat: Premium dark mode case studies
- Volumetric lighting backgrounds
- Metallic gradient text (`bg-clip-text`)
- `AnimatePresence` for expand/collapse
- Glassmorphism card styling

---

## [344c1bf] — Earlier

### feat: Agent-mapped expanding case studies grid
- Replaced generic success stories with agent-specific cards
- Hover-to-expand interaction pattern

---

## [605abde] — Earlier

### feat: Refactor carousel and 3D props for 6 service types
- Created `AgentProps.tsx` with 6 unique holographic props
- Each agent type gets distinct geometry: gears, neural node, scanner, bars, figures, headset
- Created `AgentType` union type

---

## [870c203] — Earlier

### feat: Interactive tabbed approach command center
- Redesigned Approach section as tab controller + viewer
- `layoutId` sliding tab indicator
- `AnimatePresence` for content transitions
- Progress bars and data node grids

---

## [199de50] — Earlier

### feat: Apple-style scrollytelling about section
- 300vh container with sticky viewport
- Morphing orb with scale, rotation, hue-shift, border-radius transforms
- Three-phase narrative with scroll-driven opacity
- Phase indicator dots

---

## [af1a04b] — Earlier

### fix: Mobile responsiveness
- Navbar hamburger menu
- Grid breakpoint adjustments
- Pill width fixes
- Contact section padding

---

## [2cdc838] — Earlier

### feat: Premium motion upgrade
- Bento grid services with spotlight effect
- Vertical timeline layout
- 3D AI agent models
- Trusted-by logo marquee
- Full motion/animation system (MotionKit)
