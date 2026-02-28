'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement[]>([]);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const profileBorderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading
      if (headingRef.current) {
        const headingText = SplitType.create(headingRef.current, {
          types: 'words',
        });

        // Animate heading
        gsap.from(headingText.words, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
          opacity: 0.2,
          y: 40,
          stagger: 0.1,
        });
      }

      // Animate paragraphs with parallax
      paragraphsRef.current.forEach((para, index) => {
        if (para) {
          gsap.from(para, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${80 + index * 10}%`,
              end: `top ${60 + index * 10}%`,
              scrub: 1,
            },
            opacity: 0.3,
            x: -50,
          });
        }
      });

      // Profile image hover animation
      if (profileImageRef.current && profileBorderRef.current) {
        const profileImage = profileImageRef.current;
        const profileBorder = profileBorderRef.current;

        // Mouse enter animation
        const handleMouseEnter = () => {
          // Image scale
          gsap.to(profileImage, {
            scale: 1.08,
            duration: 0.5,
            ease: 'power2.out',
          });

          // Border animation with glow
          gsap.to(profileBorder, {
            top: '0.5rem',
            left: '0.5rem',
            right: '-0.5rem',
            bottom: '-0.5rem',
            borderWidth: '3px',
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        // Mouse leave animation
        const handleMouseLeave = () => {
          // Reset image
          gsap.to(profileImage, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          });

          // Reset border
          gsap.to(profileBorder, {
            top: '1.5rem',
            left: '1.5rem',
            right: '-1.5rem',
            bottom: '-1.5rem',
            borderWidth: '2px',
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        profileImage.addEventListener('mouseenter', handleMouseEnter);
        profileImage.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          profileImage.removeEventListener('mouseenter', handleMouseEnter);
          profileImage.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Decorative elements */}
     

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative h-80 w-64 max-w-full sm:h-96 sm:w-72 md:h-96 md:w-80 max-[360px]:h-72 max-[360px]:w-56">
              <div 
                ref={profileImageRef}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              >
                <Image
                  src="/profile/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Animated border element */}
              <div
                ref={profileBorderRef}
                className="pointer-events-none absolute bottom-[-1.5rem] left-[1.5rem] right-[-1.5rem] top-[1.5rem] z-[-1] rounded-[8px] border-2 border-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb,59,130,246),0.3)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] before:pointer-events-none before:absolute before:bottom-[-2px] before:left-[-2px] before:right-[-2px] before:top-[-2px] before:z-[-1] before:rounded-[8px] before:bg-[linear-gradient(45deg,var(--accent),transparent)] before:opacity-0 before:content-[''] max-[768px]:bottom-[-1rem] max-[768px]:left-[1rem] max-[768px]:right-[-1rem] max-[768px]:top-[1rem] max-[480px]:bottom-[-0.75rem] max-[480px]:left-[0.75rem] max-[480px]:right-[-0.75rem] max-[480px]:top-[0.75rem] max-[480px]:border-[1.5px]"
              />
            </div>
          </div>

          {/* Right side - Content with enhanced typography */}
          <div className="space-y-6">
            <div
              ref={headingRef}
              className="block max-[768px]:mt-8 max-[768px]:flex max-[768px]:justify-center"
            >
              <h2 className="mb-4 font-['Staatliches',serif] text-[3.125rem] font-bold tracking-[0.05em] text-[var(--text)] max-[768px]:text-center max-[768px]:text-[clamp(2.5rem,8vw,6rem)] max-[768px]:font-normal max-[768px]:leading-none max-[768px]:tracking-[0.02em] max-[480px]:text-[clamp(2.1rem,7.5vw,3.2rem)]">
                About <span style={{ color: 'var(--accent)' }}>Me</span>
              </h2>
            </div>
            <div
              ref={(el) => {
                if (el) paragraphsRef.current[0] = el;
              }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ul className="list-disc space-y-4 pl-5 text-[clamp(1rem,1.8vw,1.125rem)] leading-[1.7] max-[360px]:text-[0.95rem]">
                <li className="break-words [overflow-wrap:anywhere]">
                  <strong className="font-['Staatliches',serif] text-[clamp(1.05rem,2.5vw,1.5rem)] font-normal tracking-[0.15em] text-[var(--accent)] max-[480px]:tracking-[0.12em]">
                    NAME:
                  </strong>{' '}
                  <span className="text-[clamp(1.05rem,2.5vw,1.5rem)] text-[var(--text)]">Mehedi Hasan</span>
                </li>
                <li className="break-words [overflow-wrap:anywhere]">
                  <strong className="font-['Staatliches',serif] text-[clamp(1.05rem,2.5vw,1.5rem)] font-normal tracking-[0.15em] text-[var(--accent)] max-[480px]:tracking-[0.12em]">
                    LOCATION:
                  </strong>{' '}
                  <span className="inline-block whitespace-nowrap rounded-[0.4rem] bg-[#0FB57E] px-[0.6rem] py-[0.2rem] text-[clamp(1.05rem,2.5vw,1.5rem)] font-semibold text-[var(--bg)] [overflow-wrap:anywhere] max-[768px]:whitespace-normal max-[768px]:px-[0.5rem] max-[768px]:py-[0.18rem] max-[520px]:whitespace-normal max-[480px]:whitespace-normal">
                    Dhaka, Bangladesh
                  </span>
                </li>
                <li className="break-words [overflow-wrap:anywhere]">
                  <strong className="font-['Staatliches',serif] text-[clamp(1.05rem,2.5vw,1.5rem)] font-normal tracking-[0.15em] text-[var(--accent)] max-[480px]:tracking-[0.12em]">
                    EXPERIENCE:
                  </strong>{' '}
                  <span className="text-[clamp(1.05rem,2.5vw,1.5rem)] text-[var(--text)]">
                    Passionate Software Developer with 2+ years of experience building personal and open-source projects. Experienced in designing, developing, and deploying applications independently
                  </span>
                </li>
                <li className="list-item whitespace-nowrap max-[768px]:whitespace-normal max-[520px]:whitespace-normal max-[480px]:whitespace-normal">
                  <strong className="font-['Staatliches',serif] text-[clamp(1.05rem,2.5vw,1.5rem)] font-normal tracking-[0.15em] text-[var(--accent)] max-[480px]:tracking-[0.12em]">
                    CORE TECH STACK:
                  </strong>{' '}
                  <span className="inline-block whitespace-nowrap rounded-[0.4rem] bg-[var(--accent)] px-[0.6rem] py-[0.2rem] text-[clamp(1.05rem,2.5vw,1.5rem)] font-semibold text-[var(--bg)] [overflow-wrap:anywhere] max-[768px]:whitespace-normal max-[768px]:px-[0.5rem] max-[768px]:py-[0.18rem] max-[520px]:whitespace-normal max-[480px]:whitespace-normal">
                    React, Next.js, TypeScript, Tailwind CSS
                  </span>
                </li>
                <li className="break-words [overflow-wrap:anywhere]">
                  <strong className="font-['Staatliches',serif] text-[clamp(1.05rem,2.5vw,1.5rem)] font-normal tracking-[0.15em] text-[var(--accent)] max-[480px]:tracking-[0.12em]">
                    HOBBIES:
                  </strong>{' '}
                  <span className="text-[clamp(1.05rem,2.5vw,1.5rem)] text-[var(--text)]">
                    Reading, watching movies, and traveling
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
