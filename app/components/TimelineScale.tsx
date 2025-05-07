import { useState, useEffect } from 'react';

interface TimelineScaleProps {
  onZoomChange: (zoom: 'year' | 'month') => void;
  currentZoom: 'year' | 'month';
}

export default function TimelineScale({ onZoomChange, currentZoom }: TimelineScaleProps) {
  const [scale, setScale] = useState(1);
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    setScale(newScale);
    onZoomChange(newScale >= 1.5 ? 'month' : 'year');
  };

  return (
    <div 
      className="relative w-full h-16 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden"
      onWheel={handleWheel}
    >
      <div 
        className="absolute top-0 left-0 h-full flex items-center transition-transform duration-300"
        style={{ transform: `scale(${scale})` }}
      >
        {years.map((year) => (
          <div key={year} className="relative">
            <div className="w-32 h-full flex items-center justify-center border-r border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{year}</span>
            </div>
            {scale >= 1.5 && (
              <div className="absolute top-0 left-0 w-32 flex">
                {months.map((month, index) => (
                  <div 
                    key={`${year}-${month}`}
                    className="w-8 h-full flex items-center justify-center border-r border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-xs text-gray-500 dark:text-gray-400">{month}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500/20">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(scale - 0.5) / 1.5 * 100}%` }}
        />
      </div>
    </div>
  );
} 