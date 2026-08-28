'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface SolutionsPixelRainProps {
  color: string;
}

interface Pixel {
  x: number;
  y: number;
  speed: number;
  size: number;
}

export function SolutionsPixelRain({ color }: SolutionsPixelRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let pixels: Pixel[] = [];
    let rafId: number | undefined;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      const gap = 30;
      const count = Math.max(1, Math.floor(width / gap));
      pixels = Array.from({ length: count }, (_, i) => ({
        x: i * gap + gap / 2 + (Math.random() * 10 - 5),
        y: Math.random() * height,
        speed: 0.25 + Math.random() * 0.55,
        size: 2 + Math.random() * 2,
      }));
    }

    function renderFrame(advance: boolean) {
      ctx!.clearRect(0, 0, width, height);
      pixels.forEach((p) => {
        ctx!.globalAlpha = 0.12 + Math.random() * 0.1;
        ctx!.fillStyle = color;
        ctx!.fillRect(p.x, p.y, p.size, p.size);
        if (advance) {
          p.y += p.speed;
          if (p.y > height) {
            p.y = -10;
            p.speed = 0.25 + Math.random() * 0.55;
          }
        }
      });
    }

    function loop() {
      renderFrame(true);
      rafId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);

    if (prefersReducedMotion) {
      renderFrame(false);
    } else {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [color]);

  return (
    <Box aria-hidden sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </Box>
  );
}
