'use client'

import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Mail, Shield, Zap, Users } from 'lucide-react'
import { SmokeBackground } from '@/components/ui/spooky-smoke-animation'

interface FormData {
  fullName: string
  email: string
  phone: string
  company: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
}

const TRUST_STATS = [
  { value: '50+', label: 'Projects Delivered', icon: Zap },
  { value: '23+', label: 'Clients Worldwide', icon: Users },
  { value: '98%', label: 'Client Retention', icon: Shield },
]

function validateField(name: keyof FormData, value: string): string {
  switch (name) {
    case 'fullName':
      if (!value.trim()) return 'Name is required'
      if (value.trim().length < 2) return 'Name must be at least 2 characters'
      return ''
    case 'email':
      if (!value.trim()) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email'
      return ''
    case 'phone':
      if (value && value.replace(/\D/g, '').length < 7) return 'Enter a valid phone number'
      return ''
    case 'message':
      if (!value.trim()) return 'Please describe your challenge'
      if (value.trim().length < 10) return 'Please provide a bit more detail'
      return ''
    default:
      return ''
  }
}

export default function StrategyCallPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // GSAP entrance animations (respects reduced motion)
  useEffect(() => {
    if (!containerRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const els = containerRef.current!.querySelectorAll('.form-reveal')
      gsap.from(els, {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name as keyof FormData]) {
      const error = validateField(name as keyof FormData, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name as keyof FormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const newErrors: FormErrors = {}
    for (const [key, value] of Object.entries(formData)) {
      const error = validateField(key as keyof FormData, value)
      if (error) newErrors[key as keyof FormData] = error
    }

    setErrors(newErrors)
    setTouched({ fullName: true, email: true, phone: true, company: true, message: true })

    if (Object.values(newErrors).some(e => e)) return

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setIsSuccess(true)
    } catch (err) {
      setErrors({ message: err instanceof Error ? err.message : 'Failed to send. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#f0ede8] placeholder:text-white/25 focus-visible:border-violet-400/60 focus-visible:ring-2 focus-visible:ring-violet-400/20 focus-visible:outline-none transition-all duration-200 text-[0.9rem] hover:border-white/[0.14]'

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Full-screen smoke background */}
      <div className="fixed top-0 left-0 z-0 w-screen h-screen overflow-hidden">
        <SmokeBackground smokeColor="#7C3AED" />
      </div>

      {/* Layered overlays — radial centered on tunnel vanishing point */}
      <div className="fixed inset-0 z-[1] bg-black/30 pointer-events-none" />
      <div className="fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

      {/* Corner frame accents */}
      <div className="fixed top-0 left-0 w-8 h-8 lg:w-10 lg:h-10 border-t border-l border-white/15 z-30 pointer-events-none" />
      <div className="fixed top-0 right-0 w-8 h-8 lg:w-10 lg:h-10 border-t border-r border-white/15 z-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-8 h-8 lg:w-10 lg:h-10 border-b border-l border-white/15 z-30 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-8 h-8 lg:w-10 lg:h-10 border-b border-r border-white/15 z-30 pointer-events-none" />

      {/* Back navigation */}
      <nav className="fixed top-5 left-5 z-30" aria-label="Back navigation">
        <Link
          href="/"
          className="form-reveal inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 text-sm backdrop-blur-md bg-white/[0.04] px-4 py-2 rounded-full border border-white/[0.08] hover:border-white/[0.15] cursor-pointer min-h-[44px]"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>
      </nav>

      {/* Content layer — vertically + horizontally centered on tunnel vanishing point */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-4 sm:px-6 py-16">
        {/* Glass card — centered on the tunnel focal point */}
        <div className="w-full max-w-[620px]">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 sm:p-7 lg:p-9 shadow-[0_0_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                {/* Card header — heading + subtitle inside the glass */}
                <header className="text-center mb-6 lg:mb-7">
                  <div className="form-reveal inline-flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-gradient-to-r from-transparent to-violet-400/50" />
                    <span className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-violet-400/80">
                      Free Strategy Call
                    </span>
                    <div className="w-6 h-px bg-gradient-to-l from-transparent to-violet-400/50" />
                  </div>

                  <h1 className="form-reveal font-display text-[clamp(1.6rem,4vw,2.4rem)] font-normal leading-[1.05] tracking-[-0.02em] text-white mb-3">
                    Let&apos;s Build Your{' '}
                    <span className="bg-gradient-to-r from-violet-300 via-white to-violet-300 bg-clip-text text-transparent">
                      AI Strategy
                    </span>
                  </h1>

                  <p className="form-reveal text-[0.85rem] sm:text-[0.9rem] leading-[1.6] text-white/40 max-w-[44ch] mx-auto">
                    Tell us about your challenges. We&apos;ll audit your workflows and show you what&apos;s possible with AI.
                  </p>
                </header>

                {/* Trust stats — compact row inside card */}
                <div className="form-reveal flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 pb-6 border-b border-white/[0.06]">
                  {TRUST_STATS.map(({ value, label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-2 text-white/40">
                      <Icon size={14} className="text-violet-400/50" aria-hidden="true" />
                      <span className="text-xs font-medium text-white/60">{value}</span>
                      <span className="text-[0.65rem] text-white/25 hidden sm:inline">{label}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} noValidate aria-label="Strategy call booking form">
                  {/* Name + Email */}
                  <div className="form-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="fullName" className="block text-[0.72rem] font-medium text-white/35 mb-1.5 tracking-wide uppercase">
                        Full Name <span className="text-violet-400/70" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={touched.fullName && !!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        className={inputClasses}
                      />
                      {touched.fullName && errors.fullName && (
                        <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-400/90">{errors.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[0.72rem] font-medium text-white/35 mb-1.5 tracking-wide uppercase">
                        Email Address <span className="text-violet-400/70" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        aria-invalid={touched.email && !!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={inputClasses}
                      />
                      {touched.email && errors.email && (
                        <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400/90">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone + Company */}
                  <div className="form-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className="block text-[0.72rem] font-medium text-white/35 mb-1.5 tracking-wide uppercase">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className={inputClasses}
                      />
                      {touched.phone && errors.phone && (
                        <p id="phone-error" role="alert" className="mt-1.5 text-xs text-red-400/90">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-[0.72rem] font-medium text-white/35 mb-1.5 tracking-wide uppercase">
                        Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Acme Inc."
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div className="form-reveal mb-7">
                    <label htmlFor="message" className="block text-[0.72rem] font-medium text-white/35 mb-1.5 tracking-wide uppercase">
                      What&apos;s your biggest challenge? <span className="text-violet-400/70" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your current workflows and what you'd like to automate..."
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={touched.message && !!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`${inputClasses} resize-none`}
                    />
                    {touched.message && errors.message && (
                      <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400/90">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <div className="form-reveal">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 text-[0.85rem] font-semibold tracking-[0.08em] uppercase bg-white text-[#0A0A0F] rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.12)] active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed cursor-pointer min-h-[52px] focus-visible:ring-2 focus-visible:ring-violet-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none motion-reduce:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-[#0A0A0F]/30 border-t-[#0A0A0F] rounded-full animate-spin" aria-hidden="true" />
                          Submitting...
                        </span>
                      ) : (
                        'Book Your Free Strategy Call'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 sm:p-12 shadow-[0_0_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)] text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                </div>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-normal leading-[1.1] text-white mb-3">
                  We&apos;ll Be in Touch
                </h2>
                <p className="text-[0.95rem] leading-[1.7] text-white/45 mb-8 max-w-[40ch] mx-auto">
                  Thank you, {formData.fullName.split(' ')[0]}! Our team will reach out within 24 hours to schedule your free strategy call.
                </p>
                <Link
                  href="/"
                  className="inline-block px-8 py-3 text-[0.85rem] font-semibold tracking-[0.08em] uppercase border border-white/15 text-white/60 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:text-white cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-violet-400/40 focus-visible:outline-none"
                >
                  Back to Home
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact alternative — compact, below card */}
        <div className="form-reveal mt-6 text-center">
          <a
            href="mailto:hello@genosai.tech"
            className="inline-flex items-center gap-2 text-[0.8rem] text-white/25 hover:text-white/50 transition-colors duration-200 cursor-pointer"
          >
            <Mail size={13} aria-hidden="true" />
            <span>or email us at <span className="text-white/40">hello@genosai.tech</span></span>
          </a>
        </div>
      </div>

    </main>
  )
}
