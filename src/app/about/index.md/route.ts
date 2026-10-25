export async function GET() {
  const content = `---
title: About GenosAI | AI Automation Agency
description: GenosAI is a global AI automation agency founded in 2026, building on 23 client projects delivered by our founder across USA, UK, UAE, India, and Australia.
url: https://genosai.tech/about
last_updated: ${new Date().toISOString().split('T')[0]}
---

# About GenosAI

GenosAI is a global AI automation agency founded in 2026. We build production-grade AI systems for businesses that want to eliminate manual work and operate faster than their competitors.

## Key Stats

- **23** client projects delivered by our founder
- **5** countries served
- **5** countries served (USA, UK, UAE, India, Australia)
- **2026** year founded

## What We Do

GenosAI builds custom AI systems — not templates, not white-labeled SaaS tools, not proofs of concept. Every system we deliver is production-grade from day one and built specifically for your business processes, data, and goals.

Core services: AI chatbot development ($1,500–$5,000), voice AI agents ($2,500–$8,000), workflow automation ($500–$3,000), AI marketing automation ($1,000–$4,000), AI lead qualification ($800–$3,500), and custom AI solutions ($5,000–$25,000+).

## How We Work

1. **Free strategy call** — Audit your workflows, identify automation opportunities, scope your project.
2. **Firm quote and timeline** — Clear scope, price, and delivery date before any work begins.
3. **Build and iterate** — Build in sprints with regular progress updates. Working software early, not slide decks.
4. **Deploy and hand off** — Deploy to production, document everything, ensure your team can operate independently.

## What Makes Us Different

- Engineers, not salespeople — the people who talk to you build your system
- Production-grade from day one — no prototypes, no "phase 2" promises
- Transparent pricing — fixed price and timeline agreed upfront
- Results focus — we track time saved, revenue generated, leads qualified

## Technology Stack

- **AI Models:** OpenAI GPT-4o, Anthropic Claude, Google Gemini, Meta LLaMA, Mistral, DeepSeek
- **Automation:** Make, n8n, Zapier, LangChain, LangGraph, CrewAI
- **Backend:** Python, FastAPI, Node.js, PostgreSQL, Supabase
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Infrastructure:** AWS, Vercel, Docker, GitHub Actions
- **Voice AI:** Vapi, Retell AI, Bland AI, ElevenLabs

## Industries Served

SaaS, Real Estate, Logistics, E-Commerce, Healthcare, Financial Services, Professional Services, Manufacturing, Education, B2B Sales

## Contact

- Website: https://genosai.tech
- Email: hello@genosai.tech
- Book a free strategy call: https://genosai.tech/strategy-call
- LinkedIn: https://www.linkedin.com/company/genosai
- Twitter/X: https://x.com/AiGenos81577
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
