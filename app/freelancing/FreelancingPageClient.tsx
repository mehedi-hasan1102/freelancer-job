'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiExternalLink,
} from 'react-icons/fi';
import { SiFiverr, SiFreelancer, SiUpwork } from 'react-icons/si';

type MarketplaceAccount = {
  platform: string;
  profileUrl: string;
  status: string;
  startingFrom: string;
  skills: string[];
  icon: IconType;
};

type ServiceOffer = {
  title: string;
  outcome: string;
  timeline: string;
  startingFrom: string;
};

type PanelProps = {
  children: ReactNode;
  className?: string;
};

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mehedi-hasan1102/30min';
const CUSTOM_ESTIMATE_MAILTO =
  'mailto:mehedi.hasan11023@gmail.com?subject=Custom%20Estimate%20Request&body=Hi%20Mehedi%2C%0A%0AI%20need%20a%20custom%20estimate%20for%20my%20project.%0AProject%20type%3A%0ABudget%20range%3A%0ATimeline%3A%0A%0AThanks.';

const SERVICE_OFFERS: ServiceOffer[] = [
  {
    title: 'Landing Page Conversion Optimization',
    outcome: 'Improve lead quality and reduce drop-off in key CTA sections.',
    timeline: 'Typical delivery: 3-5 days',
    startingFrom: '$150',
  },
  {
    title: 'Next.js Performance & SEO Fix',
    outcome: 'Resolve Core Web Vitals and technical SEO bottlenecks for growth.',
    timeline: 'Typical delivery: 4-7 days',
    startingFrom: '$220',
  },
  {
    title: 'React UI Refactor for Scale',
    outcome: 'Refactor brittle components into reusable, maintainable architecture.',
    timeline: 'Typical delivery: 5-8 days',
    startingFrom: '$300',
  },
];

const DELIVERY_FLOW = [
  '20-30 minute discovery call',
  'Scope + estimate in 24 hours',
  'Implementation with daily progress updates',
  'QA, handoff, and support checklist',
];

const MARKETPLACE_ACCOUNTS: MarketplaceAccount[] = [
  {
    platform: 'Upwork',
    profileUrl: 'https://www.upwork.com/freelancers/~01a06e52efb30467a7',
    status: 'Open for long-term work',
    startingFrom: '$10/hr',
    skills: ['Next.js', 'React', 'Bug Fixing', 'Landing Pages'],
    icon: SiUpwork,
  },
  {
    platform: 'Fiverr',
    profileUrl: 'https://www.fiverr.com/mehedihub',
    status: 'Available now',
    startingFrom: '$15/package',
    skills: ['React UI', 'Tailwind CSS', 'Responsive Design', 'Frontend Fixes'],
    icon: SiFiverr,
  },
  {
    platform: 'Freelancer.com',
    profileUrl: 'https://www.freelancer.com/u/mehedihasan1102',
    status: 'Available for fixed-price work',
    startingFrom: '$20/project',
    skills: ['Website Fixes', 'Landing Pages', 'React', 'Bug Resolution'],
    icon: SiFreelancer,
  },
  {
    platform: 'PeoplePerHour',
    profileUrl: 'https://www.peopleperhour.com/freelancer/mehedi-hasan-zxyvvmjx',
    status: 'Open for hourly and fixed work',
    startingFrom: '$20/project',
    skills: ['Frontend Development', 'Bug Fixes', 'React', 'Next.js'],
    icon: FiBriefcase,
  },
  {
    platform: 'Contra',
    profileUrl: 'https://contra.com/mehedi_hasan_568rmm1d',
    status: 'Open for independent projects',
    startingFrom: '$20/project',
    skills: ['Frontend Development', 'React', 'Next.js', 'UI Fixes'],
    icon: FiBriefcase,
  },
];

const PAGE =
  'relative min-h-screen overflow-hidden bg-[var(--bg)] pb-24 pt-28 md:pb-28 md:pt-32';
const CONTAINER =
  'relative z-[2] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)]';
const PANEL =
  'group relative overflow-hidden rounded-[24px] border-[1.5px] border-[rgba(6,182,212,0.25)] bg-transparent transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:border-[rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]';
const PANEL_GLOW =
  'pointer-events-none absolute h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_55%)] opacity-0 blur-[22px] [mix-blend-mode:screen] transition-opacity duration-300 group-hover:opacity-100';

