'use client';
import { useRef, useEffect, HTMLAttributes } from 'react';

interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
}

const useSpotlightEffect = (config: SpotlightConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const hexToRgb = (hex: string) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    };

    const smoothing = config.smoothing || 0.1;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth interpolation for fluid movement
      currentX += (mouseX - currentX) * smoothing;
      currentY += (mouseY - currentY) * smoothing;

      if (mouseX !== -1000 && mouseY !== -1000) {
        const radius = config.radius || 200;
        const brightness = config.brightness || 0.15;
        const rgbColor = hexToRgb(config.color || '#ffffff');

        // Compact bright core only
        const coreGradient = ctx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, radius
        );
        coreGradient.addColorStop(0, `rgba(${rgbColor}, ${brightness})`);
        coreGradient.addColorStop(0.4, `rgba(${rgbColor}, ${brightness * 0.3})`);
        coreGradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = coreGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config.radius, config.brightness, config.color, config.smoothing]);

  return canvasRef;
};

interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

export function SpotlightCursor({
  config = {},
  className,
  ...rest
}: SpotlightCursorProps) {
  const spotlightConfig: SpotlightConfig = {
    radius: 200,
    brightness: 0.15,
    color: '#ffffff',
    smoothing: 0.1,
    ...config,
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full mix-blend-soft-light ${className ?? ''}`}
      {...rest}
    />
  );
}
