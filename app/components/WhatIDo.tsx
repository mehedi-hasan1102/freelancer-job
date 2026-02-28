'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  description: string;
  number: string;
}

const services: Service[] = [
  {
    title: 'Landing Page Conversion Optimization',
    description:
      'Audit copy, layout, and CTA flow to improve lead quality and reduce drop-offs across key sections.',
    number: '01',
  },
  {
    title: 'Next.js Performance & SEO Fix',
    description:
      'Resolve Core Web Vitals bottlenecks, metadata issues, and technical SEO gaps for faster ranking-ready pages.',
    number: '02',
  },
  {
    title: 'React UI Refactor for Scale',
    description:
      'Refactor fragile components into reusable, maintainable modules with cleaner state management.',
    number: '03',
  },
  {
    title: 'Frontend Bug Rescue',
    description:
      'Fix production UI bugs, broken interactions, and cross-browser issues without disrupting ongoing delivery.',
    number: '04',
  },
  {
    title: 'Design-to-Code Delivery',
    description:
      'Convert Figma screens into responsive, accessible interfaces with high visual consistency.',
    number: '05',
  },
  {
    title: 'Ongoing Growth Support',
    description:
      'Weekly iteration support for features, optimization, and UX improvements after initial launch.',
    number: '06',
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    
    if (!card) return;

    gsap.set(card, { 
      opacity: 0, 
      y: 80, 
      rotateX: -15,
      scale: 0.9,
    });
    gsap.set(content, { opacity: 0 });

    let revealTimeline: gsap.core.Timeline | null = null;

    const revealTrigger = ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      onEnter: () => {
        revealTimeline = gsap.timeline();

        revealTimeline.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }, 0);

        revealTimeline.to(content, {
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1 + 0.2,
        }, 0);
      },
    });

    return () => {
      revealTimeline?.kill();
      revealTrigger.kill();
    };
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
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
    <div 
      ref={cardRef} 
      className="group relative overflow-hidden rounded-[24px] border border-[rgba(6,182,212,0.1)] bg-transparent [transform-style:preserve-3d] [perspective:1000px] will-change-transform transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] max-[768px]:min-h-[200px] max-[480px]:min-h-[180px]"
      onMouseMove={handleMouseMove}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_60%)] opacity-0 transition-opacity duration-300 [transition-timing-function:ease] group-hover:opacity-100"
      />
      <div ref={contentRef} className="relative z-[2] flex h-full min-h-[250px] flex-col p-8 max-[768px]:min-h-0 max-[768px]:p-6 max-[480px]:p-4">
        <div className="mb-3 flex items-center gap-4 max-[480px]:gap-2">
          <div className="font-['Staatliches',serif] text-5xl leading-none text-[rgba(6,182,212,0.08)] max-[768px]:text-[2.5rem] max-[480px]:text-[2rem]">
            {service.number}
          </div>
          <h3 className="font-['Staatliches',serif] text-[1.5rem] tracking-[0.15em] text-[var(--accent)] max-[768px]:text-[1.25rem] max-[480px]:text-[1rem]">
            {service.title}
          </h3>
        </div>
        <p className="mb-6 grow font-['Inter',sans-serif] text-sm leading-6 text-[var(--text-secondary)] max-[768px]:text-[0.85rem] max-[480px]:text-[0.8rem] max-[480px]:leading-[1.4]">
          {service.description}
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]" />
    </div>
  );
};

export default function WhatIDo() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    gsap.set(header.children, { y: 80, opacity: 0 });

    const headerTrigger = ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(header.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      headerTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-i-do"
      className="relative min-h-screen overflow-hidden py-32 max-[768px]:py-16"
      style={{ background: 'var(--bg)' }}
    >
      

      <div className="relative z-[2] mx-auto max-w-[1400px] px-16 max-[768px]:px-8 max-[480px]:px-4">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 overflow-hidden text-center max-[768px]:mb-12">
          <h2 className="sectionTitleGlobal">
            WHAT <span style={{ color: 'var(--accent)' }}>I DO</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="mb-16 grid grid-cols-3 gap-6 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1 max-[768px]:gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
