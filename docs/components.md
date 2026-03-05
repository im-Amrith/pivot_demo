# Component Reference

Complete documentation for every component in the project.

---

## Sections (`src/components/sections/`)

### Navbar.tsx
**Lines:** 53 | **Export:** `default Navbar`

Sticky top navigation bar with responsive desktop/mobile layouts.

| Feature | Detail |
|---------|--------|
| Desktop | Horizontal nav links + "Get Started" CTA button |
| Mobile | Hamburger toggle → animated dropdown menu |
| Branding | `PivotLogo` + "Pivot" text |
| Navigation | Anchor links: `#approach`, `#services`, `#success`, `#contact` |

**State:** `useState<boolean>` — `isOpen` for mobile menu toggle.

**Animation:** Mobile menu uses `motion.div` with `initial={{ opacity: 0, y: -20 }}` → `animate={{ opacity: 1, y: 0 }}`.

---

### Hero.tsx
**Lines:** 87 | **Export:** `default Hero`

Full-viewport hero section — the first thing users see.

| Element | Component | Position |
|---------|-----------|----------|
| Background | `WebGLBackground` | Absolute, behind content |
| Headline | `ShimmerText` | Left column |
| Tagline | Badge with animated ping dot | Left column |
| CTA Button | `MagneticButton` | Left column |
| Preview | `ProductCarousel` | Right column (hidden on mobile) |
| Ambient Logo | Large blurred background image | Behind carousel |

**State:** `useState<boolean>` — `isLoading` for CTA button (toggles to spinning `PivotLogo` for 3 seconds).

**Animation:** Staggered reveal: tagline → headline → body → CTA with `whileInView` triggers.

---

### Stats.tsx
**Lines:** 53 | **Export:** `default Stats`

Animated metrics banner showing three KPIs.

| Metric | Value | Color |
|--------|-------|-------|
| Productivity | 40% | Sky blue |
| Cost Reduction | 30% | Indigo |
| Accuracy | 95% | Emerald |

**Animation:** `SpotlightCard` with mouse-tracking glow. Stats pop in with staggered `scale` animation (cascade delay: `i * 0.1 + 0.2`).

---

### ScrollytellingAbout.tsx
**Lines:** 167 | **Export:** `default ScrollytellingAbout`

Scroll-driven three-phase narrative section.

**Layout:** `300vh` container with `sticky top-0 h-screen` viewport trap.

**Left Column — Text Phases:**

| Phase | Scroll Range | Content |
|-------|-------------|---------|
| 01 "The Problem" | 0.00 – 0.30 | Manual processes killing margins |
| 02 "Our Pivot" | 0.34 – 0.63 | AI-powered workflow redesign |
| 03 "The Future" | 0.67 – 1.00 | Manual to autonomous in 90 days |

Text blocks are absolutely positioned and fade via `useTransform` with **non-overlapping ranges** (4% gaps prevent two blocks from showing simultaneously).

**Right Column — Morphing Orb:**

| Property | Transform |
|----------|-----------|
| Scale | 1 → 1.3 → 1.6 |
| Rotation | 0° → 180° |
| Border Radius | 30% → 40% → 50% |
| Hue | 200 → 220 → 260 → 300 |
| Emojis | ⚡ → ⚙️ → 🚀 |

Expanding rings (`ring1Scale`, `ring2Scale`) and **one data label per phase** ("40% faster", "Zero errors", "24/7 uptime") shown exclusively during their matching phase.

**Bottom:** Three phase indicator dots that expand/contract with `scaleX`.

---

### Approach.tsx
**Lines:** 185 | **Export:** `default Approach`

Interactive 6-step process viewer ("Evolution Engine").

**Steps:**

| # | Icon | Title | Accent | Progress |
|---|------|-------|--------|----------|
| 1 | Database | Data Capture | sky→blue | 92% |
| 2 | PenTool | Extract | blue→indigo | 78% |
| 3 | LayoutGrid | Classify | indigo→violet | 85% |
| 4 | CheckCircle2 | Validate | emerald→green | 100% |
| 5 | FileOutput | Export | amber→orange | 67% |
| 6 | BarChart3 | Analyze | rose→pink | 88% |

**Layout:**
- **Desktop:** Vertical tab list (38%) + Viewer card (62%)
- **Mobile:** Horizontal scroll tab row + Viewer card

