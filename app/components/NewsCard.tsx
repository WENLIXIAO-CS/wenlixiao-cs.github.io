'use client';

interface NewsItem {
  date: string;
  content: string;
  href?: string;
}

interface NewsCardProps {
  items: NewsItem[];
}

export default function NewsCard({ items }: NewsCardProps) {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-4">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0 min-w-[80px]">
              {item.date}
            </div>
            <div className="flex-1">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.content}
                </a>
              ) : (
                item.content
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
