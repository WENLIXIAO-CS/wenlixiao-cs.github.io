import { getAllPosts } from '../../lib/posts';

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-black dark:text-white mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <a href={`/blog/${post.slug}`} className="block">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{post.date}</p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{post.description}</p>
                )}
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
