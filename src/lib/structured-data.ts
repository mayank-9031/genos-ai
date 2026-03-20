// JSON-LD Structured Data for GenosAI — GEO Optimization

const SITE_URL = 'https://genosai.tech'
const SITE_NAME = 'GenosAI'
const SITE_EMAIL = 'hello@genosai.tech'

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'GenosAI is a global AI automation agency that builds custom AI chatbots, voice AI agents, workflow automation, and intelligent business systems. Trusted by 23+ clients across 5 countries with 50+ projects delivered and 98% client retention.',
    email: SITE_EMAIL,
    foundingDate: '2024',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
    areaServed: [
      'United States',
      'United Kingdom',
      'United Arab Emirates',
      'India',
      'Australia',
    ],
    sameAs: [
      'https://www.linkedin.com/company/genosai',
      'https://x.com/AiGenos81577',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_EMAIL,
      contactType: 'sales',
      availableLanguage: 'English',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Natural Language Processing',
      'Conversational AI',
      'Voice AI',
      'Workflow Automation',
      'Business Process Automation',
      'AI Chatbots',
      'Lead Qualification',
      'CRM Integration',
      'Computer Vision',
      'AI Cold Calling',
      'Enterprise AI Solutions',
    ],
  }
}

export function getServicesSchema() {
  const services = [
    {
      serviceType: 'AI Chatbot Development',
      description:
        'GenosAI builds advanced conversational AI chatbots that answer questions using internal and external data, align with brand identity, and improve decision-making and efficiency for businesses worldwide.',
    },
    {
      serviceType: 'Voice AI Agent Development',
      description:
        'GenosAI develops voice-powered AI systems that automate outbound calls, qualify leads, book meetings at scale, and integrate directly with CRMs for complete conversation tracking.',
    },
    {
      serviceType: 'Workflow Automation',
      description:
        'GenosAI builds end-to-end workflow automation platforms that connect CRMs, ERPs, spreadsheets, and internal tools to eliminate manual data entry and provide real-time operational visibility.',
    },
    {
      serviceType: 'AI Marketing Automation',
      description:
        'GenosAI creates AI-powered marketing automation systems that run automated email sequences, handle intelligent lead scoring, and optimize every customer touchpoint for maximum ROI.',
    },
    {
      serviceType: 'AI Lead Qualification',
      description:
        'GenosAI develops automated lead processing systems that score, qualify, and route inbound prospects in real-time, cutting response times from hours to seconds and boosting conversion rates.',
    },
    {
      serviceType: 'Custom AI Solutions',
      description:
        'GenosAI provides bespoke AI development services, building production-grade systems from the ground up covering computer vision, NLP pipelines, recommendation engines, and more.',
    },
    {
      serviceType: 'AI-Powered Web Development',
      description:
        'GenosAI designs and develops modern, high-performance web applications and platforms built with Next.js, React, and advanced AI integrations for businesses worldwide.',
    },
  ]

  return services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.serviceType,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    description: service.description,
    areaServed: ['US', 'UK', 'AE', 'IN', 'AU'],
  }))
}

