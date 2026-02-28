'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCardGlow } from '@/app/hooks/useCardGlow';
import type { SkillCategory } from '../types';
import MagneticSkillTag from './MagneticSkillTag';

gsap.registerPlugin(ScrollTrigger);

type SkillBentoCardProps = {
  category: SkillCategory;
  index: number;
  isLarge: boolean;
};

export default function SkillBentoCard({
  category,
  index,
  isLarge,
}: SkillBentoCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { cardRef, glowRef, handleMouseMove } = useCardGlow<HTMLDivElement>();

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card) {
      return;
    }

    gsap.set(card, {
      opacity: 0,
      y: 80,
      rotateX: -15,
      scale: 0.9,
    });

    gsap.set(content, { opacity: 0 });

    const cardTrigger = ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
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
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          },
          0,
        );

        timeline.to(
          content,
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          0.2,
        );
      },
    });

    return () => {
      cardTrigger.kill();
    };
  }, [cardRef, index]);

  const cardPositionClass =
    index === 0
      ? 'col-[1/2] row-[1/2] max-[768px]:col-[1/2] max-[768px]:row-auto'
      : index === 1
        ? 'col-[2/3] row-[1/2] max-[768px]:col-[1/2] max-[768px]:row-auto'
        : index === 2
          ? 'col-[1/2] row-[2/3] max-[768px]:col-[1/2] max-[768px]:row-auto'
          : index === 3
            ? 'col-[2/3] row-[2/3] max-[768px]:col-[1/2] max-[768px]:row-auto'
            : '';

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-[24px] border border-[rgba(6,182,212,0.1)] bg-transparent [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${cardPositionClass} ${isLarge ? 'col-span-1' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_60%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100"
      />
      <div ref={contentRef} className="relative z-[2] flex h-full flex-col p-8 max-[768px]:p-6">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-['Staatliches',serif] text-[3rem] leading-none text-[rgba(6,182,212,0.08)] max-[768px]:text-[2rem]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-['Staatliches',serif] text-[1.5rem] tracking-[0.15em] text-[var(--accent)] max-[768px]:text-[1.25rem]">
            {category.title}
          </h3>
        </div>
        <p className="mb-6 font-['Inter',sans-serif] text-[0.875rem] leading-[1.5] text-[var(--text-secondary)]">
          {category.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-[0.625rem]">
          {category.skills.map((skill, skillIndex) => (
            <MagneticSkillTag key={skill.name} skill={skill} index={skillIndex} />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]" />
    </div>
  );
}
