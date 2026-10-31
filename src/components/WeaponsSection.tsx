'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

// =========================================================================
// DESKTOP FRAME PAIRS (Lifting Figma nodes from 11:163)
// 1. Frame 13 (Specimen "I") & Frame 14 (Collage 1)
// 2. Frame 7 (Specimen "JJ") & Frame 8 (Collage 2)
// 3. Frame 9 (Specimen "O") & Frame 10 (Collage 3)
// 4. Frame 11 (Specimen "?") & Frame 12 (Collage 4)
// =========================================================================
const DESKTOP_PAIRS = [
  {
    id: 'pair-1',
    left: '/images/visuals/desktop_frame_13.png',
    right: '/images/visuals/desktop_frame_14.png',
    leftAlt: 'Ogaranya Typography Specimen - Glyph I (Frame 13)',
    rightAlt: 'African Weapons & Heritage Art Collage 1 (Frame 14)',
  },
  {
    id: 'pair-2',
    left: '/images/visuals/desktop_frame_7.png',
    right: '/images/visuals/desktop_frame_8.png',
    leftAlt: 'Ogaranya Typography Specimen - Glyph JJ (Frame 7)',
    rightAlt: 'African Weapons & Heritage Art Collage 2 (Frame 8)',
  },
  {
    id: 'pair-3',
    left: '/images/visuals/desktop_frame_9.png',
    right: '/images/visuals/desktop_frame_10.png',
    leftAlt: 'Ogaranya Typography Specimen - Glyph O (Frame 9)',
    rightAlt: 'African Weapons & Heritage Art Collage 3 (Frame 10)',
  },
  {
    id: 'pair-4',
    left: '/images/visuals/desktop_frame_11.png',
    right: '/images/visuals/desktop_frame_12.png',
    leftAlt: 'Ogaranya Typography Specimen - Glyph ? (Frame 11)',
    rightAlt: 'African Weapons & Heritage Art Collage 4 (Frame 12)',
  },
];

// =========================================================================
// MOBILE FRAME SEQUENCE (Lifting Figma nodes from 69:1435)
// Frame 13 -> Frame 15 -> Frame 16 -> Frame 20 ->
// Frame 17 -> Frame 21 -> Frame 18 -> Frame 22 -> loop
// =========================================================================
const MOBILE_FRAMES = [
  {
    id: 'frame-13',
    src: '/images/visuals/desktop_frame_13.png',
    alt: 'Ogaranya Typography Specimen - Glyph I (Frame 13)',
    bg: '#FFEF9F',
  },
  {
    id: 'frame-15',
    src: '/images/visuals/mobile_frame_15.png',
    alt: 'African Weapons & Heritage Art Collage 1 (Frame 15)',
    bg: '#211711',
  },
  {
    id: 'frame-16',
    src: '/images/visuals/mobile_frame_16.png',
    alt: 'Ogaranya Typography Specimen - Glyph JJ (Frame 16)',
    bg: '#FFEF9F',
  },
  {
    id: 'frame-20',
    src: '/images/visuals/mobile_frame_20.png',
    alt: 'African Weapons & Heritage Art Collage 2 (Frame 20)',
    bg: '#211711',
  },
  {
    id: 'frame-17',
    src: '/images/visuals/mobile_frame_17.png',
    alt: 'Ogaranya Typography Specimen - Glyph O (Frame 17)',
    bg: '#FFEF9F',
  },
  {
    id: 'frame-21',
    src: '/images/visuals/mobile_frame_21.png',
    alt: 'African Weapons & Heritage Art Collage 3 (Frame 21)',
    bg: '#211711',
  },
  {
    id: 'frame-18',
    src: '/images/visuals/mobile_frame_18.png',
    alt: 'Ogaranya Typography Specimen - Glyph ? (Frame 18)',
    bg: '#FFEF9F',
  },
  {
    id: 'frame-22',
    src: '/images/visuals/mobile_frame_22.png',
    alt: 'African Weapons & Heritage Art Collage 4 (Frame 22)',
    bg: '#211711',
  },
];

