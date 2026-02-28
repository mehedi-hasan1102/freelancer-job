'use client';

const testimonials = [
  {
    quote:
      'Delivered our landing page rebuild quickly, fixed conversion leaks, and kept communication clear every day.',
    name: 'Product Lead, SaaS Startup',
    impact: '+32% demo request rate in the first month',
  },
  {
    quote:
      'Our Next.js site became noticeably faster after the optimization pass and technical SEO cleanup.',
    name: 'Founder, Services Business',
    impact: 'Core Web Vitals moved to green on key pages',
  },
  {
    quote:
      'Refactored our React UI into reusable components so our team can ship updates much faster now.',
    name: 'CTO, Growth Team',
    impact: 'Release cycles reduced from weekly blockers to smooth sprints',
  },
];

const clientSignals = [
  'SaaS',
  'E-commerce',
  'Education',
  'Healthcare',
  'Agency White-label',
  'Personal Brands',
];

const pricing = [
  {
    service: 'Landing Page Conversion Optimization',
    price: 'Starts at $150',
  },
  {
    service: 'Next.js Performance & SEO Fix',
    price: 'Starts at $220',
  },
  {
    service: 'React UI Refactor for Scale',
    price: 'Starts at $300',
  },
];

const timeline = [
  'Discovery call: 20-30 minutes',
  'Audit and scope: 1-2 days',
  'Implementation: 3-7 days',
  'QA and handoff: 1 day',
];

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden py-[clamp(4rem,8vw,8rem)]"
      style={{ background: 'var(--bg)' }}
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
        <div className="mb-10 text-center">
          <h2 className="sectionTitleGlobal">
            TRUST <span style={{ color: 'var(--accent)' }}>& DELIVERY</span>
          </h2>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[20px] border border-[rgba(6,182,212,0.2)] bg-[rgba(6,182,212,0.05)] p-6"
            >
              <p className="mb-4 text-[0.95rem] leading-[1.6] text-[var(--text-secondary)]">&ldquo;{item.quote}&rdquo;</p>
              <p className="font-['Staatliches',serif] text-[0.95rem] tracking-[0.08em] text-[var(--text)]">{item.name}</p>
              <p className="mt-2 text-[0.78rem] uppercase tracking-[0.1em] text-[var(--accent)]">{item.impact}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[20px] border border-[rgba(6,182,212,0.2)] bg-[rgba(6,182,212,0.05)] p-6">
            <h3 className="mb-3 font-['Staatliches',serif] text-[1.1rem] tracking-[0.12em] text-[var(--accent)]">
              CLIENT LOGOS / SIGNALS
            </h3>
            <p className="mb-4 text-[0.9rem] text-[var(--text-secondary)]">
              Public client logos are shared only with permission. Current delivery categories:
            </p>
            <div className="flex flex-wrap gap-2">
              {clientSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-[rgba(6,182,212,0.35)] bg-[rgba(6,182,212,0.08)] px-3 py-1 text-[0.75rem] uppercase tracking-[0.08em] text-[var(--text)]"
                >
                  {signal}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-[20px] border border-[rgba(6,182,212,0.2)] bg-[rgba(6,182,212,0.05)] p-6">
            <h3 className="mb-3 font-['Staatliches',serif] text-[1.1rem] tracking-[0.12em] text-[var(--accent)]">
              PRICING & TIMELINE
            </h3>
            <div className="mb-5 space-y-2">
              {pricing.map((item) => (
                <div key={item.service} className="flex items-start justify-between gap-4 border-b border-[rgba(6,182,212,0.15)] pb-2">
                  <p className="text-[0.88rem] text-[var(--text-secondary)]">{item.service}</p>
                  <p className="text-[0.8rem] uppercase tracking-[0.08em] text-[var(--text)]">{item.price}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2">
              {timeline.map((step) => (
                <li key={step} className="text-[0.84rem] text-[var(--text-secondary)]">
                  - {step}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
