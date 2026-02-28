'use client';

import {
  FaReact,
  FaJs,
  FaFigma,
  FaDatabase,
  FaCode,
  FaPalette,
} from 'react-icons/fa';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './DiagonalMarquee.module.css';

gsap.registerPlugin(ScrollTrigger);

const DiagonalMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentRef2 = useRef<HTMLDivElement>(null);

  const items = [
    { label: 'Landing Page Optimization', icon: FaReact },
    { label: 'React UI Refactor', icon: FaCode },
    { label: 'Next.js Performance Fixes', icon: FaJs },
    { label: 'Conversion-Focused Design', icon: FaPalette },
    { label: 'Scalable Frontend Systems', icon: FaFigma },
    { label: 'Full-Stack Delivery', icon: FaDatabase },
  ];

  const items2 = [
    { label: 'Audit to Launch', icon: FaReact },
    { label: 'Clean Maintainable Code', icon: FaCode },
    { label: 'Core Web Vitals', icon: FaJs },
    { label: 'Mobile-First UX', icon: FaPalette },
    { label: 'Design to Development', icon: FaFigma },
    { label: 'Ongoing Technical Support', icon: FaDatabase },
  ];

  useLayoutEffect(() => {
    if (!contentRef.current || !contentRef2.current) return;

    const getDistance = (node: HTMLDivElement | null) =>
      -((node?.scrollWidth || 0) / 2);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { x: 0 },
        {
          x: () => getDistance(contentRef.current),
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 5,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        contentRef2.current,
        { x: () => getDistance(contentRef2.current) },
        {
          x: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 5,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    const refresh = () => ScrollTrigger.refresh();
    const rafId = window.requestAnimationFrame(refresh);

    if (document.fonts?.ready) {
      void document.fonts.ready.then(refresh);
    }

    window.addEventListener('load', refresh);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.diagonalMarqueeSection} ref={marqueeRef}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack1}>
          <div className={styles.marqueeContent1} ref={contentRef}>
            {Array(4)
              .fill(null)
              .map((_, idx) =>
                items.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={`${idx}-${i}`} className={styles.itemRow}>
                      <IconComponent className={styles.icon} />
                      <span className={styles.label}>{item.label}</span>
                    </div>
                  );
                })
              )}
          </div>
        </div>
      </div>

      <div className={styles.marqueeContainer2} ref={marqueeRef2}>
        <div className={styles.marqueeTrack2}>
          <div className={styles.marqueeContent2} ref={contentRef2}>
            {Array(4)
              .fill(null)
              .map((_, idx) =>
                items2.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={`${idx}-${i}`} className={styles.itemRow}>
                      <IconComponent className={styles.icon} />
                      <span className={styles.label}>{item.label}</span>
                    </div>
                  );
                })
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagonalMarquee;
