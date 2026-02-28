'use client';

import Image from 'next/image';

type ScreenshotsSectionProps = {
  title: string;
  screenshots: [string, string, string];
};

export default function ScreenshotsSection({
  title,
  screenshots,
}: ScreenshotsSectionProps) {
  return (
    <section className="screenshotsSection" data-reveal-section>
      <h2 className="sectionTitle">SCREENSHOTS</h2>
      <div className="screenshotsGrid">
        {screenshots.map((src, index) => (
          <div className="screenshot" key={`${src}-${index}`}>
            <Image
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              width={1400}
              height={900}
              sizes="(max-width: 1024px) 100vw, 33vw"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
