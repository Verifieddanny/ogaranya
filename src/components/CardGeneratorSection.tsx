'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CARDS_DATA, CardData } from '@/data/cardsData';
import LanguagesSection from './LanguagesSection';

export default function CardGeneratorSection() {
  // Default starts with Instagram post - 23 (Junita card, index 9 in CARDS_DATA)
  // matching Figma node 29:1582 (Instagram post - 5)
  const defaultIndex = CARDS_DATA.findIndex((c) => c.text === 'JUNITA');
  const initialIndex = defaultIndex >= 0 ? defaultIndex : 0;

  // cardIndex controls the background color, inset image, and metadata
  const [cardIndex, setCardIndex] = useState<number>(initialIndex);

  // textIndex controls the typography word and text color
  const [textIndex, setTextIndex] = useState<number>(initialIndex);

  // customText allows user to click and type their own text
  const [customText, setCustomText] = useState<string | null>(null);

  // Track if text input is active
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeCard = CARDS_DATA[cardIndex];
  const activeTextPreset = CARDS_DATA[textIndex];

  // Active display text
  const displayText = customText !== null ? customText : activeTextPreset.text;

  // Active text color: defaults to text preset's color, or adapts if contrast is needed
  const textColor = activeTextPreset.textColor;
  const bgColor = activeCard.bgColor;

  // Dynamically compute responsive font size based on text length so it always fits cleanly
  const getDynamicFontSize = (text: string) => {
    const len = Math.max(text.length, 1);
    if (len <= 4) return 'text-[52px] sm:text-[68px] md:text-[84px] lg:text-[96px]';
    if (len <= 6) return 'text-[44px] sm:text-[58px] md:text-[72px] lg:text-[82px]';
    if (len <= 8) return 'text-[36px] sm:text-[48px] md:text-[58px] lg:text-[66px]';
    if (len <= 11) return 'text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px]';
    return 'text-[22px] sm:text-[28px] md:text-[34px] lg:text-[38px]';
  };

  // 1. Top "Change" Button: changes only the text (and text color) from cards 18-29
  const handleChangeText = () => {
    let nextIdx = Math.floor(Math.random() * CARDS_DATA.length);
    if (nextIdx === textIndex && CARDS_DATA.length > 1) {
      nextIdx = (textIndex + 1) % CARDS_DATA.length;
    }
    setTextIndex(nextIdx);
    setCustomText(null);
  };

  // 2. Bottom "Change" Button: changes only the background color and inset image
  const handleChangeImageBg = () => {
    let nextIdx = Math.floor(Math.random() * CARDS_DATA.length);
    if (nextIdx === cardIndex && CARDS_DATA.length > 1) {
      nextIdx = (cardIndex + 1) % CARDS_DATA.length;
    }
    setCardIndex(nextIdx);
  };

  // 3. "Randomise" Button: changes everything (card bg, image, text preset)
  const handleRandomiseAll = () => {
    let rand = Math.floor(Math.random() * CARDS_DATA.length);
    if (rand === cardIndex && CARDS_DATA.length > 1) {
      rand = (cardIndex + 1) % CARDS_DATA.length;
    }
    setCardIndex(rand);
    setTextIndex(rand);
    setCustomText(null);
  };

  // Focus input when user clicks text
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <section
      id="generator"
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
      {/* ============================================================= */}
      <div className="relative z-10 w-full my-auto py-8 sm:py-12 flex flex-col items-center justify-center">
        {/* Full-width Architectural Grid Lines Container (Desktop only - hidden on mobile) */}
        <div className="relative w-full flex items-center justify-center">
          {/* Horizontal Line 1: Runs across and through Top of Card */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/70 z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]" />

          {/* Horizontal Line 2: Runs directly through Card (Text/Image Split) */}
          <div className="absolute top-[28%] left-0 w-full h-[1px] bg-white/70 z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]" />

          {/* Horizontal Line 3: Runs across and through Bottom of Card */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/70 z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]" />

          {/* Card & Controls Frame */}
          <div className="relative w-full max-w-[1280px] px-4 sm:px-8 flex items-center justify-center">
            {/* Vertical Line 1: Left Card Edge (Fades smoothly at top and bottom) */}
            <div
              className="absolute left-[calc(50%-170px)] sm:left-[calc(50%-210px)] md:left-[calc(50%-244px)] top-[-100px] bottom-[-160px] w-[1px] z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.70) 12%, rgba(255, 255, 255, 0.70) 82%, transparent 100%)',
              }}
            />

            {/* Vertical Line 2: Right Card Edge (Fades smoothly at top and bottom) */}
            <div
              className="absolute right-[calc(50%-170px)] sm:right-[calc(50%-210px)] md:right-[calc(50%-244px)] top-[-100px] bottom-[-160px] w-[1px] z-30 pointer-events-none hidden md:block shadow-[0_0_8px_rgba(255,255,255,0.35)]"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.70) 12%, rgba(255, 255, 255, 0.70) 82%, transparent 100%)',
              }}
            />

            {/* ------------------------------------------------------------- */}
            {/* THE INTERACTIVE CARD                                          */}
            {/* ------------------------------------------------------------- */}
            <div
              className="relative w-[340px] sm:w-[420px] md:w-[489px] aspect-[489/612] rounded-none flex flex-col justify-between overflow-hidden transition-colors duration-400 select-none border border-[#FAF6EC]/15"
              style={{ backgroundColor: bgColor }}
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
              {/* High-Octave Low-Frequency Organic Noise Texture Overlay */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-35 z-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <filter id="card-poster-noise" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#card-poster-noise)" />
              </svg>

              {/* TOP ROW: Dynamic / Editable Wordmark */}
              <div
                onClick={() => setIsEditing(true)}
                className="relative z-10 w-full h-[28%] flex items-center justify-center px-4 cursor-text group"
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
                    className={`w-full bg-transparent text-center font-ogaranya uppercase tracking-normal leading-none outline-none border-b border-dashed border-current transition-all ${getDynamicFontSize(
                      displayText
                    )}`}
                    style={{ color: textColor }}
                  />
                ) : (
                  <div className="relative w-full flex items-center justify-center">
                    <span
                      className={`font-ogaranya uppercase tracking-normal leading-none text-center transition-all duration-200 ${getDynamicFontSize(
                        displayText
                      )}`}
                      style={{ color: textColor }}
                    >
                      {displayText}
                    </span>
                    {/* Subtle edit pen indicator on hover */}
                    <span
                      className="absolute right-2 opacity-0 group-hover:opacity-70 text-xs font-instrument transition-opacity"
                      style={{ color: textColor }}
                    >
                      ✎
                    </span>
                  </div>
                )}
              </div>

              {/* CENTER ROW: Inset Specimen Image */}
              <div className="relative w-full flex-1 flex items-center justify-center py-1">
                <div className="relative w-[50%] aspect-[540/675] overflow-hidden bg-black/30">
                  <Image
                    src={activeCard.imageSrc}
                    alt={`Specimen visual for ${activeCard.text}`}
                    fill
                    priority
                    unoptimized
                    className="object-cover transition-opacity duration-300"
                  />
                </div>
              </div>

              {/* BOTTOM ROW: Metadata Captions */}
              <div
                className="relative z-10 w-full flex items-end justify-between px-6 pb-5 pt-2 font-instrument text-[8.5px] sm:text-[10px] leading-tight tracking-[0.02em] uppercase select-none opacity-90"
                style={{ color: textColor }}
              >
                <div className="flex flex-col text-left">
                  <span>OGARANYA DISPLAY 2026 - OTHER WEIGHTS</span>
                  <span>WORK-IN-PROGRESS BY UNC.</span>
                </div>
                <div className="text-right font-mono text-[9px] sm:text-[10px]">
                  <span>{activeCard.code}</span>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* DESKTOP SIDE CONTROL BUTTONS                                  */}
            {/* Aligned to the right side of the card across the grid lines   */}
            {/* ------------------------------------------------------------- */}
            <div className="hidden lg:flex absolute left-[calc(50%+280px)] xl:left-[calc(50%+300px)] top-0 bottom-0 flex-col justify-between py-6">
              {/* Top "Change" Button: Aligned with Card Text Row */}
              <div className="h-[28%] flex items-center">
                <button
                  type="button"
                  onClick={handleChangeText}
                  className="w-[166px] h-[58px] xl:h-[62px] rounded-[24px] bg-[#653917] hover:bg-[#7E481D] active:scale-[0.97] text-[#FFFFFF] font-instrument text-[20px] font-normal tracking-wide transition-all flex items-center justify-center"
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
                  className="w-[166px] h-[58px] xl:h-[62px] rounded-[24px] bg-[#653917] hover:bg-[#7E481D] active:scale-[0.97] text-[#FFFFFF] font-instrument text-[20px] font-normal tracking-wide transition-all flex items-center justify-center"
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
        {/* Centered below the card                                       */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 mt-8 sm:mt-12 flex items-center justify-center">
          <button
            type="button"
            onClick={handleRandomiseAll}
            className="w-[180px] sm:w-[196px] h-[56px] sm:h-[62px] rounded-[24px] bg-[#653917] hover:bg-[#7E481D] active:scale-[0.97] text-[#FFFFFF] font-instrument text-[20px] sm:text-[22px] font-normal tracking-wide transition-all flex items-center justify-center"
            title="Randomise both text, colors, and image"
          >
            Randomise
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* BOTTOM SECTION: Ceremonial Machetes Flanking Left & Right     */}
      {/* Matching Figma nodes 32:1621 & 32:1622 (Full unclipped blade) */}
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
      <LanguagesSection />
    </section>
  );
}
