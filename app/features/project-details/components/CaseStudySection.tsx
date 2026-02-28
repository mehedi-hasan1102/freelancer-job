'use client';

import type { CaseStudyContent } from '../case-study';

type CaseStudySectionProps = {
  content: CaseStudyContent;
};

type CaseStudyCard = {
  title: string;
  icon: string;
  items: string[];
};

export default function CaseStudySection({ content }: CaseStudySectionProps) {
  const cards: CaseStudyCard[] = [
    {
      title: 'Problem',
      icon: '💡',
      items: content.problemPoints,
    },
    {
      title: 'Solution',
      icon: '🛠️',
      items: content.solutionPoints,
    },
    {
      title: 'Result',
      icon: '📈',
      items: content.resultPoints,
    },
  ];

  return (
    <section className="bottomSection" data-reveal-section>
      <h2 className="sectionTitle">CASE STUDY</h2>
      <div className="bottomGrid">
        {cards.map((card) => (
          <div className="bottomCard" key={card.title}>
            <div className="bottomGlow" />
            <div className="cardIcon">{card.icon}</div>
            <h3 className="cardTitle">{card.title}</h3>
            <ul className="cardList">
              {card.items.map((item) => (
                <li key={`${card.title}-${item}`} data-challenge-item>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
