export const projectDetailsStyles = `
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
`;
