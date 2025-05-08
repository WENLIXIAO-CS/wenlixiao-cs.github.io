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
    <div className="w-[400px] bg-white p-6 rounded-3xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-600 flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
} 
