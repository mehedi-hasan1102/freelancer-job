'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { FiArrowUpRight, FiCalendar } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const sectionClassName =
  'relative overflow-hidden min-h-[80vh] flex items-center justify-center py-12 px-8 max-[1024px]:min-h-auto max-[1024px]:py-[clamp(2rem,5vw,4rem)] max-[1024px]:px-[clamp(1rem,3vw,2rem)] max-[768px]:py-[clamp(1.5rem,3vw,3rem)] max-[768px]:px-[clamp(1rem,2.5vw,1.5rem)] max-[600px]:py-[clamp(1.25rem,2.5vw,2.5rem)] max-[600px]:px-[clamp(0.875rem,2vw,1rem)] max-[480px]:py-[clamp(1rem,2vw,2rem)] max-[480px]:px-[clamp(0.75rem,1.5vw,0.875rem)] max-[360px]:py-[1.75rem] max-[360px]:px-[0.75rem]';

const headingClassName =
  "font-['Staatliches','Staatliches_Fallback',sans-serif] text-[clamp(2rem,12vw,192px)] font-normal not-italic leading-[1] tracking-[0.03em] text-[var(--text)] text-center mb-[clamp(1rem,2vw,2rem)] whitespace-normal max-[1024px]:text-[64px] max-[1024px]:leading-[64px] max-[1024px]:mb-[clamp(0.875rem,2vw,1.5rem)] max-[768px]:mb-[clamp(0.75rem,1.5vw,1.25rem)] max-[600px]:mb-[clamp(0.625rem,1.2vw,1rem)] max-[600px]:tracking-[0.025em] max-[480px]:mb-[clamp(0.5rem,1vw,0.875rem)] max-[480px]:tracking-[0.02em] max-[360px]:mb-[0.75rem]";

const emailClassName =
  "inline-block font-sans text-[clamp(1rem,3vw,40px)] font-normal leading-[1.4] not-italic tracking-[0.05em] text-[var(--accent)] text-center mb-[clamp(2rem,4vw,4rem)] no-underline transition-all duration-300 [transition-timing-function:ease] break-words relative max-w-[100vw] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--accent)] after:transition-[width] after:duration-300 after:[transition-timing-function:ease] hover:after:w-full hover:text-[var(--text)] max-[1024px]:text-[24px] max-[1024px]:leading-[36px] max-[1024px]:mb-[clamp(1.5rem,3vw,2.5rem)] max-[480px]:text-[clamp(0.95rem,2vw,1.75rem)] max-[480px]:leading-[clamp(1.75rem,3vw,2.5rem)] max-[480px]:mb-[clamp(1.25rem,2.5vw,3rem)]";

const footerGridClassName =
  'grid grid-cols-3 gap-[clamp(2rem,4vw,4rem)] mb-[clamp(2rem,4vw,5rem)] py-[clamp(1.5rem,2.5vw,3rem)] border-t border-b border-[rgba(6,182,212,0.1)] max-[1024px]:gap-[clamp(2rem,3vw,3rem)] max-[1024px]:py-[clamp(1.5rem,2vw,2.5rem)] max-[768px]:grid-cols-2 max-[768px]:gap-[clamp(1.5rem,2.5vw,2rem)] max-[768px]:py-[clamp(1.25rem,1.8vw,1.75rem)] max-[600px]:grid-cols-1 max-[600px]:gap-[clamp(1.25rem,2vw,1.75rem)] max-[600px]:py-[clamp(1rem,1.5vw,1.5rem)]';

const columnLabelClassName =
  "font-['Staatliches',serif] text-[clamp(0.65rem,1.2vw,0.875rem)] tracking-[0.15em] text-[var(--text-secondary)] mb-[clamp(0.875rem,1.5vw,1.5rem)] font-normal max-[1024px]:text-[clamp(0.7rem,1vw,0.8rem)] max-[1024px]:mb-[clamp(0.875rem,1.5vw,1.25rem)] max-[768px]:text-[clamp(0.9rem,1.3vw,1.1rem)] max-[768px]:mb-[clamp(0.75rem,1.2vw,1rem)] max-[360px]:text-[0.6rem] max-[360px]:mb-[0.625rem]";

const socialButtonsClassName =
  'flex gap-[clamp(1rem,2vw,2rem)] justify-center flex-wrap items-center max-[1024px]:gap-[clamp(1rem,1.5vw,1.75rem)] max-[768px]:gap-[clamp(0.875rem,1.5vw,1.25rem)] max-[480px]:gap-[clamp(0.65rem,1.1vw,0.875rem)]';

const socialLinkClassName =
  "font-['Inter',monospace] text-[clamp(0.75rem,1.3vw,1rem)] tracking-[0.05em] text-[var(--text-secondary)] no-underline transition-all duration-300 [transition-timing-function:ease] cursor-pointer relative hover:text-[var(--accent)] hover:-translate-y-[3px] max-[1024px]:text-[clamp(0.8rem,1.2vw,0.95rem)] max-[768px]:text-[clamp(1.05rem,1.35vw,1.25rem)] max-[360px]:text-[0.7rem]";

