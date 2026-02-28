'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type UseSkillsSectionAnimationsArgs = {
  headerRef: RefObject<HTMLDivElement | null>;
  orbitContainerRef: RefObject<HTMLDivElement | null>;
};

export const useSkillsSectionAnimations = ({
  headerRef,
  orbitContainerRef,
}: UseSkillsSectionAnimationsArgs) => {
  useEffect(() => {
    const header = headerRef.current;
    const orbitContainer = orbitContainerRef.current;

    if (!header) {
      return;
    }

    gsap.set(header.children, { y: 80, opacity: 0 });

    const headerTrigger = ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(header.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    let orbitTween: gsap.core.Tween | null = null;

    if (orbitContainer) {
      orbitTween = gsap.to(orbitContainer, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });
    }

    return () => {
      headerTrigger.kill();
      orbitTween?.kill();
    };
  }, [headerRef, orbitContainerRef]);
};
