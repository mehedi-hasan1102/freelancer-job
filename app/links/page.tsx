'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiGithub, 
  FiLinkedin, 
  FiInstagram, 
  FiYoutube, 
  FiExternalLink,
  
} from 'react-icons/fi';
import { SiDribbble, SiX, SiDevdotto, SiCodepen, SiTelegram, SiBluesky, SiMedium } from 'react-icons/si';
import { FaWhatsapp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

type SocialProfile = {
  name: string;
  username: string;
  url: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  description: string;
};

const SocialCard = ({
  profile,
  index,
}: {
  profile: SocialProfile;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = profile.icon;

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    gsap.set(card, { opacity: 0, y: 40, rotateX: -10, scale: 0.9 });
    gsap.set(content, { opacity: 0 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        const tl = gsap.timeline();

        tl.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }, 0);

        tl.to(content, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }, 0.2);
      },
    });
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Link href={profile.url} target="_blank" rel="noopener noreferrer">
      <div
        ref={cardRef}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[rgba(6,182,212,0.1)] [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
        onMouseMove={handleMouseMove}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-0 top-0 z-[1] h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] opacity-0 blur-[20px] mix-blend-screen transition-opacity duration-300 ease-in-out will-change-transform group-hover:opacity-100"
        />
        <span
          className="absolute right-4 top-4 z-[2] grid h-9 w-9 -translate-y-1.5 scale-95 place-items-center rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
          aria-hidden="true"
        >
          <FiExternalLink size={18} />
        </span>
        
        {/* Social Icon Background */}
        <div className="relative flex h-[140px] w-full flex-shrink-0 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(6,182,212,0.05),rgba(6,182,212,0.02))] transition-all duration-300 group-hover:bg-[linear-gradient(135deg,rgba(6,182,212,0.1),rgba(6,182,212,0.05))] max-[480px]:h-[120px]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(6,182,212,0.1)] text-[var(--accent)] transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-[rgba(6,182,212,0.2)] group-hover:[transform:scale(1.1)_rotateY(10deg)] max-[480px]:h-14 max-[480px]:w-14 [&>svg]:h-12 [&>svg]:w-12 max-[480px]:[&>svg]:h-7 max-[480px]:[&>svg]:w-7">
            <Icon />
          </div>
        </div>
        
        <div
          ref={contentRef}
          className="relative z-[2] flex flex-1 flex-col justify-between bg-[var(--card-bg,transparent)] p-5 md:p-6 lg:p-8"
        >
          <div className="mb-3 flex items-start gap-4">
            <span className="min-w-20 font-['Staatliches'] text-[2rem] leading-none text-[rgba(6,182,212,0.08)] md:text-[2.5rem] lg:text-[3rem]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="m-0 flex-1 font-['Staatliches'] text-[1.125rem] tracking-[0.15em] text-[var(--accent)] md:text-[1.25rem] lg:text-[1.5rem]">
              {profile.name}
            </h3>
          </div>
          <p className="mb-4 mt-2 font-['Inter'] text-sm uppercase tracking-[0.1em] text-[var(--text-secondary)]">
            {profile.username}
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] ease-in-out group-hover:border-[rgba(6,182,212,0.4)]" />
      </div>
    </Link>
  );
};

const SOCIAL_PROFILES = [
  // 💻 Code & Open Source
  {
    name: 'GitHub',
    username: '@mehedi-hasan1102',
    url: 'https://github.com/mehedi-hasan1102',
    icon: FiGithub,
    color: '#ffffff',
    description: 'Open-source projects, repositories, and experiments'
  },
  {
    name: 'CodePen',
    username: 'mehedihasan1102',
    url: 'https://codepen.io/mehedihasan1102',
    icon: SiCodepen,
    color: '#000000',
    description: 'Frontend experiments, demos, and code snippets'
  },

  // ✍️ Writing & Learning
  {
    name: 'Dev.to',
    username: 'mehedihasan1102',
    url: 'https://dev.to/mehedihasan1102',
    icon: SiDevdotto,
    color: '#0A0A0A',
    description: 'Articles and tutorials on web development'
  },
  {
    name: 'Medium',
    username: '@mehedihasan1102',
    url: 'https://medium.com/@mehedihasan1102',
    icon: SiMedium,
    color: '#000000',
    description: 'Technical writing and development stories'
  },

  // 🎨 Design
  {
    name: 'Dribbble',
    username: '@mehedi-hasan1102',
    url: 'https://dribbble.com/mehedi-hasan1102',
    icon: SiDribbble,
    color: '#EA4C89',
    description: 'UI/UX designs and creative visuals'
  },

  // 💼 Professional
  {
    name: 'LinkedIn',
    username: 'in/mehedi-hasan1102',
    url: 'https://www.linkedin.com/in/mehedi-hasan1102',
    icon: FiLinkedin,
    color: '#0A66C2',
    description: 'Professional profile, experience, and networking'
  },

  // 🎥 Content & Social
  {
    name: 'YouTube',
    username: '@MehediHasan11023',
    url: 'https://www.youtube.com/@MehediHasan11023',
    icon: FiYoutube,
    color: '#FF0000',
    description: 'Programming tutorials, projects, and dev content'
  },
  {
    name: 'X',
    username: '@mehedihasan1102',
    url: 'https://x.com/mehedihasan1102',
    icon: SiX,
    color: '#1DA1F2',
    description: 'Web development tips, thoughts, and tech updates'
  },
  {
    name: 'Bluesky',
    username: 'mehedihasan1102',
    url: 'https://bsky.app/profile/mehedihasan1102.bsky.social',
    icon: SiBluesky,
    color: '#1185fe',
    description: 'Tech discussions and updates on Bluesky'
  },
  {
    name: 'Instagram',
    username: '@mehedi.hasan1102',
    url: 'https://instagram.com/mehedi.hasan1102',
    icon: FiInstagram,
    color: '#E1306C',
    description: 'Developer life, UI inspiration, and creative work'
  },

  // 📞 Direct Contact
  {
    name: 'WhatsApp',
    username: '+880 1747 874773',
    url: 'https://wa.me/8801747874773',
    icon: FaWhatsapp,
    color: '#25D366',
    description: 'Direct communication via WhatsApp'
  },
  {
    name: 'Telegram',
    username: '+880 1747 874773',
    url: 'https://t.me/+8801747874773',
    icon: SiTelegram,
    color: '#0088cc',
    description: 'Chat with me on Telegram'
  }
];

export default function SocialCorner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page entrance animation
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative overflow-hidden bg-[var(--bg)] px-4 pb-16 pt-28 transition-colors duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] md:px-10 md:pb-20 md:pt-32 max-[768px]:px-5 max-[768px]:pb-[5rem] max-[768px]:pt-28 max-[480px]:px-4 max-[480px]:pb-16 max-[480px]:pt-24">
      <div
        ref={containerRef}
        className="relative z-[1] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)]"
      >
        {/* Header */}
        <div className="mb-10 overflow-hidden text-center">
          <h1 className="sectionTitleGlobal">
            Connect <span style={{ color: "var(--accent)" }}>With Me</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
            All my official profiles, writing platforms, and social channels in one place for
            quick contact and collaboration.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="mb-[clamp(2rem,4vw,4rem)] grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {SOCIAL_PROFILES.map((profile, index) => (
            <SocialCard key={profile.name} profile={profile} index={index} />
          ))}
        </div>

      </div>
    </main>
  );
}
