'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  GENERATOR_CARDS_3,
  DEFAULT_CARD_INDEX_3,
} from '@/data/cardsData3';

export default function CardGeneratorSection3() {
  // Instagram post - 42 is the default matching Instagram post - 5 on Figma artboard 46:482
  const [textIndex, setTextIndex] = useState(DEFAULT_CARD_INDEX_3);
  const [visualIndex, setVisualIndex] = useState(DEFAULT_CARD_INDEX_3);

  // Custom user editable text
  const [customText, setCustomText] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeTextCard = GENERATOR_CARDS_3[textIndex];
  const activeVisualCard = GENERATOR_CARDS_3[visualIndex];

  // Active text to display (custom user text or preset)
  const displayText = customText !== null ? customText : activeTextCard.text;

  // 1. "Change" Button: changes just the text
  const handleChangeText = () => {
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * GENERATOR_CARDS_3.length);
    } while (nextIndex === textIndex && GENERATOR_CARDS_3.length > 1);
    setTextIndex(nextIndex);
    setCustomText(null);
  };

  // 2. "Randomise" Button: randomises both image and text
  const handleRandomiseAll = () => {
    let nextTextIdx: number;
    let nextVisualIdx: number;
    do {
      nextTextIdx = Math.floor(Math.random() * GENERATOR_CARDS_3.length);
    } while (nextTextIdx === textIndex && GENERATOR_CARDS_3.length > 1);

    do {
      nextVisualIdx = Math.floor(Math.random() * GENERATOR_CARDS_3.length);
    } while (nextVisualIdx === visualIndex && GENERATOR_CARDS_3.length > 1);

    setTextIndex(nextTextIdx);
    setVisualIndex(nextVisualIdx);
    setCustomText(null);
  };

  // Compute dynamic font size based on lines and character count
  const getDynamicFontSize = (text: string) => {
    const lines = text.split('\n').length;
    const len = text.length;

    if (lines <= 2 && len <= 22) {
      return 'text-[36px] xs:text-[44px] sm:text-[54px] md:text-[62px] lg:text-[68px] leading-[1.08]';
    }
    if (lines <= 3 && len <= 32) {
      return 'text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[52px] leading-[1.12]';
    }
    return 'text-[22px] xs:text-[26px] sm:text-[32px] md:text-[38px] lg:text-[42px] leading-[1.15]';
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <section
      id="generator-series-3"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#110700] via-[#210E04] to-[#3D200B] text-[#FFEF9F] overflow-hidden select-none pt-10 sm:pt-16 md:pt-20 flex flex-col justify-between"
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

      {/* ============================================================= */}
      {/* TOP BAR: OGARANYA | Two Lions Emblem | TYPEFACE               */}
      {/* ============================================================= */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#FFEF9F] tracking-[0.04em] uppercase">
        <span className="text-left font-normal">OGARANYA</span>
        <div className="relative w-16 h-6 sm:w-24 sm:h-8 md:w-32 md:h-10">
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
      {/* CENTER INTERACTIVE STAGE & ARCHITECTURAL GRID LINES           */}
      {/* Desktop only: lines hidden on mobile screens                  */}
      {/* ============================================================= */}
      <div className="relative z-10 w-full my-auto py-8 sm:py-12 flex flex-col items-center justify-center">
        {/* Full-width Architectural Grid Lines Container (Hidden on mobile) */}
        <div className="relative w-full flex items-center justify-center">
          {/* Horizontal Line 1: Vector 116 in Figma (runs through upper section of card at ~10%) */}
          <div className="absolute top-[10%] left-0 w-full h-[1px] bg-white/70 z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]" />

          {/* Horizontal Line 2: Vector 118 in Figma (runs through lower section of card at ~75.6%) */}
          <div className="absolute top-[75.6%] left-0 w-full h-[1px] bg-white/70 z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]" />

          {/* Card & Controls Frame */}
          <div className="relative w-full max-w-[1280px] px-4 sm:px-8 flex items-center justify-center">
            {/* Vertical Line 1: Vector 121 (Left Card Edge, fades at top and bottom) */}
            <div
              className="absolute left-[calc(50%-170px)] sm:left-[calc(50%-210px)] md:left-[calc(50%-244.5px)] top-[-120px] bottom-[-160px] w-[1px] z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.70) 12%, rgba(255, 255, 255, 0.70) 82%, transparent 100%)',
              }}
            />

            {/* Vertical Line 2: Vector 122 (Right Card Edge, fades at top and bottom) */}
            <div
              className="absolute right-[calc(50%-170px)] sm:right-[calc(50%-210px)] md:right-[calc(50%-244.5px)] top-[-120px] bottom-[-160px] w-[1px] z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.70) 12%, rgba(255, 255, 255, 0.70) 82%, transparent 100%)',
              }}
            />

            {/* --------------------------------------------------------- */}
            {/* CARD CONTAINER (Aspect Ratio 489/612 matching Figma)      */}
            {/* Full-bleed background image with tactile grain overlay    */}
            {/* Matching Instagram post - 42 (Figma node 45:390 / 46:485) */}
            {/* --------------------------------------------------------- */}
            <div
              className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[489px] aspect-[489/612] rounded-none overflow-hidden flex flex-col justify-between py-6 px-6 sm:py-8 sm:px-8 border border-[#FAF6EC]/15 select-none bg-black"
            >
              {/* 1. Full-Bleed Card Background Photographic Image */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <Image
                  src={activeVisualCard.imageSrc}
                  alt={`Background artwork for ${activeVisualCard.name}`}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition-opacity duration-400"
                />
                {/* Contrast & darkening overlay so red display typography pops */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              </div>

              {/* 2. Heavy Authentic Grain Texture Overlay on Card (matching Series 1 & 2) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-50 z-10"
                style={{
                  backgroundImage: 'url(/images/noise-heavy.png)',
                  backgroundRepeat: 'repeat',
                  backgroundSize: '180px 180px',
                }}
              />

              {/* 3. High-Octave Organic SVG Noise Overlay on Card */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-40 z-10" xmlns="http://www.w3.org/2000/svg">
                <filter id="generator3-card-grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#generator3-card-grain)" />
              </svg>

              {/* 4. CENTER MAIN WORDMARK (Clickable & Editable live) */}
              {/* Matching Figma node 45:393 (AGBÁRA WÀNÍ ORÚKỌ RẸ̀ in vibrant red) */}
              <div
                onClick={() => setIsEditing(true)}
                className="relative z-20 w-full flex-1 flex items-center justify-center cursor-text group px-2 text-center my-auto"
                title="Click to edit text"
              >
                {isEditing ? (
                  <textarea
                    ref={inputRef}
                    value={displayText}
                    rows={displayText.split('\n').length || 2}
                    onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                    onBlur={() => setIsEditing(false)}
                    className={`w-full bg-transparent text-center font-ogaranya uppercase tracking-normal outline-none border-b border-dashed border-white/50 resize-none transition-all ${getDynamicFontSize(
                      displayText
                    )}`}
                    style={{
                      color: activeTextCard.textColor,
                      caretColor: '#ffffff',
                    }}
                  />
                ) : (
                  <div className="relative w-full flex items-center justify-center">
                    <span
                      className={`font-ogaranya uppercase tracking-normal text-center whitespace-pre-wrap select-none transition-all duration-200 ${getDynamicFontSize(
                        displayText
                      )}`}
                      style={{
                        color: activeTextCard.textColor,
                        textShadow: '0 2px 18px rgba(0,0,0,0.5)',
                      }}
                    >
                      {displayText}
                    </span>
                    {/* Subtle edit indicator on hover */}
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-70 text-xs font-instrument transition-opacity text-white/80">
                      ✎
                    </span>
                  </div>
                )}
              </div>

              {/* 5. BOTTOM CAPTION (Matching Figma node 45:392) */}
              {/* OGARANYA DISPLAY SERIF- OTHER WEIGHTS WORK-IN-PROGRESS BY UNC. */}
              <div className="relative z-20 w-full flex flex-col items-center justify-center text-center font-ogaranya text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] leading-[1.25] text-[#FFFFFF] tracking-[0.02em] uppercase select-none opacity-90 ">
                <span>OGARANYA DISPLAY SERIF- OTHER WEIGHTS</span>
                <span>WORK-IN-PROGRESS BY UNC.</span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* DESKTOP SIDE "CHANGE" BUTTON (Figma Frame 16, node 46:488)    */}
            {/* Changes just the text                                         */}
            {/* ------------------------------------------------------------- */}
            <div className="hidden lg:flex absolute left-[calc(50%+280px)] xl:left-[calc(50%+300px)] top-[37.7%] -translate-y-1/2 z-40">
              <button
                type="button"
                onClick={handleChangeText}
                className="w-[166px] h-[58px] xl:h-[62px] rounded-[24px] bg-[#653917] hover:bg-[#7E481D] active:scale-[0.97] text-[#FFFFFF] font-instrument text-[20px] font-normal tracking-wide transition-all flex items-center justify-center cursor-pointer"
                title="Change text only"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CENTER "RANDOMISE" BUTTON (Figma Frame 15, node 46:486)       */}
        {/* Randomises both image and text (Desktop & Mobile)             */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 mt-8 sm:mt-12 flex items-center justify-center">
          <button
            type="button"
            onClick={handleRandomiseAll}
            className="w-[180px] sm:w-[196px] h-[56px] sm:h-[62px] rounded-[24px] bg-[#653917] hover:bg-[#7E481D] active:scale-[0.97] text-[#FFFFFF] font-instrument text-[20px] sm:text-[22px] font-normal tracking-wide transition-all flex items-center justify-center cursor-pointer"
            title="Randomise both image and text"
          >
            Randomise
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* BOTTOM SECTION: Ceremonial Machetes Flanking Left & Right     */}
      {/* Matching Figma nodes 46:490 & 46:491 (Full unclipped blade)   */}
      {/* ============================================================= */}
      <div className="relative w-full h-[140px] sm:h-[200px] md:h-[260px] pointer-events-none select-none">
        {/* Left Ceremonial Machete (Pushed outwards on mobile, full unclipped blade) */}
        <div className="absolute left-[-58vw] sm:left-[-220px] md:left-[-260px] lg:left-[-280px] bottom-[-15px] sm:bottom-[-35px] md:bottom-[-55px] w-[340px] sm:w-[560px] md:w-[660px] lg:w-[732px] aspect-[732/490]">
          <Image
            src="/images/showcase/ceremonial_weapon.png"
            alt="Ceremonial African Machete (Left)"
            fill
            priority
            unoptimized
            className="object-contain"
          />
        </div>

        {/* Right Ceremonial Machete (Flipped horizontally, pushed outwards on mobile) */}
        <div className="absolute right-[-58vw] sm:right-[-220px] md:right-[-260px] lg:right-[-280px] bottom-[-15px] sm:bottom-[-35px] md:bottom-[-55px] w-[340px] sm:w-[560px] md:w-[660px] lg:w-[732px] aspect-[732/490] scale-x-[-1]">
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
    </section>
  );
}
