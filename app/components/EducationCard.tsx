import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface EducationCardProps {
  school: string;
  degree: string;
  period: string;
  description?: string;
  index: number;
  totalCards: number;
  icon: string;
}

export default function EducationCard({ 
  school, 
  degree, 
  period, 
  description,
  index,
  totalCards,
  icon
}: EducationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const middleIndex = Math.floor(totalCards / 2);
  const distanceFromMiddle = Math.abs(index - middleIndex);
  
  useEffect(() => {
    const currentRef = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const rotation = isInView ? 0 : (index - middleIndex) * 45;
  const scale = isInView ? 1 : 1 - (distanceFromMiddle * 0.15);
  const translateZ = isInView ? 0 : distanceFromMiddle * -50;
  const translateX = isInView ? 0 : (index - middleIndex) * 100;
  
  return (
    <div 
      ref={cardRef}
      className="flex-none w-[400px] h-[300px] transition-all duration-700 ease-out"
      style={{
        transform: `perspective(1000px) rotateY(${rotation}deg) translateZ(${translateZ}px) translateX(${translateX}px) scale(${scale})`,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
    >
      <div className="w-full h-full bg-white dark:bg-[#111] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
        <div className="flex h-full">
          {/* Left side with logo */}
          <div className="w-24 flex flex-col items-center mr-6">
            <div className="w-24 h-24 mb-4">
              {!imageError ? (
                <Image
                  src={icon}
                  alt={`${school} logo`}
                  width={96}
                  height={96}
                  className="object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="text-2xl font-semibold text-gray-400 dark:text-gray-500">
                  {school.split(' ')[0][0]}
                </div>
              )}
            </div>
          </div>

          {/* Right side with content */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-3 text-black dark:text-white">{school}</h3>
            <p className="text-[#666] dark:text-[#888] mb-2 text-lg">{degree}</p>
            <p className="text-[#666] dark:text-[#888] mb-4">{period}</p>
            {description && (
              <p className="text-[#444] dark:text-[#999] line-clamp-3">{description}</p>
            )}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-2xl transform -translate-x-16 translate-y-16 group-hover:-translate-x-12 group-hover:translate-y-12 transition-transform duration-500" />
        
        {/* Card edge highlight */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 dark:border-white/5" />
      </div>
    </div>
  );
} 