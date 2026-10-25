import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/posts'
import { getAllCaseStudies } from '@/lib/case-studies/case-studies'

const BASE_URL = 'https://genosai.tech'
const now = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const caseStudies = getAllCaseStudies().map((study) => ({
    url: `${BASE_URL}/case-studies/${study.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/ai-chatbot-development`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/voice-ai-agents`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/workflow-automation`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/ai-marketing-automation`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/ai-lead-qualification`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/custom-ai-solutions`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/strategy-call`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...caseStudies,
  ]
}
