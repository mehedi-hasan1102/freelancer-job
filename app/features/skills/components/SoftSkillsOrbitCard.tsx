'use client';

import { useCardGlow } from '@/app/hooks/useCardGlow';
import type { RefObject } from 'react';
import { ORBIT_SKILLS } from '../constants';
import OrbitingSkill from './OrbitingSkill';

type SoftSkillsOrbitCardProps = {
  orbitContainerRef: RefObject<HTMLDivElement | null>;
};

export default function SoftSkillsOrbitCard({
  orbitContainerRef,
}: SoftSkillsOrbitCardProps) {
  const { cardRef, glowRef, handleMouseMove } = useCardGlow<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="group relative col-[3/4] row-[1/3] flex min-h-[400px] items-center justify-center overflow-hidden rounded-[24px] border border-[rgba(6,182,212,0.1)] bg-transparent [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform max-[1200px]:col-[1/3] max-[1200px]:row-[3/4] max-[1200px]:min-h-[350px] max-[768px]:col-[1/-1] max-[768px]:row-auto max-[768px]:min-h-[300px]"
      onMouseMove={handleMouseMove}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_60%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100"
      />
      <div className="relative flex h-[320px] w-[320px] items-center justify-center max-[768px]:h-[260px] max-[768px]:w-[260px]">
        <div ref={orbitContainerRef} className="absolute h-full w-full">
          {ORBIT_SKILLS.map((skill, index) => (
            <OrbitingSkill
              key={skill}
              skill={skill}
              index={index}
              total={ORBIT_SKILLS.length}
            />
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center leading-[1]">
          <span className="block font-['Staatliches',serif] text-[1.5rem] font-semibold tracking-[0.15em] [word-spacing:0em] text-[var(--text-secondary)] max-[768px]:text-[1.25rem]">
            SOFT
          </span>
          <span className="block font-['Staatliches',serif] text-[1.5rem] font-semibold tracking-[0.15em] [word-spacing:0em] text-[var(--accent)] max-[768px]:text-[1.25rem]">
            SKILLS
          </span>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(6,182,212,0.2)] max-[768px]:h-[220px] max-[768px]:w-[220px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(6,182,212,0.1)] max-[768px]:h-[160px] max-[768px]:w-[160px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]" />
    </div>
  );
}
