'use client';

import React from 'react';

interface SpecFrame {
  id: string;
  label: string;
  value: string;
  desktopWidth: string;
  mobileWidth: string;
}

const specs: SpecFrame[] = [
  {
    id: 'frame-1',
    label: 'Type Design And Production',
    value: 'Nebo Ikechukwu Kingsley',
    desktopWidth: 'lg:w-[302px]',
    mobileWidth: 'w-full max-w-[302px]',
  },
  {
    id: 'frame-2',
    label: 'Release Date',
    value: 'November 2026',
    desktopWidth: 'lg:w-[179px]',
    mobileWidth: 'w-full max-w-[149px]',
  },
  {
    id: 'frame-3',
    label: 'Version',
    value: '0.1',
    desktopWidth: 'lg:w-[70px]',
    mobileWidth: 'w-full max-w-[56px]',
  },
  {
    id: 'frame-4',
    label: 'Composition',
    value: '830 Glyphs',
    desktopWidth: 'lg:w-[126px]',
    mobileWidth: 'w-full max-w-[105px]',
  },
  {
    id: 'frame-5',
    label: 'Language Support',
    value: 'Latin Extended, 1000 languages',
    desktopWidth: 'lg:w-[355px]',
    mobileWidth: 'w-full max-w-[296px]',
  },
  {
    id: 'frame-6',
    label: 'Formats',
    value: 'OTF, TTF, WOFF, WOFF2',
    desktopWidth: 'lg:w-[276px]',
    mobileWidth: 'w-full max-w-[230px]',
  },
];

interface StoryLineData {
  text: string;
  boldWords?: string[];
  isAllBold?: boolean;
}

interface StoryParagraphData {
  id: string;
  lines: StoryLineData[];
}

const storyParagraphs: StoryParagraphData[] = [
  {
    id: 'p1',
    lines: [
      { text: 'Ogaranya is a typeface born from the', boldWords: ['Ogaranya'] },
      { text: 'idea of power, wealth, kingship and conquest.' },
    ],
  },
  {
    id: 'p2',
    lines: [
      { text: 'The typeface takes inspiration from the visual' },
      { text: 'language of African kingdoms and the sharp weapons' },
      { text: 'carried by warriors who defended and expanded their' },
      { text: 'empires. Spears, swords, blades and shields become' },
      { text: 'ideas translated into typography — sharp edges,' },
      { text: 'decisive cuts, strong structures and commanding forms.' },
    ],
  },
  {
    id: 'p3',
    lines: [
      { text: 'Every letter is designed to feel like it', isAllBold: true },
      { text: 'has been forged rather than drawn.', isAllBold: true },
    ],
  },
  {
    id: 'p4',
    lines: [
      { text: 'Ogaranya was created with Africa in mind.' },
      { text: 'Its character set extends beyond English to embrace' },
      { text: 'the written languages and identities of Igbo, Yoruba' },
      { text: 'and Hausa, giving African words the same visual' },
      { text: 'authority traditionally reserved for global display' },
      { text: 'typefaces.' },
    ],
  },
];

export default function StorySection() {
  return (
    <div
      id="about"
      className="relative w-full h-full min-h-screen bg-[#FAF6EC] text-[#141414] select-none flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-[70px] py-24 sm:py-28 md:py-32 lg:py-36 overflow-hidden"
      aria-label="The Story & Heritage of Ogaranya"
    >
      <div className="mx-auto w-full max-w-[1280px] flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-[60px] xl:gap-[80px]">
        {/* Left Column: Narrative Story Paragraphs (Figma 11:130 -> 529px width, Instrument Sans, 20px font-size, 30px line-height) */}
        <div className="w-full lg:w-[529px] max-w-[529px] flex flex-col justify-start space-y-6">
          {storyParagraphs.map((para) => (
            <div key={para.id} className="flex flex-col space-y-1">
              {para.lines.map((lineObj, lIdx) => (
                <div
                  key={lIdx}
                  className="story-ink-line block font-instrument text-[18px] lg:text-[20px] leading-[32px] tracking-normal will-change-[opacity]"
                  style={{
                    opacity: 0.12,
                    color: '#141414',
                  }}
                >
                  {lineObj.isAllBold ? (
                    <span className="font-bold">{lineObj.text}</span>
                  ) : lineObj.boldWords && lineObj.boldWords.length > 0 ? (
                    lineObj.text.split(' ').map((w, wIdx) => {
                      const isBold = lineObj.boldWords?.includes(w.replace(/[.,]/g, ''));
                      return (
                        <span key={wIdx} className={isBold ? 'font-bold' : 'font-normal'}>
                          {w}{' '}
                        </span>
                      );
                    })
                  ) : (
                    <span className="font-normal">{lineObj.text}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right Column: 6 Specification Frames (Figma 11:146-152 on desktop, 64:1399-1414 on mobile) */}
        <div className="w-full lg:w-auto flex flex-col justify-start space-y-[22px] lg:space-y-[32px] pt-4 lg:pt-0">
          {specs.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between h-[64px] lg:h-[66px] ${item.mobileWidth} ${item.desktopWidth}`}
            >
              <span className="font-instrument text-[16px] lg:text-[20px] text-[#848484] font-normal leading-[30px] tracking-normal">
                {item.label}
              </span>
              <span className="font-instrument text-[20px] lg:text-[24px] text-[#141414] font-normal leading-[30px] tracking-normal">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
