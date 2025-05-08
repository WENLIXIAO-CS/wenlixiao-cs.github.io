interface ProjectCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProjectCategories({ activeCategory, onCategoryChange }: ProjectCategoriesProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full transition-colors ${
          activeCategory === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onCategoryChange('foundation')}
        className={`px-4 py-2 rounded-full transition-colors ${
          activeCategory === 'foundation'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
        }`}
      >
        Foundation Models
      </button>
      <button
        onClick={() => onCategoryChange('humanoid')}
        className={`px-4 py-2 rounded-full transition-colors ${
          activeCategory === 'humanoid'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
        }`}
      >
        Humanoid
      </button>
      <button
        onClick={() => onCategoryChange('mobility')}
        className={`px-4 py-2 rounded-full transition-colors ${
          activeCategory === 'mobility'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
        }`}
      >
        Mobility
      </button>
    </div>
  );
} 