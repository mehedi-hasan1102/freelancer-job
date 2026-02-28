'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  type: 'work' | 'education';
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  tech?: string[];
  credentialUrl?: string;
  credentialLabel?: string;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
  limit?: number;
  showViewAllButton?: boolean;
  sortByDate?: boolean;
}

const extractRecentYears = (period: string) => {
  const yearMatches = [...period.matchAll(/\b(19|20)\d{2}\b/g)].map((match) => Number(match[0]));
  const startYear = yearMatches[0] ?? 0;
  const hasPresent = /\b(present|current|now)\b/i.test(period);
  const endYear = hasPresent
    ? new Date().getFullYear() + 1
    : yearMatches.length > 1
      ? yearMatches[yearMatches.length - 1]
      : startYear;

  return { endYear, startYear };
};

const compareByMostRecent = (a: ExperienceItem, b: ExperienceItem) => {
  const aYears = extractRecentYears(a.period);
  const bYears = extractRecentYears(b.period);

  if (bYears.endYear !== aYears.endYear) return bYears.endYear - aYears.endYear;
  if (bYears.startYear !== aYears.startYear) return bYears.startYear - aYears.startYear;
  return b.id - a.id;
};

// Experience Skeleton Loader
const ExperienceSkeleton = () => {
  const shimmerBg = '#94a3b84d';
  const shimmerAnimation = `
    @keyframes shimmer {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `;

  return (
    <div style={{ padding: '4rem 2rem' }}>
      <style>{shimmerAnimation}</style>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header Skeleton */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div
            style={{
              height: '48px',
              background: shimmerBg,
              borderRadius: '8px',
              marginBottom: '1rem',
              animation: 'shimmer 1.5s infinite',
              width: '70%',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Timeline Items Skeleton */}
        <div style={{ position: 'relative', paddingLeft: '3rem' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                marginBottom: '3rem',
                paddingLeft: '2rem',
                position: 'relative',
              }}
            >
              {/* Timeline Dot Skeleton */}
              <div
                style={{
                  position: 'absolute',
                  left: '-32px',
                  top: '0',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: shimmerBg,
                  animation: 'shimmer 1.5s infinite',
                }}
              />

              {/* Content Skeleton */}
              <div style={{ padding: '1.5rem', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px' }}>
                <div
                  style={{
                    height: '24px',
                    background: shimmerBg,
                    borderRadius: '6px',
                    marginBottom: '0.75rem',
                    animation: 'shimmer 1.5s infinite',
                    width: '70%',
                  }}
                />
                <div
                  style={{
                    height: '18px',
                    background: shimmerBg,
                    borderRadius: '6px',
                    marginBottom: '0.75rem',
                    animation: 'shimmer 1.5s infinite',
                    width: '50%',
                  }}
                />
                <div
                  style={{
                    height: '16px',
                    background: shimmerBg,
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    animation: 'shimmer 1.5s infinite',
                    width: '100%',
                  }}
                />
                <div
                  style={{
                    height: '16px',
                    background: shimmerBg,
                    borderRadius: '6px',
                    animation: 'shimmer 1.5s infinite',
                    width: '90%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Experience({
  experiences,
  limit,
  showViewAllButton = false,
  sortByDate = false,
}: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const displayedExperiences = useMemo(() => {
    const shouldSortByDate = Boolean(limit) || sortByDate;
    const baseList = shouldSortByDate ? [...experiences].sort(compareByMostRecent) : experiences;
    if (!limit) return baseList;
    return baseList.slice(0, limit);
  }, [experiences, limit, sortByDate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const glow = glowRefs.current[index];
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glow, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    if (displayedExperiences.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        const children = headerRef.current.children;
        gsap.from(children, {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        });
      }

      // Progress bar animation - fills on scroll
      if (progressFillRef.current && timelineRef.current) {
        gsap.to(progressFillRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 1,
            markers: false, // Set to true for debugging
            invalidateOnRefresh: true,
          },
        });
      }

      // Animate each timeline item
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const line = item.querySelector('.timeline-line');
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
          },
        });

        if (line) {
          tl.to(line, {
            scaleY: 1,
            duration: 0.6,
            ease: 'power3.out',
          });
        }

        if (dot) {
          tl.to(
            dot,
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: 'back.out(2)',
            },
            '-=0.3'
          );
        }

        if (content) {
          tl.to(
            content,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.2'
          );
        }

        // Pulsing dot animation
        if (dot) {
          gsap.to(dot, {
            boxShadow: '0 0 0 15px rgba(6, 182, 212, 0)',
            duration: 2,
            repeat: -1,
            ease: 'ease-out',
          });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [displayedExperiences]);

  if (displayedExperiences.length === 0) {
    return <ExperienceSkeleton />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg)] px-16 py-32 transition-colors duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] max-[900px]:px-8 max-[900px]:py-24 max-[640px]:px-4 max-[640px]:py-12"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div ref={headerRef} className="mb-24 text-center max-[640px]:mb-10">
          <h2 className="sectionTitleGlobal">
            EXPERIENCE & <span style={{ color: 'var(--accent)' }}>EDUCATION</span>
          </h2>
        </div>

        <div ref={timelineRef} className="relative py-8 max-[640px]:py-4">
            <div className="absolute bottom-0 left-1/2 top-0 z-[1] w-[2px] -translate-x-1/2 bg-[rgba(255,255,255,0.08)] transition-colors duration-[600ms] [transition-timing-function:ease] [html.light-mode_&]:bg-[rgba(0,0,0,0.08)] max-[900px]:left-[7px] max-[900px]:translate-x-0 max-[640px]:left-[6px]" />
            <div
              ref={progressFillRef}
              className="pointer-events-none absolute left-1/2 top-0 z-[3] h-full w-[2px] origin-top -translate-x-1/2 scale-y-0 bg-[var(--accent)] max-[900px]:left-[7px] max-[900px]:translate-x-0 max-[640px]:left-[6px]"
            />

            {displayedExperiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className={`relative mb-16 flex max-[900px]:flex-row max-[900px]:items-start ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Timeline Marker */}
                <div className="absolute left-1/2 z-10 flex h-full w-[120px] -translate-x-1/2 flex-col items-center max-[900px]:relative max-[900px]:left-0 max-[900px]:mb-0 max-[900px]:mr-6 max-[900px]:h-auto max-[900px]:w-[14px] max-[900px]:shrink-0 max-[900px]:translate-x-0 max-[900px]:flex-row max-[900px]:items-center max-[900px]:gap-0 max-[640px]:mr-3 max-[640px]:w-[12px]">
                  <div className="timeline-line mb-4 h-[80%] w-[2px] origin-top scale-y-0 bg-[rgba(255,255,255,0.08)] [html.light-mode_&]:bg-[rgba(0,0,0,0.08)] max-[900px]:hidden" />
                  <div className="timeline-dot relative z-[11] h-4 w-4 scale-0 rounded-full border-[3px] border-[var(--bg)] bg-[var(--accent)] opacity-0 shadow-[0_0_0_4px_rgba(6,182,212,0.2)] [html.light-mode_&]:shadow-[0_0_0_4px_rgba(37,99,235,0.2)] max-[900px]:h-[14px] max-[900px]:w-[14px] max-[640px]:h-[12px] max-[640px]:w-[12px]" />
                </div>

                {/* Timeline Content */}
                <div
                  className={`timeline-content relative w-[calc(50%-60px)] opacity-0 max-[900px]:w-[calc(100%-30px)] max-[900px]:translate-x-0 max-[900px]:opacity-100 max-[900px]:flex-1 max-[640px]:w-[calc(100%-25px)] ${
                    index % 2 === 0 ? '-translate-x-[50px]' : 'translate-x-[50px]'
                  }`}
                >
                  <div
                    className="group relative overflow-hidden rounded-[24px] bg-transparent p-8 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] [transform-style:preserve-3d] [perspective:1000px] will-change-transform max-[900px]:p-6 max-[640px]:p-4"
                    onMouseMove={(e) => handleMouseMove(e, index)}
                  >
                    <div
                      ref={(el) => {
                        glowRefs.current[index] = el;
                      }}
                      className="pointer-events-none absolute left-0 top-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform [html.light-mode_&]:bg-[radial-gradient(circle,rgba(37,99,235,0.3),transparent_50%)] group-hover:opacity-100"
                    />
                    {/* Card Header */}
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 max-[640px]:gap-2">
                      <span
                        className={`rounded-[6px] px-4 py-2 font-['Staatliches',sans-serif] text-[0.75rem] font-semibold tracking-[0.1em] transition-all duration-300 [transition-timing-function:ease] max-[640px]:px-[0.6rem] max-[640px]:py-[0.35rem] max-[640px]:text-[0.65rem] ${
                          exp.type === 'education'
                            ? 'bg-[rgba(77,166,255,0.1)] text-[#4da6ff] [html.light-mode_&]:bg-[rgba(59,130,246,0.15)] [html.light-mode_&]:text-[#3b82f6]'
                            : 'bg-[rgba(var(--accent-rgb),0.1)] text-[var(--accent)]'
                        }`}
                      >
                        {exp.type === 'work' ? '💼 WORK' : '🎓 EDUCATION'}
                      </span>
                      <span className="font-['Staatliches',sans-serif] text-[0.875rem] tracking-[0.05em] text-[var(--text-secondary)] max-[640px]:text-[0.75rem]">
                        {exp.period}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="mb-2 font-['Staatliches',sans-serif] text-[1.5rem] font-bold tracking-[0.05em] text-[var(--accent)] transition-colors duration-300 [transition-timing-function:ease] max-[900px]:text-[1.25rem] max-[640px]:text-[1rem]">
                      {exp.title}
                    </h3>

                    {/* Company Info */}
                    <div className="mb-6">
                      <p className="mb-1 text-[1rem] font-semibold text-[var(--accent)] max-[640px]:text-[0.875rem]">{exp.company}</p>
                      <p className="text-[0.875rem] text-[var(--text-secondary)] max-[640px]:text-[0.75rem]">{exp.location}</p>
                    </div>

                    {/* Description */}
                    <p className="mb-6 text-[0.9375rem] leading-[1.6] text-[var(--text-secondary)] transition-colors duration-[600ms] [transition-timing-function:ease] max-[900px]:text-[0.875rem] max-[640px]:mb-4 max-[640px]:text-[0.75rem] max-[640px]:leading-[1.4]">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="mb-6 list-none p-0">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="relative mb-3 pl-6 text-[0.9rem] leading-[1.5] text-[var(--text-secondary)] before:absolute before:left-0 before:font-bold before:text-[var(--accent)] before:content-['→'] max-[900px]:text-[0.85rem] max-[640px]:mb-2 max-[640px]:pl-3 max-[640px]:text-[0.7rem]"
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    {exp.tech && exp.tech.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-3 max-[640px]:gap-[0.4rem]">
                        {exp.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="inline-block rounded-[20px] border border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.1)] px-[0.8rem] py-[0.4rem] font-['Staatliches',sans-serif] text-[0.75rem] font-medium tracking-[0.05em] text-[var(--accent)] transition-all duration-300 [transition-timing-function:ease] max-[900px]:px-[0.6rem] max-[900px]:py-[0.3rem] max-[900px]:text-[0.7rem] max-[640px]:px-[0.45rem] max-[640px]:py-[0.2rem] max-[640px]:text-[0.6rem]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {exp.credentialUrl && (
                      <div className="mt-1 border-t border-[rgba(6,182,212,0.15)] pt-4">
                        <p className="mb-2 font-['Staatliches',sans-serif] text-[0.62rem] tracking-[0.14em] text-[var(--text-secondary)] max-[640px]:mb-1 max-[640px]:text-[0.58rem]">
                          CREDENTIAL
                        </p>
                        <a
                          href={exp.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 font-['Staatliches',sans-serif] text-[0.82rem] tracking-[0.08em] text-[var(--accent)] no-underline transition-colors duration-300 [transition-timing-function:ease] hover:text-[var(--text)] max-[640px]:text-[0.68rem]"
                        >
                          <span className="relative after:absolute after:bottom-[-3px] after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-75 after:bg-[rgba(var(--accent-rgb),0.55)] after:transition-transform after:duration-300 group-hover:after:scale-x-100 max-[640px]:after:bottom-[-2px]">
                            {exp.credentialLabel ?? 'View Credential Document'}
                          </span>
                          <FiExternalLink size={13} className="opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                        </a>
                      </div>
                    )}

                    {/* Card Number */}
                    <div className="pointer-events-none absolute bottom-8 right-8 font-['Staatliches',sans-serif] text-[3rem] font-bold leading-none text-[rgba(6,182,212,0.05)] [html.light-mode_&]:text-[rgba(37,99,235,0.08)] max-[900px]:bottom-6 max-[900px]:right-6 max-[900px]:text-[2rem] max-[640px]:bottom-3 max-[640px]:right-3 max-[640px]:text-[1.25rem]">
                      {String(exp.id).padStart(2, '0')}
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        {showViewAllButton && (
          <div className="mt-8 flex justify-center">
            <Link href="/about" className="btn-primary">
              <FiArrowUpRight size={16} />
              <span>VIEW ALL EXPERIENCE</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