const locationCityClassName =
  "font-['Staatliches',serif] text-[clamp(1rem,1.8vw,1.25rem)] tracking-[0.1em] text-[var(--text)] font-normal max-[768px]:text-[clamp(1.2rem,1.6vw,1.35rem)]";

const locationCountryClassName =
  "font-['Inter',monospace] text-[clamp(0.7rem,1vw,0.875rem)] tracking-[0.1em] text-[var(--text-secondary)] font-normal max-[768px]:text-[clamp(0.95rem,1.3vw,1.1rem)]";

const currentTimeClassName =
  "font-['Inter',monospace] text-[clamp(0.7rem,1vw,0.875rem)] tracking-[0.05em] text-[var(--accent)] font-semibold mt-[clamp(0.25rem,0.5vw,0.5rem)] max-[768px]:text-[clamp(0.95rem,1.3vw,1.1rem)]";

const availabilityDotClassName =
  'inline-block h-3 w-3 rounded-full bg-[#22c55e] [animation:contactPulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] max-[768px]:h-[clamp(0.5rem,1vw,0.75rem)] max-[768px]:w-[clamp(0.5rem,1vw,0.75rem)] max-[600px]:h-[clamp(0.45rem,0.8vw,0.6rem)] max-[600px]:w-[clamp(0.45rem,0.8vw,0.6rem)]';

const availabilityTextClassName =
  "font-['Staatliches',serif] text-[clamp(0.65rem,1.1vw,0.875rem)] tracking-[0.15em] text-[#22c55e] font-normal max-[768px]:text-[clamp(0.95rem,1.3vw,1.05rem)] max-[600px]:text-[clamp(0.9rem,1.25vw,1rem)]";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mehedi-hasan1102/30min';
const LANDING_PAGE_AUDIT_MAILTO =
  'mailto:mehedi.hasan11023@gmail.com?subject=Landing%20Page%20Audit%20Request';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const bangladeshTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(bangladeshTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let splitHeading: ReturnType<typeof SplitType.create> | null = null;
    let headingTween: gsap.core.Tween | null = null;
    let headingTrigger: ScrollTrigger | null = null;

    const clearHeadingAnimation = () => {
      headingTrigger?.kill();
      headingTrigger = null;
      headingTween?.kill();
      headingTween = null;
      splitHeading?.revert();
      splitHeading = null;
    };

    const setupHeadingAnimation = () => {
      if (!headingRef.current || media.matches) return;

      splitHeading = SplitType.create(headingRef.current, {
        types: 'words',
      });

      if (!splitHeading.words) return;

      headingTween = gsap.from(splitHeading.words, {
        opacity: 0.2,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
      });

      headingTween.pause(0);

      headingTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        invalidateOnRefresh: true,
        onEnter: () => {
          headingTween?.play(0);
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    const syncMotionPreference = () => {
      clearHeadingAnimation();
      setupHeadingAnimation();
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
      clearHeadingAnimation();
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  const socials = [
    { label: 'GitHub', href: 'https://github.com/mehedi-hasan1102' },
    { label: 'X', href: 'https://x.com/mehedihasan1102' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehedi-hasan1102' },
  ];

  return (
    <section id="contact" ref={sectionRef} className={sectionClassName} style={{ background: 'var(--bg)' }}>
      <div className="container relative z-10 max-w-7xl">
        <div ref={headingRef} className={headingClassName}>
          BOOK A CALL
        </div>

        <div className="text-center">
          <a href="mailto:mehedi.hasan11023@gmail.com" className={emailClassName}>
            mehedi.hasan11023@gmail.com
          </a>
        </div>

        <div className={footerGridClassName}>
          <div className="text-center">
            <p className={columnLabelClassName}>SOCIALS</p>
            <div className={socialButtonsClassName}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLinkClassName}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className={columnLabelClassName}>LOCATION & TIME</p>
            <div className="flex flex-col gap-2">
              <p className={locationCityClassName}>DHAKA</p>
              <p className={locationCountryClassName}>BANGLADESH</p>
              <p className={currentTimeClassName}>{currentTime || '00:00:00 AM'}</p>
            </div>
          </div>

          <div className="text-center">
            <p className={columnLabelClassName}>AVAILABILITY</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className={availabilityDotClassName} />
              <span className={availabilityTextClassName}>OPEN FOR CLIENT PROJECTS</span>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(2rem,4vw,4rem)] flex flex-wrap justify-center gap-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FiCalendar size={16} />
            <span>BOOK A 20-MIN CALL</span>
          </a>
          <a href={LANDING_PAGE_AUDIT_MAILTO} className="btn-secondary">
            <FiArrowUpRight size={16} />
            <span>GET LANDING PAGE AUDIT</span>
          </a>
          <Link href="/freelancing" className="btn-secondary">
            <FiArrowUpRight size={16} />
            <span>VIEW SERVICE OPTIONS</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