**Key Techniques:**
- `layoutId="activeTabBg"` — Sliding tab indicator animates between buttons
- `AnimatePresence mode="popLayout"` — Zero-delay crossfade (no empty-state gap)
- `scaleX` progress bar — GPU-composited, no layout thrash
- Ambient `radial-gradient` background shifts color per step
- Corner glow uses CSS custom properties for smooth color transition

**State:** `useState<number>` — `activeStep` (0–5).

---

### RobotCarousel.tsx
**Lines:** 133 | **Export:** `default RobotCarousel`

3D card carousel showcasing six AI agent types.

**Agents:**

| Agent | Color | Type | Case Study Link |
|-------|-------|------|----------------|
| Custom BPA | #6366f1 | `bpa` | `#case-bpa` |
| AI Consulting | #0ea5e9 | `consulting` | `#case-consulting` |
| IDP | #f59e0b | `idp` | `#case-idp` |
| Financial Automation | #34d399 | `finance` | `#case-finance` |
| HR Automation | #f43f5e | `hr` | `#case-hr` |
| Customer Service | #f97316 | `customer_service` | `#case-customer_service` |

**Carousel Mechanics:**
- Cards positioned via `displayOffset * 280px` with circular wrapping
- Active card: `scale: 1.1`, adjacent: `scale: 0.8`
- Perspective via `rotateY: displayOffset * -15`
- Opacity: `1 - absDisplayOffset * 0.3` (fades to 0 beyond ±2)

**Performance Optimization:**
- Only `absDisplayOffset <= 1` cards render a `<Canvas>` (max 3 WebGL contexts)
- Distant cards show a blurred gradient placeholder
- `frameloop="demand"` on non-active cards stops the render loop

**Navigation:** Prev/next buttons with circular index wrapping via modular arithmetic.

---

### Services.tsx
**Lines:** 104 | **Export:** `default Services`

Bento-grid layout with cursor-tracking spotlight.

| Service | Icon | Grid Span |
|---------|------|-----------|
| Custom BPA | Settings | 2 columns |
| AI Consulting | BrainCircuit | 2 rows |
| IDP | FileText | Standard |
| Financial Automation | Wallet | 2 columns |
| HR Automation | BadgeCheck | Standard |
| Customer Service | Headset | Standard |

**Spotlight Effect:** A `pointer-events-none` absolute div tracks the mouse, rendering a `radial-gradient` glow that follows the cursor across the entire grid. The CSS `background` property is set directly via `onMouseMove` handler (no React state churn).

---

### WhyUs.tsx
**Lines:** 95 | **Export:** `default WhyUs`

Two-column differentiators section.

**Left Column (Bento Grid):**

| Differentiator | Icon |
|---------------|------|
| Strategic Implementation | Target |
| SME Centric | Cpu |
| Long-term Partnership | Handshake |
| Secure & Compliant | ShieldCheck |

Cards are glassmorphism panels (`bg-white/[0.03]`, border glow on hover) with alternating vertical offset (`lg:mt-10` on odd cards) for a masonry look.

**Right Column:** Sticky (`lg:sticky lg:top-32`) with headline, body text, and `MagneticButton` CTA.

---

### Partnership.tsx
**Lines:** 141 | **Export:** `default Partnership`

Human-AI partnership section with decorative floating UI.

**Left Column:** Heading + two feature cards (Augmented Intelligence, Seamless Integration) with hover y-lift.

**Right Column:** Two floating mock-UI components:
- **ChatPill** — Chat/approval widget with messages and "Approved" badge
- **SyncPill** — Data sync progress widget with 87% progress bar and status rows

Pills float on infinite `y` oscillation (`duration: 3` and `duration: 4`) for parallax effect.

---

### SuccessStories.tsx
**Lines:** 133 | **Export:** `default SuccessStories`

Expandable case study cards.

| Slug | Agent | Metric | Title |
|------|-------|--------|-------|
| `bpa` | Custom BPA Agent | 40% Faster Engineering Cycles | Velocitas |
| `consulting` | AI Consulting | 100% Action Item Capture | TeamSync |
| `idp` | IDP Agent | 95% Faster Document Processing | FinEdge |
| `finance` | Financial Automation Agent | 3x Faster Month-End Close | Meridian |
| `hr` | HR Automation Agent | 80% Reduction in Screening Time | Vantage |
| `customer_service` | Customer Service Agent | 70% Tickets Resolved Autonomously | NovaCare |

