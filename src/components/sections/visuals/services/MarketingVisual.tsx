'use client'

import { MousePointerClick } from 'lucide-react'
import { BODY_TEXT, CAPTION, Frame, PANEL, PANEL_HEADER, PANEL_TITLE, Reveal, STAGE } from '../primitives'
import { useSequence } from '../useSequence'

const SEQUENCE = [
  { when: 'Day 0', title: 'Welcome email', result: 'Opened', tone: 'bg-white/[0.08] text-white/60' },
  { when: 'Day 2', title: 'Customer story', result: 'Clicked', tone: 'bg-violet-400/15 text-violet-200' },
  { when: 'Day 3', title: 'Visited pricing page', result: 'Trigger', tone: 'bg-violet-400/25 text-violet-100', trigger: true },
  { when: 'Day 3', title: 'Demo invite sent', result: 'Sent', tone: 'bg-emerald-400/15 text-emerald-200' },
]

// Lead score after each step of the sequence
const SCORES = [12, 24, 41, 68, 86]

export function MarketingVisual() {
  const [ref, step] = useSequence<HTMLDivElement>(SEQUENCE.length)
  const score = SCORES[step]

  return (
    <Frame glow="-left-20 -top-24">
      <div ref={ref} className={STAGE}>
        <div className={`w-full max-w-[26rem] ${PANEL}`}>
          <div className={PANEL_HEADER}>
            <span className={PANEL_TITLE}>Onboarding sequence</span>
            <span className="flex items-center gap-2">
              <span className={CAPTION}>Lead score</span>
              <span className="h-1 w-10 overflow-hidden rounded-full bg-white/[0.08] @md:w-14">
                <span
                  className="block h-full rounded-full bg-violet-300 transition-[width] duration-700 ease-out"
                  style={{ width: `${score}%` }}
                />
              </span>
              <span className="w-5 text-right text-[0.75rem] font-medium tabular-nums text-white/85">{score}</span>
            </span>
          </div>

          <div className="flex flex-col gap-1 p-2 @md:p-3">
            {SEQUENCE.map((item, i) => (
              <Reveal
                key={item.title}
                show={step >= i + 1}
                className={`flex items-center gap-2.5 rounded-lg px-2 py-2 @md:px-2.5 ${
                  item.trigger ? 'border border-violet-400/20 bg-violet-500/[0.07]' : ''
                }`}
              >
                <span className={`w-10 shrink-0 ${CAPTION}`}>{item.when}</span>
                <span className={`flex flex-1 items-center gap-1.5 truncate text-white/80 ${BODY_TEXT}`}>
                  {item.trigger && <MousePointerClick className="size-3.5 shrink-0 text-violet-300" />}
                  {item.title}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[0.625rem] ${item.tone}`}>{item.result}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}
