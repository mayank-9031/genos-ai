import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Automation Services',
  description:
    'GenosAI builds custom AI chatbots, voice AI agents, workflow automation, AI marketing automation, and lead qualification systems. Pricing from $500. Projects ship in 2–6 weeks.',
  alternates: { canonical: 'https://genosai.tech/services' },
}

const services = [
  {
    slug: 'ai-chatbot-development',
    name: 'AI Chatbot Development',
    price: '$1,500–$5,000',
    timeline: '1–3 weeks',
    summary:
      'Custom conversational AI trained on your data. Handles support, qualifies leads, books meetings, and integrates with your CRM.',
  },
  {
    slug: 'voice-ai-agents',
    name: 'Voice AI Agents',
    price: '$2,500–$8,000',
    timeline: '2–4 weeks',
    summary:
      'Outbound calling agents that make 500+ calls/day, qualify leads in real-time, and sync everything back to your CRM automatically.',
  },
  {
    slug: 'workflow-automation',
    name: 'Workflow Automation',
    price: '$500–$3,000',
    timeline: '1–2 weeks',
    summary:
      'Connect your CRM, ERP, spreadsheets, and internal tools into one seamless pipeline. Eliminate manual data entry completely.',
  },
  {
    slug: 'ai-marketing-automation',
    name: 'AI Marketing Automation',
    price: '$1,000–$4,000',
    timeline: '1–3 weeks',
    summary:
      'Automated email sequences, intelligent lead scoring, and AI-optimized customer touchpoints that run without human input.',
  },
  {
    slug: 'ai-lead-qualification',
    name: 'AI Lead Qualification',
    price: '$800–$3,500',
    timeline: '1–2 weeks',
    summary:
      'Score, qualify, and route inbound leads in real-time. Cut response times from hours to seconds and boost conversion rates.',
  },
  {
    slug: 'custom-ai-solutions',
    name: 'Custom AI Solutions',
    price: '$5,000–$25,000+',
    timeline: '4–8 weeks',
    summary:
      'Bespoke production-grade AI systems — computer vision, NLP pipelines, recommendation engines, and enterprise AI platforms.',
  },
]

const webServices = [
  {
    slug: '3d-web-experiences',
    name: 'Immersive 3D Web Experiences',
    tag: 'Three.js · WebGL · GSAP',
    price: '$3,000–$10,000',
    timeline: '2–4 weeks',
    summary:
      'Scroll-driven 3D environments, interactive product configurators, and WebGL-powered visuals that stop visitors mid-scroll and make your brand impossible to forget.',
  },
  {
    slug: 'custom-dashboards',
    name: 'Custom Analytics Dashboards',
    tag: 'Real-time · Internal Tools · Data Viz',
    price: '$2,000–$8,000',
    timeline: '2–4 weeks',
    summary:
      'Purpose-built dashboards that surface the metrics that matter — live data feeds, role-based views, and clean UI that turns raw numbers into decisions.',
  },
  {
    slug: 'fullstack-web-apps',
    name: 'Full-Stack Web Applications',
    tag: 'Next.js · Node · PostgreSQL',
    price: '$5,000–$20,000+',
    timeline: '4–8 weeks',
    summary:
      'Production-grade web apps built for scale — auth, APIs, databases, and deployment included. From MVPs in weeks to enterprise platforms built to last.',
  },
  {
    slug: 'ecommerce-storefronts',
    name: 'E-Commerce Storefronts',
    tag: 'Shopify · Custom · Headless',
    price: '$2,500–$8,000',
    timeline: '2–5 weeks',
    summary:
      'Conversion-engineered online stores with fast checkout flows, smart product discovery, and integrations with your fulfilment, CRM, and marketing stack.',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'GenosAI Services',
  description: 'AI automation services offered by GenosAI',
  url: 'https://genosai.tech/services',
  numberOfItems: services.length,
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.name,
    url: `https://genosai.tech/services/${s.slug}`,
    description: s.summary,
  })),
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="min-h-screen bg-bg-dark text-text-on-dark px-6 py-24 max-w-5xl mx-auto">
        <nav className="text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">Services</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-display mb-4">
          AI Automation Services
        </h1>
        <p className="text-white/60 text-lg mb-12 max-w-2xl">
          GenosAI builds production-grade AI systems that eliminate manual work
          and drive measurable results. 23 client projects delivered by our
          founder. Projects ship in 2–6 weeks.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                {service.name}
              </h2>
              <p className="text-white/50 text-sm mb-4">{service.summary}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-violet-400 font-medium">{service.price}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/40">{service.timeline}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">Web Development</span>
            <span className="flex-1 h-px bg-white/10" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display mb-2">
            Websites &amp; Digital Experiences
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-xl">
            High-performance builds that look exceptional, load instantly, and convert. Every pixel intentional.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {webServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors"
              >
                <div className="text-xs font-mono text-violet-400/70 mb-3 tracking-wide">
                  {service.tag}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                  {service.name}
                </h3>
                <p className="text-white/50 text-sm mb-4">{service.summary}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-violet-400 font-medium">{service.price}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/40">{service.timeline}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 border border-white/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-display mb-3">Not sure where to start?</h2>
          <p className="text-white/50 mb-6">
            Book a free 30-minute strategy call. We audit your workflows,
            identify the top automation opportunities, and give you a transparent
            quote — no commitment required.
          </p>
          <Link
            href="/strategy-call"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
          >
            Book Free Strategy Call
          </Link>
        </div>
      </main>
    </>
  )
}
