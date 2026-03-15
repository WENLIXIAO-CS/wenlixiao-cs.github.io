export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#000000]">
      <nav className="fixed top-0 w-full bg-[#fafafa]/80 dark:bg-[#000000]/80 backdrop-blur-sm z-50 border-b border-[#eaeaea] dark:border-[#333]">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="text-lg font-medium text-black dark:text-white hover:opacity-70 transition-opacity">
              Wenli Xiao
            </a>
            <div className="flex items-center gap-6">
              <a href="/#research" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Research</a>
              <a href="/blog" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Blog</a>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-[800px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
