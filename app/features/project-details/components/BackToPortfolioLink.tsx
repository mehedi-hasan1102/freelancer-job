'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackToPortfolioLink() {
  return (
    <div className="backSection">
      <Link
        href="/portfolio"
        className="group mt-16 inline-flex cursor-pointer items-center gap-2 rounded-[8px] border border-transparent bg-transparent px-0 py-0 font-['Inter',sans-serif] text-[0.95rem] font-medium text-[var(--accent)] transition-all duration-300 hover:-translate-x-[2px]"
      >
        <FaArrowLeft
          size={16}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        Back to Portfolio
      </Link>
    </div>
  );
}
