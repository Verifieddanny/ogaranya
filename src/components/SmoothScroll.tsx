'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as any).__lenis = lenis;
    }

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Crucial: lagSmoothing must be 0 when using Lenis with ScrollTrigger to prevent desync on fast scroll
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => {
      lenis.resize();
    };

    ScrollTrigger.addEventListener('refresh', handleResize);

    // Refresh ScrollTrigger once custom fonts and layout settle
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
        lenis.resize();
      });
    }

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
      lenis.resize();
    };
    window.addEventListener('load', handleWindowLoad);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      ScrollTrigger.removeEventListener('refresh', handleResize);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      if (typeof window !== 'undefined') {
        (window as any).__lenis = null;
      }
    };
  }, []);

  return <>{children}</>;
}
