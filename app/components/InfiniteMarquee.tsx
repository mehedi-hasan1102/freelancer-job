'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TEXT = "let's work together ✦";
const REPEAT_COUNT = 8;

export default function InfiniteMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let tween: gsap.core.Tween | null = null;

    const startTween = () => {
      if (tween) return;
      tween = gsap.to(track, {
        xPercent: -50,
        duration: 56,
        ease: 'none',
        repeat: -1,
      });
    };

    const stopTween = () => {
      tween?.kill();
      tween = null;
      gsap.set(track, { xPercent: 0 });
    };

    const syncMotionPreference = () => {
      if (media.matches) {
        stopTween();
        return;
      }
      startTween();
    };

    syncMotionPreference();

    const handleChange = () => {
      syncMotionPreference();
    };

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange);
    } else {
      media.addListener(handleChange);
    }

    return () => {
      stopTween();
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  const groupClassName =
    'flex items-center gap-5 whitespace-nowrap pr-5 max-[768px]:gap-[0.85rem] max-[768px]:pr-[0.85rem]';

  const items = Array.from({ length: REPEAT_COUNT }, (_, index) => (
    <span
      className="font-['Staatliches',serif] text-[clamp(1.25rem,2.5vw,2.25rem)] tracking-[0.18em] uppercase text-[var(--text)] opacity-[0.92] transition-colors duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]"
      key={`marquee-item-${index}`}
    >
      {TEXT}
    </span>
  ));

  return (
    <div className="bg-[var(--bg)] relative overflow-hidden py-5 max-[768px]:py-4">
      <span className="sr-only">{TEXT}</span>
      <div className="flex w-max [will-change:transform]" ref={trackRef} aria-hidden="true">
        <div className={groupClassName}>{items}</div>
        <div className={groupClassName}>
          {items}
        </div>
      </div>
    </div>
  );
}
