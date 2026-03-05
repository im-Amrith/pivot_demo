# Setup & Development Guide

---

## Prerequisites

| Requirement | Minimum Version |
|-------------|----------------|
| Node.js | 18+ |
| npm | 9+ |
| Git | 2.30+ |
| Browser | Chrome/Edge/Firefox (WebGL 2.0 support required) |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/im-Amrith/pivot_demo.git
cd pivot_demo

# Install dependencies
npm install
```

---

## Development

```bash
npm run dev
```

This starts the Vite dev server at **http://localhost:3000** with:
- Hot Module Replacement (HMR) — instant updates on save
- `--host=0.0.0.0` — accessible from other devices on the same network
- Tailwind CSS v4 JIT compilation via `@tailwindcss/vite` plugin

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run clean` | Delete `dist/` folder |
| `npm run lint` | Type-check with TypeScript (no emit) |

---

## Build Configuration

### vite.config.ts

```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

**Plugins:**
- `@vitejs/plugin-react` — JSX transform, fast refresh
- `@tailwindcss/vite` — Tailwind CSS v4 integration (replaces PostCSS setup)

**Aliases:**
- `@` maps to project root (though most imports in the project use relative paths)

### tsconfig.json

TypeScript configured with:
- `strict: true`
- `jsx: react-jsx`
- Target: `ES2020`

---

## Project Structure

```
pivot-automations/
├── docs/                   # ← You are here
├── index.html              # Entry HTML (Vite entry point)
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Build configuration
└── src/
    ├── main.tsx            # React root + console.warn patch
    ├── App.tsx             # Root component (section composition)
    ├── index.css           # Tailwind theme + custom animations
    ├── vite-env.d.ts       # Vite type declarations
    └── components/
        ├── sections/       # 14 page sections
        ├── ui/             # 6 reusable UI components
        └── 3d/             # 4 Three.js components
```

---

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.0 | UI framework |
| `react-dom` | 19.0 | DOM rendering |
| `three` | 0.183 | 3D rendering engine |
| `@react-three/fiber` | 9.5 | React renderer for Three.js |
| `@react-three/drei` | 10.7 | R3F utility components (ContactShadows, Points, BakeShadows) |
| `motion` | 12.23 | Animation library (Framer Motion) |
| `lucide-react` | 0.546 | SVG icon components |
| `@tailwindcss/vite` | 4.1 | Tailwind CSS Vite plugin |
| `vite` | 6.2 | Build tool |
| `@vitejs/plugin-react` | 5.0 | React plugin for Vite |
| `shadergradient` | 1.3 | Shader gradient backgrounds (legacy, may be unused) |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | 5.8 | Type system |
| `tailwindcss` | 4.1 | CSS framework |
| `autoprefixer` | 10.4 | Vendor prefix automation |
| `tsx` | 4.21 | TypeScript execution |
| `@types/three` | 0.183 | Three.js type definitions |
| `@types/node` | 22.14 | Node.js type definitions |
| `@types/express` | 4.17 | Express type definitions |

### Potentially Unused Dependencies

These packages are in `package.json` but may not be actively used in the frontend:
- `better-sqlite3` — SQLite database (possibly for a backend/server component)
- `express` — HTTP server framework
- `dotenv` — Environment variable loading
- `shadergradient` — Was used for the hero background before being replaced with `WebGLBackground`

---

## Styling

### Tailwind CSS v4

The project uses Tailwind CSS v4 with the new `@import` syntax:

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --color-primary: #38bdf8;
  --color-background-light: #f8f6f6;
  --color-background-dark: #211111;
}
```

**Primary color:** `#38bdf8` (sky-400) — used as `text-primary`, `bg-primary`, `border-primary` throughout.

### Custom Animations

Defined in `index.css`:

| Animation | Class | Purpose |
|-----------|-------|---------|
| `shimmer-neo` | `.neo-shimmer-text` | Gradient sweep on headline text |
| `kerning` | `.neo-kerning` | Letter-spacing oscillation |
| `float` | (inline use) | Vertical bounce |
| `pulse-glow` | (inline use) | Drop-shadow pulse |

### Film Grain

The `bg-grain` utility class applies an SVG `feTurbulence` filter as a background image for a subtle film grain texture.

---

## Browser Compatibility

| Feature | Minimum Browser |
|---------|----------------|
| WebGL 2.0 | Chrome 56+, Firefox 51+, Edge 79+ |
| CSS `backdrop-filter` | Chrome 76+, Firefox 103+, Safari 9+ |
| CSS `mask-image` | Chrome 120+, Firefox 53+, Safari 15.4+ |
| `@import "tailwindcss"` | All modern browsers (processed at build time) |
| `structuredClone` | Chrome 98+, Firefox 94+ (used by R3F) |

**Note:** Safari has limited WebGL performance. The 3D particle field and agent carousel may run at reduced frame rates on Safari/iOS.

---

## Environment

The project has no `.env` file or runtime environment variables. All content is hardcoded in component files. The `dotenv` package in dependencies is currently unused by the frontend.

---

## Deployment

### Static Build

```bash
npm run build
```

Outputs to `dist/`. Can be deployed to any static hosting:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront

### Preview Build Locally

```bash
npm run preview
```

Serves the production build locally for testing.

---

## Troubleshooting

### "WebGLRenderer: Context Lost"
If this appears in console, it means too many WebGL contexts are active. This should be fixed by the current code (limits to 3 contexts). If it recurs, check browser extensions that may create additional contexts.

### THREE.Clock Deprecation Warning
Suppressed in `main.tsx`. This is a Three.js 0.183 deprecation emitted by `@react-three/fiber` internals. Will be resolved when R3F updates to use `THREE.Timer`.

### Tailwind Class Warnings
The linter may suggest shorthand like `bg-white/4` instead of `bg-white/[0.04]`. Both are valid Tailwind v4 syntax. The expanded notation is used for precision values.

### Slow Initial Load
The WebGL particle field (10k particles) requires GPU initialization on first paint. On low-end devices, consider:
1. Reducing `GRID` from 100 to 50 in `WebGLBackground.tsx`
2. Setting `dpr={[1, 1]}` to lock at 1x resolution
