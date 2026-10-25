'use client'

import { FileText } from 'lucide-react'
import { BODY_TEXT, CAPTION, Frame, PANEL, PANEL_HEADER, PANEL_TITLE, Reveal, STAGE } from '../primitives'
import { useSequence } from '../useSequence'

const SOURCES = ['Shipping policy', 'Help centre']

const BUBBLE = `rounded-2xl px-3 py-2 leading-[1.5] ${BODY_TEXT}`

export function ChatbotVisual() {
  // 1 question, 2 typing, 3 answer, 4 sources
  const [ref, step] = useSequence<HTMLDivElement>(4)

  return (
    <Frame glow="-right-20 -top-24">
      <div ref={ref} className={STAGE}>
        <div className={`w-full max-w-[26rem] ${PANEL}`}>
          <div className={PANEL_HEADER}>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-violet-300" />
              <span className={PANEL_TITLE}>Support assistant</span>
            </span>
            <span className="flex rounded-full border border-white/[0.08] p-0.5 text-[0.625rem]">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/80">Friendly</span>
              <span className="px-2 py-0.5 text-white/35">Formal</span>
            </span>
          </div>

          <div className="flex flex-col gap-2 p-3 @md:gap-3 @md:p-4">
            <Reveal show={step >= 1} className="ml-auto max-w-[80%]">
              <p className={`${BUBBLE} rounded-br-md bg-violet-500/25 text-white/85`}>
                Can I change the delivery address after ordering?
              </p>
            </Reveal>

            <div className="relative max-w-[88%]">
              <span
                className={`absolute left-0 top-0 flex gap-1 rounded-2xl rounded-bl-md bg-white/[0.06] px-3 py-2.5 transition-opacity duration-300 ${
                  step === 2 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="size-1.5 rounded-full bg-white/50 motion-safe:animate-pulse"
                    style={{ animationDelay: `${dot * 0.2}s` }}
                  />
                ))}
              </span>
              <Reveal show={step >= 3}>
                <p className={`${BUBBLE} rounded-bl-md bg-white/[0.06] text-white/75`}>
                  Yes, until it ships. Open Orders, pick the order and choose Edit address.
                </p>
              </Reveal>
            </div>

            <Reveal show={step >= 4} className="flex flex-wrap items-center gap-1.5">
              <span className={CAPTION}>Answered from</span>
              {SOURCES.map((source) => (
                <span
                  key={source}
                  className="flex items-center gap-1 rounded-md border border-white/[0.08] px-1.5 py-0.5 text-[0.625rem] text-white/55"
                >
                  <FileText className="size-3" />
                  {source}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </Frame>
  )
}