Each card has `id="case-{slug}"` for deep linking from the RobotCarousel.

**Interaction:** Hover expands description via `AnimatePresence` (height + opacity animation). Non-hovered cards show "Hover to read more →" hint.

**Visual:** Metric text uses `bg-clip-text text-transparent` with `from-white to-slate-400` gradient for metallic sheen.

---

### TrustedBy.tsx
**Lines:** 103 | **Export:** `default TrustedBy`

Infinite logo marquee.

**Logos:** 8 placeholder SVGs (Meridian, NovaTech, Apex, Stratos, Helix, Quantum, Vantage, Zenith).

**Marquee:** Logos array is doubled for seamless looping. `animate={{ x: ['0%', '-50%'] }}` with `repeat: Infinity` and `linear` easing. Pauses on hover via state.

**Edge Fade:** CSS `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`.

---

### Contact.tsx
**Lines:** 93 | **Export:** `default Contact`

Split-panel contact section. `id="contact"`.

**Left Panel (Dark):** Address (BKC Mumbai), phone, email with animated icons.

**Right Panel (White):** Form with fields: First Name, Last Name, Company Email, Project Type (select), Message. Submit via `MagneticButton`. No actual form submission (`e.preventDefault()`).

---

### FAQ.tsx
**Lines:** 72 | **Export:** `default FAQ`

Accordion FAQ with 4 questions.

| Question |
|----------|
| What types of workflows can you automate? |
| Is this only for large enterprises? |
| How long does implementation take? |
| Do you replace human workers? |

**Behavior:** One item open at a time (first by default). Toggle icon rotates between Plus/Minus. Answer expands with spring height + tween opacity.

**State:** `useState<number | null>` — `openIndex` (defaults to `0`).

---

### Footer.tsx
**Lines:** 87 | **Export:** `default Footer`

Four-column footer.

| Column | Content |
|--------|---------|
| Brand | Logo + tagline + social icons (hover animation) |
| Quick Links | Approach, Services, Case Studies |
| Newsletter | Email input + "Join" `MagneticButton` |
| Contact | Phone, email, address |

Bottom bar: Copyright + Privacy Policy / Terms / Cookies links.

---

## UI Components (`src/components/ui/`)

### MotionKit.tsx
**Lines:** 127 | **Exports:** `SPRING`, `staggerContainer`, `fadeSlideUp`, `scaleIn`, `SpotlightCard`, `RevealText`, `VIEWPORT`

Central animation utility library used by almost every section.

**Spring Presets:**
```typescript
SPRING.default  = { type: 'spring', stiffness: 200, damping: 24 }
SPRING.gentle   = { type: 'spring', stiffness: 100, damping: 20 }
SPRING.snappy   = { type: 'spring', stiffness: 400, damping: 30 }
```

**Variants:**
- `staggerContainer(stagger)` — Container with `staggerChildren` delay
- `fadeSlideUp` — `opacity: 0, y: 30` → `opacity: 1, y: 0`
- `scaleIn` — `scale: 0.9, opacity: 0` → `scale: 1, opacity: 1`

**Components:**
- `SpotlightCard` — Glassmorphism card with dual cursor-tracking spotlight (motion values + rAF direct style)
- `RevealText` — Clip-path wipe-in from bottom (`y: '100%' → '0%'`)

---

### MagneticButton.tsx
**Lines:** 39 | **Export:** `default MagneticButton`

Cursor-following button with spring physics.

**Props:** `{ children, className, onClick }`

**Mechanics:** On mouse move, calculates distance from button center, applies `displacement * 0.35` via `useSpring({ damping: 15, stiffness: 150 })`. Resets to `(0, 0)` on mouse leave.

---

### ShimmerText.tsx
**Lines:** 43 | **Export:** `default ShimmerText`

Animated headline with shimmer and glow effects.

**Props:** `{ text: string }`

**Rendering:** Splits text into words, renders three layers per word:
1. Base text (white)
2. Shimmer overlay (`neo-shimmer-text` CSS class — gradient sweep)
3. Conditional glow layer on "Transformation" and "Evolution" words (`drop-shadow` pulse, infinite loop)

---

### ProductCarousel.tsx
**Lines:** 90 | **Export:** `default ProductCarousel`

Auto-advancing image slideshow for hero section.

