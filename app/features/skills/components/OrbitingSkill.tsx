'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type OrbitingSkillProps = {
  skill: string;
  index: number;
  total: number;
};

export default function OrbitingSkill({ skill, index, total }: OrbitingSkillProps) {
  const skillRef = useRef<HTMLDivElement>(null);
  const angle = (index / total) * 360;
  const radius = 140;

  useEffect(() => {
    const element = skillRef.current;
    if (!element) {
      return;
    }

    gsap.set(element, {
      rotation: -angle,
    });

    const orbitTween = gsap.to(element.parentElement, {
      rotation: '+=360',
      duration: 40,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      orbitTween.kill();
    };
  }, [angle]);

  return (
    <div
      ref={skillRef}
      className="absolute left-1/2 top-1/2 ml-[-50px] mt-[-15px] w-[100px] text-center"
      style={{
        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
      }}
    >
      <span className="inline-block whitespace-nowrap rounded-[6px] border border-[rgba(6,182,212,0.2)] bg-[rgba(6,182,212,0.1)] px-3 py-2 font-['Staatliches',serif] text-[0.6875rem] tracking-[0.15em] text-[var(--text)] max-[768px]:px-2 max-[768px]:py-1.5 max-[768px]:text-[0.5625rem]">
        {skill}
      </span>
    </div>
  );
}
