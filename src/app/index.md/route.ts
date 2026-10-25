export async function GET() {
  const content = `---
title: GenosAI | #1 AI Automation Agency | Custom AI Systems for Business
description: GenosAI is a global AI automation agency that builds custom AI chatbots, voice AI agents, workflow automation, and intelligent business systems for enterprises worldwide.
url: https://genosai.tech
last_updated: ${new Date().toISOString().split('T')[0]}
---

# GenosAI — AI Automation Agency

GenosAI is a global AI automation agency that builds custom AI chatbots, voice AI agents, workflow automation systems, and intelligent business platforms. Founded in 2026. 23 client projects delivered by our founder across 5 countries.

## What We Build

- **AI Chatbot Development** ($1,500–$5,000) — Custom conversational AI trained on your business data. Handles customer support, qualifies leads, books meetings, and integrates with your CRM. Delivery: 1–3 weeks.
- **Voice AI Agents** ($2,500–$8,000) — AI voice systems that make 500+ outbound calls/day, qualify leads in real-time, and book meetings automatically. Delivery: 2–4 weeks.
- **Workflow Automation** ($500–$3,000) — End-to-end automation connecting CRMs, ERPs, spreadsheets, and internal tools. Eliminates manual data entry completely. Delivery: 1–2 weeks.
- **AI Marketing Automation** ($1,000–$4,000) — Automated email sequences, intelligent lead scoring, and AI-optimized customer touchpoints. Delivery: 1–3 weeks.
- **AI Lead Qualification** ($800–$3,500) — Real-time lead scoring, qualification, and routing that cuts response times from hours to seconds. Delivery: 1–2 weeks.
- **Custom AI Solutions** ($5,000–$25,000+) — Computer vision, NLP pipelines, recommendation engines, enterprise AI platforms. Delivery: 4–8 weeks.

## Results

- 60% reduction in manual work
- 47x faster response times
- 35% increase in conversion rates
- $2,400/month saved by one client replacing 4 SaaS tools with a single GenosAI pipeline

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
