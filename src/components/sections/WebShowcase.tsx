'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ─────────────────────────────────────────────────────── */

const WEB_DESIGNS = [
  {
    label: 'AI & Tech',
    videoSrc: '/videos/ai-tech-showcase.mp4',
    accentColor: '#3b82f6',
  },
  {
    label: 'SaaS Platforms',
    videoSrc: '/videos/ecommerce-showcase.mp4',
    accentColor: '#10b981',
  },
  {
    label: 'E-Commerce',
    videoSrc: '/videos/saas-showcase.mp4',
    accentColor: '#a855f7',
  },
]

const TOTAL = WEB_DESIGNS.length
const CARD_WIDTH = 52 // % of container
const GAP = 2 // % gap between cards

/* ─── Helper: compute left% for a given offset from center ──── */
function getCardLeft(offset: number) {
  const center = (100 - CARD_WIDTH) / 2
  return center + offset * (CARD_WIDTH + GAP)
}

/* ─── Shortest offset between two indices in a ring ─────────── */
function ringOffset(from: number, to: number) {
  // returns offset in [-1, 0, 1] (or [-floor(n/2) .. floor(n/2)])
  let diff = to - from
  if (diff > TOTAL / 2) diff -= TOTAL
  if (diff < -TOTAL / 2) diff += TOTAL
  return diff
}

/* ─── Main Component ─────────────────────────────────────────── */

export function WebShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoEls = useRef<(HTMLVideoElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const isAnimating = useRef(false)
  const activeRef = useRef(0) // mirror of activeIndex for use in callbacks

  const slideTo = useCallback((rawIndex: number) => {
    if (isAnimating.current) return
    const newIndex = ((rawIndex % TOTAL) + TOTAL) % TOTAL
    if (newIndex === activeRef.current) return

    isAnimating.current = true

    // Pause all, play new center
    videoEls.current.forEach((v, i) => {
      if (!v) return
      if (i === newIndex) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })

    activeRef.current = newIndex
    setActiveIndex(newIndex)

    setTimeout(() => {
      isAnimating.current = false
    }, 850)
  }, [])

  // Play first video on mount
  useEffect(() => {
    const first = videoEls.current[0]
    if (first) {
      first.play().catch(() => {})
    }
  }, [])

  // Attach ended listener to the active video
  useEffect(() => {
    const video = videoEls.current[activeIndex]
    if (!video) return

    const onEnded = () => {
      slideTo(activeIndex + 1)
    }
    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [activeIndex, slideTo])

  // Section entrance animation
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const headings = Array.from(
        sectionRef.current!.querySelectorAll('.section-reveal')
      )
      gsap.from(headings, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.carousel-wrapper', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-28 px-[5vw]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="section-reveal inline-block text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-violet-400/70 mb-5">
            Web Development
          </span>
          <h2 className="section-reveal font-display text-[clamp(2rem,4.5vw,3.8rem)] font-normal leading-[1.05] tracking-[-0.03em] text-text-on-dark mb-5">
            Websites that convert &amp; scale
          </h2>
          <p className="section-reveal text-[1rem] leading-[1.7] text-white/40 max-w-[48ch] mx-auto">
            Modern, high-performance web experiences crafted with precision.
          </p>
        </div>

        {/* Carousel */}
        <div className="carousel-wrapper relative overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 md:w-36 z-10 bg-gradient-to-r from-[#09090b] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 md:w-36 z-10 bg-gradient-to-l from-[#09090b] to-transparent" />

          {/* Cards — each card is a stable DOM element, positioned via left% */}
          <div className="relative w-full" style={{ paddingBottom: `${CARD_WIDTH * (9 / 16) + 6}%` }}>
            {WEB_DESIGNS.map((design, i) => {
              const offset = ringOffset(activeIndex, i)
              const isCenter = offset === 0
              const leftPos = getCardLeft(offset)
              // Hide cards that are too far away (won't happen with 3, but safe)
              const isVisible = Math.abs(offset) <= 2

              return (
                <div
                  key={i}
                  className="absolute top-0 cursor-pointer"
                  style={{
                    width: `${CARD_WIDTH}%`,
                    left: `${leftPos}%`,
                    transform: isCenter ? 'scale(1)' : 'scale(0.9)',
                    zIndex: isCenter ? 3 : 2 - Math.abs(offset),
                    opacity: isVisible ? 1 : 0,
                    transition: 'left 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.7s ease-out, opacity 0.5s ease',
                  }}
                  onClick={() => {
                    if (!isCenter) slideTo(i)
                  }}
                >
                  {/* Card */}
                  <div
                    className={`
                      relative overflow-hidden rounded-[20px] border
                      transition-[border-color,box-shadow,opacity] duration-700 ease-out
                      ${isCenter
                        ? 'border-white/[0.15] shadow-2xl shadow-white/[0.04] opacity-100'
                        : 'border-white/[0.06] opacity-40'
                      }
                    `}
                  >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/[0.05] bg-[#0d0d0f]/80 backdrop-blur-md">
                      <div className="flex gap-[6px]">
                        <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]/70" />
                        <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e]/70" />
                        <div className="w-[11px] h-[11px] rounded-full bg-[#28c840]/70" />
                      </div>
                      <div className="flex-1 h-[24px] rounded-lg bg-white/[0.03] max-w-[200px] mx-auto flex items-center justify-center gap-1.5">
                        <div className="h-[5px] w-16 rounded-full bg-white/[0.06]" />
                      </div>
                      <div className="w-[62px] flex justify-end gap-1.5">
                        <div className="w-[14px] h-[14px] rounded-sm bg-white/[0.04]" />
                        <div className="w-[14px] h-[14px] rounded-sm bg-white/[0.04]" />
                      </div>
                    </div>

                    {/* Video */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#080809]">
                      <video
                        ref={(el) => { videoEls.current[i] = el }}
                        src={design.videoSrc}
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                      {!isCenter && <div className="absolute inset-0 bg-black/30 transition-opacity duration-700" />}
                    </div>

                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                      <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <span className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-white/70">
                          {design.label}
                        </span>
                        <div
                          className="w-2 h-2 rounded-full transition-opacity duration-700"
                          style={{
                            backgroundColor: design.accentColor,
                            opacity: isCenter ? 0.8 : 0.3,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2.5 mt-8">
            {WEB_DESIGNS.map((_, i) => (
              <button
                key={i}
                onClick={() => slideTo(i)}
                className={`
                  rounded-full transition-all duration-500
                  ${i === activeIndex
                    ? 'w-8 h-2 bg-violet-400/70'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }
                `}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-[0.8rem] font-semibold tracking-[0.1em] uppercase border border-white/20 text-white/80 rounded-full cursor-pointer transition-all duration-400 hover:bg-white/[0.06] hover:border-white/40 hover:text-white hover:scale-[1.03]"
          >
            <span>View All Projects</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
