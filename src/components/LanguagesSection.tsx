'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const PHRASES = [
  'Oğaránÿa sũppørtş a bröað ränğe ởf ḽañgʉaĝeș aćröss mūltïpļe cøntĩněntș.',
  'Ogàrâñÿa sũppõrtş a bröåď rånĝë ǒf ḽañĝʉąĝeș ąćrøšš mūltïpļë cøntĩnẽñtș.',
  'Õğàráñÿa sũppõrtș ã bröåd råñĝë ôf\nḽąñĝʉäĝëş ãćrøşš mūltïpļë cøntĩnẽntș.',
  'Oģárãñÿa sũppørtş a bröad rånğë ǒf ḽañgʉaĝeș ąćrøšš mūltïpļe cøntĩněntș.',
];

export default function LanguagesSection() {
  const [index, setIndex] = useState(0);

  // GIF-like switching loop across all 4 language diacritic variants (1000ms natural GIF cadence)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="languages"
      className="relative w-full min-h-[85vh] lg:min-h-[843px] text-[#FFEF9F] overflow-hidden select-none py-10 sm:py-14 md:py-16 flex flex-col justify-between"
    >

      {/* High-octave, low-frequency SVG noise overlay for organic depth */}
      <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="languages-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#languages-noise)" />
        </svg>
      </div>

      {/* ============================================================= */}
      {/* TOP BAR: OGARANYA | Two Lions Emblem | TYPEFACE               */}
      {/* Figma node 29:1590, 29:1585, 29:1587                          */}
      {/* ============================================================= */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#FFEF9F] tracking-[0.04em] uppercase">
        <span className="text-left font-normal">OGARANYA</span>
        <div className="relative w-20 h-7 sm:w-28 sm:h-9 md:w-[187px] md:h-[64px]">
          <Image
            src="/images/showcase/lions-emblem-light.png"
            alt="Two Lions Facing Emblem (Light)"
            fill
            priority
            className="object-contain"
          />
        </div>
        <span className="text-right font-normal">TYPEFACE</span>
      </div>

      {/* ============================================================= */}
      {/* CENTER TYPOGRAPHY: GIF Switching Diacritic Phrases           */}
      {/* Figma node 29:1589 / 16:517 / 16:526 / 16:535: fontSize 96   */}
      {/* ============================================================= */}
      <div className="relative z-10 w-full max-w-[1080px] mx-auto my-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 flex items-center justify-center text-center">
        <h2 className="font-ogaranya font-normal text-[#FFEF9F] text-[30px] xs:text-[36px] sm:text-[50px] md:text-[68px] lg:text-[84px] xl:text-[96px] leading-[1.06] tracking-normal whitespace-pre-line max-w-[1040px] transition-none select-none">
          {PHRASES[index]}
        </h2>
      </div>

      {/* ============================================================= */}
      {/* BOTTOM BAR: OGARANYA | 1000+ LANGUAGES | TYPEFACE             */}
      {/* Figma node 29:1586, 29:1584, 29:1588                          */}
      {/* ============================================================= */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#FFEF9F] tracking-[0.04em] uppercase">
        <span className="text-left font-normal">OGARANYA</span>
        <span className="text-center font-normal tracking-[0.08em]">
          1000+ LANGUAGES
        </span>
        <span className="text-right font-normal">TYPEFACE</span>
      </div>
    </section>
  );
}
