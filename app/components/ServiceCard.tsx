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
    <div className="w-full md:w-[360px] bg-[#fbf9f4]/80 dark:bg-white/[0.06] backdrop-blur-md border border-white/60 dark:border-white/[0.08] p-6 rounded-2xl shadow-[0_4px_24px_rgba(70,55,40,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(70,55,40,0.14)] transition-shadow duration-300 snap-start" style={{ borderTopColor: 'rgba(255,255,255,0.8)', borderLeftColor: 'rgba(255,255,255,0.7)' }}>
      <h3 className="text-lg font-semibold text-[#1a2332] dark:text-white/90 mb-4 tracking-tight">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-[#4a5568] dark:text-white/50 flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#9a5b3c] dark:bg-[#c89472] mt-2 flex-shrink-0"></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
