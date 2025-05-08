interface TimelineScaleProps {
  onZoomChange: (zoom: 'year' | 'month') => void;
  currentZoom: 'year' | 'month';
}

export default function TimelineScale({ onZoomChange, currentZoom }: TimelineScaleProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onZoomChange('year')}
        className={`px-4 py-2 rounded-full transition-colors ${
          currentZoom === 'year'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
        }`}
      >
        Year View
      </button>
      <button
        onClick={() => onZoomChange('month')}
        className={`px-4 py-2 rounded-full transition-colors ${
          currentZoom === 'month'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
        }`}
      >
        Month View
      </button>
    </div>
  );
} 