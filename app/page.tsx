import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Recognition from './components/Recognition';
import DiagonalMarquee from './components/DiagonalMarquee';
import WhatIDo from './components/WhatIDo';
import GitHubActivity from './components/GitHubActivity';
import LatestBlogs from './components/LatestBlogs';
import TrustSection from './components/TrustSection';

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <DiagonalMarquee />
        <About />
        <Skills />
        <WhatIDo />
        <Projects />
        <TrustSection />
        <Experience limit={3} showViewAllButton />
        <LatestBlogs />
        <Recognition />
        <GitHubActivity />
      </main>
    </SmoothScroll>
  );
}
