'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// =========================================================================
// DIAMOND SLIDER COMPONENT
// Matching Figma slider style (line track + 45° diamond handle)
// =========================================================================
interface DiamondSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
}

function DiamondSlider({
  value,
  min,
  max,
  step = 1,
  onChange,
}: DiamondSliderProps) {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className="relative flex items-center w-[90px] sm:w-[120px] md:w-[130px] h-6 cursor-pointer group select-none">
      {/* Background Track Line */}
      <div className="absolute w-full h-[1.5px] bg-[#653917]/25 rounded-full" />
      {/* Active Track Progress Line */}
      <div
        className="absolute left-0 h-[1.5px] bg-[#653917] rounded-full pointer-events-none"
        style={{ width: `${percentage}%` }}
      />
      {/* 45-degree Rotated Diamond Handle */}
      <div
        className="absolute w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] bg-[#653917] rotate-45 -translate-x-1/2 pointer-events-none transition-transform group-hover:scale-125 shadow-sm"
        style={{ left: `${percentage}%` }}
      />
      {/* Native Range Input for accessibility */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
    </div>
  );
}

export default function InteractiveTypeTesterSection2() {
  // Slider Controls state (Matching Figma node 47:588, 47:600, 47:594)
  // Default font size is 90px as shown in Figma node 47:587 and user screenshot
  const [fontSize, setFontSize] = useState<number>(90);
  const [letterSpacing, setLetterSpacing] = useState<number>(0);
  const [lineHeightOffset, setLineHeightOffset] = useState<number>(0);

  // Editable specimen text (Matching Figma node 47:587: LOS ANGELES / TOKYO / PHNOM PENH / SIEM REAP / N.Y.C. / STOCKHOLM / ROME)
  const [specimenText, setSpecimenText] = useState<string>(
    'LOS ANGELES\nTOKYO\nPHNOM PENH\nSIEM REAP\nN.Y.C.\nSTOCKHOLM\nROME'
  );

  const computedLineHeight = Math.round(fontSize * 0.92 + lineHeightOffset);

  return (
    <section
      id="city-tester"
      className="relative w-full min-h-screen bg-[#FAF6EC] text-[#653917] select-none flex flex-col justify-between py-12 sm:py-16 md:py-20 px-6 sm:px-10 md:px-16 overflow-hidden"
      aria-label="City Specimen Type Tester"
    >
      {/* ============================================================= */}
      {/* TOP CONTROLS: Font Size | Letter Spacing | Line Height        */}
      {/* Matching Figma nodes 47:588, 47:600, 47:594 & user screenshot */}
      {/* ============================================================= */}
      <div className="w-full max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-6 sm:gap-8 font-instrument text-[14px] sm:text-[16px] text-[#653917] pb-8 sm:pb-12 border-b border-[#653917]/10">
        {/* Control 1: Font Size (Defaults to 90px) */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="font-normal text-[#653917]/90 min-w-[65px] sm:min-w-[70px]">
            Font Size
          </span>
          <DiamondSlider
            value={fontSize}
            min={32}
            max={180}
            step={1}
            onChange={setFontSize}
          />
          <span className="font-normal text-[#653917] min-w-[50px] text-right font-mono text-[13px] sm:text-[15px]">
            {fontSize}px
          </span>
        </div>

        {/* Control 2: Letter Spacing */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="font-normal text-[#653917]/90 min-w-[90px] sm:min-w-[100px]">
            Letter Spacing
          </span>
          <DiamondSlider
            value={letterSpacing}
            min={-6}
            max={30}
            step={1}
            onChange={setLetterSpacing}
          />
          <span className="font-normal text-[#653917] min-w-[40px] text-right font-mono text-[13px] sm:text-[15px]">
            {letterSpacing}px
          </span>
        </div>

        {/* Control 3: Line Height */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="font-normal text-[#653917]/90 min-w-[75px] sm:min-w-[85px]">
            Line Height
          </span>
          <DiamondSlider
            value={lineHeightOffset}
            min={-40}
            max={80}
            step={1}
            onChange={setLineHeightOffset}
          />
          <span className="font-normal text-[#653917] min-w-[40px] text-right font-mono text-[13px] sm:text-[15px]">
            {lineHeightOffset}px
          </span>
        </div>
      </div>

      {/* ============================================================= */}
      {/* CENTER INTERACTIVE SPECIMEN STAGE                             */}
      {/* Matching Figma node 47:587 & user attachment                  */}
      {/* ============================================================= */}
      <div className="relative w-full max-w-[1280px] mx-auto my-auto py-12 sm:py-20 flex flex-col items-center justify-center text-center">
        {/* Editable live display text with dynamic slider styles */}
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const txt = e.currentTarget.innerText;
            if (txt && txt.trim().length > 0) {
              setSpecimenText(txt);
            }
          }}
          className="w-full font-ogaranya font-normal uppercase text-[#653917] text-center outline-none cursor-text transition-all duration-100 whitespace-pre-wrap break-words max-w-full selection:bg-[#653917]/20"
          style={{
            fontSize: `clamp(28px, ${fontSize * 0.78}px, ${fontSize}px)`,
            letterSpacing: `${letterSpacing}px`,
            lineHeight: `${computedLineHeight}px`,
          }}
          title="Click to edit specimen text"
        >
          {specimenText}
        </div>
      </div>

      {/* ============================================================= */}
      {/* BOTTOM BAR: OGARANYA | Two Lions Emblem | TYPEFACE            */}
      {/* Matching Figma node 47:606 & user attachment                  */}
      {/* ============================================================= */}
      <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#653917] tracking-[0.04em] uppercase pt-12 sm:pt-16 pb-2">
        <span className="text-left font-normal">OGARANYA</span>
        <div className="relative w-16 h-6 sm:w-24 sm:h-8 md:w-32 md:h-10">
          <Image
            src="/images/poster/lions-emblem.png"
            alt="Two Lions Facing Emblem (Dark)"
            fill
            priority
            className="object-contain"
          />
        </div>
        <span className="text-right font-normal">TYPEFACE</span>
      </div>
    </section>
  );
}
