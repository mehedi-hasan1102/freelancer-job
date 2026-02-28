'use client';

import Image from 'next/image';
import { FiDownload } from 'react-icons/fi';
import type { Project } from '@/lib/site-data';

type ProjectHeroSectionProps = {
  project: Project;
};

export default function ProjectHeroSection({ project }: ProjectHeroSectionProps) {
  return (
    <section className="heroSection">
      <div className="heroContainer">
        <div className="heroLeft">
          <h1 className="heroTitle">
            {project.title.split('').map((char, index) => (
              <span key={index} className="hero-title-char" style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <p className="categoryLabel" data-hero-animate>
            {project.category}
          </p>
          <p className="heroDescription" data-hero-animate>
            {project.description}
          </p>

          <div className="heroButtons">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FiDownload size={16} aria-hidden="true" />
              <span>LIVE DEMO</span>
            </a>
            {project.frontendUrl ? (
              <a
                href={project.frontendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View Code
              </a>
            ) : null}
          </div>
        </div>

        <div className="heroRight" data-hero-animate>
          <div className="projectPreview">
            <Image
              src={project.image}
              alt={project.title}
              width={1600}
              height={900}
              className="previewImage"
              data-parallax-image
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
