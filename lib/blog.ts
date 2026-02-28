import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type BlogPostMeta = {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  slug: string;
};

export type BlogPost = {
  meta: BlogPostMeta;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const normalizeSlug = (slug: string) => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

const getPostFiles = () => {
  if (!fs.existsSync(BLOG_DIR)) {
    return [] as string[];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith('.mdx'));
};

export const getAllPosts = (): BlogPost[] => {
  const files = getPostFiles();

  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, fileName);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    return {
      meta: {
        title: String(data.title ?? 'Untitled'),
        date: String(data.date ?? '1970-01-01'),
        excerpt: String(data.excerpt ?? ''),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
        slug,
      },
      content,
    } satisfies BlogPost;
  });

  return posts.sort((a, b) =>
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
};

export const getPostBySlug = (slug: string): BlogPost | null => {
  const normalizedSlug = normalizeSlug(slug);
  const filePath = path.join(BLOG_DIR, `${normalizedSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);

  return {
    meta: {
      title: String(data.title ?? 'Untitled'),
      date: String(data.date ?? '1970-01-01'),
      excerpt: String(data.excerpt ?? ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      slug: normalizedSlug,
    },
    content,
  };
};
