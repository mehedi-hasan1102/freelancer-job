'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const scrollDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero on mount
    const ctx = gsap.context(() => {
      // Split text
      if (!titleRef.current || !descRef.current) return;
      
      const titleText = SplitType.create(titleRef.current, { types: 'chars' });
      const descText = SplitType.create(descRef.current, { types: 'words' });

      // Create timeline
      const tl = gsap.timeline();

      // Stagger animate chars with wave effect
      if (titleText.chars) {
        tl.from(titleText.chars, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          rotationZ: -45,
          duration: 0.9,
          stagger: { amount: 0.6, ease: 'sine.inOut' },
          ease: 'cubic.out',
        }, 0);
      }

      // Animate description words
      if (descText.words) {
        tl.from(
          descText.words,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
          },
          0.4
        );
      }

      const proofItems = proofRef.current?.querySelectorAll('[data-proof-item]');
      if (proofItems?.length) {
        tl.from(
          proofItems,
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
          },
          0.7
        );
      }

      // Keep scroll indicator dot bouncing continuously.
      if (scrollDotRef.current) {
        gsap.to(scrollDotRef.current, {
          y: 8,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg)]"
    >
    

      <div className="container relative z-10">
        <div className="mx-auto max-w-[56rem] text-center">
          <div
            ref={titleRef}
            className="mb-6 flex flex-col text-[var(--text)] max-[768px]:mb-4"
          >
            <h1
              className="whitespace-nowrap text-[var(--text)]"
              style={{
                fontSize: '12vw',
                lineHeight: 1,
                letterSpacing: '-0.025em',
                fontWeight: 400,
                textTransform: 'uppercase',
                fontFamily: "'Staatliches', serif",
              }}
            >
              CONVERSION
            </h1>
            <h1
              className="whitespace-nowrap text-[var(--accent)]"
              style={{
                fontSize: '12vw',
                lineHeight: 1,
                letterSpacing: '-0.025em',
                fontWeight: 400,
                textTransform: 'uppercase',
                fontFamily: "'Staatliches', serif",
              }}
            >
              WEB ENGINEER
            </h1>
            <p className="mt-8 overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(0.75rem,2vw,1.125rem)] uppercase tracking-[0.3em] opacity-60 max-[768px]:text-[clamp(0.65rem,1.8vw,0.9rem)] max-[768px]:tracking-[0.2em] max-[480px]:text-[clamp(0.6rem,1.5vw,0.8rem)] max-[480px]:tracking-[0.15em]">
              Scroll down to explore
            </p>
          </div>

          <div
            ref={descRef}
            className="mx-auto mb-12 max-w-[42rem] text-base leading-[1.6] text-[var(--text-secondary)]"
          >
            I build conversion-focused websites for startups and service businesses. You get clean
            React/Next.js delivery, measurable performance improvements, and clear communication
            from kickoff to launch.
          </div>

          <div
            ref={proofRef}
            className="mx-auto mb-16 flex max-w-[52rem] flex-wrap justify-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)] max-[480px]:gap-2"
          >
            <span
              data-proof-item
              className="rounded-full border border-[rgba(var(--accent-rgb),0.24)] bg-[rgba(var(--accent-rgb),0.08)] px-4 py-2"
            >
              Response: within 24h
            </span>
            <span
              data-proof-item
              className="rounded-full border border-[rgba(var(--accent-rgb),0.24)] bg-[rgba(var(--accent-rgb),0.08)] px-4 py-2"
            >
              Timezone overlap: US hours
            </span>
            <span
              data-proof-item
              className="rounded-full border border-[rgba(var(--accent-rgb),0.24)] bg-[rgba(var(--accent-rgb),0.08)] px-4 py-2"
            >
              Stack: Next.js, React, TypeScript
            </span>
          </div>

          {/* Scroll indicator with animation */}
          <div
            className="absolute bottom-[-5rem] left-1/2 z-20 -translate-x-1/2 cursor-pointer transition-all duration-300 [transition-timing-function:ease] hover:scale-[1.2]"
            onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          >
            <div className="flex h-10 w-6 justify-center rounded-full border-2 border-[var(--accent)] pt-2">
              <div
                ref={scrollDotRef}
                className="h-2 w-1 rounded-full bg-[var(--accent)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
