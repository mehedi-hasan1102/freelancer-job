"use client";

import { type ElementType, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import type { Certificate } from "@/lib/site-data";
import { useRevealHeader } from "@/app/hooks/useRevealHeader";
import { useInteractiveRevealCard } from "@/app/features/projects/hooks/useInteractiveRevealCard";

type RecognitionSectionProps = {
  certificates: Certificate[];
  headingTag?: ElementType;
  title: string;
  highlight: string;
  description?: string;
  sectionId: string;
  showViewAllButton?: boolean;
  limit?: number;
};

type CertificateCardProps = {
  certificate: Certificate;
  index: number;
};

const CertificateCard = ({ certificate, index }: CertificateCardProps) => {
  const { cardRef, contentRef, glowRef, handleMouseMove } =
    useInteractiveRevealCard(index);

  const cardBody = (
    <div
      ref={cardRef}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[rgba(6,182,212,0.1)] bg-transparent [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
      onMouseMove={handleMouseMove}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100"
      />
      {certificate.credentialUrl ? (
        <span
          className="absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] opacity-0 translate-y-[-6px] scale-[0.95] transition-all duration-300 [transition-timing-function:ease] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
          aria-hidden="true"
        >
          <FiExternalLink size={18} />
        </span>
      ) : null}

      <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-[linear-gradient(135deg,rgba(6,182,212,0.05),rgba(6,182,212,0.02))] max-[1024px]:h-[clamp(120px,25vw,150px)] max-[768px]:h-[clamp(100px,20vw,150px)] max-[480px]:h-[clamp(80px,40vw,120px)]">
        <Image
          src={certificate.image}
          alt={certificate.title}
          fill
          className="h-full w-full object-cover object-center transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index === 0}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-[2] flex flex-1 flex-col justify-between bg-[var(--card-bg,transparent)] p-8 max-[1024px]:p-[clamp(1.25rem,3vw,1.5rem)] max-[768px]:p-[clamp(1rem,2.5vw,1.5rem)] max-[480px]:p-[clamp(0.875rem,2vw,1.5rem)]"
      >
        <div className="mb-3 flex items-start gap-4 max-[768px]:flex-col max-[768px]:gap-[clamp(0.5rem,1vw,1rem)]">
          <span className="min-w-[80px] font-['Staatliches',serif] text-[3rem] leading-none text-[rgba(6,182,212,0.08)] max-[1024px]:text-[clamp(1.5rem,4vw,2rem)] max-[768px]:min-w-[clamp(50px,10vw,80px)] max-[768px]:text-[clamp(1.25rem,3.5vw,2rem)] max-[480px]:min-w-[clamp(45px,8vw,60px)] max-[480px]:text-[clamp(1rem,3vw,1.5rem)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="flex-1 font-['Staatliches',serif] text-[1.5rem] tracking-[0.15em] text-[var(--accent)] max-[1024px]:text-[clamp(1rem,2.5vw,1.25rem)] max-[768px]:text-[clamp(0.9rem,2vw,1.25rem)] max-[480px]:text-[clamp(0.8rem,1.8vw,1rem)]">
            {certificate.title}
          </h3>
        </div>
        <p className="mb-2 font-['Inter',sans-serif] text-[0.875rem] uppercase tracking-[0.1em] text-[var(--text-secondary)] max-[768px]:text-[clamp(0.75rem,1vw,0.875rem)] max-[480px]:text-[clamp(0.7rem,0.9vw,0.75rem)]">
          {certificate.issuer}
        </p>
        <p className="mb-6 font-['Inter',sans-serif] text-[0.8rem] text-[var(--text-secondary)] max-[1024px]:text-[clamp(0.7rem,1vw,0.8rem)] max-[768px]:text-[clamp(0.7rem,0.9vw,0.8rem)] max-[480px]:text-[clamp(0.65rem,0.9vw,0.75rem)]">
          {certificate.year}
        </p>
        <div className="mt-auto flex flex-wrap gap-[0.625rem]">
          {certificate.skills.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-[8px] border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] px-4 py-[0.625rem] font-['Staatliches',serif] text-[0.8125rem] tracking-[0.1em] text-[var(--text)] transition-all duration-300 [transition-timing-function:ease] hover:bg-[rgba(6,182,212,0.08)] max-[1024px]:px-[clamp(0.75rem,1.5vw,1rem)] max-[1024px]:py-[clamp(0.5rem,1vw,0.625rem)] max-[1024px]:text-[clamp(0.7rem,1vw,0.8125rem)] max-[768px]:gap-[clamp(0.3rem,0.5vw,0.5rem)] max-[768px]:px-[clamp(0.75rem,1.2vw,1rem)] max-[768px]:py-[clamp(0.5rem,0.8vw,0.625rem)] max-[768px]:text-[clamp(0.65rem,0.9vw,0.8125rem)] max-[480px]:px-[clamp(0.6rem,1vw,1rem)] max-[480px]:py-[clamp(0.4rem,0.7vw,0.625rem)] max-[480px]:text-[clamp(0.6rem,0.8vw,0.75rem)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]" />
    </div>
  );

  if (!certificate.credentialUrl) {
    return <div className="block text-inherit no-underline">{cardBody}</div>;
  }

  return (
    <a
      href={certificate.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-inherit no-underline"
    >
      {cardBody}
    </a>
  );
};

export default function RecognitionSection({
  certificates,
  headingTag = "h2",
  title,
  highlight,
  description,
  sectionId,
  showViewAllButton = false,
  limit,
}: RecognitionSectionProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const Heading = headingTag;

  useRevealHeader(headingRef);

  const displayedCertificates = useMemo(
    () => (limit ? certificates.slice(0, limit) : certificates),
    [certificates, limit],
  );

  if (displayedCertificates.length === 0) {
    return null;
  }

  return (
    <section
      id={sectionId}
      className="relative min-h-screen overflow-hidden py-[clamp(4rem,8vw,8rem)]"
      style={{ background: "var(--bg)" }}
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
        <div ref={headingRef} className="mb-10 overflow-hidden text-center">
          <Heading className="sectionTitleGlobal">
            {title}
            <span style={{ color: "var(--accent)" }}>{highlight}</span>
          </Heading>
          {description ? (
            <p className="mx-auto mt-4 max-w-[760px] text-center text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] max-[1024px]:grid-cols-2 max-[1024px]:gap-[clamp(1rem,2vw,1.25rem)] max-[768px]:grid-cols-2 max-[768px]:gap-[clamp(0.875rem,2vw,1.25rem)] max-[480px]:grid-cols-1 max-[480px]:gap-[clamp(0.875rem,2vw,1.25rem)]">
          {displayedCertificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>

        {showViewAllButton ? (
          <div className="mt-8 flex justify-center">
            <Link href="/recognition" className="btn-primary">
              <FiArrowUpRight size={16} />
              <span>VIEW ALL RECOGNITION</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
