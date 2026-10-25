'use client'

import { Check, Phone } from 'lucide-react'
import { BODY_TEXT, CAPTION, Frame, PANEL, PANEL_HEADER, PANEL_TITLE, Reveal, STAGE } from '../primitives'
import { useSequence } from '../useSequence'

// Relative bar heights for the live waveform
const BARS = [
  0.3, 0.5, 0.8, 0.35, 0.9, 0.6, 1, 0.45, 0.75, 0.3, 0.85, 0.55, 0.95, 0.4, 0.7, 0.5,
  0.9, 0.35, 0.65, 0.8, 0.45, 0.6, 0.3, 0.75, 0.5, 0.85, 0.4, 0.7, 0.55, 0.35, 0.6, 0.25,
]

const TRANSCRIPT = [
  { speaker: 'Agent', text: 'Does Thursday at 3 pm work for a quick call with the team?' },
  { speaker: 'Lead', text: 'Yes, Thursday works for me.' },
]

const CRM_FIELDS = [
  { name: 'Qualified', value: 'Yes' },
  { name: 'Meeting', value: 'Thu, 3:00 pm' },
]

export function VoiceVisual() {
  // 1 agent line, 2 lead reply, 3 logged to CRM
  const [ref, step] = useSequence<HTMLDivElement>(3)

  return (
    <Frame glow="-left-24 -bottom-24">
      <div ref={ref} className={STAGE}>
        <div className={`w-full max-w-[26rem] ${PANEL}`}>
          <div className={PANEL_HEADER}>
            <span className="flex items-center gap-2">
              <Phone className="size-3.5 text-violet-300" />
              <span className={PANEL_TITLE}>Outbound call</span>
            </span>
            <span className="flex items-center gap-1.5 text-[0.6875rem] tabular-nums text-white/45">
              <span className="size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              00:42
            </span>
          </div>

          <div className="p-3 @md:p-4">
            <div aria-hidden="true" className="flex h-7 items-center justify-between @md:h-9">
              {BARS.map((height, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-violet-300/60 motion-safe:animate-[waveform-bar_1.1s_ease-in-out_infinite]"
                  style={{ height: `${height * 100}%`, animationDelay: `${i * -0.08}s` }}
                />
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-1.5 @md:mt-4 @md:gap-2">
              {TRANSCRIPT.map((line, i) => (
                <Reveal key={line.speaker} show={step >= i + 1} className={`flex gap-2 leading-[1.5] ${BODY_TEXT}`}>
                  <span className="w-9 shrink-0 text-white/35">{line.speaker}</span>
                  <span className="text-white/75">{line.text}</span>
                </Reveal>
              ))}
            </div>

            <Reveal
              show={step >= 3}
              className="mt-3 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 @md:mt-4"
            >
              <p className="flex items-center gap-1.5 text-[0.6875rem] font-medium text-emerald-200/90">
                <Check className="size-3" strokeWidth={3} />
                Logged to CRM
              </p>
              <div className="mt-1.5 flex gap-5">
                {CRM_FIELDS.map((field) => (
                  <span key={field.name} className="flex flex-col">
                    <span className={CAPTION}>{field.name}</span>
                    <span className={`text-white/80 ${BODY_TEXT}`}>{field.value}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Frame>
  )
}
