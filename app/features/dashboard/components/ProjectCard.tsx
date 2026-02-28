'use client';

import { FiCode, FiExternalLink, FiGitBranch, FiStar } from 'react-icons/fi';
import { PROJECT_CARD, PROJECT_GLOW, PROJECT_LINK_ICON } from '../constants';
import { useCardGlow } from '@/app/hooks/useCardGlow';
import type { DashboardProject } from '../types';

type ProjectCardProps = {
  project: DashboardProject;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { cardRef, glowRef, handleMouseMove } = useCardGlow<HTMLAnchorElement>();

  return (
    <a
      ref={cardRef}
      className={`${PROJECT_CARD} focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]`}
      onMouseMove={handleMouseMove}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
      aria-label={`Open project ${project.name} in new tab`}
    >
      <div ref={glowRef} className={PROJECT_GLOW} />
      <span className={PROJECT_LINK_ICON} aria-hidden="true">
        <FiExternalLink size={18} />
      </span>
      <h3 className="relative z-[1] mb-2 block font-['Staatliches',serif] text-[1rem] font-semibold tracking-[0.05em] text-[var(--accent)] no-underline">
        {project.name}
      </h3>
      <p className="relative z-[1] mb-3 flex-1 text-[0.8rem] leading-[1.5] text-[var(--text-secondary)]">
        {project.description}
      </p>
      <div className="relative z-[1] flex flex-wrap gap-x-4 gap-y-2 border-t border-[rgba(6,182,212,0.15)] pt-3 text-[0.7rem] text-[var(--text-secondary)]">
        <span className="flex items-center gap-[0.35rem] transition-colors duration-200 [transition-timing-function:ease] group-hover:text-[var(--accent)]">
          <FiCode size={14} /> {project.language}
        </span>
        <span className="flex items-center gap-[0.35rem] transition-colors duration-200 [transition-timing-function:ease] group-hover:text-[var(--accent)]">
          <FiStar size={14} /> {project.stars}
        </span>
        <span className="flex items-center gap-[0.35rem] transition-colors duration-200 [transition-timing-function:ease] group-hover:text-[var(--accent)]">
          <FiGitBranch size={14} /> {project.forks}
        </span>
      </div>
    </a>
  );
}
