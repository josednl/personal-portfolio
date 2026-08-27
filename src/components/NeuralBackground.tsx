import React, { useEffect, useRef } from 'react';
import { useAppSettings } from '@/lib/context/AppSettingsContext';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  parallaxFactor: number;
}

interface NeuronWithY extends Neuron {
  displayY: number;
}

const buildGrid = (neurons: NeuronWithY[], cellSize: number) => {
  const grid = new Map<string, NeuronWithY[]>();
  for (const n of neurons) {
    const key = `${Math.floor(n.x / cellSize)},${Math.floor(n.displayY / cellSize)}`;
    const cell = grid.get(key);
    if (cell) cell.push(n);
    else grid.set(key, [n]);
  }
  return grid;
};

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const neuronsRef = useRef<Neuron[]>([]);
  const { optimizedAnimations } = useAppSettings();
  const optimizedRef = useRef(optimizedAnimations);

  useEffect(() => {
    optimizedRef.current = optimizedAnimations;
  }, [optimizedAnimations]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const isDarkMode = () => document.documentElement.classList.contains('dark');

    const config = {
      particleCount: Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 15000)),
      connectionDist: 150,
      getColor: () => (isDarkMode() ? '100, 180, 255' : '71, 85, 105'),
      getLineOpacity: () => (isDarkMode() ? 0.35 : 0.15),
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initNeurons();
    };

    const initNeurons = () => {
      neuronsRef.current = Array.from({ length: config.particleCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight + 500),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1,
        phase: Math.random() * Math.PI * 2,
        parallaxFactor: Math.random() * 0.5 + 0.1,
      }));
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const activeColor = config.getColor();
      const lineMaxOpacity = config.getLineOpacity();
      const currentScroll = scrollRef.current;
      const frozen = optimizedRef.current;

      const neuronsWithY: NeuronWithY[] = neuronsRef.current.map((n) => {
        if (!frozen) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
        }

        const displayY =
          (n.y - currentScroll * n.parallaxFactor) % (window.innerHeight + 200);
        return {
          ...n,
          displayY: displayY < -100 ? displayY + (window.innerHeight + 200) : displayY,
        };
      });

      // Draw particles
      for (const n of neuronsWithY) {
        const pulse = Math.sin(time * 0.002 + n.phase) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(n.x, n.displayY, n.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${activeColor}, ${0.4 * pulse})`;
        ctx.fill();
      }

      // Draw connections
      if (frozen) {
        const grid = buildGrid(neuronsWithY, config.connectionDist);
        const drawn = new Set<string>();

        for (const n of neuronsWithY) {
          const cx = Math.floor(n.x / config.connectionDist);
          const cy = Math.floor(n.displayY / config.connectionDist);

          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const key = `${cx + dx},${cy + dy}`;
              const cell = grid.get(key);
              if (!cell) continue;

              for (const n2 of cell) {
                if (n === n2) continue;
                const pairKey =
                  n.x < n2.x || (n.x === n2.x && n.displayY < n2.displayY)
                    ? `${n.x}:${n.displayY}-${n2.x}:${n2.displayY}`
                    : `${n2.x}:${n2.displayY}-${n.x}:${n.displayY}`;

                if (drawn.has(pairKey)) continue;
                drawn.add(pairKey);

                const ddx = n.x - n2.x;
                const ddy = n.displayY - n2.displayY;
                const dist = Math.sqrt(ddx * ddx + ddy * ddy);

                if (dist < config.connectionDist) {
                  const opacity = (1 - dist / config.connectionDist) * lineMaxOpacity;
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(${activeColor}, ${opacity})`;
                  ctx.lineWidth = 0.5;
                  ctx.moveTo(n.x, n.displayY);
                  ctx.lineTo(n2.x, n2.displayY);
                  ctx.stroke();
                }
              }
            }
          }
        }
      } else {
        for (let i = 0; i < neuronsWithY.length; i++) {
          for (let j = i + 1; j < neuronsWithY.length; j++) {
            const n = neuronsWithY[i];
            const n2 = neuronsWithY[j];

            const dx = n.x - n2.x;
            const dy = n.displayY - n2.displayY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < config.connectionDist) {
              const opacity = (1 - dist / config.connectionDist) * lineMaxOpacity;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${activeColor}, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(n.x, n.displayY);
              ctx.lineTo(n2.x, n2.displayY);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    resizeCanvas();
    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-transparent"
    />
  );
};

export default NeuralBackground;
