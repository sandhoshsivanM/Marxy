# Marksy's — Marketing Systems

A world-class, premium interactive marketing website built as an *interactive Revenue Operating System* rather than an agency site. Cinematic scroll-driven 3D funnel, living background, live dashboards, and an AI onboarding terminal.

> Marksy doesn't run campaigns. Marksy engineers Revenue Operating Systems.

## Stack

React 18 · Vite · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis smooth scroll · React Three Fiber + drei + postprocessing (Bloom) · Zustand · Lucide.

## Signature experience

A persistent full-viewport R3F canvas renders a photorealistic frosted-glass funnel (four `MeshTransmissionMaterial` cylinders → a glowing golden revenue crystal) with ~3,200 golden particles flowing through it into a laser beam. A scroll driver publishes normalized progress to a Zustand store that the camera rig, funnel, particles and chaos-icon cluster read each frame, narrating a 7-scene story (Chaos → Attraction → Into the Funnel → Inside → Operating System → Convergence → Revenue). The canvas fades out as the DOM marketing sections take over.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

## Structure

- `src/three/` — Scene, Funnel, ParticleStream, RevenueCrystal, CameraRig, ChaosIcons
- `src/components/sections/` — Experience/Hero, LiveDashboard, WhoWeHelp, Problem, HowWeWork, Services, OperatingSystem, RealResults, Testimonials, Contact + AITerminal
- `src/components/background/` — animated 4-layer global background
- `src/components/shared/` — GlassCard, MagneticButton, AnimatedNumber, SparkLine, GradientSerif, LiveBadge, SectionHeading
- `src/lib/` — Zustand store, utils, constants, and realistic invented business data

## Design system

Premium light theme · cream `#FDFBF7` · amber `#C78628` · accent `#F6E6C5` · ink `#1F1B19` · frosted glass (20px blur, 32px radius) · Inter for UI, Instrument Serif *italic* gold for highlight words. Respects `prefers-reduced-motion`.
