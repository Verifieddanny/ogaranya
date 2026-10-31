'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

// =========================================================================
// SHOWCASE SECTION (Figma nodes 18:943, 27:1485, 26:1456, 28:1552)
// Sequence of 4 GIF slides with shared gradient background:
// 1. MacBook Air - 4: Mockup Set 1 (Instagram post 4, 5, 6)
// 2. MacBook Air - 8: Vintage Specimen (Chukwudi & Sons lockup + Lions Header)
// 3. MacBook Air - 7: Mockup Set 2 (Instagram post 4, 5, 6)
// 4. MacBook Air - 9: Geography Specimen (LEKKI-IKOYI, ASO ROCK... + Weapons)
// =========================================================================

export default function ShowcaseSection() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Discrete GIF switching loop across the 4 slides (~1.6s natural timing)
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 4);
    }, 1600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="gallery"
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

      {/* Main Container: 1280px x 903px on Desktop, 430px x 360px on Mobile */}
      <div className="relative z-10 w-full min-h-[460px] sm:min-h-[580px] md:min-h-[760px] lg:min-h-[903px] flex items-center justify-center py-10 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="relative w-full max-w-[1100px] h-full flex items-center justify-center min-h-[380px] sm:min-h-[500px] md:min-h-[660px]">
          {/* ============================================================= */}
          {/* SLIDE 1: MacBook Air - 4 (Mockup Set 1)                       */}
          {/* ============================================================= */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-none ${slideIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            <div className="w-full max-w-[1100px] flex items-center justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-14 px-2">
              <div className="relative w-[32%] max-w-[316px] aspect-[316/396] overflow-hidden">
                <Image
                  src="/images/showcase/mockup_set1_1.png"
                  alt="Ogaranya Instagram Mockup 1"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="relative w-[32%] max-w-[317px] aspect-[317/396] overflow-hidden">
                <Image
                  src="/images/showcase/mockup_set1_2.png"
                  alt="Ogaranya Instagram Mockup 2"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="relative w-[32%] max-w-[316px] aspect-[316/396] overflow-hidden">
                <Image
                  src="/images/showcase/mockup_set1_3.png"
                  alt="Ogaranya Instagram Mockup 3"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* SLIDE 2: MacBook Air - 8 (Vintage Specimen - Chukwudi & Sons)  */}
          {/* ============================================================= */}
          <div
            className={`absolute inset-0 w-full h-full flex flex-col justify-between py-2 sm:py-6 md:py-8 transition-none ${slideIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            {/* Top Bar: OGARANYA | Two Lions Emblem | TYPEFACE */}
            <div className="w-full flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#FFEF9F] tracking-[0.04em] uppercase px-4 sm:px-8">
              <span>OGARANYA</span>
              <div className="relative w-16 h-6 sm:w-24 sm:h-8 md:w-32 md:h-10">
                <Image
                  src="/images/showcase/lions-emblem-light.png"
                  alt="Two Lions Facing Emblem (Light)"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <span>TYPEFACE</span>
            </div>

            {/* Center Lockup: Chukwudi & Sons (Figma node 27:1498) */}
            <div className="relative w-full max-w-[1037px] mx-auto my-auto flex items-center justify-center px-4">
              <div className="relative w-full max-w-[940px] aspect-[1037/353]">
                <Image
                  src="/images/showcase/chukwudi_sons_lockup.png"
                  alt="Chukwudi & Sons Vintage Typography Specimen"
                  fill
                  priority
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Bar: OGARANYA | Two Lions Emblem | TYPEFACE */}
            <div className="w-full flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#FFEF9F] tracking-[0.04em] uppercase px-4 sm:px-8">
              <span>OGARANYA</span>
              <div className="relative w-16 h-6 sm:w-24 sm:h-8 md:w-32 md:h-10">
                <Image
                  src="/images/showcase/lions-emblem-light.png"
                  alt="Two Lions Facing Emblem (Light)"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <span>TYPEFACE</span>
            </div>
          </div>

          {/* ============================================================= */}
          {/* SLIDE 3: MacBook Air - 7 (Mockup Set 2)                       */}
          {/* ============================================================= */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-none ${slideIndex === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            <div className="w-full max-w-[1100px] flex items-center justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-14 px-2">
              <div className="relative w-[32%] max-w-[316px] aspect-[316/396] overflow-hidden">
                <Image
                  src="/images/showcase/mockup_set2_1.png"
                  alt="Ogaranya Editorial Mockup 1"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="relative w-[32%] max-w-[317px] aspect-[317/396] overflow-hidden">
                <Image
                  src="/images/showcase/mockup_set2_2.png"
                  alt="Ogaranya Editorial Mockup 2"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="relative w-[32%] max-w-[316px] aspect-[316/396] overflow-hidden">
                <Image
                  src="/images/showcase/mockup_set2_3.png"
                  alt="Ogaranya Editorial Mockup 3"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* SLIDE 4: MacBook Air - 9 (Geography Specimen & Weapons)        */}
          {/* ============================================================= */}
          <div
            className={`absolute inset-0 w-full h-full flex flex-col justify-between py-2 sm:py-6 md:py-8 transition-none ${slideIndex === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            {/* Top Bar: OGARANYA | Two Lions Emblem | TYPEFACE */}
            <div className="w-full flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#FFEF9F] tracking-[0.04em] uppercase px-4 sm:px-8">
              <span>OGARANYA</span>
              <div className="relative w-16 h-6 sm:w-24 sm:h-8 md:w-32 md:h-10">
                <Image
                  src="/images/showcase/lions-emblem-light.png"
                  alt="Two Lions Facing Emblem (Light)"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <span>TYPEFACE</span>
            </div>

            {/* Center Area: Flanked Ceremonial Machetes + Gold Geography Typography */}
            <div className="relative w-full flex items-center justify-center my-auto">
              {/* Left Ceremonial Machete (Pushed back out of view, only tip enters) */}
              <div className="absolute left-[-42vw] sm:left-[-34vw] md:left-[-360px] lg:left-[-460px] xl:left-[-530px] top-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[650px] lg:w-[732px] aspect-[732/490] pointer-events-none select-none z-0">
                <Image
                  src="/images/showcase/ceremonial_weapon.png"
                  alt="Ceremonial African Machete (Left)"
                  fill
                  priority
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Center Typography (Figma node 28:1567: fontSize 100, color #FFB701) */}
              <div className="relative z-10 flex flex-col items-center justify-center font-ogaranya text-center text-[#FFB701] tracking-normal leading-[0.90] uppercase select-none px-4">
                <span className="text-[7.5vw] sm:text-[6.5vw] md:text-[68px] lg:text-[88px] xl:text-[98px]">
                  LEKKI-IKOYI
                </span>
                <span className="text-[7.5vw] sm:text-[6.5vw] md:text-[68px] lg:text-[88px] xl:text-[98px]">
                  ASO ROCK
                </span>
                <span className="text-[7.5vw] sm:text-[6.5vw] md:text-[68px] lg:text-[88px] xl:text-[98px]">
                  ZUMA ROCK
                </span>
                <span className="text-[7.5vw] sm:text-[6.5vw] md:text-[68px] lg:text-[88px] xl:text-[98px]">
                  ARIARIA
                </span>
                <span className="text-[7.5vw] sm:text-[6.5vw] md:text-[68px] lg:text-[88px] xl:text-[98px]">
                  GURARA FALLS
                </span>
                <span className="text-[7.5vw] sm:text-[6.5vw] md:text-[68px] lg:text-[88px] xl:text-[98px]">
                  OGBETE
                </span>
              </div>

              {/* Right Ceremonial Machete (Flipped horizontally, pushed back out of view, only tip enters) */}
              <div className="absolute right-[-42vw] sm:right-[-34vw] md:right-[-360px] lg:right-[-460px] xl:right-[-530px] top-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[650px] lg:w-[732px] aspect-[732/490] pointer-events-none select-none scale-x-[-1] z-0">
                <Image
                  src="/images/showcase/ceremonial_weapon.png"
                  alt="Ceremonial African Machete (Right)"
                  fill
                  priority
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Bar: OGARANYA | Two Lions Emblem | TYPEFACE */}
            <div className="w-full flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#FFEF9F] tracking-[0.04em] uppercase px-4 sm:px-8">
              <span>OGARANYA</span>
              <div className="relative w-16 h-6 sm:w-24 sm:h-8 md:w-32 md:h-10">
                <Image
                  src="/images/showcase/lions-emblem-light.png"
                  alt="Two Lions Facing Emblem (Light)"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <span>TYPEFACE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
