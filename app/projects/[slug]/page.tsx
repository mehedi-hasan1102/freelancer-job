import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailsClient from "@/app/features/project-details/ProjectDetailsClient";
import { createPageMetadata } from "@/lib/seo";
import { getProjectBySlug, getProjectSlugs } from "@/lib/site-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  getProjectSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata({
      path: `/projects/${slug}`,
      title: "Project Not Found | Mehedi Hasan",
      description: "The requested project could not be found.",
      noIndex: true,
    });
  }

  return createPageMetadata({
    path: `/projects/${project.slug}`,
    title: `${project.title} | Project Case Study`,
    description: project.description,
    keywords: [
      `${project.title} case study`,
      ...project.tech,
      "Mehedi Hasan project",
    ],
    image: project.image,
  });
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
