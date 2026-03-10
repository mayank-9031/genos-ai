"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DotLoader } from "@/components/ui/dot-loader";

const frames: number[][] = [
  [14, 7, 0, 8, 6, 13, 20],
  [14, 7, 13, 20, 16, 27, 21],
  [14, 20, 27, 21, 34, 24, 28],
  [27, 21, 34, 28, 41, 32, 35],
  [34, 28, 41, 35, 48, 40, 42],
  [34, 28, 41, 35, 48, 42, 46],
  [34, 28, 41, 35, 48, 42, 38],
  [34, 28, 41, 35, 48, 30, 21],
  [34, 28, 41, 48, 21, 22, 14],
  [34, 28, 41, 21, 14, 16, 27],
  [34, 28, 21, 14, 10, 20, 27],
  [28, 21, 14, 4, 13, 20, 27],
  [28, 21, 14, 12, 6, 13, 20],
  [28, 21, 14, 6, 13, 20, 11],
  [28, 21, 14, 6, 13, 20, 10],
  [14, 6, 13, 20, 9, 7, 21],
];

const MIN_DISPLAY_MS = 2800;

export function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");
  const windowLoaded = useRef(false);
  const minTimePassed = useRef(false);

  const tryFinish = useCallback(() => {
    if (windowLoaded.current && minTimePassed.current) {
      setPhase("fading");
    }
  }, []);

  useEffect(() => {
    // Minimum display timer
    const timer = setTimeout(() => {
      minTimePassed.current = true;
      tryFinish();
    }, MIN_DISPLAY_MS);

    // Window load event (fires when all sub-resources are done)
    const onLoad = () => {
      windowLoaded.current = true;
      tryFinish();
    };

    if (document.readyState === "complete") {
      windowLoaded.current = true;
      tryFinish();
    } else {
      window.addEventListener("load", onLoad);
    }

    // Lock scroll while loading
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, [tryFinish]);

  // Remove overlay after fade completes
  useEffect(() => {
    if (phase === "fading") {
      const timeout = setTimeout(() => {
        document.body.style.overflow = "";
        setPhase("done");
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-dark transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      <DotLoader
        frames={frames}
        duration={100}
        className="gap-1"
        dotClassName="bg-white/10 [&.active]:bg-[#00D4FF] size-2.5 rounded-sm transition-colors duration-75"
      />
      <p className="mt-6 text-sm font-medium tracking-[0.15em] uppercase text-white/40">
        Loading
      </p>
    </div>
  );
}
