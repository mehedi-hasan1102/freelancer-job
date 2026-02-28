import type { Metadata } from "next";
import RecognitionSection from "@/app/features/recognition/RecognitionSection";
import { createPageMetadata } from "@/lib/seo";
import { getCertificates } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  path: "/recognition",
  title: "Recognition & Certifications | Mehedi Hasan",
  description:
    "Certifications and recognitions that reflect continuous learning across modern frontend engineering and delivery.",
  keywords: [
    "Mehedi Hasan certifications",
    "web development certificates",
    "frontend developer recognition",
  ],
});

export default function RecognitionPage() {
  const certificates = getCertificates();

  return (
    <RecognitionSection
      certificates={certificates}
      headingTag="h1"
      title="Achievements"
      highlight=" & Recognition"
      description="Certifications and recognitions that reflect consistent upskilling across modern frontend development and product delivery."
      sectionId="recognition"
    />
  );
}
