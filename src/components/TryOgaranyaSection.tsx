'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function TryOgaranyaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Hover state
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  // Position and physics tracking (matching the fluid liquid dynamics in PosterSection)
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const mouseClientRef = useRef<{ x: number; y: number } | null>(null);
  const hasPosInitializedRef = useRef(false);

  // Subtle elastic stretch and orientation
  const stretchRef = useRef(0);
  const angleRef = useRef(0);

  // Track global cursor & scroll positions so scrolling gradually pulls banner towards cursor without jumping
  useEffect(() => {
    const updateFromScreenCoordinates = (clientX: number, clientY: number) => {
      mouseClientRef.current = { x: clientX, y: clientY };
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isInside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInside) {
        const newTargetX = clientX - rect.left;
        const newTargetY = clientY - rect.top;
        targetRef.current = { x: newTargetX, y: newTargetY };

        // Initialize pos on very first interaction so it starts at cursor entry without jumping
        if (!hasPosInitializedRef.current) {
          posRef.current = { x: newTargetX, y: newTargetY };
          hasPosInitializedRef.current = true;
        }

        if (!isHoveredRef.current) {
          isHoveredRef.current = true;
          setIsHovered(true);
        }
      } else {
        if (isHoveredRef.current) {
          isHoveredRef.current = false;
          setIsHovered(false);
        }
      }
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      updateFromScreenCoordinates(e.clientX, e.clientY);
    };

    const handleWindowScroll = () => {
      if (mouseClientRef.current) {
        updateFromScreenCoordinates(
          mouseClientRef.current.x,
          mouseClientRef.current.y
        );
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  // Animation frame loop with fluid spring physics
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      const dist = Math.hypot(dx, dy);
      const currentSpeed = Math.hypot(velRef.current.vx, velRef.current.vy);

      if (isHoveredRef.current || dist > 0.5 || currentSpeed > 0.05) {
        // Effortless elastic fluid dynamics (matching PosterSection):
        // springK = 0.10 (silky responsive follow without stiff snap)
        // damping = 0.84 (liquid momentum glide, zero rigid drawback)
        const springK = 0.10;
        const damping = 0.84;

        velRef.current.vx = (velRef.current.vx + dx * springK) * damping;
        velRef.current.vy = (velRef.current.vy + dy * springK) * damping;

        posRef.current.x += velRef.current.vx;
        posRef.current.y += velRef.current.vy;

        const vx = velRef.current.vx;
        const vy = velRef.current.vy;
        const speed = Math.hypot(vx, vy);

        // Dynamic volume-preserving elastic deformation: stretches along velocity direction
        const targetStretch = Math.min(speed * 0.0022, 0.20);
        stretchRef.current += (targetStretch - stretchRef.current) * 0.16;

        const scaleX = 1 + stretchRef.current;
        const scaleY = 1 / Math.sqrt(scaleX);

        // Smoothly orient along velocity vector
        if (speed > 0.6) {
          const targetAngle = Math.atan2(vy, vx) * (180 / Math.PI);
          let diff = targetAngle - angleRef.current;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          angleRef.current += diff * 0.15;
        }

        if (bannerRef.current) {
          bannerRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) rotate(${angleRef.current}deg) scale(${scaleX}, ${scaleY}) rotate(${-angleRef.current}deg)`;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseClientRef.current = { x: e.clientX, y: e.clientY };
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!isHoveredRef.current) {
      isHoveredRef.current = true;
      setIsHovered(true);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseClientRef.current = { x: e.clientX, y: e.clientY };
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!hasPosInitializedRef.current) {
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      hasPosInitializedRef.current = true;
    }
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
  };

  // Repeated marquee phrase
  const marqueeItems = [
    'TRY OGARANYA',
    'TRY OGARANYA',
    'TRY OGARANYA',
    'TRY OGARANYA',
  ];

  return (
    <section
      id="try-ogaranya"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#FAF6EC] py-20 sm:py-28 md:py-36 lg:py-48 overflow-hidden select-none cursor-pointer"
      aria-label="Try and Download Ogaranya Typeface"
    >
      {/* Anchor linking directly to the font zip archive within /public/ogaranya_font */}
      <a
        href="/ogaranya_font/OGARANYA-Font.zip"
        download="OGARANYA-Font.zip"
        className="block w-full focus:outline-none"
        title="Download Ogaranya Typeface Zip"
      >
        {/* ============================================================= */}
        {/* INFINITE SEAMLESS MARQUEE CONTAINER                           */}
        {/* Sizing: 400px in Figma (node 47:567 / 47:570)                 */}
        {/* Color: #878787 default, transitions to #211711 on hover       */}
        {/* ============================================================= */}
        <div className="relative w-full flex overflow-hidden group">
          {/* Track 1 */}
          <div
            className={`flex shrink-0 items-center whitespace-nowrap animate-marquee-loop ${
              isHovered ? 'text-[#211711]' : 'text-[#878787]'
            } transition-colors duration-500 ease-out`}
            style={{
              animationPlayState: 'running',
            }}
          >
            {marqueeItems.map((text, i) => (
              <span
                key={`track1-${i}`}
                className="font-ogaranya font-normal text-[140px] sm:text-[220px] md:text-[320px] lg:text-[380px] xl:text-[400px] leading-[0.82] tracking-[-0.03em] uppercase mx-8 sm:mx-14 md:mx-20"
              >
                {text}
              </span>
            ))}
          </div>

          {/* Track 2 (Duplicate for seamless continuous loop) */}
          <div
            aria-hidden="true"
            className={`flex shrink-0 items-center whitespace-nowrap animate-marquee-loop ${
              isHovered ? 'text-[#211711]' : 'text-[#878787]'
            } transition-colors duration-500 ease-out`}
            style={{
              animationPlayState: 'running',
            }}
          >
            {marqueeItems.map((text, i) => (
              <span
                key={`track2-${i}`}
                className="font-ogaranya font-normal text-[140px] sm:text-[220px] md:text-[320px] lg:text-[380px] xl:text-[400px] leading-[0.82] tracking-[-0.03em] uppercase mx-8 sm:mx-14 md:mx-20"
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* ============================================================= */}
        {/* CIRCULAR BANNER CURSOR FOLLOWER                               */}
        {/* Shows beneath the cursor with text "Download"                 */}
        {/* Gradual flow on cursor and scroll, zero jumping               */}
        {/* ============================================================= */}
        <div
          ref={bannerRef}
          className={`pointer-events-none absolute top-0 left-0 z-50 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#211711] text-[#FAF6EC] shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-[#FAF6EC]/25 flex flex-col items-center justify-center transition-opacity duration-300 ease-out will-change-transform hidden md:flex ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Centered download icon & text */}
          <div className="flex flex-col items-center justify-center space-y-1 pointer-events-none select-none">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#FAF6EC] animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="font-instrument uppercase tracking-[0.14em] text-[11px] sm:text-[12px] font-semibold text-[#FAF6EC]">
              Download
            </span>
          </div>
        </div>

        {/* ============================================================= */}
        {/* MOBILE FLOATING DOWNLOAD BUTTON (Touch-friendly fallback)     */}
        {/* ============================================================= */}
        <div className="flex md:hidden justify-center mt-8">
          <div className="w-28 h-28 rounded-full bg-[#211711] text-[#FAF6EC] shadow-xl border border-[#FAF6EC]/20 flex flex-col items-center justify-center space-y-1 active:scale-95 transition-transform">
            <svg
              className="w-5 h-5 text-[#FAF6EC]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="font-instrument uppercase tracking-[0.12em] text-[11px] font-semibold text-[#FAF6EC]">
              Download
            </span>
          </div>
        </div>
      </a>
    </section>
  );
}
