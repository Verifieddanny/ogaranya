'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  GENERATOR_CARDS_2,
  DEFAULT_CARD_INDEX_2,
} from '@/data/cardsData2';

export default function CardGeneratorSection2() {
  // Card 32 is default (matches Instagram post - 5 / post-32 in Figma design)
  const [textIndex, setTextIndex] = useState(DEFAULT_CARD_INDEX_2);
  const [visualIndex, setVisualIndex] = useState(DEFAULT_CARD_INDEX_2);

  // Custom user editable text
  const [customText, setCustomText] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeTextCard = GENERATOR_CARDS_2[textIndex];
  const activeVisualCard = GENERATOR_CARDS_2[visualIndex];

  // Active text to display (custom user text or preset)
  const displayText = customText !== null ? customText : activeTextCard.text;

  // 1. Top "Change" Button: changes typography text / gradient
  const handleChangeText = () => {
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * GENERATOR_CARDS_2.length);
    } while (nextIndex === textIndex && GENERATOR_CARDS_2.length > 1);
    setTextIndex(nextIndex);
    setCustomText(null);
  };

  // 2. Bottom "Change" Button: changes inset image and background color
  const handleChangeImageBg = () => {
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * GENERATOR_CARDS_2.length);
    } while (nextIndex === visualIndex && GENERATOR_CARDS_2.length > 1);
    setVisualIndex(nextIndex);
  };

  // 3. "Randomise" Button: changes both text, colors, and image
  const handleRandomiseAll = () => {
    let nextTextIdx: number;
    let nextVisualIdx: number;
    do {
      nextTextIdx = Math.floor(Math.random() * GENERATOR_CARDS_2.length);
    } while (nextTextIdx === textIndex && GENERATOR_CARDS_2.length > 1);

    do {
      nextVisualIdx = Math.floor(Math.random() * GENERATOR_CARDS_2.length);
    } while (nextVisualIdx === visualIndex && GENERATOR_CARDS_2.length > 1);

    setTextIndex(nextTextIdx);
    setVisualIndex(nextVisualIdx);
    setCustomText(null);
  };

  // Dynamic font sizing based on grapheme count so diacritics fit cleanly
  const getDynamicFontSize = (text: string) => {
    const len =
      typeof Intl !== 'undefined' && Intl.Segmenter
        ? [...new Intl.Segmenter().segment(text)].length
        : text.length;

    if (len <= 4) return 'text-[64px] xs:text-[76px] sm:text-[98px] md:text-[116px] lg:text-[124px]';
    if (len <= 6) return 'text-[50px] xs:text-[60px] sm:text-[76px] md:text-[90px] lg:text-[96px]';
    if (len <= 8) return 'text-[38px] xs:text-[46px] sm:text-[58px] md:text-[68px] lg:text-[74px]';
    if (len <= 11) return 'text-[28px] xs:text-[34px] sm:text-[44px] md:text-[50px] lg:text-[54px]';
    return 'text-[22px] xs:text-[26px] sm:text-[32px] md:text-[38px] lg:text-[42px]';
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <section
      id="generator-series-2"
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
          <div className="absolute top-[25%] left-0 w-full h-[1px] bg-white/70 z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]" />

          {/* Horizontal Line 2: Vector 118 in Figma (runs through lower section of card at ~75.6%) */}
          <div className="absolute top-[41%] left-0 w-full h-[1px] bg-white/70 z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]" />

          <div className="absolute top-[86%] left-0 w-full h-[1px] bg-white/70 z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]" />

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
            {/* Matching Instagram post - 32 (Figma node 45:225 / 45:76)  */}
            {/* --------------------------------------------------------- */}
            <div
              className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[489px] aspect-[489/612] transition-colors duration-500 rounded-none overflow-hidden flex flex-col justify-between py-4 sm:py-5 border border-[#FAF6EC]/15 select-none"
              style={{ backgroundColor: activeVisualCard.bgColor }}
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

              {/* 1. TOP SECTION: Big Dynamic Wordmark (Figma node 45:236) */}
              <div
                onClick={() => setIsEditing(true)}
                className="relative z-10 w-full h-[28%] flex items-center justify-center px-5 sm:px-8 cursor-text group"
                title="Click to edit text"
              >
                {isEditing ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={displayText}
                    onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setIsEditing(false);
                    }}
                    className={`w-full bg-transparent text-center font-ogaranya uppercase tracking-normal leading-none outline-none border-b border-dashed border-white/50 transition-all ${getDynamicFontSize(
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
                      className={`inline-block font-ogaranya uppercase tracking-normal leading-none text-center bg-clip-text text-transparent select-none transition-all duration-200 ${getDynamicFontSize(
                        displayText
                      )}`}
                      style={{
                        backgroundImage: activeTextCard.textGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {displayText}
                    </span>
                    {/* Subtle edit pen indicator on hover */}
                    <span className="absolute right-1 opacity-0 group-hover:opacity-70 text-xs font-instrument transition-opacity text-white/80">
                      ✎
                    </span>
                  </div>
                )}
              </div>

              {/* 2. UPPER-MIDDLE ROW: 4-Column Metadata (Figma nodes 45:231 to 45:234) */}
              <div className="relative z-10 w-full flex items-start justify-between font-ogaranya text-[7px] xs:text-[8px] sm:text-[9px] md:text-[9.5px] leading-[1.15] text-[#C8C8C8] uppercase tracking-[0.02em] px-5 sm:px-8 my-1">
                <span className="text-left">
                  DISPLAY<br />SERIFS
                </span>
                <span className="text-left">
                  LAUNCHING<br />NOV. 2025
                </span>
                <span className="text-left hidden xs:block">
                  MADE WITH THE<br />LOVE OF CHRIST
                </span>
                <span className="text-right">
                  FOR AFRICANS<br />BY AN AFRICAN.
                </span>
              </div>

              {/* 3. LOWER-MIDDLE: Wide Inset Landscape Image (Figma node 45:225 & user attachment) */}
              {/* Flush against the RIGHT EDGE of the card with left margin aligned to metadata */}
              <div className="relative z-10 w-[90%] self-end aspect-[986/607] overflow-hidden bg-black/30 border-y border-l border-white/10 my-auto">
                <Image
                  src={activeVisualCard.imageSrc}
                  alt={`Specimen visual for ${activeVisualCard.text}`}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition-opacity duration-300"
                />
              </div>

              {/* 4. BOTTOM ROW: Metadata Captions (Figma nodes 45:230 and 45:235) */}
              <div className="relative z-10 w-full flex items-end justify-between font-ogaranya text-[7.5px] xs:text-[8px] sm:text-[9px] md:text-[9.5px] leading-[1.15] text-[#C8C8C8] uppercase tracking-[0.02em] px-5 sm:px-8 pt-1">
                <div className="flex flex-col text-left">
                  <span>OGARANYA DISPLAY SERIF- OTHER WEIGHTS</span>
                  <span>WORK-IN-PROGRESS BY UNC.</span>
                </div>
                <div className="text-right font-mono">
                  <span>{activeTextCard.code}</span>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* DESKTOP SIDE CONTROL BUTTONS                                  */}
            {/* Maintains EXACT same position as in CardGeneratorSection      */}
            {/* ------------------------------------------------------------- */}
            <div className="hidden lg:flex absolute left-[calc(50%+280px)] xl:left-[calc(50%+300px)] top-0 bottom-0 flex-col justify-between py-6 z-40">
              {/* Top "Change" Button: Aligned with Card Text Row */}
              <div className="h-[28%] flex items-center">
                <button
                  type="button"
                  onClick={handleChangeText}
                  className="w-[166px] h-[58px] xl:h-[62px] rounded-[24px] bg-[#653917] hover:bg-[#7E481D] active:scale-[0.97] text-[#FFFFFF] font-instrument text-[20px] font-normal tracking-wide transition-all flex items-center justify-center cursor-pointer"
                  title="Change text only"
                >
                  Change
                </button>
              </div>

              {/* Bottom "Change" Button: Aligned with Card Inset Image Row */}
              <div className="flex-1 flex items-center">
                <button
                  type="button"
                  onClick={handleChangeImageBg}
                  className="w-[166px] h-[58px] xl:h-[62px] rounded-[24px] bg-[#653917] hover:bg-[#7E481D] active:scale-[0.97] text-[#FFFFFF] font-instrument text-[20px] font-normal tracking-wide transition-all flex items-center justify-center cursor-pointer"
                  title="Change image and background color only"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CENTER "RANDOMISE" BUTTON (Desktop & Mobile)                  */}
        {/* Maintains EXACT same position as in CardGeneratorSection      */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 mt-8 sm:mt-12 flex items-center justify-center">
          <button
            type="button"
            onClick={handleRandomiseAll}
            className="w-[180px] sm:w-[196px] h-[56px] sm:h-[62px] rounded-[24px] bg-[#653917] hover:bg-[#7E481D] active:scale-[0.97] text-[#FFFFFF] font-instrument text-[20px] sm:text-[22px] font-normal tracking-wide transition-all flex items-center justify-center cursor-pointer"
            title="Randomise both text, colors, and image"
          >
            Randomise
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* BOTTOM SECTION: Ceremonial Machetes Flanking Left & Right     */}
      {/* Matching Figma nodes 45:81 & 45:82 (Full unclipped blade)     */}
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
