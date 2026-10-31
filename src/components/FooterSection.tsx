'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ProfileData {
  id: 'unclenebo' | 'devdanny';
  name: string;
  handle: string;
  role: string;
  bio: string;
  image: string;
  url: string;
}

const PROFILES: Record<'unclenebo' | 'devdanny', ProfileData> = {
  unclenebo: {
    id: 'unclenebo',
    name: 'UncleNebo',
    handle: '@uncle_nebo',
    role: 'Visual Direction & Type Design',
    bio: 'Brand designer and creative director behind the visual direction of Ogaranya.',
    image: '/images/credits/unclenebo.png',
    url: 'https://x.com/uncle_nebo',
  },
  devdanny: {
    id: 'devdanny',
    name: 'DevDanny',
    handle: '@dannyclassi_c',
    role: 'Backend & Infrastructure Engineer',
    bio: 'First Class Computer Science graduate specializing in fast, dependable systems.',
    image: '/images/credits/devdanny.png',
    url: 'https://x.com/dannyclassi_c',
  },
};

export default function FooterSection() {
  // Desktop hover state for fluid cursor blob
  const [hoveredProfile, setHoveredProfile] = useState<'unclenebo' | 'devdanny' | null>(null);
  const hoveredProfileRef = useRef<'unclenebo' | 'devdanny' | null>(null);

  // Mobile uplifted card modal state
  const [mobileProfile, setMobileProfile] = useState<ProfileData | null>(null);

  // Cursor follow physics references
  const copyrightContainerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const hasInitializedRef = useRef(false);

  // Sync ref with state
  useEffect(() => {
    hoveredProfileRef.current = hoveredProfile;
  }, [hoveredProfile]);

  // Spring physics loop for fluid circular blob beneath cursor
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const isHovered = !!hoveredProfileRef.current;
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      const dist = Math.hypot(dx, dy);
      const speed = Math.hypot(velRef.current.vx, velRef.current.vy);

      if (isHovered || dist > 0.5 || speed > 0.05) {
        const springK = 0.12;
        const damping = 0.82;

        velRef.current.vx = (velRef.current.vx + dx * springK) * damping;
        velRef.current.vy = (velRef.current.vy + dy * springK) * damping;

        posRef.current.x += velRef.current.vx;
        posRef.current.y += velRef.current.vy;

        if (blobRef.current) {
          blobRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Track cursor position inside the copyright container
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!copyrightContainerRef.current) return;
    const rect = copyrightContainerRef.current.getBoundingClientRect();
    const newTargetX = e.clientX - rect.left;
    const newTargetY = e.clientY - rect.top;

    targetRef.current = { x: newTargetX, y: newTargetY };

    if (!hasInitializedRef.current) {
      posRef.current = { x: newTargetX, y: newTargetY };
      hasInitializedRef.current = true;
    }
  };

  const handleNameMouseEnter = (profileKey: 'unclenebo' | 'devdanny', e: React.MouseEvent) => {
    if (copyrightContainerRef.current) {
      const rect = copyrightContainerRef.current.getBoundingClientRect();
      targetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (!hasInitializedRef.current) {
        posRef.current = { ...targetRef.current };
        hasInitializedRef.current = true;
      }
    }
    setHoveredProfile(profileKey);
  };

  const handleNameMouseLeave = () => {
    setHoveredProfile(null);
  };

  const handleMobileClick = (profileKey: 'unclenebo' | 'devdanny', e: React.MouseEvent) => {
    // Only open mobile modal on mobile/touch screen widths (< 768px)
    if (window.innerWidth < 768) {
      e.preventDefault();
      setMobileProfile(PROFILES[profileKey]);
    }
  };

  return (
    <footer id="credits" className="relative w-full bg-[#FAF6EC] select-none overflow-hidden">
      {/* ============================================================= */}
      {/* 1. CREDITS CONTENT CONTAINER (Desktop 3 columns, Mobile 1 col)*/}
      {/* ============================================================= */}
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24">
        {/* Section Title: "Credits" */}
        <h2 className="font-instrument font-semibold text-[28px] sm:text-[32px] text-black tracking-[-0.04em] mb-12 sm:mb-16">
          Credits
        </h2>

        {/* 3-Column Layout: Typeface, Website, Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {/* Column 1: Typeface */}
          <div className="flex flex-col">
            <h3 className="font-instrument font-normal text-[17px] sm:text-[18px] text-[#141414] mb-3">
              Typeface
            </h3>
            {/* Divider Line (Vector 123) */}
            <div className="w-full h-px bg-black mb-4" />
            <p className="font-instrument font-normal text-[15px] sm:text-[17px] leading-[1.65] text-[#141414]">
              Ogaranya Display Serif is Nebo Ikechukwu’s debut typeface. After five years designing brands, he brings African culture, storytelling, and expressive type together in his first font.
            </p>
          </div>

          {/* Column 2: Website */}
          <div className="flex flex-col">
            <h3 className="font-instrument font-normal text-[17px] sm:text-[18px] text-[#141414] mb-3">
              Website
            </h3>
            {/* Divider Line (Vector 124) */}
            <div className="w-full h-px bg-black mb-4" />
            <p className="font-instrument font-normal text-[15px] sm:text-[17px] leading-[1.65] text-[#141414]">
              This website was designed by Nebo Ikechukwu and built by Daniel Nwachukwu, a backend and infrastructure engineer based in Lagos, Nigeria. A First Class Honours graduate in Computer Science from the University of Nigeria, Nsukka, Daniel specializes in building systems that are fast, secure, and dependable.
            </p>
          </div>

          {/* Column 3: Visuals */}
          <div className="flex flex-col">
            <h3 className="font-instrument font-normal text-[17px] sm:text-[18px] text-[#141414] mb-3">
              Visuals
            </h3>
            {/* Divider Line (Vector 125) */}
            <div className="w-full h-px bg-black mb-4" />
            <p className="font-instrument font-normal text-[15px] sm:text-[17px] leading-[1.65] text-[#141414]">
              The visuals in this project were conceived and designed by Nebo Ikechukwu Kingsley, who led the visual direction, creative development, and design execution from concept to final delivery.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 2. ARCHITECTURAL COPYRIGHT ROW WITH INTERACTIVE HOVER BLOBS   */}
      {/* Boxed by Vector 126 (top), 127 (bottom), 128 (left), 129 (right) */}
      {/* ============================================================= */}
      <div
        ref={copyrightContainerRef}
        onMouseMove={handleContainerMouseMove}
        className="relative w-full border-t border-b border-black overflow-hidden"
      >
        {/* DESKTOP CIRCULAR BLOB IMAGE FOLLOWER (Beneath the text layer: z-10) */}
        <div
          ref={blobRef}
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 left-0 z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[#FFD400] shadow-[0_12px_36px_rgba(0,0,0,0.45)] transition-opacity duration-300 ease-out hidden md:block will-change-transform ${
            hoveredProfile ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          {hoveredProfile && (
            <div className="relative w-full h-full bg-[#211711]">
              <Image
                src={PROFILES[hoveredProfile].image}
                alt={PROFILES[hoveredProfile].name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* COPYRIGHT TEXT ROW (z-20 so text sits crisp on top of the circular blob) */}
        <div className="relative z-20 w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="w-full h-[88px] sm:h-[107px] flex items-center justify-center md:border-l md:border-r md:border-black text-center px-4">
            <p className="font-instrument font-semibold text-[15px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] tracking-[-0.03em] text-[#2D1E13]">
              <span>&copy; 2026&mdash; </span>

              {/* UNCLENEBO INTERACTIVE TRIGGER */}
              <a
                href={PROFILES.unclenebo.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => handleNameMouseEnter('unclenebo', e)}
                onMouseLeave={handleNameMouseLeave}
                onClick={(e) => handleMobileClick('unclenebo', e)}
                className={`relative inline-block transition-colors duration-200 cursor-pointer underline-offset-4 hover:underline ${
                  hoveredProfile === 'unclenebo' ? 'text-[#FFD400]' : 'text-[#2D1E13]'
                }`}
                title="UncleNebo on X"
              >
                UncleNebo
              </a>

              <span> X </span>

              {/* DEVDANNY INTERACTIVE TRIGGER */}
              <a
                href={PROFILES.devdanny.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => handleNameMouseEnter('devdanny', e)}
                onMouseLeave={handleNameMouseLeave}
                onClick={(e) => handleMobileClick('devdanny', e)}
                className={`relative inline-block transition-colors duration-200 cursor-pointer underline-offset-4 hover:underline ${
                  hoveredProfile === 'devdanny' ? 'text-[#FFD400]' : 'text-[#2D1E13]'
                }`}
                title="DevDanny on X"
              >
                DevDanny
              </a>

              <span> :) All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 3. ACTUAL FIGMA AFRICAN TEXTILE PATTERN FOOTER                */}
      {/* Node 47:607 / 71:3444 ("Pattern 01 1")                         */}
      {/* Height: 331px desktop, 281px mobile. Floral wax-print motif    */}
      {/* ============================================================= */}
      <div
        className="relative w-full h-[260px] sm:h-[281px] md:h-[331px] bg-[#FAF6EC] overflow-hidden"
        aria-label="Authentic African floral wax-print textile pattern from Figma"
      >
        {/* Actual Pattern Image from Figma */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-bottom md:bg-center"
          style={{
            backgroundImage: `url('/images/footer-pattern.png')`,
          }}
        />

        {/* Tactile Noise Texture Overlay */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-30"
          style={{
            backgroundImage: `url('/images/noise-heavy.png')`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Subtle architectural frame border at the top of pattern */}
        <div className="absolute top-0 left-0 right-0 h-px bg-black/40 pointer-events-none" />
      </div>

      {/* ============================================================= */}
      {/* 4. MOBILE UPLIFTED CARD MODAL (Stylish Assemble Popup)        */}
      {/* Appears when UncleNebo or DevDanny is clicked on mobile        */}
      {/* ============================================================= */}
      {mobileProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={() => setMobileProfile(null)}
        >
          {/* Uplifted Rectangular Container */}
          <div
            className="relative w-full max-w-[340px] bg-[#FAF6EC] border-2 border-black rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden p-6 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileProfile(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Profile Image in Rounded Frame */}
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-black shadow-lg mb-4 bg-[#211711]">
              <Image
                src={mobileProfile.image}
                alt={mobileProfile.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Profile Name & Handle */}
            <h4 className="font-instrument font-bold text-2xl text-black tracking-tight mb-1">
              {mobileProfile.name}
            </h4>
            <p className="font-instrument text-sm font-medium text-[#FFD400] bg-[#211711] px-3 py-0.5 rounded-full mb-3">
              {mobileProfile.handle}
            </p>

            {/* Role & Bio */}
            <p className="font-instrument text-xs uppercase tracking-widest text-[#141414]/70 font-semibold mb-2">
              {mobileProfile.role}
            </p>
            <p className="font-instrument text-sm text-[#141414]/90 leading-relaxed mb-6">
              {mobileProfile.bio}
            </p>

            {/* CTA Button: View on X */}
            <a
              href={mobileProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-[#211711] text-[#FAF6EC] font-instrument font-semibold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-transform"
            >
              {/* X / Twitter Icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>View on X</span>
            </a>
          </div>
        </div>
      )}
    </footer>
  );
}
