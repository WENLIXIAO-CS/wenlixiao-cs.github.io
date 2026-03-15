'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: string;
  advisor?: string;
}

export default function ExperienceCard({
  title,
  company,
  period,
  description,
  icon,
  advisor
}: ExperienceCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full md:flex-none md:w-[360px] bg-white/70 dark:bg-[#111]/70 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 snap-start">
      <div className="flex h-full">
        <div className="w-16 flex flex-col items-center mr-4 flex-shrink-0">
          <div className="w-16 h-16 mb-3">
            {!imageError ? (
              <Image
                src={icon}
                alt={`${company} logo`}
                width={64}
                height={64}
                className="object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-[#222] flex items-center justify-center text-lg font-semibold text-gray-400 dark:text-gray-500">
                {company.split(' ')[0][0]}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold mb-1 text-black dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-1 text-sm">{company}</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mb-2">{period}</p>
          {advisor && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Advisor:</p>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {advisor.split('\n').map((name, index) => (
                  <div key={index} className="flex items-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
                    <p>{name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {description && (
            <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              {description.split('\n').map((line, index) => (
                <p key={index} className="mb-1">{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
