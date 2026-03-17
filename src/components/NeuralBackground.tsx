import React, { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  parallaxFactor: number;
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let neurons: Neuron[] = [];

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
      neurons = Array.from({ length: config.particleCount }, () => ({
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

      neurons.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;

        const displayY = (n.y - currentScroll * n.parallaxFactor) % (window.innerHeight + 200);
        const finalY = displayY < -100 ? displayY + (window.innerHeight + 200) : displayY;

        if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;

        const pulse = Math.sin(time * 0.002 + n.phase) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(n.x, finalY, n.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${activeColor}, ${0.4 * pulse})`;
        ctx.fill();

        for (let j = i + 1; j < neurons.length; j++) {
          const n2 = neurons[j];
          const finalY2 = (n2.y - currentScroll * n2.parallaxFactor) % (window.innerHeight + 200);
          const displayY2 = finalY2 < -100 ? finalY2 + (window.innerHeight + 200) : finalY2;

          const dx = n.x - n2.x;
          const dy = finalY - displayY2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.connectionDist) {
            const opacity = (1 - dist / config.connectionDist) * lineMaxOpacity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${activeColor}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(n.x, finalY);
            ctx.lineTo(n2.x, displayY2);
            ctx.stroke();
          }
        }
      });

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