**Slides:** "BPA Dashboard" and "Workflow Builder" with images.

**Auto-play:** 5-second interval, paused on hover. Progress bar animates `0% → 100%` width matching the 5s interval, resets on slide change via `key={currentIndex}`.

**Navigation:** Chevron prev/next buttons.

---

### PivotLogo.tsx
**Lines:** 31 | **Export:** `default PivotLogo`

**Props:** `{ className?, isLoader? }`

Dual-mode animated logo:
- **Standard:** Hover tilt (15deg) + breathing scale (`[1, 1.05, 1]` infinite)
- **Loader:** Continuous 360deg rotation (2s loop)

Permanent cyan drop-shadow glow (`rgba(56, 189, 248, 0.5)`).

---

### FloatingContactCTA.tsx
**Lines:** 28 | **Export:** `default FloatingContactCTA`

Fixed-position scroll-aware button.

**Behavior:** Hidden until `scrollY > 600px`. Fades in with scale + opacity animation. Links to `#contact`.

**Responsive:** Icon-only on mobile, "Contact Us" text on `sm+`.

**Performance:** Passive scroll listener with cleanup on unmount.

---

## 3D Components (`src/components/3d/`)

### WebGLBackground.tsx
**Lines:** 162 | **Export:** `default WebGLBackground`

Full-screen Three.js particle field behind the Hero section.

**Particle Grid:** 100×100 = 10,000 points.

| Config | Value |
|--------|-------|
| `SPACING` | 0.18 |
| `WAVE_SPEED` | 0.35 |
| `WAVE_AMP` | 0.25 |
| `MOUSE_RADIUS` | 2.5 |
| `MOUSE_STRENGTH` | 0.8 |
| `LERP_SPEED` | 0.04 |

**Per-Frame Animation:**
1. Combined sine/cosine wave displacement on Z-axis
2. Mouse-proximity repulsion with quadratic falloff
3. Per-particle color lerp (deep blue → cyan near cursor)

**Sub-components:**
- `FogSpheres` — Two slowly rotating translucent spheres for volumetric depth

**Canvas Config:** `dpr: [1, 1.5]`, `antialias: false`, `powerPreference: 'high-performance'`.

---

### AIAgentCore.tsx
**Lines:** 103 | **Export:** `default AIAgentCore`

**Props:** `{ color?: string, type?: AgentType }`

Core 3D agent model rendered inside each RobotCarousel card.

**Geometry:**
- Glass capsule shell — `meshPhysicalMaterial` with `transmission: 0.92`, `clearcoat: 1`, `ior: 1.5`
- Inner emissive orb — Sphere with configurable color
- LED equator ring — Torus
- Two decorative orbital rings — Tilted tori
- Point light — Localized glow
- Type-specific prop — Via `AgentProp` component

**Per-Frame Animation:** Idle float (sine Y), rotation oscillation, emissive intensity pulse, smoothed hover response via `MathUtils.lerp`.

---

### AgentProps.tsx
**Lines:** 208 | **Exports:** `default AgentProp`, `type AgentType`

**Type:** `'bpa' | 'consulting' | 'idp' | 'finance' | 'hr' | 'customer_service'`

Six unique holographic 3D props:

| Type | Prop | Geometry | Animation |
|------|------|----------|-----------|
| `bpa` | BpaProp | Interlocking gear tori | Counter-rotating on Z/X |
| `consulting` | ConsultingProp | Icosahedron + 5 satellite spheres | Y rotation, sine float |
| `idp` | IdpProp | Document plane + scanner line | Scanner sweeps vertically |
| `finance` | FinanceProp | 3 bar chart pillars + platform | Y rotation oscillation |
| `hr` | HrProp | 3 capsule figures (head + body) | Y rotation, float |
| `customer_service` | CustomerServiceProp | Headset torus + mic boom | Torus wobble + Z rotation |

All props use emissive materials with `toneMapped={false}` for glow effect and include a dedicated `pointLight`.

---

### ParticleField.tsx
**Lines:** 37 | **Export:** `default ParticleField`

5,000-particle spherical point cloud.

**Note:** This component is currently **unused** in the build. `WebGLBackground` defines its own internal `ParticleField`. This file appears to be a leftover from an earlier version or intended for future use.

**Geometry:** Random spherical coordinate sampling (radius 1.5). Continuous X/Y rotation via `useFrame`.
