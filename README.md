# GenosAI

The official website for **GenosAI** — a global AI automation agency that builds custom AI chatbots, voice AI agents, workflow automation, and intelligent business systems.

**Live:** [genosai.tech](https://genosai.tech)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP, Framer Motion, Lenis (smooth scroll)
- **3D:** Spline, Three.js, React Three Fiber
- **UI Components:** shadcn/ui
- **Email:** Resend
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
RESEND_API_KEY=your_resend_api_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/contact/        # Contact form endpoint (Resend)
│   ├── strategy-call/      # Strategy call booking page
│   ├── layout.tsx          # Root layout with metadata & SEO
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots configuration
├── components/
│   ├── sections/           # Page sections (Services, About, FAQ, etc.)
│   ├── strategy-call/      # Strategy call page components
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
└── lib/                    # Utilities and structured data
```

## Features

- Scroll-driven animations with GSAP ScrollTrigger
- Interactive 3D scenes via Spline
- Smooth scrolling with Lenis
- SEO-optimized with JSON-LD structured data
- Responsive design (mobile-first)
- Contact form with Resend email integration

## License

All rights reserved.
