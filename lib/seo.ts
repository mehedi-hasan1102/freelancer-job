import type { Metadata } from "next";

export const SITE_URL = "https://www.mehedi-hasan.me";
export const SITE_NAME = "Mehedi Hasan Portfolio";
export const DEFAULT_OG_IMAGE = "/profile/profile.png";

const normalizePath = (routePath: string) =>
  routePath === "/" ? "/" : `/${routePath.replace(/^\/+/, "")}`;

export const absoluteUrl = (routePath: string) =>
  `${SITE_URL}${normalizePath(routePath)}`;

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

export const createPageMetadata = ({
  path,
  title,
  description,
  keywords,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata => {
  const canonicalPath = normalizePath(path);
  const canonicalUrl = absoluteUrl(canonicalPath);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
};
