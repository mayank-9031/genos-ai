import { useEffect, useRef, useState } from 'react'

/* Steps through 0..steps while the element is on screen, holds on the last step, then loops.
   It starts on the final step, so the server render, visitors without JS and visitors who
   prefer reduced motion all see the finished state. */
export function useSequence<T extends Element>(steps: number, stepMs = 1100, holdMs = 3200) {
  const ref = useRef<T>(null)
  const [step, setStep] = useState(steps)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let current = steps
    let timer: ReturnType<typeof setTimeout> | undefined

    const tick = () => {
      current = current >= steps ? 0 : current + 1
      setStep(current)
      timer = setTimeout(tick, current === steps ? holdMs : stepMs)
    }

    // Only animate while visible; pause when scrolled away or covered by another card
    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer)
        timer = entry.isIntersecting ? setTimeout(tick, stepMs) : undefined
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [steps, stepMs, holdMs])

  return [ref, step] as const
}
