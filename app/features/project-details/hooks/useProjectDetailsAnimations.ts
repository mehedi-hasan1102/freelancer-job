'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useProjectDetailsAnimations = (
  pageRef: RefObject<HTMLDivElement | null>,
  shouldRun: boolean,
) => {
  useEffect(() => {
    if (!shouldRun || !pageRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const titleChars = gsap.utils.toArray('.hero-title-char') as Element[];
      gsap.from(titleChars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('[data-parallax-image]', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });

      const sections = gsap.utils.toArray('[data-reveal-section]') as Element[];
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
        });
      });

      const challengeItems = gsap.utils.toArray('[data-challenge-item]') as Element[];
      challengeItems.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
          opacity: 0,
          x: -30,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, [pageRef, shouldRun]);
};
