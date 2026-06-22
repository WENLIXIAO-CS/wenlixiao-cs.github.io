'use client';

interface NewsItem {
  date: string;
  content: string;
  href?: string;
  logo?: string;
  logoDark?: string;
  suffix?: string;
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
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.content}
                  {item.logo && <NewsLogo logo={item.logo} logoDark={item.logoDark} />}
                  {item.suffix}
                </a>
              ) : (
                <>
                  {item.content}
                  {item.logo && <NewsLogo logo={item.logo} logoDark={item.logoDark} />}
                  {item.suffix}
                </>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function NewsLogo({ logo, logoDark }: { logo: string; logoDark?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className={`inline-block ml-1.5 h-[1em] w-auto align-[-0.1em] ${logoDark ? 'dark:hidden' : ''}`}
      />
      {logoDark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoDark}
          alt=""
          aria-hidden="true"
          className="hidden dark:inline-block ml-1.5 h-[1em] w-auto align-[-0.1em]"
        />
      )}
    </>
  );
}
