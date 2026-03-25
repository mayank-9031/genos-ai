import type { Metadata } from 'next'
import StrategyCallPage from '@/components/strategy-call/StrategyCallPage'

export const metadata: Metadata = {
  title: 'Book a Free Strategy Call',
  description:
    'Book a free strategy call with GenosAI. We\'ll audit your workflows, identify the highest-impact automations, and show you exactly what\'s possible with AI.',
}

export default function Page() {
  return <StrategyCallPage />
}
