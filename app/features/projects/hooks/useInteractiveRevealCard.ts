"use client";

import { type MouseEvent, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useInteractiveRevealCard = (index: number) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) {
      return;
    }

    gsap.set(card, { opacity: 0, y: 40, rotateX: -10, scale: 0.9 });
    gsap.set(content, { opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        const timeline = gsap.timeline();

        timeline.to(
          card,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          },
          0,
        );

        timeline.to(
          content,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          0.2,
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
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
      ease: "power2.out",
    });
  };

  return {
    cardRef,
    contentRef,
    glowRef,
    handleMouseMove,
  };
};
