'use client';

interface ServiceCardProps {
  title: string;
  items: string[];
}

export default function ServiceCard({
  title,
  items
}: ServiceCardProps) {
  return (
    <div className="w-full md:w-[360px] bg-white/70 dark:bg-[#111]/70 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 snap-start">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
