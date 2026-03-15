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
    <div className="w-full md:w-[360px] bg-white/70 dark:bg-[#111]/70 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 snap-start">
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{school}</h3>
          <p className="text-gray-600 dark:text-gray-400">{degree}</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">{period}</p>
          {advisor && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Advisor:</p>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {advisor.split('\n').map((name, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
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