function Panel({ children, className = '' }: PanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    panelRef.current.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
    panelRef.current.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={panelRef}
      className={`${PANEL} ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className={PANEL_GLOW}
        style={{
          left: 'var(--glow-x, 50%)',
          top: 'var(--glow-y, 50%)',
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

export default function FreelancingPage() {
  return (
    <main className={PAGE}>
      <div className={CONTAINER}>
        <header className="mb-10 md:mb-12">
          <h1 className="sectionTitleGlobal">
            Freelancing <span className="text-[var(--accent)]">Services</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
            I help founders and teams ship conversion-focused frontend experiences with clear
            scope, transparent pricing, and dependable delivery.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em]">
            <span className="rounded-full border border-[rgba(var(--accent-rgb),0.22)] bg-[rgba(var(--accent-rgb),0.08)] px-3 py-1 text-[var(--text-secondary)]">
              Response within 24h
            </span>
            <span className="rounded-full border border-[rgba(var(--accent-rgb),0.22)] bg-[rgba(var(--accent-rgb),0.08)] px-3 py-1 text-[var(--text-secondary)]">
              US timezone overlap
            </span>
            <span className="rounded-full border border-[rgba(var(--accent-rgb),0.22)] bg-[rgba(var(--accent-rgb),0.08)] px-3 py-1 text-[var(--text-secondary)]">
              Next.js / React / TypeScript
            </span>
          </div>
        </header>

        <section className="mb-10 md:mb-12">
          <h2 className="mb-4 font-['Staatliches'] text-[1.5rem] tracking-[0.08em] text-[var(--accent)]">
            Service Packages
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SERVICE_OFFERS.map((offer, index) => (
              <Panel key={offer.title} className="h-full p-5 md:p-6">
                <div className="mb-4 flex items-end gap-3">
                  <span className="font-['Staatliches'] text-[2.2rem] leading-none text-[rgba(var(--accent-rgb),0.16)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-['Staatliches'] text-[1.2rem] leading-none tracking-[0.05em] text-[var(--accent)]">
                    {offer.title}
                  </h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">{offer.outcome}</p>
                <p className="mb-2 flex items-center gap-2 text-sm text-[var(--text)]">
                  <FiDollarSign className="text-[var(--accent)]" />
                  Starting from {offer.startingFrom}
                </p>
                <p className="flex items-center gap-2 text-sm text-[var(--text)]">
                  <FiClock className="text-[var(--accent)]" />
                  {offer.timeline}
                </p>
              </Panel>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-12">
          <Panel className="p-5 md:p-6">
            <h2 className="mb-4 font-['Staatliches'] text-[1.5rem] tracking-[0.08em] text-[var(--accent)]">
              Delivery Flow
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {DELIVERY_FLOW.map((step) => (
                <p key={step} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-[var(--accent)]" />
                  <span>{step}</span>
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <FiCalendar size={16} />
                <span>BOOK A 20-MIN CALL</span>
              </Link>
              <a href={CUSTOM_ESTIMATE_MAILTO} className="btn-secondary">
                <FiArrowUpRight size={16} />
                <span>GET A CUSTOM ESTIMATE</span>
              </a>
            </div>
          </Panel>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 font-['Staatliches'] text-[1.5rem] tracking-[0.08em] text-[var(--accent)]">
            Marketplace Profiles
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {MARKETPLACE_ACCOUNTS.map((account, index) => {
              const Icon = account.icon;
              return (
                <Link
                  key={account.platform}
                  href={account.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Panel className="h-full cursor-pointer p-0">
                    <span
                      className="absolute right-4 top-4 z-[3] grid h-9 w-9 -translate-y-1.5 scale-95 place-items-center rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <FiExternalLink size={18} />
                    </span>

                    <div className="relative flex h-[132px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(6,182,212,0.05),rgba(6,182,212,0.02))] transition-all duration-300 group-hover:bg-[linear-gradient(135deg,rgba(6,182,212,0.1),rgba(6,182,212,0.05))]">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(var(--accent-rgb),0.12)] text-[var(--accent)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[rgba(var(--accent-rgb),0.2)]">
                        <Icon size={32} />
                      </span>
                    </div>

                    <div className="relative z-[2] border-t border-[rgba(var(--accent-rgb),0.08)] px-5 py-5 md:px-6 md:py-6">
                      <div className="flex items-end gap-4">
                        <span className="font-['Staatliches'] text-[2.6rem] leading-none tracking-[0.03em] text-[rgba(var(--accent-rgb),0.12)]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-['Staatliches'] text-[1.85rem] leading-none tracking-[0.04em] text-[var(--accent)]">
                            {account.platform}
                          </h3>
                          <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                            {account.status}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 flex items-center gap-2 text-sm text-[var(--text)]">
                        <FiDollarSign className="text-[var(--accent)]" /> Starting from {account.startingFrom}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {account.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-[rgba(var(--accent-rgb),0.22)] px-3 py-1 text-[11px] uppercase tracking-[0.09em] text-[var(--text-secondary)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Panel>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
