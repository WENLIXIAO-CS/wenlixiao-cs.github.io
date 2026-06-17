'use client';

import Image from 'next/image';

interface EducationCardProps {
  school: string;
  degree: string;
  period: string;
  advisor?: string;
  icon: string;
}

export default function EducationCard({
  school,
  degree,
  period,
  advisor,
  icon
}: EducationCardProps) {
  return (
    <div className="w-full md:w-[360px] bg-[#fbf9f4]/80 dark:bg-white/[0.06] backdrop-blur-md border border-white/60 dark:border-white/[0.08] p-6 rounded-2xl shadow-[0_4px_24px_rgba(70,55,40,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(70,55,40,0.14)] transition-shadow duration-300 snap-start" style={{ borderTopColor: 'rgba(255,255,255,0.8)', borderLeftColor: 'rgba(255,255,255,0.7)' }}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 relative rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={icon}
            alt={school}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1a2332] dark:text-white/90 tracking-tight">{school}</h3>
          <p className="text-[#4a5568] dark:text-white/50">{degree}</p>
          <p className="text-[#8b95a5] dark:text-white/30 text-sm">{period}</p>
          {advisor && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Advisor:</p>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {advisor.split('\n').map((name, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9a5b3c] dark:bg-[#c89472] flex-shrink-0"></div>
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
