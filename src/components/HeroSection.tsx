"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { EtheralShadow } from "@/components/ui/etheral-shadow";
import { smoothScrollTo } from "@/lib/smoothScroll";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "Social Media",
      "Outreach",
      "Support",
      "Business Operations",
      "Sales",
    ],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  useEffect(() => {
    if (hasAnimated.current || !heroRef.current) return;
    hasAnimated.current = true;

    const hero = heroRef.current;
    const words = hero.querySelectorAll(".hero-word");
    const tagline = hero.querySelector(".hero-tagline");
    const indicator = hero.querySelector(".scroll-indicator");
    const label = hero.querySelector(".section-label");
    const subheadline = hero.querySelector(".hero-subheadline");
    const cta = hero.querySelector(".hero-cta");

    gsap.set(words, { opacity: 0, y: 60 });
    gsap.set(tagline, { opacity: 0, y: 20 });
    gsap.set(indicator, { opacity: 0 });
    if (subheadline) gsap.set(subheadline, { opacity: 0, y: 20 });
    if (cta) gsap.set(cta, { opacity: 0, y: 20 });

    gsap.to(label, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
    gsap.to(words, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.4,
    });
    gsap.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 1.0,
    });
    if (subheadline)
      gsap.to(subheadline, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      });
    if (cta)
      gsap.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.4,
      });
    gsap.to(indicator, { opacity: 1, duration: 0.6, delay: 1.8 });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 h-screen"
      id="hero"
      aria-label="GenosAI - AI Automation Agency"
    >
      <Card className="w-full h-full bg-transparent border-0 rounded-none relative overflow-hidden">
        {/* Etheral Shadow animated background */}
        <div className="absolute inset-0 z-0">
          <EtheralShadow
            color="rgba(255, 255, 255, 0.06)"
            animation={{ scale: 80, speed: 60 }}
            noise={{ opacity: 0.6, scale: 1.2 }}
            sizing="fill"
          />
          {/* Secondary shadow layer for purple accent */}
          <div className="absolute inset-0" style={{ mixBlendMode: "screen" }}>
            <EtheralShadow
              color="rgba(255, 255, 255, 0.04)"
              animation={{ scale: 60, speed: 40 }}
              noise={{ opacity: 0, scale: 1 }}
              sizing="fill"
            />
          </div>
        </div>

        <Spotlight className="z-[2]" size={400} />

        <div className="flex h-full">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center">
            <span className="section-label block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-violet-400/70 mb-8">
              AI AUTOMATION AGENCY
            </span>
            {/* Semantic h1 for crawlers and LLMs */}
            <h1 className="sr-only">
              GenosAI: The Global AI Automation Agency That Builds Custom AI
              Systems for Business
            </h1>
            <div
              aria-hidden="true"
              className="font-display text-[clamp(2.5rem,6vw,6rem)] font-normal leading-[0.92] tracking-[-0.03em] mb-6"
            >
              <span className="hero-word inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                We
              </span>{" "}
              <span className="hero-word inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Build
              </span>{" "}
              <span className="hero-word inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                AI
              </span>{" "}
              <span className="hero-word inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Systems
              </span>
              <br />
              <span className="hero-word inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                That
              </span>{" "}
              <span className="hero-word inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Automate
              </span>{" "}
              <span className="hero-word inline-block bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Your
              </span>
              <br />
              <span className="hero-tagline relative inline-block h-[1.1em] overflow-hidden align-bottom">
                {/* Invisible longest word to reserve width */}
                <span className="invisible">Business Operations</span>
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute left-0 top-0 inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? "-150%" : "150%",
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </div>
            <p className="hero-subheadline text-[1.05rem] md:text-[1.15rem] leading-[1.6] text-white/50 max-w-[42ch]">
              GenosAI is a global AI automation agency trusted by clients across
              the globe. We build custom AI chatbots, voice AI agents, workflow
              automation systems, and intelligent business platforms, engineered
              to eliminate manual operations and scale with your growth.
            </p>
            <div className="hero-cta flex flex-wrap gap-4 mt-8">
              <a
                href="#contact"
                onClick={smoothScrollTo}
                className="inline-block px-8 py-4 text-[0.9rem] font-semibold tracking-[0.06em] uppercase bg-white text-[#0A0A0F] rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)]"
              >
                Book a Free Strategy Call
              </a>
              <a
                href="#services"
                onClick={smoothScrollTo}
                className="inline-block px-8 py-4 text-[0.9rem] font-semibold tracking-[0.06em] uppercase border border-white/20 text-white/70 rounded-full transition-all hover:border-white/40 hover:text-white"
              >
                See Our Services
              </a>
            </div>
          </div>

          {/* Right content — Spline 3D */}
          <div className="flex-1 relative hidden md:block">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-white/30 z-20">
          <span>Scroll</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-[bounce-scroll_2s_infinite]"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </Card>
    </section>
  );
}
