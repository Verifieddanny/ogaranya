'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// =========================================================================
// POSTER FRAMES & TYPOGRAPHY COLORS (Lifted directly from Figma nodes)
// 1. Instagram post - 3: White bg (#FFFFFF), all text Brown (#653917)
// 2. Frame 2: Brown bg (#653917), "SÂIṄŦ" in Gold (#FFD400), others White (#FFFFFF)
// 3. Frame 3: Brown bg (#653917), "ĽÃÜŘĂ" in Gold (#FFD400), others White (#FFFFFF)
// 4. Frame 4: Brown bg (#653917), "ƲAǤUĘ" in Gold (#FFD400), others White (#FFFFFF)
// 5. Frame 5: Brown bg (#653917), "AǨ47" in Gold (#FFD400), others White (#FFFFFF)
// =========================================================================
interface LineConfig {
  text: string;
  color: string;
}

interface PosterFrame {
  id: string;
  name: string;
  bg: string;
  headerColor: string;
  lines: [LineConfig, LineConfig, LineConfig, LineConfig];
}

const FRAMES: PosterFrame[] = [
  {
    id: 'instagram-post-3',
    name: 'Instagram post - 3',
    bg: '#FFFFFF',
    headerColor: '#653917',
    lines: [
      { text: 'SAINT', color: '#653917' },
      { text: 'LAURA', color: '#653917' },
      { text: 'VAGUE', color: '#653917' },
      { text: 'AK47', color: '#653917' },
    ],
  },
  {
    id: 'frame-2',
    name: 'Frame 2',
    bg: '#653917',
    headerColor: '#FFFFFF',
    lines: [
      { text: 'SÂIṄŦ', color: '#FFD400' }, // Gold diacritic override from Figma node 13:311
      { text: 'LAURA', color: '#FFFFFF' },
      { text: 'VAGUE', color: '#FFFFFF' },
      { text: 'AK47', color: '#FFFFFF' },
    ],
  },
  {
    id: 'frame-3',
    name: 'Frame 3',
    bg: '#653917',
    headerColor: '#FFFFFF',
    lines: [
      { text: 'SAINT', color: '#FFFFFF' },
      { text: 'ĽÃÜŘĂ', color: '#FFD400' }, // Gold diacritic override from Figma node 13:321
      { text: 'VAGUE', color: '#FFFFFF' },
      { text: 'AK47', color: '#FFFFFF' },
    ],
  },
  {
    id: 'frame-4',
    name: 'Frame 4',
    bg: '#653917',
    headerColor: '#FFFFFF',
    lines: [
      { text: 'SAINT', color: '#FFFFFF' },
      { text: 'LAURA', color: '#FFFFFF' },
      { text: 'ƲAǤUĘ', color: '#FFD400' }, // Gold diacritic override from Figma node 13:341
      { text: 'AK47', color: '#FFFFFF' },
    ],
  },
  {
    id: 'frame-5',
    name: 'Frame 5',
    bg: '#653917',
    headerColor: '#FFFFFF',
    lines: [
      { text: 'SAINT', color: '#FFFFFF' },
      { text: 'LAURA', color: '#FFFFFF' },
      { text: 'VAGUE', color: '#FFFFFF' },
      { text: 'AǨ47', color: '#FFD400' }, // Gold diacritic override from Figma node 13:361
    ],
  },
];

const BLOB_DIAMETER = 320; // Natural physical pixel diameter of the fluid blob

function PosterContent({ frame }: { frame: PosterFrame }) {
  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-10 lg:p-12 select-none overflow-hidden"
      style={{
        backgroundColor: frame.bg,
      }}
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
      </svg>Ì
      {/* Top Header Row (exact Figma spacing & labels) */}
      <div
        className="relative z-10 w-full flex items-center justify-between font-ogaranya text-[9px] sm:text-[10px] md:text-[12px] leading-tight tracking-[0.04em] uppercase"
        style={{ color: frame.headerColor }}
      >
        <span className="text-left">NEBO FOUNDRY</span>
        <span className="text-center">OGARANYA</span>
        <span className="text-right">IXIVV</span>
      </div>

      {/* Center Big Display Typography (4 stacked lines, exact line-height 80%) */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto font-ogaranya text-center tracking-[-0.03em] leading-[0.80] uppercase select-none">
        {frame.lines.map((line, idx) => (
          <span
            key={idx}
            className="block text-[17.5vw] sm:text-[18vw] md:text-[18.5vw] lg:text-[230px] xl:text-[255px] 2xl:text-[275px] will-change-transform"
            style={{ color: line.color }}
          >
            {line.text}
          </span>
        ))}
      </div>

      {/* Bottom Footer Row (exact Figma spacing & labels) */}
      <div
        className="relative z-10 w-full flex items-center justify-between font-ogaranya text-[9px] sm:text-[10px] md:text-[12px] leading-tight tracking-[0.04em] uppercase"
        style={{ color: frame.headerColor }}
      >
        <span className="text-left">NEBO FOUNDRY</span>
        <span className="text-center">OGARANYA</span>
        <span className="text-right">IXIVV</span>
      </div>
    </div>
  );
}

