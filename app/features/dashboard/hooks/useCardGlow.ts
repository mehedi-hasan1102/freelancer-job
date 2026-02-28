"use client";

import { type MouseEvent, useRef } from 'react';
import gsap from 'gsap';

export const useCardGlow = <T extends HTMLElement>() => {
  const cardRef = useRef<T>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<T>) => {
    const card = cardRef.current;
    const glow = glowRef.current;

    if (!card || !glow) {
      return;
    }

    const rect = card.getBoundingClientRect();

    gsap.to(glow, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return {
    cardRef,
    glowRef,
    handleMouseMove,
  };
};
