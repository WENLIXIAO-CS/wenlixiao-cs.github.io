'use client';

import { useState, useCallback } from 'react';
import ProfileCard from './ProfileCard';
import TabBar from './TabBar';
import Timeline from './Timeline';
import NewsCard from './NewsCard';
import ThemeToggle from './ThemeToggle';
import MobileProjectDeck from './MobileProjectDeck';
import { projects } from '../data/projects';
import { experiences, educations, services } from '../data/background';
import { newsItems } from '../data/news';
import starsData from '../data/stars.json';

type MobileTab = 'projects' | 'about' | 'background';

const projectTabs = [
  { key: 'foundation', label: 'Foundation Models' },
  { key: 'humanoid', label: 'Humanoid' },
  { key: 'mobility', label: 'Mobility' },
  { key: 'all', label: 'All' },
];


function getStars(codeUrl?: string): number | undefined {
  if (!codeUrl || !codeUrl.includes('github.com')) return undefined;
  const repoPath = codeUrl.split('github.com/')[1]?.replace(/\/$/, '');
  return repoPath ? (starsData as Record<string, number>)[repoPath] : undefined;
}

export default function MobileLayout() {
  const [activeTab, setActiveTab] = useState<MobileTab>('projects');
  const [activeCategory, setActiveCategory] = useState('foundation');


  const categoryOrder = ['foundation', 'humanoid', 'mobility'];

  const handleSwipeOverflow = useCallback((dir: 'left' | 'right') => {
    if (activeCategory === 'all') return;
    const idx = categoryOrder.indexOf(activeCategory);
    if (dir === 'left' && idx < categoryOrder.length - 1) {
      setActiveCategory(categoryOrder[idx + 1]);
    } else if (dir === 'right' && idx > 0) {
      setActiveCategory(categoryOrder[idx - 1]);
    }
  }, [activeCategory]);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#e8ecf1] dark:bg-[#0a0c12] flex flex-col relative overflow-hidden">
      {/* Background gradient orbs — light source from top-left */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-300/30 dark:bg-blue-500/15 rounded-full blur-[80px]" />
        <div className="absolute top-20 right-0 w-60 h-60 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-[60px]" />
        <div className="absolute top-1/2 -left-10 w-52 h-52 bg-violet-300/15 dark:bg-violet-500/8 rounded-full blur-[70px]" />
        <div className="absolute bottom-32 right-8 w-48 h-48 bg-cyan-300/15 dark:bg-cyan-500/8 rounded-full blur-[60px]" />
        <div className="absolute -bottom-10 left-1/3 w-56 h-56 bg-rose-300/10 dark:bg-rose-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Top bar */}
      <header className="fixed top-0 w-full bg-white/40 dark:bg-[#0a0c12]/50 backdrop-blur-2xl backdrop-saturate-150 z-50 border-b border-white/30 dark:border-white/[0.06]">
        <div className="flex justify-between items-center h-14 px-5">
          <span className="text-base font-semibold text-[#1a2332] dark:text-white/90 tracking-tight">Wenli Xiao</span>
          <div className="flex items-center gap-3">
            <a href="/blog" className="text-xs font-medium text-[#6b7a8d] dark:text-white/40 hover:text-[#1a2332] dark:hover:text-white/80 transition-colors">Blog</a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content area */}
      <main className="flex-1 pt-14 pb-24 overflow-y-auto relative z-10">
        {activeTab === 'projects' && (
          <div className="px-4 pt-5">
            <h2 className="text-xl font-bold text-[#1a2332] dark:text-white/90 mb-4 tracking-tight">Research</h2>
            <TabBar
              tabs={projectTabs}
              activeKey={activeCategory}
              onTabChange={setActiveCategory}
            />
            <MobileProjectDeck
              key={activeCategory}
              projects={filteredProjects}
              getStars={getStars}
              onSwipeOverflow={handleSwipeOverflow}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="px-5 pt-6">
            <ProfileCard />
            <div className="mt-10">
              <h3 className="text-lg font-bold text-[#1a2332] dark:text-white/90 mb-4 tracking-tight">News</h3>
              <NewsCard items={newsItems} />
            </div>
          </div>
        )}

        {activeTab === 'background' && (
          <div className="px-4 pt-5">
            <h2 className="text-xl font-bold text-[#1a2332] dark:text-white/90 mb-5 tracking-tight">Background</h2>
            <Timeline
              experiences={experiences}
              educations={educations}
              services={services}
              compact
            />
          </div>
        )}
      </main>

      {/* Bottom tab bar — floating pill */}
      <div className="fixed bottom-5 left-0 right-0 z-50 px-6" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <nav className="mx-auto max-w-xs bg-white/40 dark:bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 rounded-2xl shadow-[0_8px_32px_rgba(100,120,160,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/50 dark:border-white/[0.08] p-1.5 flex justify-between items-center gap-1">
          <BottomTab
            active={activeTab === 'projects'}
            label="Research"
            onClick={() => setActiveTab('projects')}
            icon={
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            }
          />
          <BottomTab
            active={activeTab === 'about'}
            label="About"
            onClick={() => setActiveTab('about')}
            icon={
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
          />
          <BottomTab
            active={activeTab === 'background'}
            label="Background"
            onClick={() => setActiveTab('background')}
            icon={
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            }
          />
        </nav>
      </div>
    </div>
  );
}

function BottomTab({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300 ${
        active
          ? 'bg-[#1a2332]/90 dark:bg-white/90 text-white dark:text-[#1a2332] shadow-[0_2px_12px_rgba(26,35,50,0.2)]'
          : 'text-[#8b95a5] dark:text-white/30 active:bg-black/5 dark:active:bg-white/5'
      }`}
    >
      {icon}
      {active && <span className="text-xs font-semibold">{label}</span>}
    </button>
  );
}
