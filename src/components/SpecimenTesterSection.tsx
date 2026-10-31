'use client';

import React, { useState } from 'react';
import {
  INITIAL_SHOWCASE_LANGUAGES,
  CONTINENT_GROUPS,
} from '@/data/specimenLanguages';

// =========================================================================
// DIAMOND SLIDER COMPONENT
// Matching Figma nodes Rectangle 28 / 29 (15.5px x 15.5px diamond rotated 45°)
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
    <div className="relative flex items-center w-[90px] sm:w-[120px] md:w-[122px] h-6 cursor-pointer group select-none">
      {/* Background Track Line (Vector 130 in Figma) */}
      <div className="absolute w-full h-[1.5px] bg-[#211711]/25 rounded-full" />
      {/* Active Track Progress Line (Vector 132 in Figma) */}
      <div
        className="absolute left-0 h-[1.5px] bg-[#211711] rounded-full pointer-events-none"
        style={{ width: `${percentage}%` }}
      />
      {/* 45-degree Rotated Diamond Handle (Rectangle 28/29 in Figma) */}
      <div
        className="absolute w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] bg-[#211711] rotate-45 -translate-x-1/2 pointer-events-none transition-transform group-hover:scale-125"
        style={{ left: `${percentage}%` }}
      />
      {/* Native Range Input for effortless keyboard/drag/touch accessibility */}
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

