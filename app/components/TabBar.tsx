'use client';

interface Tab {
  key: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeKey: string;
  onTabChange: (key: string) => void;
}

export default function TabBar({ tabs, activeKey, onTabChange }: TabBarProps) {
  return (
    <div className="flex gap-3 mb-8 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-2 rounded-full transition-all text-sm font-medium ${
            activeKey === tab.key
              ? 'bg-gray-900/90 text-white dark:bg-white/90 dark:text-gray-900 shadow-sm backdrop-blur-sm'
              : 'bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/40 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/15'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
