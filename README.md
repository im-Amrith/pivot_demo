# Pivot Automations

A high-performance marketing website for **Pivot Automations** — an AI-powered business process automation company based in Mumbai. Built with React 19, Three.js, and Framer Motion, featuring immersive 3D visuals, scroll-driven storytelling, and interactive agent showcases.

<br>

## Table of Contents

- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Sections Breakdown](#sections-breakdown)
- [UI Components](#ui-components)
- [3D Components](#3d-components)
- [Performance Optimizations](#performance-optimizations)
- [License](#license)

<br>

## Live Demo

Deployed via Vite build. Run locally with:

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000)

<br>

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.0 |
| **Build Tool** | Vite | 6.2 |
| **Language** | TypeScript | 5.8 |
| **Styling** | Tailwind CSS | 4.1 |
| **Animation** | Motion (Framer Motion) | 12.23 |
| **3D Rendering** | Three.js | 0.183 |
| **3D React Bindings** | @react-three/fiber | 9.5 |
| **3D Helpers** | @react-three/drei | 10.7 |
| **Icons** | Lucide React | 0.546 |
| **Shaders** | ShaderGradient | 1.3 |

<br>

## Features

- **WebGL Particle Field** — 10,000-particle reactive background with mouse-driven repulsion and color lerping
- **3D AI Agent Showcase** — Interactive carousel with six unique 3D agent models (capsule bodies, holographic props, orbital rings)
- **Scroll-Driven Storytelling** — Three-phase narrative section with morphing orb visual, scroll-linked opacity/parallax, and phase indicators
- **6-Step Approach Viewer** — Tabbed controller with crossfade transitions, animated progress bars, and ambient glow
- **Magnetic Buttons** — Cursor-following spring-physics buttons
- **Shimmer Text** — Word-split headline animation with CSS shimmer sweep and keyword glow
- **Floating Contact CTA** — Scroll-aware fixed button that appears after the hero
- **Bento Grid Services** — Mouse-tracking spotlight effect on service cards
- **Case Studies** — Six expandable case study cards linked directly from agent carousel
- **Logo Marquee** — Infinite-scroll trust strip with client logos
- **Responsive Design** — Mobile-first with horizontal scroll tabs, stacked layouts, and reduced 3D on small screens

<br>

## Project Structure

```
pivot-automations/
├── index.html                    # Entry HTML
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite + Tailwind plugin setup
│
├── src/
│   ├── main.tsx                  # React root mount + THREE.Clock warning suppression
│   ├── App.tsx                   # Root component — section composition
│   ├── index.css                 # Tailwind theme, custom keyframes, base styles
│   ├── vite-env.d.ts             # Vite type declarations
│   │
│   ├── components/
│   │   ├── sections/             # Page sections (top to bottom)
│   │   │   ├── Navbar.tsx        # Sticky nav with mobile drawer
│   │   │   ├── Hero.tsx          # Full-screen hero with WebGL + carousel
│   │   │   ├── Stats.tsx         # Animated metrics banner
│   │   │   ├── ScrollytellingAbout.tsx  # Scroll-driven 3-phase narrative
│   │   │   ├── Approach.tsx      # 6-step tabbed process viewer
│   │   │   ├── RobotCarousel.tsx # 3D agent card carousel
│   │   │   ├── Services.tsx      # Bento grid service cards
│   │   │   ├── WhyUs.tsx         # Differentiators bento grid
│   │   │   ├── Partnership.tsx   # Engagement section with floating UI
│   │   │   ├── SuccessStories.tsx # Expandable case study cards
│   │   │   ├── TrustedBy.tsx     # Client logo marquee
│   │   │   ├── Contact.tsx       # Contact form + info
│   │   │   ├── FAQ.tsx           # Accordion FAQ
│   │   │   └── Footer.tsx        # Site footer
│   │   │
│   │   ├── ui/                   # Reusable UI primitives
│   │   │   ├── MotionKit.tsx     # Shared spring configs & animation variants
│   │   │   ├── MagneticButton.tsx # Cursor-following magnetic button
│   │   │   ├── ShimmerText.tsx   # Animated shimmer headline
│   │   │   ├── ProductCarousel.tsx # Auto-advancing image carousel
│   │   │   ├── PivotLogo.tsx     # Animated SVG brand mark
│   │   │   └── FloatingContactCTA.tsx # Fixed floating contact button
│   │   │
│   │   └── 3d/                   # Three.js / R3F components
│   │       ├── WebGLBackground.tsx # Particle field + fog spheres canvas
│   │       ├── AIAgentCore.tsx    # Capsule agent with emissive orb + rings
│   │       ├── AgentProps.tsx     # Type-specific holographic props (6 variants)
│   │       └── ParticleField.tsx  # Spherical point cloud for agent cards
```

<br>

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone https://github.com/im-Amrith/pivot_demo.git
cd pivot_demo
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000` with HMR.

### Production Build

```bash
npm run build
npm run preview
```

<br>

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite --port=3000 --host=0.0.0.0` | Start dev server with HMR |
| `build` | `vite build` | Production build to `dist/` |
| `preview` | `vite preview` | Preview production build locally |
| `clean` | `rm -rf dist` | Remove build artifacts |
| `lint` | `tsc --noEmit` | Type-check without emitting |

<br>

## Architecture

The app follows a **single-page section-stack** architecture:

```
App.tsx
 ├── Navbar          (sticky, z-50)
 ├── Hero            (WebGL canvas + ShimmerText + ProductCarousel)
 ├── Stats           (intersection-triggered counters)
 ├── ScrollytellingAbout  (300vh scroll container → sticky viewport)
 ├── Approach        (state-driven tab controller + viewer)
 ├── RobotCarousel   (3D Canvas per visible card)
 ├── WhyUs           (static bento grid)
 ├── Partnership     (decorative floating UI)
 ├── SuccessStories  (hover-expandable cards)
 ├── TrustedBy       (CSS marquee)
 ├── Contact         (form + contact info)
 ├── FAQ             (accordion)
 ├── Footer          (links + socials)
 └── FloatingContactCTA  (fixed, scroll-aware)
```

**Animation Strategy:**
- **Layout animations** use Motion's `layoutId` for shared-element transitions
- **Scroll animations** use `useScroll` + `useTransform` (GPU-composited `opacity` and `transform` only)
- **3D scenes** use `@react-three/fiber`'s `useFrame` loop — isolated from React re-renders
- **Transitions** prefer `popLayout` mode for zero-delay crossfades

<br>

## Sections Breakdown

### Navbar
Sticky header with desktop nav links and mobile hamburger drawer. "Get Started" CTA scrolls to `#contact`.

### Hero
Full-viewport section with a WebGL particle field background (`WebGLBackground`), animated `ShimmerText` headline, `ProductCarousel` for dashboard previews, and primary/secondary CTAs.

### Stats
Three animated metric cards (40% productivity boost, 30% cost reduction, 95% accuracy) with spotlight hover effects.

### ScrollytellingAbout
A `300vh` scroll container with a sticky viewport. Three narrative phases fade in/out based on scroll progress with non-overlapping ranges. A morphing orb on the right responds to scroll with scale, rotation, hue-shift, and border-radius changes. Phase-matched data labels appear one at a time.

### Approach
Six-step process viewer: vertical tab controller on desktop (horizontal scroll on mobile) with a `layoutId`-driven sliding indicator. Content panel uses `AnimatePresence mode="popLayout"` for instant crossfade. Progress bars animate with `scaleX` (GPU-composited).

### RobotCarousel
3D card carousel showcasing six AI agent types. Each visible card (±1 from active) renders a `<Canvas>` with `AIAgentCore`. Off-screen cards show a gradient placeholder to limit WebGL contexts. "Explore" buttons link to corresponding case studies via `#case-{type}` anchors.

### Services
Bento grid of six service offerings with a mouse-tracking radial gradient spotlight effect.

### WhyUs
Differentiators grid with volumetric glow backgrounds and staggered reveal animations.

### Partnership
Engagement section with decorative floating UI pills illustrating AI agent workflows.

### SuccessStories
Six expandable case study cards — one per agent type. Each card has `id="case-{slug}"` for deep linking from the carousel. Hover to expand description.

### TrustedBy
Infinite CSS marquee of client logo SVGs.

### Contact
Split-panel contact section: left side has office address, phone, and email; right side has a contact form with magnetic submit button.

### FAQ
Four-item accordion with staggered reveal and spring-based expand/collapse.

### Footer
Four-column footer with branding, social links, navigation, and contact info.

<br>

## UI Components

| Component | Description |
|-----------|-------------|
| **MotionKit** | Exports shared `SPRING` configs, `VIEWPORT` settings, `staggerContainer`, `fadeSlideUp`, `scaleIn` variants |
| **MagneticButton** | Follows cursor within bounds using `useMotionValue` + spring physics |
| **ShimmerText** | Splits text into words, applies CSS shimmer gradient sweep, pulses glow on keywords |
| **ProductCarousel** | Auto-advancing (4s interval) image carousel with pause-on-hover and chevron nav |
| **PivotLogo** | SVG brand mark with hover-rotate or infinite-spin modes and drop-shadow glow |
| **FloatingContactCTA** | Fixed bottom-right button, appears after 600px scroll, links to `#contact` |

<br>

## 3D Components

| Component | Description |
|-----------|-------------|
| **WebGLBackground** | 10,000-particle grid with sine/cosine wave animation, mouse repulsion, additive blending, and color lerping toward cyan near cursor |
| **AIAgentCore** | Glass capsule shell with emissive inner orb, LED equator ring, decorative orbital rings, and type-specific holographic prop |
| **AgentProps** | Six prop variants: interlocking gears (BPA), neural node (Consulting), scanning document (IDP), bar chart (Finance), figure network (HR), headset ring (Customer Service) |
| **ParticleField** | 5,000-point spherical cloud used inside agent carousel cards |

<br>

## Performance Optimizations

- **Limited WebGL contexts** — Only active ±1 carousel cards render `<Canvas>`; others show CSS placeholders
- **`frameloop="demand"`** — Non-active 3D cards don't run the render loop
- **No HDRI fetches** — Replaced `<Environment preset>` (external .hdr download) with `<hemisphereLight>` for equivalent fill
- **GPU-composited animations only** — Scroll-driven sections animate `opacity` and `transform` exclusively (no `width`, `height`, or `backdrop-blur` during transitions)
- **`popLayout` crossfade** — Eliminates the empty-state gap from sequential `wait` mode transitions
- **`scaleX` progress bars** — Uses transform instead of animating `width` (avoids layout thrashing)
- **Removed `backdrop-blur` from animated elements** — Prevents GPU compositor thrashing on scroll-driven content
- **THREE.Clock warning suppressed** — Filtered in `main.tsx` since it's emitted by R3F internals

<br>

## License

Private project. All rights reserved.

