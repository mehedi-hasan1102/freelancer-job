'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(dateString));

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  index: number;
  animationIndex?: number;
};

export const BlogCard = ({
  slug,
  title,
  excerpt,
  date,
  tags,
  index,
  animationIndex,
}: BlogCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const delayIndex = animationIndex ?? index;

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    gsap.set(card, { opacity: 0, y: 40, rotateX: -10, scale: 0.9 });

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: delayIndex * 0.1,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(card);
    };
  }, [delayIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <Link
      ref={cardRef}
      href={`/blog/${slug}`}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[rgba(34,211,238,0.1)] bg-transparent no-underline [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
      onMouseMove={handleMouseMove}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.4),transparent_50%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100"
      />

      <span
        className="absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] opacity-0 translate-y-[-6px] scale-[0.95] transition-all duration-300 [transition-timing-function:ease] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
        aria-hidden="true"
      >
        <FiExternalLink size={18} />
      </span>

      <div className="relative flex w-full shrink-0 items-start gap-4 overflow-hidden bg-[linear-gradient(135deg,rgba(34,211,238,0.05),rgba(34,211,238,0.02))] p-6 group-hover:bg-[linear-gradient(135deg,rgba(34,211,238,0.1),rgba(34,211,238,0.05))]">
        <span className="min-w-[80px] shrink-0 font-['Staatliches',serif] text-[3rem] leading-none text-[rgba(34,211,238,0.08)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <span className="text-[0.85rem] font-medium text-[var(--text-secondary)]">
            {formatDate(date)}
          </span>
          {tags?.length ? (
            <div className="flex flex-wrap gap-[0.4rem]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[20px] border border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.15)] px-3 py-[0.35rem] text-[0.7rem] font-semibold capitalize tracking-[0.03em] text-[var(--accent)] transition-all duration-[250ms] [transition-timing-function:ease] group-hover:border-[rgba(34,211,238,0.4)] group-hover:bg-[rgba(34,211,238,0.25)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-4 p-6">
        <h2
          className="m-0 overflow-hidden font-['Inter',sans-serif] font-bold tracking-[-0.02em] text-[var(--text)]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontSize: '1.3rem',
            lineHeight: '1.35',
          }}
        >
          {title}
        </h2>
        <p
          className="m-0 flex-grow overflow-hidden text-[0.95rem] leading-[1.5] text-[var(--text-secondary)]"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {excerpt}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(34,211,238,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(34,211,238,0.4)]" />
    </Link>
  );
};