export default function WeaponsSection() {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Desktop Pair Cycling: GIF-like natural timing (~1.6s per pair)
  useEffect(() => {
    const desktopTimer = setInterval(() => {
      setDesktopIndex((prev) => (prev + 1) % DESKTOP_PAIRS.length);
    }, 1600);
    return () => clearInterval(desktopTimer);
  }, []);

  // Mobile Single-Frame Cycling: GIF-like natural timing (~1.2s per frame)
  useEffect(() => {
    const mobileTimer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % MOBILE_FRAMES.length);
    }, 1200);
    return () => clearInterval(mobileTimer);
  }, []);

  return (
    <section
      id="visuals"
      className="relative w-full overflow-hidden select-none"
      style={{
        background:
          'linear-gradient(180deg, #110700 0%, #653917 100%)',
      }}
    >
      {/* Heavy Authentic Grain Texture Overlay on Card (as requested) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-50 z-20"
        style={{
          backgroundImage: 'url(/images/noise-heavy.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      {/* High-Octave Organic SVG Noise Overlay on Card */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-40 z-20" xmlns="http://www.w3.org/2000/svg">
        <filter id="generator2-card-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#generator2-card-grain)" />
      </svg>

      {/* ================================================================= */}
      {/* DESKTOP LAYOUT (Figma Node 11:163 - 1280px x 843px)              */}
      {/* ================================================================= */}
      <div className="hidden md:flex relative z-10 w-full min-h-[843px] flex-col items-center justify-start pt-[93px] pb-[130px] px-6">
        {/* Top Header Row (exact span 980px matching Group 4) */}
        <div className="w-full max-w-[980px] flex items-center justify-between mb-[76px]">
          <span className="font-ogaranya text-[12px] leading-[26px] text-[#FFEF9F] tracking-[0.04em] uppercase">
            OGARANYA
          </span>
          <span className="font-ogaranya text-[12px] leading-[26px] text-[#FFEF9F] tracking-[0.04em] uppercase text-center">
            AFRICAN WEAPONS
          </span>
          <span className="font-ogaranya text-[12px] leading-[26px] text-[#FFEF9F] tracking-[0.04em] uppercase text-right">
            TYPE DESIGN
          </span>
        </div>

        {/* Display Container with Background Watermark behind it */}
        <div className="relative w-full max-w-[980px] flex items-center justify-center">
          {/* Background Watermark (Figma 11:176 - sits behind the cards) */}
          <div className="absolute top-[48%] -translate-y-1/2 w-full flex items-center justify-center pointer-events-none z-0">
            <span className="font-ogaranya text-[36px] lg:text-[42px] leading-[58.8px] text-[#FFEF9F] tracking-[0.02em] uppercase whitespace-nowrap">
              A high-contrast African display serif
            </span>
          </div>

          {/* Group 4 Display Box: Two 490px x 490px frames (Total: 980px x 490px) */}
          <div className="relative z-10 w-[980px] h-[490px] overflow-hidden flex">
            {DESKTOP_PAIRS.map((pair, index) => {
              const isActive = index === desktopIndex;
              return (
                <div
                  key={pair.id}
                  className={`absolute inset-0 flex w-full h-full ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                  {/* Left Specimen Frame (490x490, #FFEF9F) */}
                  <div className="relative w-[490px] h-[490px] bg-[#FFEF9F] overflow-hidden flex-shrink-0">
                    <Image
                      src={pair.left}
                      alt={pair.leftAlt}
                      fill
                      priority
                      unoptimized
                      sizes="490px"
                      className="object-contain"
                    />
                  </div>

                  {/* Right Artwork Frame (490x490, #211711) */}
                  <div className="relative w-[490px] h-[490px] bg-[#211711] overflow-hidden flex-shrink-0">
                    <Image
                      src={pair.right}
                      alt={pair.rightAlt}
                      fill
                      priority
                      unoptimized
                      sizes="490px"
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* MOBILE LAYOUT (Figma Node 69:1435 - 430px x 634px)               */}
      {/* ================================================================= */}
      <div className="flex md:hidden relative z-10 w-full min-h-[634px] flex-col items-center justify-start pt-[33px] pb-[80px] px-4">
        {/* Top Header Row (exact span 358px matching display frame) */}
        <div className="w-full max-w-[358px] flex items-center justify-between mb-[76px]">
          <span className="font-ogaranya text-[10px] leading-[22px] text-[#FFEF9F] tracking-[0.03em] uppercase">
            OGARANYA
          </span>
          <span className="font-ogaranya text-[10px] leading-[22px] text-[#FFEF9F] tracking-[0.03em] uppercase text-center">
            AFRICAN WEAPONS
          </span>
          <span className="font-ogaranya text-[10px] leading-[22px] text-[#FFEF9F] tracking-[0.03em] uppercase text-right">
            TYPE DESIGN
          </span>
        </div>

        {/* Display Container with Background Watermark behind it */}
        <div className="relative w-full max-w-[358px] flex items-center justify-center">
          {/* Background Watermark (Figma 69:1436 - runs horizontally behind frame) */}
          <div className="absolute top-[48%] -translate-y-1/2 flex items-center justify-center pointer-events-none z-0">
            <span className="font-ogaranya text-[28px] sm:text-[34px] leading-tight text-[#FFEF9F] tracking-[0.02em] uppercase whitespace-nowrap">
              A high-contrast African display serif
            </span>
          </div>

          {/* Single Frame Display (358px x 358px) */}
          <div className="relative z-10 w-[358px] h-[358px] max-w-[calc(100vw-32px)] aspect-square overflow-hidden">
            {MOBILE_FRAMES.map((frame, index) => {
              const isActive = index === mobileIndex;
              return (
                <div
                  key={frame.id}
                  className={`absolute inset-0 w-full h-full ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  style={{ backgroundColor: frame.bg }}
                >
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    priority
                    unoptimized
                    sizes="358px"
                    className={
                      frame.bg === '#FFEF9F'
                        ? 'object-contain'
                        : 'object-cover'
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