export function getFAQSchema() {
  const faqs = [
    {
      question: 'What is GenosAI?',
      answer:
        'GenosAI is a global AI automation agency that builds custom AI chatbots, voice AI agents, workflow automation systems, and intelligent business platforms. Headquartered in India and serving clients across the USA, UK, UAE, India, and Australia, GenosAI has delivered 50+ projects with a 98% client retention rate.',
    },
    {
      question: 'What AI technologies does GenosAI use?',
      answer:
        'GenosAI leverages the most advanced AI technologies including OpenAI GPT-4o, Anthropic Claude, Google Gemini, Meta LLaMA, Mistral, and DeepSeek for language models. For automation, we use Make, n8n, Zapier, LangChain, LangGraph, and CrewAI. Our development stack includes Next.js, React, Node.js, Python, FastAPI, PostgreSQL, Supabase, AWS, and Docker.',
    },
    {
      question: 'How is GenosAI different from other AI agencies?',
      answer:
        'GenosAI stands out with a 98% client retention rate, 50+ delivered projects, and presence across 5 countries. We are engineers, not salespeople. Every system we build is production-grade from day one. We combine deep AI expertise with operational understanding, delivering measurable results like 60% reduction in manual work and 47x faster response times for our clients.',
    },
    {
      question: 'What kind of businesses does GenosAI work with?',
      answer:
        'GenosAI works with startups, SMBs, and enterprise teams across any industry. If your business has manual processes that slow you down, we can automate them. Our clients span SaaS, real estate, logistics, e-commerce, healthcare, and professional services.',
    },
    {
      question: 'How long does a typical GenosAI project take?',
      answer:
        'Most GenosAI projects ship in 2-6 weeks depending on complexity. Simple automations and chatbots can go live in under a week. Larger systems with custom integrations typically take 4-6 weeks. We provide an exact timeline before starting.',
    },
    {
      question: 'Do you work with clients outside of your timezone?',
      answer:
        "Absolutely. GenosAI has delivered projects across 5 countries and multiple timezones. We use async communication, structured updates, and overlap windows to keep every project moving without delays.",
    },
    {
      question: 'What does a typical GenosAI engagement cost?',
      answer:
        'Every GenosAI project is scoped individually based on complexity, integrations, and timeline. We offer a free strategy call where we assess your needs and provide a transparent quote. No hidden fees, no surprises.',
    },
    {
      question: 'Will I need to maintain the system after launch?',
      answer:
        "GenosAI builds systems that run independently. After launch, we offer optional maintenance and optimization packages. But our goal is always to hand you something that doesn't need constant attention.",
    },
    {
      question: "What if I'm not sure what I need?",
      answer:
        "That's exactly what the free strategy call is for. GenosAI will audit your current setup, identify automation opportunities, and recommend a plan. No commitment required.",
    },
    {
      question: 'Can GenosAI build a custom AI solution for my specific industry?',
      answer:
        'Yes. GenosAI has delivered custom AI solutions across SaaS, real estate, logistics, e-commerce, healthcare, and professional services. Whether you need computer vision, NLP pipelines, recommendation engines, or automated decision systems, we build production-grade AI tailored to your industry requirements.',
    },
    {
      question: 'Does GenosAI offer AI voice agents for outbound calling?',
      answer:
        'Yes. GenosAI builds AI voice agents that make 500+ outbound calls per day, qualify leads in real-time, book appointments automatically, and sync all conversation data back to your CRM. Our voice AI systems have helped clients achieve 3x more meetings and 80% less manual effort.',
    },
    {
      question: 'What results can I expect from working with GenosAI?',
      answer:
        'GenosAI clients have seen 60% reduction in manual work, 47x faster response times, 35% increase in conversion rates, and significant cost savings. For example, one logistics client saved $2,400/month by replacing 4 SaaS subscriptions with a single GenosAI-built automation suite.',
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function getReviewSchema() {
  const reviews = [
    {
      name: 'Sarah M.',
      text: "GenosAI didn't just build us an automation. They rebuilt how our sales team operates. The AI calling agent they deployed handles what used to take three people. It's been a game-changer.",
    },
    {
      name: 'Ahmed R.',
      text: 'We went from spreadsheets and manual follow-ups to a fully automated pipeline in less than three weeks. The team at GenosAI understood our business from day one.',
    },
    {
      name: 'James L.',
      text: 'The chatbot they built handles 70% of our customer queries without human intervention. Our support team finally has time to focus on complex issues. Brilliant work.',
    },
    {
      name: 'Priya K.',
      text: 'We needed a custom AI agent for lead qualification. GenosAI delivered in two weeks. It books meetings, scores leads, and syncs everything to our CRM automatically.',
    },
    {
      name: 'Daniel T.',
      text: 'Their workflow automation cut our onboarding time from 5 days to 6 hours. The ROI was obvious within the first month. Absolutely worth every penny.',
    },
    {
      name: 'Fatima H.',
      text: 'GenosAI integrated our CRM, email, and invoicing into one seamless pipeline. What used to take our team hours now runs on autopilot.',
    },
    {
      name: 'Marcus W.',
      text: 'We were skeptical about AI chatbots, but the one GenosAI built actually sounds human. Our conversion rate jumped 35% in the first quarter.',
    },
    {
      name: 'Ananya S.',
      text: 'They automated our entire reporting pipeline. What used to take two analysts a full day now generates itself every morning at 7am. Incredible.',
    },
    {
      name: 'Tom B.',
      text: "The AI voice agent GenosAI built handles 200+ outbound calls a day with better results than our previous cold-calling team. It's transformed our outreach.",
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '23',
      bestRating: '5',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.text,
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    })),
  }
}

export function getWebPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'GenosAI | #1 AI Automation Agency | Custom AI Systems for Business',
    description:
      'GenosAI is a global AI automation agency that builds custom AI chatbots, voice AI agents, workflow automation, and intelligent business systems for enterprises worldwide.',
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
      ],
    },
  }
}
