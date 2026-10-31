'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Listen for custom theme switch event triggered by Hero scroll hijacking
    const handleThemeChange = (e: CustomEvent<{ isLight: boolean }>) => {
      setIsLightMode(e.detail.isLight);
    };

    window.addEventListener(
      'nav-theme-change' as any,
      handleThemeChange as EventListener
    );
    return () => {
      window.removeEventListener(
        'nav-theme-change' as any,
        handleThemeChange as EventListener
      );
    };
  }, []);

  const handleNavClick = (target: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const lenis = typeof window !== 'undefined' ? (window as any).__lenis : null;

    if (target === 'about') {
      // Smoothly scroll into the story section within the hero pin runway
      const targetScroll = window.innerHeight * 1.6;
      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.6 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
      return;
    }

    if (target === 'home') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(target);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -40, duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-4 md:py-5 select-none transition-all duration-700 ease-in-out ${
        isLightMode
          ? 'bg-[#2D1E13] text-[#FAF6EC] shadow-[0_4px_30px_rgba(0,0,0,0.35)]'
          : 'bg-transparent backdrop-blur-none text-[#FAF6EC]'
      }`}
    >
      {/* Desktop Contained Navbar (Tight, cohesive spacing matching Figma) */}
      <div className="hidden md:flex w-full max-w-[840px] items-center justify-between px-6">
        {/* Left Links */}
        <nav className="flex items-center gap-10 lg:gap-14 font-ogaranya text-[17px] tracking-[0.05em] uppercase">
          <a
            href="#specimen"
            onClick={(e) => handleNavClick('specimen', e)}
            className="transition-opacity duration-200 hover:opacity-75 cursor-pointer"
          >
            Specimen
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick('about', e)}
            className="transition-opacity duration-200 hover:opacity-75 cursor-pointer"
          >
            About
          </a>
        </nav>

        {/* Center Emblem (Facing African Leopards) */}
        <div className="flex items-center justify-center px-4">
          <a
            href="/"
            onClick={(e) => handleNavClick('home', e)}
            className="inline-block transition-transform duration-300 hover:scale-105 cursor-pointer"
            aria-label="Ogaranya Home"
          >
            <div className="relative w-28 h-10 lg:w-32 lg:h-11 transition-all duration-300">
              <Image
                src="/images/hero/leopards-emblem.webp"
                alt="Ogaranya Leopard Emblem"
                fill
                priority
                sizes="140px"
                className="object-contain"
              />
            </div>
          </a>
        </div>

        {/* Right Links */}
        <nav className="flex items-center gap-10 lg:gap-14 font-ogaranya text-[17px] tracking-[0.05em] uppercase">
          <a
            href="#glyphs"
            onClick={(e) => handleNavClick('glyphs', e)}
            className="transition-opacity duration-200 hover:opacity-75 cursor-pointer"
          >
            Glyphs
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleNavClick('gallery', e)}
            className="transition-opacity duration-200 hover:opacity-75 cursor-pointer"
          >
            Gallery
          </a>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="flex md:hidden w-full items-center justify-between">
        <a
          href="/"
          onClick={(e) => handleNavClick('home', e)}
          className="inline-block transition-transform duration-300 hover:scale-105 cursor-pointer"
          aria-label="Ogaranya Home"
        >
          <div className="relative w-24 h-9 transition-all duration-300">
            <Image
              src="/images/hero/leopards-emblem.webp"
              alt="Ogaranya Leopard Emblem"
              fill
              priority
              sizes="110px"
              className="object-contain"
            />
          </div>
        </a>

        {/* Mobile Hamburger Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 focus:outline-none transition-transform active:scale-95"
            aria-label="Toggle navigation menu"
          >
            <svg
              width="32"
              height="22"
              viewBox="0 0 33 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-opacity duration-200 hover:opacity-85"
            >
              <path d="M0 1.5H33" strokeWidth="3" stroke="#FFB701" />
              <path d="M0 11.5H33" strokeWidth="3" stroke="#FFB701" />
              <path d="M0 21.5H33" strokeWidth="3" stroke="#FFB701" />
            </svg>
          </button>

          {/* Exact Figma Node 62:1387 Mobile Card */}
          {mobileMenuOpen && (
            <div
              className="absolute top-12 right-0 z-50 flex flex-col items-start justify-center w-[120px] h-[188px] rounded-[20px] bg-[#E7D5C7] px-5 py-3.5 shadow-[0_16px_50px_rgba(0,0,0,0.6)] border border-[#653917]/10 animate-in fade-in zoom-in-95 duration-150"
              style={{ width: '120px', height: '188px' }}
            >
              <a
                href="#specimen"
                onClick={(e) => handleNavClick('specimen', e)}
                className="font-ogaranya text-[12px] leading-[30px] text-[#653917] tracking-normal uppercase transition-colors hover:text-[#C45D0E] cursor-pointer"
              >
                SPECIMEN
              </a>
              <div className="w-[79px] h-[1px] bg-[#C45D0E] my-0.5" />

              <a
                href="#about"
                onClick={(e) => handleNavClick('about', e)}
                className="font-ogaranya text-[12px] leading-[30px] text-[#653917] tracking-normal uppercase transition-colors hover:text-[#C45D0E] cursor-pointer"
              >
                ABOUT
              </a>
              <div className="w-[79px] h-[1px] bg-[#C45D0E] my-0.5" />

              <a
                href="#glyphs"
                onClick={(e) => handleNavClick('glyphs', e)}
                className="font-ogaranya text-[12px] leading-[30px] text-[#653917] tracking-normal uppercase transition-colors hover:text-[#C45D0E] cursor-pointer"
              >
                GLYPHS
              </a>
              <div className="w-[79px] h-[1px] bg-[#C45D0E] my-0.5" />

              <a
                href="#gallery"
                onClick={(e) => handleNavClick('gallery', e)}
                className="font-ogaranya text-[12px] leading-[30px] text-[#653917] tracking-normal uppercase transition-colors hover:text-[#C45D0E] cursor-pointer"
              >
                GALLERY
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
