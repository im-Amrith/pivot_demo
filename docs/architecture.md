# Architecture

## Overview

Pivot Automations is a **single-page React application** built as a vertical stack of self-contained sections. There is no routing — all navigation is handled via anchor links (`#contact`, `#approach`, etc.) that scroll to section IDs.

## High-Level Diagram

```
┌─────────────────────────────────────────────┐
│  index.html                                 │
│  └── #root                                  │
│       └── <StrictMode>                      │
│            └── <App />                      │
│                 ├── Navbar        (sticky)   │
│                 ├── Hero          (WebGL)    │
│                 ├── Stats                    │
│                 ├── ScrollytellingAbout      │
│                 │   (300vh scroll container) │
│                 ├── Approach                 │
│                 ├── RobotCarousel (3D)       │
│                 ├── WhyUs                    │
│                 ├── Partnership              │
│                 ├── SuccessStories           │
│                 ├── TrustedBy               │
│                 ├── Contact                  │
│                 ├── FAQ                      │
│                 ├── Footer                   │
│                 └── FloatingContactCTA       │
│                     (fixed position)         │
└─────────────────────────────────────────────┘
```

## Component Hierarchy

```
App.tsx
├── sections/           # Full-width page sections (rendered top-to-bottom)
│   ├── Navbar          # Sticky header, z-50
│   ├── Hero            # Uses: WebGLBackground, ShimmerText, ProductCarousel, MagneticButton, PivotLogo
│   ├── Stats           # Uses: SpotlightCard, RevealText
│   ├── ScrollytellingAbout  # Self-contained scroll-driven section
│   ├── Approach        # Uses: RevealText, MotionKit springs
│   ├── RobotCarousel   # Uses: AIAgentCore → AgentProps
│   ├── Services        # Uses: RevealText, spotlight effect
│   ├── WhyUs           # Uses: MagneticButton, RevealText
│   ├── Partnership     # Uses: RevealText
│   ├── SuccessStories  # Linked from RobotCarousel via #case-{slug}
│   ├── TrustedBy       # Self-contained marquee
│   ├── Contact         # Uses: MagneticButton
│   ├── FAQ             # Accordion
│   └── Footer          # Uses: MagneticButton
│
├── ui/                 # Shared reusable components
│   ├── MotionKit       # Spring configs, variants, SpotlightCard, RevealText
│   ├── MagneticButton  # Cursor-following button
│   ├── ShimmerText     # Animated headline text
│   ├── ProductCarousel # Image slideshow
│   ├── PivotLogo       # SVG brand mark
│   └── FloatingContactCTA  # Scroll-aware fixed button
│
└── 3d/                 # Three.js / React Three Fiber components
    ├── WebGLBackground # 10k particle field + fog spheres
    ├── AIAgentCore     # Glass capsule agent model
    ├── AgentProps      # 6 type-specific holographic props
    └── ParticleField   # 5k spherical point cloud (unused in current build)
```

## Build Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Bundler | Vite 6.2 | HMR, build, dev server |
| Framework | React 19 | Component rendering |
| Language | TypeScript 5.8 | Type safety |
| Styling | Tailwind CSS 4.1 | Utility-first CSS via `@tailwindcss/vite` plugin |
| Animation | Motion 12.23 (Framer Motion) | Declarative animation, scroll-driven transforms |
| 3D | Three.js 0.183 + R3F 9.5 + Drei 10.7 | WebGL rendering |
| Icons | Lucide React 0.546 | SVG icon components |

## Entry Point Flow

```
main.tsx
  ├── Suppresses THREE.Clock deprecation warning (console.warn filter)
  ├── Imports index.css (Tailwind + custom keyframes)
  └── createRoot(#root).render(<StrictMode><App /></StrictMode>)
```

## Animation Strategy

### Scroll-Driven (ScrollytellingAbout)
- `useScroll` + `useTransform` for scroll-position-to-style mapping
- Sticky viewport pattern: `h-[300vh]` container with `sticky top-0 h-screen` child
- Only `opacity` and `transform` are animated (GPU-composited, no layout thrash)

### State-Driven (Approach, FAQ)
- `AnimatePresence` with `mode="popLayout"` for zero-delay crossfades
- `layoutId` for shared-element transitions (tab indicator)
- Pure `opacity` transitions to avoid jitter

### Per-Frame (3D components)
- R3F `useFrame` hook for continuous animation (idle float, pulse, rotation)
- Isolated from React re-renders — runs in the Three.js render loop
- `MathUtils.lerp` for smooth damped interpolation

### CSS (ShimmerText, TrustedBy)
- CSS `@keyframes` for infinite loops (shimmer sweep, marquee scroll, pulse glow)
- `background-clip: text` for gradient text effects
- `filter: drop-shadow` for glow effects

## Data Flow

There is no backend, API, or global state management. All data is **hardcoded** in component-level constants:

| Data | Location | Description |
|------|----------|-------------|
| Nav links | `Navbar.tsx` | 4 anchor links |
| Stats | `Stats.tsx` | 3 KPI objects |
| Narratives | `ScrollytellingAbout.tsx` | 3 scroll phases |
| Steps | `Approach.tsx` | 6 process steps |
| Agents | `RobotCarousel.tsx` | 6 service agents |
| Services | `Services.tsx` | 6 bento-grid items |
| Differentiators | `WhyUs.tsx` | 4 reasons |
| Case Studies | `SuccessStories.tsx` | 6 case studies (slug-linked) |
| Logos | `TrustedBy.tsx` | 8 SVG logos |
| FAQs | `FAQ.tsx` | 4 Q&A pairs |
| Contact info | `Contact.tsx` / `Footer.tsx` | Address, phone, email |

## Cross-Section Linking

```
RobotCarousel "Explore {agent}" button
  └── <a href="#case-{agent.type}">
       └── SuccessStories card with id="case-{slug}"

Navbar "Get Started" / FloatingContactCTA
  └── <a href="#contact">
       └── Contact section with id="contact"

Navbar links
  └── #approach → Approach section
  └── #services → Services section
  └── #success → SuccessStories section
```

## File Naming Conventions

- **Sections**: PascalCase, one component per file, default export
- **UI Utilities**: PascalCase, may export multiple named items (MotionKit)
- **3D Components**: PascalCase, one primary export + optional type export (AgentProps)
- **CSS**: `index.css` at root, no CSS modules
