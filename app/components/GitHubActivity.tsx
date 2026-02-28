'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionClassName =
  'relative w-full overflow-hidden bg-[var(--bg)] py-32 min-h-[10vh] max-[768px]:py-16';

const containerClassName =
  'relative z-[2] mx-auto max-w-[1400px] px-16 max-[768px]:px-8 max-[480px]:px-4';

const headerClassName = 'mb-20 overflow-hidden text-center max-[768px]:mb-12';

const graphWrapperClassName =
  'relative overflow-hidden rounded-[24px] bg-transparent p-8 max-[768px]:p-6 max-[480px]:p-4';

const graphClassName = 'block h-auto w-full rounded-lg';

// Skeleton Loading Component
const GitHubActivitySkeleton = () => {
  const shimmerBg = '#94a3b84d';

  return (
    <section className="bg-[var(--bg)] px-8 py-16 max-[480px]:px-4">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 text-center">
          <div
            className="mx-auto mb-4 h-8 w-[250px] rounded-lg"
            style={{ background: shimmerBg, animation: 'shimmer 2s infinite' }}
          />
          <div
            className="mx-auto h-5 w-full max-w-[400px] rounded"
            style={{ background: shimmerBg, animation: 'shimmer 2s infinite' }}
          />
        </div>

        <div className="h-[200px] w-full rounded-xl" style={{ background: shimmerBg, animation: 'shimmer 2s infinite' }} />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      setPrefersReducedMotion(media.matches);
    };

    syncMotionPreference();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', syncMotionPreference);
    } else {
      media.addListener(syncMotionPreference);
    }

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', syncMotionPreference);
      } else {
        media.removeListener(syncMotionPreference);
      }
    };
  }, []);

  useEffect(() => {
    if (loading || !sectionRef.current) return;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(graphRef.current, {
        scrollTrigger: {
          trigger: graphRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, prefersReducedMotion]);

  if (loading) {
    return <GitHubActivitySkeleton />;
  }

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className={containerClassName}>
        <div ref={headerRef} className={headerClassName}>
          <h2 className="sectionTitleGlobal">
            GitHub <span className="text-[var(--accent)]">Activity</span>
          </h2>
        </div>

        <div ref={graphRef} className="mb-10">
          <div className={graphWrapperClassName}>
            <div className="relative z-[2]">
              <Image
                src="https://ghchart.rshah.org/22d3ee/mehedi-hasan1102"
                alt="GitHub contribution graph"
                className={graphClassName}
                width={1400}
                height={220}
                sizes="(max-width: 1400px) 100vw, 1400px"
                loading="lazy"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
