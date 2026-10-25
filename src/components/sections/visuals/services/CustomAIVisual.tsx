'use client'

import { Check } from 'lucide-react'
import { CAPTION, Frame, PANEL, PANEL_HEADER, Reveal, STAGE } from '../primitives'
import { useSequence } from '../useSequence'

// A build log for a made-up insurance claims system: vision and language models, tested, then shipped
const LOG = [
  { stage: 'data', text: '3 sources connected' },
  { stage: 'vision', text: 'damage photos classified' },
  { stage: 'language', text: 'claim notes summarised' },
  { stage: 'eval', text: '214 of 220 test cases passed' },
  { stage: 'live', text: 'v1.0 serving production traffic', live: true },
]

const LINE = 'text-[0.6875rem] leading-[1.6] @md:text-[0.75rem]'

export function CustomAIVisual() {
  const [ref, step] = useSequence<HTMLDivElement>(LOG.length, 850)

  return (
    <Frame glow="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div ref={ref} className={STAGE}>
        <div className={`w-full max-w-[26rem] font-mono ${PANEL}`}>
          <div className={PANEL_HEADER}>
            <span className="text-[0.6875rem] text-white/70 @md:text-[0.75rem]">claims-triage</span>
            <span className={CAPTION}>Build log</span>
          </div>

          <div className="flex flex-col gap-1 p-3 @md:gap-1.5 @md:p-4">
            <p className={`text-white/45 ${LINE}`}>$ deploy claims-triage --env production</p>
            {LOG.map((entry, i) => (
              <Reveal key={entry.stage} show={step >= i + 1} className={`flex items-center gap-2 ${LINE}`}>
                {entry.live ? (
                  <span className="grid size-3 shrink-0 place-items-center">
                    <span className="size-1.5 rounded-full bg-violet-300 motion-safe:animate-pulse" />
                  </span>
                ) : (
                  <Check className="size-3 shrink-0 text-emerald-300" strokeWidth={3} />
                )}
                <span className={`w-16 shrink-0 ${entry.live ? 'text-violet-200' : 'text-white/40'}`}>{entry.stage}</span>
                <span className={`truncate ${entry.live ? 'text-white/85' : 'text-white/65'}`}>{entry.text}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}
