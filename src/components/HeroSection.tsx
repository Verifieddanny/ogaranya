'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StorySection from '@/components/StorySection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const swordLeftRef = useRef<HTMLDivElement>(null);
  const swordRightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleTopRef = useRef<HTMLDivElement>(null);
  const subtitleBottomRef = useRef<HTMLDivElement>(null);
  const storyLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !swordLeftRef.current ||
      !swordRightRef.current ||
      !heroStageRef.current ||
      !textRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // ==========================================
      // 1. PAGE LOAD INTRO: Initial Entrance
      // Only runs if user starts at the top of the page
      // ==========================================
      let introTl: gsap.core.Timeline | null = null;
      if (typeof window !== 'undefined' && window.scrollY <= 10) {
        introTl = gsap.timeline();

        introTl.fromTo(
          [swordLeftRef.current, swordRightRef.current],
          {
            opacity: 0,
            filter: 'blur(28px)',
            scale: 0.94,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.2,
          }
        );

        introTl.fromTo(
          textRef.current,
          {
            opacity: 0,
            filter: 'blur(20px)',
            scale: 0.96,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.3,
            ease: 'power3.out',
          },
          '-=1.2'
        );

        introTl.fromTo(
          [subtitleTopRef.current, subtitleBottomRef.current],
          {
            opacity: 0,
            y: (i) => (i === 0 ? -24 : 24),
            filter: 'blur(16px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
          },
          '-=1.0'
        );
      } else {
        // Page was loaded already scrolled
        gsap.set(
          [
            swordLeftRef.current,
            swordRightRef.current,
            textRef.current,
            subtitleTopRef.current,
            subtitleBottomRef.current,
          ],
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
          }
        );
      }

      // ==========================================
      // 2. UNIFIED SCROLL LOCK & INKING TIMELINE
      // Fully deterministic bidirectional scrub
      // ==========================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: true, // Direct 1:1 sync with Lenis, eliminates scrub lag
          invalidateOnRefresh: true,
          fastScrollEnd: false,
          preventOverlaps: true,
          onLeaveBack: () => {
            tl.progress(0);
            if (introTl) introTl.kill();
            gsap.set(heroStageRef.current, { autoAlpha: 1 });
            gsap.set(storyLayerRef.current, { autoAlpha: 0 });
            gsap.set(textRef.current, {
              opacity: 1,
              scale: 1,
              clearProps: 'transform,filter,opacity,visibility',
            });
            gsap.set([swordLeftRef.current, swordRightRef.current], {
              opacity: 1,
              rotation: 0,
              xPercent: 0,
              yPercent: 0,
              filter: 'none',
              scale: 1,
              clearProps: 'transform,filter,opacity',
            });
            gsap.set([subtitleTopRef.current, subtitleBottomRef.current], {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'none',
              clearProps: 'transform,filter,opacity',
            });
            window.dispatchEvent(
              new CustomEvent('nav-theme-change', { detail: { isLight: false } })
            );
          },
          onLeave: () => {
            tl.progress(1);
            gsap.set(heroStageRef.current, { autoAlpha: 0 });
            gsap.set(storyLayerRef.current, { autoAlpha: 1 });
            window.dispatchEvent(
              new CustomEvent('nav-theme-change', { detail: { isLight: true } })
            );
          },
          onEnterBack: () => {
            if (introTl && introTl.isActive()) {
              introTl.kill();
            }
          },
          onUpdate: (self) => {
            if (self.progress > 0 && introTl && introTl.isActive()) {
              introTl.kill();
            }

            // Boundary safety
            if (self.progress <= 0.01) {
              gsap.set(storyLayerRef.current, { autoAlpha: 0 });
              gsap.set(heroStageRef.current, { autoAlpha: 1 });
            } else if (self.progress >= 0.35) {
              gsap.set(heroStageRef.current, { autoAlpha: 0 });
              gsap.set(storyLayerRef.current, { autoAlpha: 1 });
            }

            // Navbar theme switch synchronized with transition
            const isLight = self.progress >= 0.28;
            window.dispatchEvent(
              new CustomEvent('nav-theme-change', { detail: { isLight } })
            );
          },
        },
      });

      // (A) Story Section: fades in at 0.22 -> 0.32
      tl.fromTo(
        storyLayerRef.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.10,
          ease: 'power1.inOut',
        },
        0.22
      );

      // (B) Hero Stage: fades out at 0.22 -> 0.32
      tl.fromTo(
        heroStageRef.current,
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 0.10,
          ease: 'power1.inOut',
        },
        0.22
      );

      // (C) Subtitles: float away with blur from 0.00 -> 0.16
      tl.fromTo(
        [subtitleTopRef.current, subtitleBottomRef.current],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          letterSpacing: '0.06em',
          filter: 'blur(0px)',
        },
        {
          opacity: 0,
          y: -60,
          scale: 1.25,
          letterSpacing: '0.15em',
          filter: 'blur(18px)',
          duration: 0.16,
          ease: 'power1.out',
        },
        0.00
      );

      // (D) Left sword rotates clockwise and drags out of sight to the right (0.00 -> 0.22)
      tl.fromTo(
        swordLeftRef.current,
        {
          opacity: 1,
          rotation: 0,
          xPercent: 0,
          yPercent: 0,
          filter: 'blur(0px)',
        },
        {
          opacity: 0,
          rotation: 55,
          xPercent: 130,
          yPercent: 28,
          filter: 'blur(8px)',
          duration: 0.22,
          ease: 'power2.inOut',
        },
        0.00
      );

      // (E) Right sword rotates counter-clockwise and drags out of sight to the left (0.00 -> 0.22)
      tl.fromTo(
        swordRightRef.current,
        {
          opacity: 1,
          rotation: 0,
          xPercent: 0,
          yPercent: 0,
          filter: 'blur(0px)',
        },
        {
          opacity: 0,
          rotation: -55,
          xPercent: -130,
          yPercent: 28,
          filter: 'blur(8px)',
          duration: 0.22,
          ease: 'power2.inOut',
        },
        0.00
      );

      // (F) "OGARANYA" text initial zoom (scale 1 -> 4, stays crisp from 0.00 -> 0.15)
      tl.fromTo(
        textRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transformOrigin: '55% 50%',
        },
        {
          opacity: 1,
          scale: 4,
          filter: 'blur(0px)',
          duration: 0.15,
          ease: 'power1.in',
        },
        0.00
      );

      // (G) Zoom into letter 'A' and fade out into story (scale 4 -> 7, opacity 1 -> 0 from 0.15 -> 0.24)
      tl.to(
        textRef.current,
        {
          scale: 7,
          filter: 'blur(6px)',
          opacity: 0,
          duration: 0.09,
          ease: 'power2.in',
        },
        0.15
      );

      // (H) SCROLL-LOCK INKING: Line-by-line reveal from faint ghost (0.12) to solid black (1.0)
      const inkLines = containerRef.current?.querySelectorAll('.story-ink-line');
      if (inkLines && inkLines.length > 0) {
        tl.fromTo(
          inkLines,
          {
            opacity: 0.12,
          },
          {
            opacity: 1,
            stagger: {
              each: 0.05,
              from: 'start',
            },
            duration: 0.58,
            ease: 'none',
          },
          0.34
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden select-none"
    >
      {/* ======================================================== */}
      {/* LAYER 1: STORY SECTION (Scroll-Locked with Inking Reveal) */}
      {/* ======================================================== */}
      <div
        ref={storyLayerRef}
        className="absolute inset-0 z-10 w-full h-full bg-[#FAF6EC] overflow-hidden opacity-0 invisible"
      >
        <StorySection />
      </div>

      {/* ======================================================== */}
      {/* LAYER 2: HERO STAGE (Crossed Swords & Display Typography) */}
      {/* ======================================================== */}
      <div
        ref={heroStageRef}
        className="pointer-events-none absolute inset-0 z-20 flex w-full h-full flex-col items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16"
        style={{
          background:
            'linear-gradient(180deg, #110701 0%, #1A0E04 15%, #351D0A 40%, #4D2B11 65%, #653917 95%, #663A18 100%)',
        }}
      >
        {/* High-Octave Monotone Noise Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-40 bg-repeat opacity-[0.24] mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/noise-heavy.png')",
            backgroundSize: '220px 220px',
          }}
          aria-hidden="true"
        />

        {/* Main Hero Stage */}
        <div
          ref={stageWrapperRef}
          className="relative z-20 flex w-full max-w-[1440px] h-[86vh] sm:h-[88vh] md:h-[90vh] items-center justify-center mt-2 sm:mt-4 md:mt-6"
        >
          {/* Giant Crossed Swords Container (Rotated outward so "Built For Conquest" is clearly visible) */}
          <div className="relative w-[96vw] max-w-[1380px] h-full flex items-center justify-center scale-[1.04] sm:scale-[1.10] md:scale-[1.18] lg:scale-[1.25] xl:scale-[1.32] translate-y-4 sm:translate-y-6 md:translate-y-8">
            {/* Top Subtitle: BUILT FOR CONQUEST (z-35, prominent, unobstructed) */}
            <div className="absolute top-[11%] sm:top-[12%] md:top-[13%] lg:top-[14%] left-1/2 -translate-x-1/2 z-35 pointer-events-none">
              <div
                ref={subtitleTopRef}
                className="flex flex-col items-center justify-center text-center font-ogaranya text-lg sm:text-2xl md:text-[28px] lg:text-[32px] text-[#F6C67F] tracking-[0.06em] leading-[1.15] uppercase will-change-transform drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              >
                <span>Built For</span>
                <span>Conquest</span>
              </div>
            </div>

            {/* Back Sword: Handle Bottom-Left, Blade Top-Right (Rotated outward to open space) */}
            <div
              ref={swordLeftRef}
              className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none will-change-transform"
            >
              <div className="relative w-full h-full rotate-[-8deg] sm:rotate-[-9.5deg] md:rotate-[-0.5deg]">
                <picture>
                  <source
                    srcSet="/images/hero/sword-left.avif"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/hero/sword-left.webp"
                    type="image/webp"
                  />
                  <Image
                    src="/images/hero/sword-left.png"
                    alt="Ceremonial African Sword (Left)"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1400px"
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
                  />
                </picture>
              </div>
            </div>

            {/* Center Display Typography: OGARANYA (z-20 - Between Crossed Swords) */}
            <h1
              ref={textRef}
              className="relative z-20 font-ogaranya text-center text-[16vw] sm:text-[14.5vw] md:text-[13vw] lg:text-[10.5rem] xl:text-[12rem] 2xl:text-[13.5rem] tracking-[0.03em] leading-none text-[#FAF6EC] uppercase pointer-events-none select-none"
            >
              OGARANYA
            </h1>

            {/* Front Sword: Handle Bottom-Right, Blade Top-Left (Rotated outward to open space) */}
            <div
              ref={swordRightRef}
              className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none will-change-transform"
            >
              <div className="relative w-full h-full rotate-[8deg] sm:rotate-[9.5deg] md:rotate-[0.5deg]">
                <picture>
                  <source
                    srcSet="/images/hero/sword-right.avif"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/hero/sword-right.webp"
                    type="image/webp"
                  />
                  <Image
                    src="/images/hero/sword-right.png"
                    alt="Ceremonial African Sword (Right)"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1400px"
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
                  />
                </picture>
              </div>
            </div>

            {/* Bottom Subtitle: FORGED BY CULTURE. (z-35) */}
            <div className="absolute bottom-[14%] sm:bottom-[15%] md:bottom-[16%] lg:bottom-[17%] left-1/2 -translate-x-1/2 z-35 pointer-events-none">
              <div
                ref={subtitleBottomRef}
                className="flex flex-col items-center justify-center text-center font-ogaranya text-lg sm:text-2xl md:text-[28px] lg:text-[32px] text-[#F6C67F] tracking-[0.06em] leading-[1.15] uppercase will-change-transform drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
              >
                <span>Forged By</span>
                <span>Culture.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
