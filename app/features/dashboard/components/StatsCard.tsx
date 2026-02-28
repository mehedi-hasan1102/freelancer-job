'use client';

import { FiGithub } from 'react-icons/fi';
import { FaStar, FaCodeBranch, FaUsers, FaBox } from 'react-icons/fa';
import { CARD, CARD_GLOW, SECTION_TITLE, STATS_CARD } from '../constants';
import { useCardGlow } from '../hooks/useCardGlow';
import type { GithubStats } from '../types';

type StatsCardProps = {
  stats: GithubStats;
};

export default function StatsCard({ stats }: StatsCardProps) {
  const { cardRef, glowRef, handleMouseMove } = useCardGlow<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className={`${CARD} ${STATS_CARD}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={CARD_GLOW} />
      <h3 className={`${SECTION_TITLE} relative z-[1] mb-6`}>
        <FiGithub /> GitHub Stats
      </h3>

      <div className="grid grid-cols-4 gap-3 max-[768px]:grid-cols-2 max-[640px]:grid-cols-1">
        <div className="flex flex-col items-center rounded-[8px] bg-[rgba(34,211,238,0.08)] px-2 py-3 text-center">
          <FaStar className="mb-[0.35rem] text-[1.25rem] text-[var(--accent)]" />
          <div className="text-[1.1rem] font-bold leading-[1.2] text-[var(--text)]">
            {stats.stars.toLocaleString()}
          </div>
          <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.05em] text-[var(--text-secondary)]">
            Stars
          </div>
        </div>

        <div className="flex flex-col items-center rounded-[8px] bg-[rgba(34,211,238,0.08)] px-2 py-3 text-center">
          <FaCodeBranch className="mb-[0.35rem] text-[1.25rem] text-[var(--accent)]" />
          <div className="text-[1.1rem] font-bold leading-[1.2] text-[var(--text)]">{stats.forks}</div>
          <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.05em] text-[var(--text-secondary)]">
            Forks
          </div>
        </div>

        <div className="flex flex-col items-center rounded-[8px] bg-[rgba(34,211,238,0.08)] px-2 py-3 text-center">
          <FaUsers className="mb-[0.35rem] text-[1.25rem] text-[var(--accent)]" />
          <div className="text-[1.1rem] font-bold leading-[1.2] text-[var(--text)]">
            {stats.followers.toLocaleString()}
          </div>
          <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.05em] text-[var(--text-secondary)]">
            Followers
          </div>
        </div>

        <div className="flex flex-col items-center rounded-[8px] bg-[rgba(34,211,238,0.08)] px-2 py-3 text-center">
          <FaBox className="mb-[0.35rem] text-[1.25rem] text-[var(--accent)]" />
          <div className="text-[1.1rem] font-bold leading-[1.2] text-[var(--text)]">{stats.repos}</div>
          <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.05em] text-[var(--text-secondary)]">
            Repos
          </div>
        </div>
      </div>
    </div>
  );
}
