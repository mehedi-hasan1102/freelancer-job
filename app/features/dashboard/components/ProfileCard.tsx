'use client';

import Image from 'next/image';
import { CARD, CARD_GLOW, PROFILE_CARD } from '../constants';
import { useCardGlow } from '@/app/hooks/useCardGlow';
import type { UserProfile } from '../types';

type ProfileCardProps = {
  userProfile: UserProfile;
};

export default function ProfileCard({ userProfile }: ProfileCardProps) {
  const { cardRef, glowRef, handleMouseMove } = useCardGlow<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className={`${CARD} ${PROFILE_CARD}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={CARD_GLOW} />
      <div className="relative z-[1] flex flex-col gap-4">
        <Image
          src="/profile/profile.png"
          alt={userProfile.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <div className="text-[1.1rem] font-semibold text-[var(--text)]">{userProfile.name}</div>
        </div>
        <p className="my-2 text-[0.825rem] leading-[1.5] text-[var(--text-secondary)]">{userProfile.bio}</p>
      </div>
    </div>
  );
}
