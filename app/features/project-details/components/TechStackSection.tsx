'use client';

import type { Project } from '@/lib/site-data';

type TechStackSectionProps = {
  techStack: Project['tech'];
};

export default function TechStackSection({ techStack }: TechStackSectionProps) {
  return (
    <section className="techSection" data-reveal-section>
      <h2 className="techTitle">TECH STACK</h2>
      <div className="techGrid">
        {techStack.map((tech) => (
          <div key={tech} className="techBadge">
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
