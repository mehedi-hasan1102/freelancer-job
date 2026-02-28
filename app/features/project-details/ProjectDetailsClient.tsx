'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiDownload } from 'react-icons/fi';
import { FaArrowLeft } from "react-icons/fa";
import type { Project } from '@/lib/site-data';

gsap.registerPlugin(ScrollTrigger);

type ProjectDetailsClientProps = {
  project: Project;
};

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    if (!project || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero title split animation
      const titleChars = gsap.utils.toArray('.hero-title-char') as Element[];
      gsap.from(titleChars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'power4.out',
      });

      // Simple image reveal animation - matching screenshot style
      gsap.from('[data-parallax-image]', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });

      // Reveal sections with scale
      const sections = gsap.utils.toArray('[data-reveal-section]') as Element[];
      if (sections.length > 0) {
        sections.forEach((section) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 60,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
          });
        });
      }

      // Challenge items reveal
      const challengeItems = gsap.utils.toArray('[data-challenge-item]') as Element[];
      if (challengeItems.length > 0) {
        challengeItems.forEach((item) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            },
            opacity: 0,
            x: -30,
            duration: 0.6,
            ease: 'power2.out',
          });
        });
      }

    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  // Card glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.projectDetailsPage .bottomCard');
      cards.forEach((card) => {
        const glow = card.querySelector('.bottomGlow') as HTMLElement;
        if (!glow) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if mouse is within card bounds
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          gsap.to(glow, {
            left: x - 60,
            top: y - 60,
            duration: 0.3,
            ease: 'power2.out',
          });
          glow.style.opacity = '0.8';
        } else {
          glow.style.opacity = '0';
        }
      });
    };

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll('.projectDetailsPage .bottomCard');
      cards.forEach((card) => {
        const glow = card.querySelector('.bottomGlow') as HTMLElement;
        if (glow) {
          glow.style.opacity = '0';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const problemPoints =
    project.challenges.length > 0
      ? project.challenges.slice(0, 3)
      : [
          'Unclear information hierarchy reduced user confidence during core interactions.',
          'Performance bottlenecks slowed down key screens on mobile and low-power devices.',
          'UI patterns were inconsistent across pages and increased maintenance overhead.',
        ];

  const solutionPoints = [
    `Implemented a focused delivery plan using ${project.tech.join(', ')}.`,
    `Resolved the highest-impact ${problemPoints.length} problem areas with iterative QA.`,
    'Standardized components and interaction patterns for cleaner scaling.',
  ];

  const resultPoints = [
    `${project.tech.length}+ core technologies integrated in the production build.`,
    `${problemPoints.length} primary product challenges addressed end-to-end.`,
    `${(project.futurePlans?.length ?? 0) || 3} roadmap improvements documented for the next release.`,
  ];

  return (
    <div ref={pageRef} className="projectDetailsPage">
      {/* Back Button */}
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

      {/* Hero Section */}
      <section className="heroSection">
        <div className="heroContainer">
          <div className="heroLeft">
            <h1 className="heroTitle">
              {project.title.split('').map((char, i) => (
                <span key={i} className="hero-title-char" style={{ display: 'inline-block' }}>
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
              {project.frontendUrl && (
                <a
                  href={project.frontendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View Code
                </a>
              )}
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
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="techSection" data-reveal-section>
        <h2 className="techTitle">TECH STACK</h2>
        <div className="techGrid">
          {project.tech.map((tech) => (
            <div key={tech} className="techBadge">
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section className="screenshotsSection" data-reveal-section>
        <h2 className="sectionTitle">SCREENSHOTS</h2>
        <div className="screenshotsGrid">
          <div className="screenshot">
            <Image
              src={project.screenshot1}
              alt={`${project.title} screenshot 1`}
              width={1400}
              height={900}
            />
          </div>
          <div className="screenshot">
            <Image
              src={project.screenshot2}
              alt={`${project.title} screenshot 2`}
              width={1400}
              height={900}
            />
          </div>
          <div className="screenshot">
            <Image
              src={project.screenshot3}
              alt={`${project.title} screenshot 3`}
              width={1400}
              height={900}
            />
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="bottomSection" data-reveal-section>
        <h2 className="sectionTitle">CASE STUDY</h2>
        <div className="bottomGrid">
          <div className="bottomCard">
            <div className="bottomGlow"></div>
            <div className="cardIcon">💡</div>
            <h3 className="cardTitle">Problem</h3>
            <ul className="cardList">
              {problemPoints.map((challenge, index) => (
                <li key={index} data-challenge-item>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          <div className="bottomCard">
            <div className="bottomGlow"></div>
            <div className="cardIcon">🛠️</div>
            <h3 className="cardTitle">Solution</h3>
            <ul className="cardList">
              {solutionPoints.map((learning, index) => (
                <li key={index} data-challenge-item>
                  {learning}
                </li>
              ))}
            </ul>
          </div>

          <div className="bottomCard">
            <div className="bottomGlow"></div>
            <div className="cardIcon">📈</div>
            <h3 className="cardTitle">Result</h3>
            <ul className="cardList">
              {resultPoints.map((result, index) => (
                <li key={index} data-challenge-item>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <style jsx global>{`
        .projectDetailsPage {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding: 2.5rem 0 5rem;
        }

        .projectDetailsPage .backSection {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 4rem;
          margin-bottom: 3rem;
        }

        .projectDetailsPage .backLink {
          color: var(--accent);
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .projectDetailsPage .backLink:hover {
          color: #22d3ee;
          transform: translateX(-4px);
        }

        .projectDetailsPage .heroSection {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 4rem 4rem;
        }

        .projectDetailsPage .heroContainer {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }

        .projectDetailsPage .heroLeft {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .projectDetailsPage .categoryLabel {
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent);
        }

        .projectDetailsPage .heroTitle {
          font-family: 'Staatliches', serif;
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 400;
          line-height: 1.05;
          text-transform: uppercase;
          margin: 0;
        }

        .projectDetailsPage .heroDescription {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 540px;
        }

        .projectDetailsPage .heroButtons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .projectDetailsPage .heroRight {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .projectDetailsPage .projectPreview {
          width: 100%;
          aspect-ratio: 16 / 9;
          max-height: 450px;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--card-border);
          background: rgba(255, 255, 255, 0.02);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);
        }

        .projectDetailsPage .previewImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .projectDetailsPage .techSection {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 4rem;
        }

        .projectDetailsPage .techTitle {
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .projectDetailsPage .techGrid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .projectDetailsPage .techBadge {
          display: inline-block;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
          color: var(--accent);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          font-family: 'Staatliches', sans-serif;
        }

        html.light-mode .projectDetailsPage .techBadge {
          background: rgba(37, 99, 235, 0.1);
          border-color: rgba(37, 99, 235, 0.3);
        }

        .projectDetailsPage .sectionTitle {
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .projectDetailsPage .screenshotsSection {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 4rem;
        }

        .projectDetailsPage .screenshotsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.4rem;
        }

        .projectDetailsPage .screenshot {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--card-border);
          background: rgba(255, 255, 255, 0.02);
          transition: transform 0.2s ease;
        }

        .projectDetailsPage .screenshot:hover {
          transform: translateY(-6px);
        }

        .projectDetailsPage .screenshot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .projectDetailsPage .bottomSection {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 4rem 6rem;
        }

        .projectDetailsPage .bottomGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .projectDetailsPage .bottomCard {
          padding: 2.2rem;
          border-radius: 24px;
          border: 1px solid rgba(6, 182, 212, 0.1);
          background: transparent;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .projectDetailsPage .bottomCard::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(6, 182, 212, 0.1);
          border-radius: 24px;
          pointer-events: none;
          transition: border-color 0.4s ease;
        }

        .projectDetailsPage .bottomCard:hover::before {
          border-color: rgba(6, 182, 212, 0.4);
        }

        .projectDetailsPage .bottomGlow {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.5), transparent 60%);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(25px);
          opacity: 0;
          mix-blend-mode: screen;
          will-change: left, top, opacity;
          top: 0;
          left: 0;
        }

        .projectDetailsPage .cardIcon {
          font-size: 1.8rem;
          margin-bottom: 0.9rem;
        }

        .projectDetailsPage .cardTitle {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .projectDetailsPage .cardList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .projectDetailsPage .cardList li {
          padding-left: 1.4rem;
          position: relative;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .projectDetailsPage .cardList li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent);
        }

        @media (max-width: 1024px) {
          .projectDetailsPage .heroContainer {
            grid-template-columns: 1fr;
          }

          .projectDetailsPage .heroSection,
          .projectDetailsPage .techSection,
          .projectDetailsPage .screenshotsSection,
          .projectDetailsPage .bottomSection {
            padding: 3rem 2rem;
          }

          .projectDetailsPage .projectPreview {
            max-height: 350px;
          }
        }

        @media (max-width: 768px) {
          .projectDetailsPage .backSection {
            padding: 0 2rem;
          }

          .projectDetailsPage .heroSection,
          .projectDetailsPage .techSection,
          .projectDetailsPage .screenshotsSection,
          .projectDetailsPage .bottomSection {
            padding: 3rem 1.5rem;
          }

          .projectDetailsPage .projectPreview {
            max-height: 280px;
          }
        }

        @media (max-width: 480px) {
          .projectDetailsPage .heroSection,
          .projectDetailsPage .techSection,
          .projectDetailsPage .screenshotsSection,
          .projectDetailsPage .bottomSection {
            padding: 1.5rem 1rem;
          }

          .projectDetailsPage .projectPreview {
            max-height: 220px;
          }
        }
      `}</style>
    </div>
  );
}
