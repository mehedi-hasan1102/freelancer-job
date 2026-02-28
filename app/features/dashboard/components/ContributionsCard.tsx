'use client';

import Image from 'next/image';
import { FiCode } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import { CARD, CARD_GLOW, SECTION_HEADER, SECTION_TITLE, VIEW_LINK } from '../constants';
import { useCardGlow } from '../hooks/useCardGlow';

type ContributionsCardProps = {
  username: string;
};

export default function ContributionsCard({ username }: ContributionsCardProps) {
  const { cardRef, glowRef, handleMouseMove } = useCardGlow<HTMLDivElement>();

  return (
    <div ref={cardRef} className={CARD} onMouseMove={handleMouseMove}>
      <div ref={glowRef} className={CARD_GLOW} />
      <div className={SECTION_HEADER}>
        <h2 className={SECTION_TITLE}>
          <FiCode /> Contributions
        </h2>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={VIEW_LINK}
        >
          View on GitHub <FaArrowRight className="text-[var(--accent)]" />
        </a>
      </div>
      <div style={{ width: '100%', overflow: 'auto', marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
        <Image
          src={`https://ghchart.rshah.org/22d3ee/${username}`}
          alt="GitHub contribution graph"
          width={1200}
          height={200}
          style={{ width: '100%', height: 'auto' }}
          unoptimized
          loading="lazy"
        />
      </div>
    </div>
  );
}
