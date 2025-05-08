import { useState } from 'react';

interface SectionCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SectionCategories({ activeCategory, onCategoryChange }: SectionCategoriesProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onCategoryChange('experience')}
        className={`px-4 py-2 rounded-full transition-colors ${
          activeCategory === 'experience'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
        }`}
      >
        Experience
      </button>
      <button
        onClick={() => onCategoryChange('education')}
        className={`px-4 py-2 rounded-full transition-colors ${
          activeCategory === 'education'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
        }`}
      >
        Education
      </button>
      <button
        onClick={() => onCategoryChange('service')}
        className={`px-4 py-2 rounded-full transition-colors ${
          activeCategory === 'service'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
        }`}
      >
        Service
      </button>
    </div>
  );
} 