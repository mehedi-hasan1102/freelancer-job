"use client";

import type { Certificate } from "@/lib/site-data";
import RecognitionSection from "@/app/features/recognition/RecognitionSection";

type RecognitionProps = {
  certificates: Certificate[];
};

export default function Recognition({ certificates }: RecognitionProps) {
  return (
    <RecognitionSection
      certificates={certificates}
      title="Achievements"
      highlight=" & Recognition"
      sectionId="certificates"
      showViewAllButton
      limit={3}
    />
  );
}
