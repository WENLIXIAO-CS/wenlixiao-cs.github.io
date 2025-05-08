'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

interface EducationCardProps {
  school: string;
  degree: string;
  period: string;
  advisor?: string;
  index: number;
  icon: string;
}

export default function EducationCard({ 
  school, 
  degree, 
  period, 
  advisor,
  index,
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
      className="w-[400px] bg-white p-6 rounded-3xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-0 translate-y-4"
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
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
          <h3 className="text-lg font-semibold text-gray-900">{school}</h3>
          <p className="text-gray-600">{degree}</p>
          <p className="text-gray-500 text-sm">{period}</p>
          {advisor && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Advisor:</p>
              <div className="text-sm text-gray-600">
                {advisor.split('\\n').map((name, index) => (
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