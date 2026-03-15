'use client';

import { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import ProjectCard from "./components/ProjectCard";
import TabBar from "./components/TabBar";
import ExperienceCard from "./components/ExperienceCard";
import EducationCard from "./components/EducationCard";
import ServiceCard from "./components/ServiceCard";
import NewsCard from "./components/NewsCard";
import ThemeToggle from "./components/ThemeToggle";
import MobileLayout from "./components/MobileLayout";
import { projects } from "./data/projects";
import { experiences, educations, services } from "./data/background";
import { newsItems } from "./data/news";
import starsData from "./data/stars.json";

const projectTabs = [
  { key: 'foundation', label: 'Foundation Models' },
  { key: 'humanoid', label: 'Humanoid' },
  { key: 'mobility', label: 'Mobility' },
  { key: 'all', label: 'All' },
];

const sectionTabs = [
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'service', label: 'Service' },
];

function getStars(codeUrl?: string): number | undefined {
  if (!codeUrl || !codeUrl.includes('github.com')) return undefined;
  const repoPath = codeUrl.split('github.com/')[1]?.replace(/\/$/, '');
  return repoPath ? (starsData as Record<string, number>)[repoPath] : undefined;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('foundation');
  const [activeSection, setActiveSection] = useState('experience');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <>
      {/* Mobile: full-screen app with bottom tabs */}
      <div className="md:hidden">
        <MobileLayout />
      </div>

      {/* Desktop: traditional scrolling layout */}
      <div className="hidden md:block min-h-screen bg-[#fafafa] dark:bg-[#000000]">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/60 dark:bg-[#000]/60 backdrop-blur-xl z-50 border-b border-white/30 dark:border-white/10">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              <div className="text-lg font-medium text-black dark:text-white">Wenli Xiao</div>
              <div className="flex items-center gap-6">
                <a href="#news" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">News</a>
                <a href="#research" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Research</a>
                <a href="#background" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Background</a>
                <a href="/blog" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Blog</a>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <ProfileCard />
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-16 px-6 bg-white dark:bg-[#111] border-t border-b border-gray-100 dark:border-[#222]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold mb-12 text-black dark:text-white">News</h2>
            <NewsCard items={newsItems} />
          </div>
        </section>

        {/* Projects Section */}
        <section id="research" className="py-16 px-6 bg-[#fafafa] dark:bg-[#000] border-b border-gray-100 dark:border-[#222]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold mb-12 text-black dark:text-white">Research Projects</h2>
            <TabBar
              tabs={projectTabs}
              activeKey={activeCategory}
              onTabChange={setActiveCategory}
            />
            <div className="space-y-12">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  image={project.image}
                  imageType={project.imageType}
                  points={project.points}
                  arxiv={project.arxiv}
                  website={project.website}
                  video={project.video}
                  code={project.code}
                  twitter={project.twitter}
                  pdf={project.pdf}
                  authors={project.authors}
                  role={project.role}
                  stars={getStars(project.code)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section id="background" className="py-16 px-6 bg-white dark:bg-[#111]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-bold mb-12 text-black dark:text-white">Background</h2>
            <TabBar
              tabs={sectionTabs}
              activeKey={activeSection}
              onTabChange={setActiveSection}
            />

            {activeSection === 'experience' && (
              <div className="relative">
                <div className="overflow-x-auto pb-6 hide-scrollbar scroll-smooth snap-x snap-mandatory">
                  <div className="flex gap-6 min-w-max px-8 py-4">
                    {experiences.map((exp, i) => (
                      <ExperienceCard key={i} {...exp} />
                    ))}
                  </div>
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#111] to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#111] to-transparent pointer-events-none"></div>
              </div>
            )}

            {activeSection === 'education' && (
              <div className="relative">
                <div className="overflow-x-auto pb-6 hide-scrollbar scroll-smooth snap-x snap-mandatory">
                  <div className="flex gap-6 min-w-max px-8 py-4">
                    {educations.map((edu, i) => (
                      <EducationCard key={i} {...edu} />
                    ))}
                  </div>
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#111] to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#111] to-transparent pointer-events-none"></div>
              </div>
            )}

            {activeSection === 'service' && (
              <div className="relative">
                <div className="overflow-x-auto pb-6 hide-scrollbar scroll-smooth snap-x snap-mandatory">
                  <div className="flex gap-6 min-w-max px-8 py-4">
                    {services.map((svc, i) => (
                      <ServiceCard key={i} {...svc} />
                    ))}
                  </div>
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#111] to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#111] to-transparent pointer-events-none"></div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-[#eaeaea] dark:border-[#333]">
          <div className="max-w-[1200px] mx-auto text-center text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Wenli Xiao. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
