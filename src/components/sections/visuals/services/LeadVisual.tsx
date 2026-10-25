'use client'

import { BODY_TEXT, CAPTION, Frame, PANEL, PANEL_HEADER, PANEL_TITLE, Reveal, STAGE } from '../primitives'
import { useSequence } from '../useSequence'

const CRITERIA = ['Budget', 'Authority', 'Need', 'Timing']

const LEADS = [
  {
    name: 'Brightline Logistics',
    source: 'Demo request',
    score: 92,
    tier: 'Hot',
    route: 'To sales team',
    tone: 'bg-emerald-400/15 text-emerald-200',
  },
  {
    name: 'Kestrel Studio',
    source: 'Pricing page',
    score: 64,
    tier: 'Warm',
    route: 'To nurture',
    tone: 'bg-amber-400/15 text-amber-200',
  },
  {
    name: 'Personal email',
    source: 'Newsletter signup',
    score: 21,
    tier: 'Cold',
    route: 'To newsletter',
    tone: 'bg-white/[0.08] text-white/55',
  },
]

export function LeadVisual() {
  const [ref, step] = useSequence<HTMLDivElement>(LEADS.length)

  return (
    <Frame glow="-right-20 -top-28">
      <div ref={ref} className={STAGE}>
        <div className={`w-full max-w-[26rem] ${PANEL}`}>
          <div className={PANEL_HEADER}>
            <span className={PANEL_TITLE}>Inbound leads</span>
            <span className={CAPTION}>Scored and routed</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 border-b border-white/[0.06] px-3 py-2 @md:px-4">
            <span className={CAPTION}>Scored on</span>
            {CRITERIA.map((criterion) => (
              <span key={criterion} className="rounded-md border border-white/[0.08] px-1.5 py-0.5 text-[0.625rem] text-white/55">
                {criterion}
              </span>
            ))}
          </div>

          <div className="divide-y divide-white/[0.05]">
            {LEADS.map((lead, i) => (
              <Reveal key={lead.name} show={step >= i + 1} className="flex items-center gap-3 px-3 py-2 @md:px-4 @md:py-2.5">
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-white/80 ${BODY_TEXT}`}>{lead.name}</span>
                  <span className={`block truncate ${CAPTION}`}>{lead.source}</span>
                </span>
                <span className="flex flex-col items-end gap-0.5">
                  <span className={`rounded-full px-2 py-0.5 text-[0.625rem] tabular-nums ${lead.tone}`}>
                    {lead.score} {lead.tier}
                  </span>
                  <span className={CAPTION}>{lead.route}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}
