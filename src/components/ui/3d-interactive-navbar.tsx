"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import ButtonWithIconDemo from "@/components/ui/button-witn-icon";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, RoundedBox, Html } from "@react-three/drei";
import { Group, Mesh, Vector3, Color } from "three";
import * as THREE from "three";

const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

/* ─── 3D Card (reusable export) ─── */

interface Card3DProps {
  children?: ReactNode;
  className?: string;
  maxRotation?: number;
  scale?: number;
  position?: [number, number, number];
  color?: string;
  opacity?: number;
  reflective?: boolean;
  title?: string;
  content?: ReactNode;
  rotationSmoothness?: number;
  hoverScale?: number;
  hoverLift?: number;
  hoverColor?: string;
  hoverLightIntensity?: number;
  dynamicLight?: boolean;
}

const CardContent = ({
  content,
  cardRotation,
  mousePosition,
}: {
  title?: string;
  content?: ReactNode;
  cardRotation?: THREE.Euler;
  mousePosition?: THREE.Vector2;
  viewport?: { width: number; height: number };
}) => {
  const contentRef = useRef<THREE.Group>(null);
  const parallaxAmount = 0.1;

  useFrame(() => {
    if (contentRef.current && cardRotation && mousePosition) {
      const parallaxX = -cardRotation.y * parallaxAmount * 10;
      const parallaxY = cardRotation.x * parallaxAmount * 10;
      contentRef.current.position.x = parallaxX;
      contentRef.current.position.y = parallaxY;
    }
  });

  return (
    <group ref={contentRef} position={[0, 0, 0.7]}>
      <Html transform pointerEvents="none">
        <div>{content}</div>
      </Html>
    </group>
  );
};

const Scene = ({
  children,
  maxRotation = 0.05,
  scale = 1.2,
  position = [0, 0, 0],
  color = "#111",
  opacity = 0.9,
  reflective = true,
  title,
  content,
  rotationSmoothness = 0.1,
  hoverScale = 1.03,
  hoverLift = 0.3,
  hoverColor = "#333",
  hoverLightIntensity = 5,
  dynamicLight = true,
}: Omit<Card3DProps, "className">) => {
  const group = useRef<Group>(null);
  const cardMesh = useRef<Mesh>(null);
  const dynamicLightRef = useRef<THREE.PointLight>(null);

  const [hover, setHover] = useState(false);
  const { mouse, viewport } = useThree();

  const targetScale = useRef(scale);
  const targetZ = useRef(position[2]);
  const targetColor = useRef(new Color(color));
  const baseColor = useRef(new Color(color));
  const hoverColorTarget = useRef(new Color(hoverColor));

  useEffect(() => {
    baseColor.current.set(color);
    hoverColorTarget.current.set(hoverColor);
    targetScale.current = scale;
    targetZ.current = position[2];
    targetColor.current.set(color);
  }, [scale, position, color, hoverColor]);

  useEffect(() => {
    if (hover) {
      targetScale.current = scale * hoverScale;
      targetZ.current = position[2] + hoverLift;
      targetColor.current.set(hoverColor);
    } else {
      targetScale.current = scale;
      targetZ.current = position[2];
      targetColor.current.set(color);
    }
  }, [hover, scale, position, hoverScale, hoverLift, color, hoverColor]);

  useFrame(() => {
    if (!group.current || !cardMesh.current) return;

    const rotationTargetX = mouse.y * -maxRotation;
    const rotationTargetY = mouse.x * maxRotation;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      hover ? rotationTargetX : 0,
      rotationSmoothness
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      hover ? rotationTargetY : 0,
      rotationSmoothness
    );

    group.current.scale.x =
      group.current.scale.y =
      group.current.scale.z =
        THREE.MathUtils.lerp(
          group.current.scale.x,
          targetScale.current,
          rotationSmoothness
        );

    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ.current,
      rotationSmoothness
    );

    if (cardMesh.current.material) {
      const material = cardMesh.current.material as THREE.Material & {
        color?: THREE.Color;
      };
      if (material.color) {
        material.color.lerp(targetColor.current, rotationSmoothness * 0.5);
      }
    }

    if (dynamicLightRef.current && dynamicLight) {
      const lightOffset = new THREE.Vector3(
        group.current.rotation.y * 5,
        -group.current.rotation.x * 5 + 3,
        2
      );
      lightOffset.applyEuler(group.current.rotation);
      dynamicLightRef.current.position.copy(lightOffset);
      dynamicLightRef.current.intensity = THREE.MathUtils.lerp(
        dynamicLightRef.current.intensity,
        hover ? hoverLightIntensity : 0,
        rotationSmoothness
      );
    }
  });

  return (
    <group
      ref={group}
      scale={5}
      position={position}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <RoundedBox
        ref={cardMesh}
        args={[12, 8.4, 0.4]}
        radius={0.4}
        smoothness={10}
        castShadow
        receiveShadow
      >
        {reflective ? (
          <MeshReflectorMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            opacity={opacity}
            transparent={opacity < 1}
          />
        ) : (
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.7}
            opacity={opacity}
            transparent={opacity < 1}
          />
        )}
      </RoundedBox>

      <CardContent
        title={title}
        content={content}
        cardRotation={group.current ? group.current.rotation : undefined}
        mousePosition={mouse}
        viewport={viewport}
      />

      {dynamicLight && (
        <pointLight
          ref={dynamicLightRef}
          position={[0, 0, 0]}
          intensity={0}
          distance={15}
          decay={2}
          color="#ffffff"
          castShadow
          visible={false}
        />
      )}

      <group position={[0, 0, 0.16]}>{children}</group>
    </group>
  );
};

