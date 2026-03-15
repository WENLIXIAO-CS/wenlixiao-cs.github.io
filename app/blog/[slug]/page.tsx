import { getPost, getAllPostSlugs } from '../../../lib/posts';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: `${post.title} | Wenli Xiao`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <article>
      <header className="mb-8">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
        <h1 className="text-3xl font-bold text-black dark:text-white">{post.title}</h1>
        {post.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">{post.description}</p>
        )}
      </header>
      <div
        className="prose prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#333]">
        <a href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          &larr; Back to blog
        </a>
      </div>
    </article>
  );
}
