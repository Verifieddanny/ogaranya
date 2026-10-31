'use client';

import React, { useState } from 'react';
import { GLYPHS_DATA, GlyphItem } from '@/data/glyphsData';

export default function GlyphsSection() {
  // Default selected glyph is 'Ä' matching Figma node 24:1015
  const defaultGlyph: GlyphItem =
    GLYPHS_DATA[0].glyphs.find((g) => g.char === 'Ä') || GLYPHS_DATA[0].glyphs[0];

  const [selectedGlyph, setSelectedGlyph] = useState<GlyphItem>(defaultGlyph);
  const [hoveredGlyph, setHoveredGlyph] = useState<GlyphItem | null>(null);

  // Track accordion open state (Latin Uppercase open by default matching Figma)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'latin-uppercase': true,
    'latin-lowercase': false,
    numbers: false,
    'common-latin': false,
  });

  // Copy notification state
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Active glyph currently displayed in the locked preview: hovered glyph takes temporary precedence, then selected
  const activeGlyph = hoveredGlyph || selectedGlyph;

  // Determine active glyph's parent category
  const activeCategory =
    GLYPHS_DATA.find((cat) => cat.glyphs.some((g) => g.char === activeGlyph.char))?.title ||
    'Latin Uppercase';

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  return (
    <section
      id="glyphs"
      className="relative w-full bg-[#FAF6EC] text-[#2D1E13] py-16 sm:py-20 md:py-24 select-none border-t border-[#653917]/10"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-14 lg:px-16">
        {/* ============================================================= */}
        {/* TOP BAR: GLYPHS | OGARANYA | TYPEFACE (Figma node 24:1016)   */}
        {/* ============================================================= */}
        <div className="w-full flex items-center justify-between font-ogaranya text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-[#653917] tracking-[0.04em] uppercase pb-8 sm:pb-12 md:pb-14">
          <span className="text-left font-normal">GLYPHS</span>
          <span className="text-center font-normal">OGARANYA</span>
          <span className="text-right font-normal">TYPEFACE</span>
        </div>

        {/* ============================================================= */}
        {/* MOBILE STICKY PREVIEW (Pins under nav when scrolling glyphs)  */}
        {/* ============================================================= */}
        <div className="lg:hidden sticky top-14 z-30 bg-[#FAF6EC]/95 backdrop-blur-md border border-[#2D1E13]/15 rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-ogaranya text-[72px] leading-none text-[#2D1E13] min-w-[72px] text-center">
                {activeGlyph.char}
              </span>
              <div className="flex flex-col">
                <span className="font-instrument font-semibold text-[15px] text-[#2D1E13] line-clamp-1">
                  {activeGlyph.name}
                </span>
                <span className="font-instrument text-[12px] text-[#653917]/70">
                  {activeCategory} &bull; {activeGlyph.unicode}
                </span>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(activeGlyph.char, 'char-mobile')}
              className="px-3 py-1.5 text-xs font-instrument font-medium bg-[#653917] text-[#FAF6EC] rounded hover:bg-[#3D200B] transition-colors shrink-0"
            >
              {copiedType === 'char-mobile' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* ============================================================= */}
        {/* MAIN TWO-COLUMN SPLIT: Left Scrollable | Right Locked Preview */}
        {/* ============================================================= */}
        <div className="relative w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 xl:gap-16">
          {/* ------------------------------------------------------------- */}
          {/* LEFT COLUMN: Scrollable Accordions & Glyph Grids              */}
          {/* ------------------------------------------------------------- */}
          <div className="w-full lg:w-[520px] xl:w-[540px] shrink-0 flex flex-col">
            {GLYPHS_DATA.map((cat, catIdx) => {
              const isOpen = !!openCategories[cat.id];

              return (
                <div key={cat.id} className="w-full flex flex-col">
                  {/* Category Accordion Header */}
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between py-5 border-b border-[#2D1E13] text-left group hover:opacity-80 transition-opacity"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-instrument font-semibold text-[19px] sm:text-[20px] leading-[30px] text-[#653917]">
                        {cat.title}
                      </span>
                      <span className="font-instrument text-[12px] text-[#653917]/60">
                        ({cat.glyphs.length})
                      </span>
                    </div>

                    {/* Chevron icon matching Figma Vector 37 */}
                    <div
                      className={`w-5 h-3 flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <svg
                        width="20"
                        height="10"
                        viewBox="0 0 20 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-[#2D1E13]"
                      >
                        <path
                          d="M2 2L10 8L18 2"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Content: Glyph Grid */}
                  {isOpen && (
                    <div className="w-full pt-6 pb-10">
                      <div
                        className="w-full border border-[#211711] grid grid-cols-10 bg-[#FAF6EC] shadow-sm select-none"
                        onMouseLeave={() => setHoveredGlyph(null)}
                      >
                        {cat.glyphs.map((item, idx) => {
                          const isSelected = selectedGlyph.char === item.char;
                          const isHovered = hoveredGlyph?.char === item.char;

                          return (
                            <button
                              key={`${cat.id}-${idx}-${item.char}`}
                              type="button"
                              onClick={() => {
                                setSelectedGlyph(item);
                                setHoveredGlyph(null);
                              }}
                              onMouseEnter={() => setHoveredGlyph(item)}
                              title={`${item.char} - ${item.unicode} (${item.name})`}
                              className={`relative aspect-square flex items-center justify-center border-r border-b border-[#211711]/30 transition-all duration-150 group outline-none ${
                                (idx + 1) % 10 === 0 ? 'border-r-0' : ''
                              } ${
                                isSelected
                                  ? 'bg-[#653917] text-[#FAF6EC] z-10 ring-2 ring-[#FFD400]'
                                  : isHovered
                                  ? 'bg-[#653917] text-[#FAF6EC] z-10'
                                  : 'hover:bg-[#653917]/10 text-[#000000]'
                              }`}
                            >
                              <span className="font-ogaranya text-[20px] sm:text-[22px] md:text-[24px] leading-none select-none">
                                {item.char}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT COLUMN: SCROLL-LOCKED GLYPH PREVIEW DISPLAY            */}
          {/* Uses sticky top-28 to remain fixed in viewport while left     */}
          {/* column scrolls across all 740+ glyphs (Google Fonts style)   */}
          {/* ------------------------------------------------------------- */}
          <div className="hidden lg:flex lg:flex-1 sticky top-28 self-start flex-col items-center justify-center pl-6 xl:pl-12">
            <div className="w-full max-w-[500px] flex flex-col items-center justify-center bg-[#FAF6EC] border border-[#2D1E13]/15 rounded-xl p-8 sm:p-10 shadow-[0_12px_40px_rgba(45,30,19,0.06)]">
              {/* Massive Center Glyph (Figma node 24:1015 fontSize: 310) */}
              <div className="w-full h-[320px] flex items-center justify-center select-none overflow-hidden">
                <span className="font-ogaranya text-[260px] xl:text-[310px] leading-none text-[#2D1E13] transition-all duration-150 transform hover:scale-105 will-change-transform">
                  {activeGlyph.char}
                </span>
              </div>

              {/* Character Details & Google Fonts Specimen Info */}
              <div className="w-full flex flex-col items-center text-center mt-6 pt-6 border-t border-[#2D1E13]/15">
                {/* Character Unicode Name */}
                <span className="font-instrument font-semibold text-[17px] text-[#2D1E13] tracking-wide mb-1 px-2 line-clamp-1">
                  {activeGlyph.name}
                </span>

                {/* Category & Details */}
                <span className="font-instrument text-[13px] text-[#653917]/70 mb-4">
                  {activeCategory} &bull; Ogaranya Regular
                </span>

                {/* Metadata Pills: Unicode hex, HTML entity, copy action */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                  {/* Unicode Badge */}
                  <button
                    onClick={() => copyToClipboard(activeGlyph.unicode, 'unicode')}
                    className="px-3 py-1 text-xs font-mono font-medium bg-[#2D1E13]/5 hover:bg-[#2D1E13]/10 text-[#2D1E13] rounded-md border border-[#2D1E13]/15 transition-colors flex items-center gap-1.5"
                    title="Click to copy Unicode"
                  >
                    <span>{activeGlyph.unicode}</span>
                    <span className="text-[10px] text-[#653917]/60">
                      {copiedType === 'unicode' ? '✓' : '⧉'}
                    </span>
                  </button>

                  {/* HTML Entity Badge */}
                  <button
                    onClick={() =>
                      copyToClipboard(`&#${activeGlyph.char.codePointAt(0)};`, 'html')
                    }
                    className="px-3 py-1 text-xs font-mono font-medium bg-[#2D1E13]/5 hover:bg-[#2D1E13]/10 text-[#2D1E13] rounded-md border border-[#2D1E13]/15 transition-colors flex items-center gap-1.5"
                    title="Click to copy HTML entity"
                  >
                    <span>&#38;#{activeGlyph.char.codePointAt(0)};</span>
                    <span className="text-[10px] text-[#653917]/60">
                      {copiedType === 'html' ? '✓' : '⧉'}
                    </span>
                  </button>

                  {/* Copy Glyph Character Button */}
                  <button
                    onClick={() => copyToClipboard(activeGlyph.char, 'char')}
                    className="px-4 py-1 text-xs font-instrument font-semibold bg-[#653917] hover:bg-[#3D200B] text-[#FAF6EC] rounded-md transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span>{copiedType === 'char' ? 'Copied Character!' : 'Copy Glyph'}</span>
                  </button>
                </div>

                {/* Subtle Usage Helper */}
                <p className="font-instrument text-[11px] text-[#653917]/50 mt-4">
                  Hover any glyph in the grid to preview &bull; Click to select
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
