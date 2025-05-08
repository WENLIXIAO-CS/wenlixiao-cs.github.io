'use client';

interface ServiceCardProps {
  title: string;
  items: string[];
  index: number;
  totalCards: number;
}

export default function ServiceCard({ title, items, index, totalCards }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-[#111] rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-w-[300px]">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div 
            key={idx}
            className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 