'use client';

import { useRef } from 'react';
import SkillBentoCard from './components/SkillBentoCard';
import SkillsSkeleton from './components/SkillsSkeleton';
import SoftSkillsOrbitCard from './components/SoftSkillsOrbitCard';
import { useSkillsData } from './hooks/useSkillsData';
import { useSkillsSectionAnimations } from './hooks/useSkillsSectionAnimations';

export default function SkillsSectionClient() {
  const headerRef = useRef<HTMLDivElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  const { loading, categories } = useSkillsData();

  useSkillsSectionAnimations({
    headerRef,
    orbitContainerRef,
  });

  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden py-32 max-[768px]:py-20"
      style={{ background: 'var(--bg)' }}
    >
      {loading ? <SkillsSkeleton /> : null}

      {!loading ? (
        <div className="relative z-[2] mx-auto max-w-[1400px] px-16 max-[768px]:px-6">
          <div ref={headerRef} className="mb-20 overflow-hidden text-center">
            <h2 className="sectionTitleGlobal">
              MY <span style={{ color: 'var(--accent)' }}>SKILLS</span>
            </h2>
          </div>

          <div className="mb-16 grid grid-cols-3 grid-rows-2 gap-6 max-[1200px]:grid-cols-2 max-[1200px]:grid-rows-3 max-[768px]:grid-flow-row max-[768px]:grid-cols-1 max-[768px]:grid-rows-none max-[768px]:gap-4">
            {categories.map((category, index) => (
              <SkillBentoCard
                key={category.title}
                category={category}
                index={index}
                isLarge={index === 0 || index === 3}
              />
            ))}

            <SoftSkillsOrbitCard orbitContainerRef={orbitContainerRef} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
