import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Callout, Img, CodeBlock, Pre } from '@/app/blog/components/mdx-components';
import { BackButton } from './BackButton';
import { createPageMetadata } from '@/lib/seo';

const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(dateString));

export const generateStaticParams = () =>
  getAllPosts().map((post) => ({ slug: post.meta.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      path: `/blog/${slug}`,
      title: 'Blog Post Not Found | Mehedi Hasan',
      description: 'The requested blog post could not be found.',
      noIndex: true,
    });
  }

  return createPageMetadata({
    path: `/blog/${post.meta.slug}`,
    title: `${post.meta.title} | Blog`,
    description: post.meta.excerpt,
  });
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    components: {
      Callout,
      Img,
      CodeBlock,
      pre: Pre,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section className="relative overflow-hidden pb-12 pt-6 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.2),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(56,189,248,0.12),transparent_55%),linear-gradient(120deg,rgba(255,255,255,0.04),transparent_60%)] before:content-[''] min-[769px]:pb-16 min-[769px]:pt-8 [html.light-mode_&]:before:bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.08),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(37,99,235,0.05),transparent_55%),linear-gradient(120deg,rgba(0,0,0,0.02),transparent_60%)]">
        <div className="container pt-8">
          <BackButton />
        </div>
        <div className="container relative flex flex-col gap-6">
          <div className="flex flex-col flex-wrap items-start gap-2 min-[769px]:flex-row min-[769px]:items-center min-[769px]:gap-4">
            {post.meta.tags?.length ? (
              <div className="flex flex-wrap items-center gap-[0.6rem]">
                {post.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="py-1 font-['Staatliches',serif] text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)]"
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            ) : null}
            <span className="text-[0.95rem] font-medium text-[var(--text-secondary)]">
              {formatDate(post.meta.date)}
            </span>
          </div>
          <h1 className="max-w-[20ch] text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--text)] min-[769px]:text-[clamp(2.5rem,7vw,4.5rem)]">
            {post.meta.title}
          </h1>
        </div>
      </section>

      <section className="section-padding relative">
        <article className="container grid !max-w-[820px] gap-[1.1rem] min-[769px]:gap-6 [&>h2]:mt-8 [&>h2]:text-[clamp(1.8rem,4vw,2.8rem)] [&>h3]:mt-6 [&>h3]:text-[clamp(1.4rem,3vw,2rem)] [&>p]:text-[var(--text-secondary)] [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:grid [&_ul]:gap-3 [&_ul]:pl-6 [&_ul]:text-[var(--text-secondary)] [&_ol]:list-decimal [&_ol]:grid [&_ol]:gap-3 [&_ol]:pl-6 [&_ol]:text-[var(--text-secondary)] [&_blockquote]:m-0 [&_blockquote]:border-l-[3px] [&_blockquote]:border-l-[var(--accent)] [&_blockquote]:bg-[rgba(var(--accent-rgb),0.08)] [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:text-[var(--text-secondary)] [&_pre:not(.mdx-code-block)]:overflow-x-auto [&_pre:not(.mdx-code-block)]:rounded-[16px] [&_pre:not(.mdx-code-block)]:border [&_pre:not(.mdx-code-block)]:border-[rgba(var(--accent-rgb),0.2)] [&_pre:not(.mdx-code-block)]:bg-[var(--surface)] [&_pre:not(.mdx-code-block)]:p-6 [&_pre:not(.mdx-code-block)]:font-mono [&_pre:not(.mdx-code-block)]:text-[0.9rem] [&_pre:not(.mdx-code-block)]:leading-[1.6] [&_pre:not(.mdx-code-block)]:text-[var(--text)] max-[768px]:[&_pre:not(.mdx-code-block)]:p-4 max-[768px]:[&_pre:not(.mdx-code-block)]:text-[0.85rem] [&_:not(pre)>code]:rounded-[6px] [&_:not(pre)>code]:border [&_:not(pre)>code]:border-[rgba(var(--accent-rgb),0.25)] [&_:not(pre)>code]:bg-[rgba(var(--accent-rgb),0.14)] [&_:not(pre)>code]:px-[0.4rem] [&_:not(pre)>code]:py-[0.15rem] [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.9rem] [&_:not(pre)>code]:text-[var(--text)] [&_pre_code]:font-mono [&_pre_code]:text-[0.9rem] [&_pre_code]:text-[var(--text)]">
          {content}
        </article>
      </section>
    </main>
  );
}
