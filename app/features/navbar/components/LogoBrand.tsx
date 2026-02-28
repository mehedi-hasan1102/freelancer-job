'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type MouseEvent } from 'react';

type LogoBrandProps = {
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function LogoBrand({ onClick }: LogoBrandProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/"
        onClick={onClick}
        className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[rgba(var(--accent-rgb),0.1)] px-2.5 py-1.5 text-base font-bold tracking-[0.05em] text-[var(--accent)] transition-all duration-300 hover:bg-[rgba(var(--accent-rgb),0.2)] hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.2),inset_0_0_10px_rgba(var(--accent-rgb),0.1)] active:opacity-85 sm:px-4 sm:py-2 sm:text-lg"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.1)';
        }}
      >
        <Image
          src="/profile/profile.png"
          alt="Mehedi Hasan's profile logo"
          width={28}
          height={28}
          className="rounded-full sm:mr-2"
        />
        <span className="hidden sm:inline">Mehedi Hasan</span>
      </Link>
    </div>
  );
}
