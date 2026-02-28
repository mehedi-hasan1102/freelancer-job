'use client';

import { FiClock, FiExternalLink, FiGitCommit } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import { CARD, CARD_GLOW, SECTION_HEADER, SECTION_TITLE, VIEW_LINK } from '../constants';
import { useCardGlow } from '@/app/hooks/useCardGlow';
import type { LatestCommit } from '../types';
import { formatCommitDate, formatRelativeTime } from '../utils';

type LatestCommitCardProps = {
  latestCommits: LatestCommit[];
  errorMessage: string | null;
  username: string;
};

export default function LatestCommitCard({
  latestCommits,
  errorMessage,
  username,
}: LatestCommitCardProps) {
  const { cardRef, glowRef, handleMouseMove } = useCardGlow<HTMLDivElement>();

  return (
    <div ref={cardRef} className={CARD} onMouseMove={handleMouseMove}>
      <div ref={glowRef} className={CARD_GLOW} />
      <div className={SECTION_HEADER}>
        <h2 className={SECTION_TITLE}>
          <FiGitCommit /> Latest Commits
        </h2>
        {latestCommits.length > 0 ? (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={VIEW_LINK}
          >
            View profile <FaArrowRight className="text-[var(--accent)]" />
          </a>
        ) : null}
      </div>

      {latestCommits.length > 0 ? (
        <div className="relative z-[1] space-y-5">
          {latestCommits.map((commit, index) => (
            <div
              key={`${commit.repoName}-${commit.sha}`}
              className={`pb-5 ${index < latestCommits.length - 1 ? 'border-b border-[rgba(6,182,212,0.15)]' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-['Staatliches',serif] text-[clamp(0.95rem,1.8vw,1.15rem)] tracking-[0.04em] text-[var(--accent)]">
                  {commit.message}
                </p>
                <a
                  href={commit.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[0.75rem] text-[var(--accent)] transition-all duration-200 hover:gap-2"
                >
                  Open <FiExternalLink size={13} />
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                <span className="rounded-full border border-[rgba(6,182,212,0.25)] px-3 py-1">
                  {commit.repoName}
                </span>
                <span className="rounded-full border border-[rgba(6,182,212,0.25)] px-3 py-1">
                  #{commit.sha.slice(0, 7)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(6,182,212,0.25)] px-3 py-1">
                  <FiClock size={12} /> {formatRelativeTime(commit.committedAt)}
                </span>
              </div>
              <p className="mt-3 text-[0.8rem] text-[var(--text-secondary)]">
                {formatCommitDate(commit.committedAt)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="relative z-[1] text-[0.9rem] text-[var(--text-secondary)]">
          {errorMessage || 'Could not load latest commit right now.'}
        </p>
      )}
    </div>
  );
}