export const Card3D = ({
  children,
  className,
  maxRotation,
  scale = 0.8,
  position,
  color = "#111",
  opacity = 0.9,
  reflective = true,
  title,
  content,
  rotationSmoothness,
  hoverScale,
  hoverLift,
  hoverColor,
  hoverLightIntensity,
  dynamicLight,
}: Card3DProps) => {
  return (
    <div className={cn("h-[300px] w-[400px] relative", className)}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 23], fov: 20 }}
        flat
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 25]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-5, -10, -10]} intensity={0.3} />
        <directionalLight position={[0, -10, 5]} />
        <directionalLight position={[10, 0, 5]} intensity={0.4} />

        <Scene
          maxRotation={maxRotation}
          scale={scale}
          position={position}
          color={color}
          opacity={opacity}
          reflective={reflective}
          title={title}
          content={content}
          rotationSmoothness={rotationSmoothness}
          hoverScale={hoverScale}
          hoverLift={hoverLift}
          hoverColor={hoverColor}
          hoverLightIntensity={hoverLightIntensity}
          dynamicLight={dynamicLight}
        >
          {children}
        </Scene>
      </Canvas>
    </div>
  );
};

/* ─── Decrypt text effect ─── */

function DecryptEffect({ text }: { text: string }) {
  const [decodedText, setDecodedText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    let shouldAnimate = true;
    const frameRate = 24;
    const speed = 0.5;

    const interval = setInterval(() => {
      if (!shouldAnimate) return;

      setDecodedText(() => {
        const result = text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[
              Math.floor(Math.random() * 62)
            ];
          })
          .join("");

        iteration += speed;
        if (iteration >= text.length) clearInterval(interval);
        return result;
      });
    }, 1000 / frameRate);

    return () => {
      shouldAnimate = false;
      clearInterval(interval);
    };
  }, [text]);

  return <span className="inline-block font-medium">{decodedText}</span>;
}

/* ─── Nav items & types ─── */

type NavItem = {
  title: string;
  href: string;
};

const navItems: NavItem[] = [
  { title: "SERVICES", href: "#services" },
  { title: "HOW WE WORK", href: "#process" },
  { title: "ABOUT", href: "#about" },
  { title: "FAQ", href: "#faq" },
];

/* ─── NavbarItem with decrypt hover ─── */

function NavbarItem({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive?: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={item.href}
      onClick={onClick}
      className={`hidden md:inline relative whitespace-nowrap transition-colors ${
        isActive ? "text-white" : "hover:text-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="inline-block relative whitespace-nowrap"
        style={{ width: `${item.title.length}ch` }}
      >
        {isHovered ? (
          <DecryptEffect text={item.title} />
        ) : (
          <span className="font-medium">{item.title}</span>
        )}
      </span>
    </a>
  );
}

/* ─── Menu icon ─── */

function MenuIcon({ isOpen = false }: { isOpen?: boolean }) {
  if (isOpen) {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path
          d="M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H17"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1 6H17"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1 11H17"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Navbar ─── */

const SECTION_IDS = ["hero", "services", "process", "why-us", "about", "faq", "contact"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll-based backdrop (matches original SiteHeader)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section highlighting via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isActive = (href: string) => activeSection === href.replace("#", "");

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`site-header fixed top-0 left-0 right-0 z-100 px-[3vw] py-6 transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/80 backdrop-blur-xl border-b border-white/6 py-4"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={handleAnchorClick}
          className="font-display text-[1.4rem] text-white tracking-[-0.02em]"
        >
          Genos<span className="text-white">AI</span>
        </a>

        {/* Desktop nav + CTA */}
        <div className="flex items-center gap-10 text-[0.85rem] font-medium text-white tracking-[0.04em]">
          {navItems.map((item) => (
            <NavbarItem
              key={item.title}
              item={item}
              isActive={isActive(item.href)}
              onClick={handleAnchorClick}
            />
          ))}

          {/* CTA — button with icon */}
          <div className="hidden md:block" onClick={() => {
            const target = document.querySelector("#contact");
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}>
            <ButtonWithIconDemo />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon isOpen={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-bg-dark/95 backdrop-blur-lg border-t border-white/10 px-[3vw] py-6 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-4 text-[0.95rem] text-white">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={handleAnchorClick}
                  className={isActive(item.href) ? "text-white" : ""}
                >
                  {item.title}
                </a>
              ))}
              <div onClick={() => {
                setMobileOpen(false);
                const target = document.querySelector("#contact");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}>
                <ButtonWithIconDemo />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