export default function PosterSection() {
  const [frameIndex, setFrameIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Dynamic measurement of poster container for pixel-perfect counter-translation
  const [containerSize, setContainerSize] = useState({ width: 1080, height: 1245 });

  // Physics simulation state for fluid elastic blob motion (effortless liquid flow, zero drawback)
  const posRef = useRef({ x: 540, y: 622 });
  const targetRef = useRef({ x: 540, y: 622 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const stretchRef = useRef(0);
  const angleRef = useRef(0);
  const isHoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseClientRef = useRef<{ x: number; y: number } | null>(null);
  const hasPosInitializedRef = useRef(false);

  // High-contrast inverse frame for the blob:
  // When base frame is Instagram post - 3 (white bg), blob contrasts with Frame 2 (brown bg + gold SÂIṄŦ).
  // When base frame is brown (Frames 2-5), blob contrasts with Instagram post - 3 (white bg + brown text).
  const activeBlobFrame = frameIndex === 0 ? FRAMES[1] : FRAMES[0];

  // Measure container dimensions
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Track global cursor & scroll positions so scrolling gradually pulls blob towards cursor without jumping
  useEffect(() => {
    const updateFromScreenCoordinates = (clientX: number, clientY: number) => {
      mouseClientRef.current = { x: clientX, y: clientY };
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isInside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInside) {
        const newTargetX = clientX - rect.left;
        const newTargetY = clientY - rect.top;
        targetRef.current = { x: newTargetX, y: newTargetY };

        // Initialize pos on very first interaction so it starts at the cursor entry
        if (!hasPosInitializedRef.current) {
          posRef.current = { x: newTargetX, y: newTargetY };
          hasPosInitializedRef.current = true;
        }

        if (!isHoveredRef.current) {
          isHoveredRef.current = true;
          setIsHovered(true);
        }
      } else {
        if (isHoveredRef.current) {
          isHoveredRef.current = false;
          setIsHovered(false);
        }
      }
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      updateFromScreenCoordinates(e.clientX, e.clientY);
    };

    const handleWindowScroll = () => {
      if (mouseClientRef.current) {
        updateFromScreenCoordinates(mouseClientRef.current.x, mouseClientRef.current.y);
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  // GIF-like switching loop across all 5 frames (natural ~1.1s timing)
  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % FRAMES.length);
    }, 1100);
    return () => clearInterval(timer);
  }, []);

  // Fluid Elastic Physics Loop (effortless flow to cursor, organic stretch & soft liquid settling)
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      const dist = Math.hypot(dx, dy);
      const currentSpeed = Math.hypot(velRef.current.vx, velRef.current.vy);

      // Run simulation whenever hovered, or while settling naturally
      if (isHoveredRef.current || dist > 0.5 || currentSpeed > 0.05) {
        // Effortless elastic fluid dynamics:
        // springK = 0.10 (silky, responsive follow without stiff jerk)
        // damping = 0.84 (liquid momentum glide, zero rigid drawback)
        const springK = 0.10;
        const damping = 0.84;

        velRef.current.vx = (velRef.current.vx + dx * springK) * damping;
        velRef.current.vy = (velRef.current.vy + dy * springK) * damping;

        posRef.current.x += velRef.current.vx;
        posRef.current.y += velRef.current.vy;

        const vx = velRef.current.vx;
        const vy = velRef.current.vy;
        const speed = Math.hypot(vx, vy);

        // Dynamic volume-preserving elastic deformation: stretches along velocity direction like a liquid droplet
        const targetStretch = Math.min(speed * 0.0028, 0.25);
        stretchRef.current += (targetStretch - stretchRef.current) * 0.16;

        const scaleX = 1 + stretchRef.current;
        const scaleY = 1 / Math.sqrt(scaleX); // Preserves droplet volume

        // Smoothly orient along velocity vector
        if (speed > 0.6) {
          const targetAngle = Math.atan2(vy, vx) * (180 / Math.PI);
          let diff = targetAngle - angleRef.current;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          angleRef.current += diff * 0.15;
        }

        if (blobRef.current && innerRef.current) {
          const x = posRef.current.x;
          const y = posRef.current.y;
          const angle = angleRef.current;

          const blobX = x - BLOB_DIAMETER / 2;
          const blobY = y - BLOB_DIAMETER / 2;

          // Transform outer blob with elastic elongation and orientation
          blobRef.current.style.transform = `translate3d(${blobX}px, ${blobY}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY}) rotate(${-angle}deg)`;

          // Counter-transform inner container: text stays 100% locked to poster coordinates
          innerRef.current.style.transform = `translate3d(${-blobX}px, ${-blobY}px, 0)`;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseClientRef.current = { x: e.clientX, y: e.clientY };
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!isHoveredRef.current) {
      isHoveredRef.current = true;
      setIsHovered(true);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseClientRef.current = { x: e.clientX, y: e.clientY };
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!hasPosInitializedRef.current) {
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      hasPosInitializedRef.current = true;
    }
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
  };

  return (
    <section
      id="poster-specimen"
      className="relative w-full bg-[#FAF6EC] pt-16 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center select-none overflow-hidden"
    >
      <style jsx>{`
        @keyframes morphBlob {
          0%, 100% {
            border-radius: 56% 44% 38% 62% / 60% 48% 52% 40%;
          }
          25% {
            border-radius: 42% 58% 54% 46% / 46% 40% 60% 54%;
          }
          50% {
            border-radius: 48% 52% 36% 64% / 54% 62% 38% 46%;
          }
          75% {
            border-radius: 64% 36% 52% 48% / 42% 46% 54% 58%;
          }
        }
        .fluid-blob-contour {
          animation: morphBlob 6s ease-in-out infinite;
        }
      `}</style>

      {/* ================================================================= */}
      {/* POSTER CARD (Aspect Ratio 1080x1245 matching Figma node 13:288)   */}
      {/* ================================================================= */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[358px] md:max-w-[840px] lg:max-w-[980px] xl:max-w-[1080px] aspect-[1080/1245] rounded-none overflow-hidden cursor-crosshair group"
      >
        {/* =============================================================== */}
        {/* LAYER 1: BASE CYCLING FRAMES (GIF-like discrete cut)           */}
        {/* =============================================================== */}
        {FRAMES.map((frame, index) => {
          const isActive = index === frameIndex;
          return (
            <div
              key={frame.id}
              className={`absolute inset-0 w-full h-full ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
            >
              <PosterContent frame={frame} />
            </div>
          );
        })}

        {/* =============================================================== */}
        {/* LAYER 2: DESKTOP HOVER FLUID BLOB (Sharp, Non-Feathered Edge)   */}
        {/* Contrasts with white frame when base is white, and vice versa.  */}
        {/* Deforms and pushes back with fluid inertia from swipe force.    */}
        {/* =============================================================== */}
        <div
          ref={blobRef}
          className={`hidden md:block absolute top-0 left-0 z-20 pointer-events-none overflow-hidden fluid-blob-contour transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            width: `${BLOB_DIAMETER}px`,
            height: `${BLOB_DIAMETER}px`,
            boxShadow:
              frameIndex === 0
                ? '0 0 0 1.5px rgba(101, 57, 23, 0.45), 0 10px 32px rgba(45, 30, 19, 0.22)'
                : '0 0 0 1.5px rgba(255, 255, 255, 0.55), 0 10px 32px rgba(0, 0, 0, 0.28)',
          }}
        >
          {/* Inner Counter-Translated Container: Pinning content to exact poster coordinates */}
          <div
            ref={innerRef}
            className="absolute top-0 left-0"
            style={{
              width: `${containerSize.width}px`,
              height: `${containerSize.height}px`,
            }}
          >
            <PosterContent frame={activeBlobFrame} />
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* BENEATH THE GIF FRAME: TWO LIONS EMBLEM                           */}
      {/* (Figma Node 29:1577 Desktop 189x71 / Node 69:1652 Mobile 113x43) */}
      {/* ================================================================= */}
      <div className="mt-12 sm:mt-14 md:mt-16 flex items-center justify-center">
        <div className="relative w-[113px] h-[43px] md:w-[189px] md:h-[71px] transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/poster/lions-emblem.png"
            alt="Ogaranya Two Lions Facing Emblem"
            fill
            sizes="(max-width: 768px) 113px, 189px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