export default function SpecimenTesterSection() {
  // 7 showcase rows (Igbo, Yoruba, Hausa, Swahili, Zulu, French, German)
  const [rows, setRows] = useState(
    INITIAL_SHOWCASE_LANGUAGES.map((item) => ({
      ...item,
      size: item.defaultSize,
      spacing: item.defaultSpacing,
    }))
  );

  // Active expanded continent in the dropdown accordion (defaults to Africa open)
  const [openContinent, setOpenContinent] = useState<string | null>(null);

  // Search query within the continent language list
  const [searchQuery, setSearchQuery] = useState('');

  // Update row size
  const handleSizeChange = (index: number, newSize: number) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], size: newSize };
      return next;
    });
  };

  // Update row letter spacing
  const handleSpacingChange = (index: number, newSpacing: number) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], spacing: newSpacing };
      return next;
    });
  };

  // Update row text (editable inline)
  const handleTextChange = (index: number, newText: string) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], text: newText };
      return next;
    });
  };

  const toggleContinent = (continentId: string) => {
    setOpenContinent((prev) => (prev === continentId ? null : continentId));
    setSearchQuery('');
  };

  return (
    <section
      id="specimen"
      className="relative w-full bg-[#FAF6EC] text-[#211711] pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-28 overflow-hidden select-none"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12">
        {/* ============================================================= */}
        {/* INTERACTIVE LANGUAGE SHOWCASE ROWS (Google Fonts Style)       */}
        {/* Figma rows: Igbo, Yoruba, Hausa, Swahili, Zulu, French, German */}
        {/* ============================================================= */}
        <div className="w-full flex flex-col space-y-10 sm:space-y-12 md:space-y-14">
          {rows.map((row, idx) => (
            <div
              key={row.id}
              className="relative w-full pb-8 sm:pb-10 border-b border-[#211711]/15 rounded-lg p-2"
            >
              {/* --------------------------------------------------------- */}
              {/* ROW HEADER BAR: Language Name & Controls (Size + Spacing)  */}
              {/* --------------------------------------------------------- */}
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                {/* Language Title */}
                <h3 className="font-ogaranya font-normal text-[17px] sm:text-[19px] md:text-[20px] leading-tight text-[#211711]">
                  {row.name}
                </h3>

                {/* Dual Sliders: Font Size + Spacing */}
                <div className="flex items-center flex-wrap gap-4 sm:gap-6 md:gap-8">
                  {/* Font Size Slider */}
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <span className="font-ogaranya text-[13px] sm:text-[15px] md:text-[16px] text-[#211711] whitespace-nowrap">
                      Font Size
                    </span>
                    <DiamondSlider
                      min={24}
                      max={220}
                      step={1}
                      value={row.size}
                      onChange={(v) => handleSizeChange(idx, v)}
                    />
                    <span className="font-ogaranya text-[13px] sm:text-[15px] md:text-[16px] text-[#211711] min-w-[42px] text-right">
                      {row.size}px
                    </span>
                  </div>

                  {/* Spacing Slider (Negative & Positive inclusive) */}
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <span className="font-ogaranya text-[13px] sm:text-[15px] md:text-[16px] text-[#211711] whitespace-nowrap">
                      Spacing
                    </span>
                    <DiamondSlider
                      min={-6}
                      max={24}
                      step={1}
                      value={row.spacing}
                      onChange={(v) => handleSpacingChange(idx, v)}
                    />
                    <span className="font-ogaranya text-[13px] sm:text-[15px] md:text-[16px] text-[#211711] min-w-[38px] text-right">
                      {row.spacing > 0 ? `+${row.spacing}` : `${row.spacing}`}px
                    </span>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------- */}
              {/* SPECIMEN DISPLAY TEXT: Overflows screen gracefully         */}
              {/* Editable live like Google Fonts                          */}
              {/* --------------------------------------------------------- */}
              <div className="relative w-full overflow-x-auto scrollbar-none py-2">
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleTextChange(idx, e.currentTarget.textContent || row.text)
                  }
                  className="font-ogaranya font-normal text-[#211711] whitespace-nowrap leading-[1.1] outline-none cursor-text select-text inline-block min-w-full will-change-transform"
                  style={{
                    fontSize: `${row.size}px`,
                    letterSpacing: `${row.spacing}px`,
                  }}
                  title="Click to type and test any custom phrase"
                >
                  {row.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================= */}
        {/* CONTINENT DROPDOWNS / ACCORDION (Figma Rectangles 22 - 26, 28) */}
        {/* Demonstrates the vast language support catalog                */}
        {/* Warm Sand Card (#E7D5C8, Corner Radius 39px)                  */}
        {/* ============================================================= */}
        <div className="w-full mt-16 sm:mt-24 md:mt-28 bg-[#E7D5C8] rounded-[28px] sm:rounded-[36px] md:rounded-[39px] p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_rgba(33,23,17,0.06)] border border-[#211711]/5">
          <div className="w-full flex flex-col divide-y divide-[#653917]/20">
            {CONTINENT_GROUPS.map((continent) => {
              const isOpen = openContinent === continent.id;
              const filteredLanguages = continent.languages.filter((l) =>
                l.toLowerCase().includes(searchQuery.toLowerCase())
              );

              return (
                <div key={continent.id} className="w-full py-5 sm:py-6 first:pt-0 last:pb-0">
                  {/* Continent Header Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleContinent(continent.id)}
                    className="w-full flex items-center justify-between text-left group transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="font-instrument font-semibold text-[19px] sm:text-[21px] md:text-[22px] text-[#653917] group-hover:text-[#42220A] transition-colors">
                        {continent.name}
                      </span>
                      <span className="font-instrument font-normal text-[13px] sm:text-[14px] text-[#6B6B6B] mt-0.5">
                        {continent.countLabel}
                      </span>
                    </div>

                    {/* Chevron Arrow (Vector 37 in Figma, 27px x 13.5px) */}
                    <div
                      className={`w-7 h-4 flex items-center justify-center text-[#653917] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 24 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current stroke-[2.2]"
                      >
                        <path d="M1.5 1.5L12 10.5L22.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  {/* ------------------------------------------------------- */}
                  {/* HEADLESS FIXED-HEIGHT SCROLLABLE DROPDOWN CONTENT       */}
                  {/* Fixed height with smooth scrolling for 600+ languages  */}
                  {/* ------------------------------------------------------- */}
                  {isOpen && (
                    <div className="mt-6 pt-2">
                      {/* Search Bar within Dropdown */}
                      <div className="mb-4 max-w-sm">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={`Filter ${continent.name} languages (${continent.languages.length})...`}
                          className="w-full px-4 py-2 text-[13px] font-instrument rounded-xl bg-[#FAF6EC]/80 border border-[#653917]/20 text-[#211711] placeholder:text-[#653917]/40 focus:outline-none focus:ring-2 focus:ring-[#653917]/40"
                        />
                      </div>

                      {/* Scrollable Language Grid */}
                      <div
                        data-lenis-prevent="true"
                        className="max-h-[360px] sm:max-h-[420px] md:max-h-[480px] overflow-y-auto pr-3 sm:pr-4 custom-scrollbar"
                      >
                        {filteredLanguages.length === 0 ? (
                          <p className="font-instrument text-sm text-[#6B6B6B] py-4">
                            No languages matching &ldquo;{searchQuery}&rdquo;
                          </p>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 sm:gap-x-8 gap-y-2.5 pb-4">
                            {filteredLanguages.map((lang) => (
                              <span
                                key={lang}
                                className="font-instrument text-left text-[13px] sm:text-[14px] leading-snug text-[#653917]/80 hover:text-[#653917] hover:font-medium transition-colors"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================= */}
        {/* BOTTOM ROW: OGARANYA | LANGUAGES | TYPEFACE                   */}
        {/* Matching Figma node 25:1452 Desktop / 71:3184 Mobile          */}
        {/* ============================================================= */}
        <div className="w-full mt-16 sm:mt-20 md:mt-24 pt-6 border-t border-[#211711]/15 flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#211711] tracking-[0.04em] uppercase">
          <span className="text-left font-normal">OGARANYA</span>
          <span className="text-center font-normal tracking-[0.08em]">LANGUAGES</span>
          <span className="text-right font-normal">TYPEFACE</span>
        </div>
      </div>
    </section>
  );
}
