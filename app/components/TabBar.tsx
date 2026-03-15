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
              ? 'bg-[#1a2332]/90 text-white dark:bg-white/90 dark:text-[#1a2332] shadow-[0_2px_12px_rgba(26,35,50,0.15)] backdrop-blur-sm'
              : 'bg-white/40 dark:bg-white/[0.06] backdrop-blur-sm border border-white/50 dark:border-white/[0.08] text-[#6b7a8d] dark:text-white/40 hover:bg-white/60 dark:hover:bg-white/10'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
