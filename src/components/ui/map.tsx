"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  originLabel?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#FFFFFF",
  originLabel = "New Delhi",
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; x: number; y: number } | null>(null);
  const [phase, setPhase] = useState<"idle" | "drawing" | "done">("idle");
  const [animKey, setAnimKey] = useState(0);

  // Reset animation every time the section scrolls into view
  useEffect(() => {
    if (isInView) {
      setPhase("idle");
      setAnimKey((k) => k + 1);
      // Small delay so framer-motion picks up the new key before we start
      const t = setTimeout(() => setPhase("drawing"), 20);
      return () => clearTimeout(t);
    } else {
      setPhase("idle");
    }
  }, [isInView]);

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    []
  );

  const svgMap = useMemo(
    () => map.getSVG({
      radius: 0.22,
      color: "#FFFF7F40",
      shape: "circle",
      backgroundColor: "black",
    }),
    [map]
  );

  const projectPoint = useCallback((lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }, []);

  const createCurvedPath = useCallback((
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }, []);

  const staggerDelay = 0.08;
  const drawDuration = 0.5;
  const lastLineEnd = (dots.length - 1) * staggerDelay + drawDuration;
  const fadeOutStart = lastLineEnd + 0.2;
  const fadeOutDuration = 0.35;

  // Origin point (New Delhi) - always visible with blue glow
  const origin = useMemo(() => {
    const first = dots[0];
    if (!first) return null;
    return {
      ...projectPoint(first.start.lat, first.start.lng),
      label: first.start.label || originLabel,
    };
  }, [dots, projectPoint, originLabel]);

  // Destination points only (exclude origin)
  const destinationPoints = useMemo(() => {
    const originKey = dots[0] ? `${dots[0].start.lat},${dots[0].start.lng}` : "";
    const seen = new Map<string, { x: number; y: number; label: string }>();
    dots.forEach((dot) => {
      const startKey = `${dot.start.lat},${dot.start.lng}`;
      const endKey = `${dot.end.lat},${dot.end.lng}`;
      const startPt = projectPoint(dot.start.lat, dot.start.lng);
      const endPt = projectPoint(dot.end.lat, dot.end.lng);

      if (startKey !== originKey && !seen.has(startKey)) {
        seen.set(startKey, { ...startPt, label: dot.start.label || "" });
      }
      if (endKey !== originKey && !seen.has(endKey)) {
        seen.set(endKey, { ...endPt, label: dot.end.label || "" });
      }
    });
    return Array.from(seen.values());
  }, [dots, projectPoint]);

  const handleLastLineFadeComplete = useCallback(() => {
    setPhase("done");
  }, []);

  return (
    <div ref={containerRef} className="w-full aspect-[2/1] md:aspect-[2.5/1] lg:aspect-[2/1] bg-transparent rounded-lg relative font-sans overflow-hidden">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-cover"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
        priority
      />
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="blue-glow">
            <feMorphology operator="dilate" radius="1" />
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Origin: New Delhi blue beacon - always visible */}
        {origin && (
          <g>
            {/* Outer glow */}
            <circle
              cx={origin.x}
              cy={origin.y}
              r="5"
              fill="#FFFFFF"
              filter="url(#blue-glow)"
              opacity="0.8"
            />
            {/* Core dot */}
            <circle
              cx={origin.x}
              cy={origin.y}
              r="4"
              fill="#FFFFFF"
            />
            {/* Pulse ring 1 */}
            <circle cx={origin.x} cy={origin.y} r="4" fill="none" stroke="#FFFFFF" strokeWidth="1">
              <animate attributeName="r" from="4" to="18" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Pulse ring 2 (offset) */}
            <circle cx={origin.x} cy={origin.y} r="4" fill="none" stroke="#FFFFFF" strokeWidth="0.5">
              <animate attributeName="r" from="4" to="25" dur="2s" begin="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
            </circle>
            {/* Hover target */}
            <circle
              cx={origin.x}
              cy={origin.y}
              r="14"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(origin)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          </g>
        )}

        {/* Lines: draw in staggered, then all fade out */}
        {phase === "drawing" && dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const isLast = i === dots.length - 1;

          return (
            <motion.path
              key={`path-${animKey}-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{
                pathLength: 1,
                opacity: [1, 1, 0],
              }}
              transition={{
                pathLength: {
                  duration: drawDuration,
                  delay: i * staggerDelay,
                  ease: "easeOut",
                },
                opacity: {
                  duration: fadeOutDuration,
                  times: [0, 0.5, 1],
                  delay: fadeOutStart,
                  ease: "easeInOut",
                },
              }}
              onAnimationComplete={isLast ? handleLastLineFadeComplete : undefined}
            />
          );
        })}

        {/* City dots: pop in after lines fade out — NO dots before that */}
        {phase === "done" && destinationPoints.map((point, i) => (
          <motion.g
            key={`point-${animKey}-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.25,
              delay: i * 0.03,
              ease: "backOut",
            }}
            style={{ transformOrigin: `${point.x}px ${point.y}px` }}
          >
            {/* Hover target */}
            <circle
              cx={point.x}
              cy={point.y}
              r="12"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
            {/* Dot */}
            <circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill={lineColor}
              filter="url(#glow)"
              className="pointer-events-none"
            />
            {/* Pulse */}
            <circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill={lineColor}
              opacity="0.4"
              className="pointer-events-none"
            >
              <animate attributeName="r" from="3" to="10" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
          </motion.g>
        ))}

        {/* Hover label */}
        <AnimatePresence>
          {hoveredPoint && hoveredPoint.label && (
            <motion.foreignObject
              key={hoveredPoint.label}
              x={hoveredPoint.x - 60}
              y={hoveredPoint.y - 38}
              width="120"
              height="30"
              className="pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center justify-center h-full">
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-black/95 text-white border border-white/10 shadow-lg whitespace-nowrap">
                  {hoveredPoint.label}
                </span>
              </div>
            </motion.foreignObject>
          )}
        </AnimatePresence>
      </svg>

      {/* Mobile tooltip */}
      <AnimatePresence>
        {hoveredPoint && hoveredPoint.label && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm sm:hidden border border-gray-700"
          >
            {hoveredPoint.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
