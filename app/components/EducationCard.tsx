'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

interface EducationCardProps {
  school: string;
  degree: string;
  period: string;
  advisor?: string;
  index: number;
  totalCards: number;
  icon: string;
}

export default function EducationCard({ 
  school, 
  degree, 
  period, 
  advisor,
  index, 
  totalCards,
  icon 
}: EducationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = cardRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentRef.style.opacity = '1';
          currentRef.style.transform = 'translateY(0)';
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-[#111] rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-[400px] opacity-0 translate-y-4"
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 relative rounded-xl overflow-hidden">
          <Image
            src={icon}
            alt={school}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{school}</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{degree}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{period}</p>
          {advisor && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Advisor:</p>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {advisor.split('\\n').map((name, index) => (
                  <div key={index} className="flex items-center mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
                    <p>{name}</p>
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