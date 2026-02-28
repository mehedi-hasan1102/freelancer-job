'use client';

import { type CSSProperties, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Skill } from '../types';

gsap.registerPlugin(ScrollTrigger);

type MagneticSkillTagProps = {
  skill: Skill;
  index: number;
};

export default function MagneticSkillTag({ skill, index }: MagneticSkillTagProps) {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tagRef.current) {
      return;
    }

    gsap.set(tagRef.current, { opacity: 0, y: 20, scale: 0.8 });

    const tagTrigger = ScrollTrigger.create({
      trigger: tagRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(tagRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        });
      },
    });

    return () => {
      tagTrigger.kill();
    };
  }, [index]);

  return (
    <div
      ref={tagRef}
      className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-[8px] border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] px-4 py-[0.625rem] transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform hover:bg-[rgba(6,182,212,0.08)]"
      style={{ '--skill-color': skill.color } as CSSProperties}
    >
      <span className="text-base opacity-80">{skill.icon}</span>
      <span className="font-['Staatliches',serif] text-[0.8125rem] tracking-[0.1em] text-[var(--text)]">
        {skill.name}
      </span>
    </div>
  );
}
