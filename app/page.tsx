'use client';

import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import ProjectCard from "./components/ProjectCard";
import Timeline from "./components/Timeline";
import NewsCard from "./components/NewsCard";
import ThemeToggle from "./components/ThemeToggle";
import MobileLayout from "./components/MobileLayout";
import ScrollReveal from "./components/ScrollReveal";
import { projects } from "./data/projects";
import { experiences, educations, services } from "./data/background";
import { newsItems } from "./data/news";
import starsData from "./data/stars.json";

function getStars(codeUrl?: string): number | undefined {
  if (!codeUrl || !codeUrl.includes('github.com')) return undefined;
  const repoPath = codeUrl.split('github.com/')[1]?.replace(/\/$/, '');
  return repoPath ? (starsData as Record<string, number>)[repoPath] : undefined;
}

const navSections = ['news', 'research', 'background'] as const;

export default function Home() {
  const [activeNav, setActiveNav] = useState('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Set<string>();

    navSections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visibleSections.add(id);
          else visibleSections.delete(id);
          // Pick the first visible section in DOM order
          const current = navSections.find(s => visibleSections.has(s));
          setActiveNav(current || '');
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      {/* Mobile: full-screen app with bottom tabs */}
      <div className="md:hidden">
        <MobileLayout />
      </div>

      {/* Desktop: scrolling layout with glassmorphism */}
      <div className="hidden md:block min-h-screen bg-[#f4f1ea] dark:bg-[#16130e] relative overflow-hidden">
        {/* Subtle warm paper wash */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#e9e2d4]/40 dark:bg-[#241d12]/30 rounded-full blur-[160px]" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-[#f4f1ea]/85 dark:bg-[#16130e]/50 backdrop-blur-md z-50 border-b border-white/30 dark:border-white/[0.06]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              <div className="text-lg font-semibold text-[#1a2332] dark:text-white/90 tracking-tight">Wenli Xiao</div>
              <div className="flex items-center gap-1">
                {navSections.map(id => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`relative text-sm px-3 py-1.5 rounded-full transition-all duration-300 ${
                      activeNav === id
                        ? 'text-[#1a2332] dark:text-white/90 bg-[#1a2332]/8 dark:bg-white/10 font-medium'
                        : 'text-[#6b7a8d] dark:text-white/40 hover:text-[#1a2332] dark:hover:text-white/80'
                    }`}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                ))}
                <a href="/blog" className="text-sm px-3 py-1.5 rounded-full text-[#6b7a8d] dark:text-white/40 hover:text-[#1a2332] dark:hover:text-white/80 transition-colors">Blog</a>
                <div className="ml-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 relative z-10">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <ProfileCard />
            </ScrollReveal>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-16 px-6 relative z-10">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-12 text-[#1a2332] dark:text-white/90">News</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="bg-[#fbf9f4]/80 dark:bg-white/[0.04] backdrop-blur-md rounded-3xl border border-white/60 dark:border-white/[0.06] shadow-[0_8px_40px_rgba(70,55,40,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.2)] p-8">
                <NewsCard items={newsItems} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects Section */}
        <section id="research" className="py-16 px-6 relative z-10">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-12 text-[#1a2332] dark:text-white/90">Research Projects</h2>
            </ScrollReveal>
            <div className="space-y-12">
              {projects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i < 3 ? i * 80 : 0}>
                  <ProjectCard
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
                    media={project.media}
                    authors={project.authors}
                    role={project.role}
                    stars={getStars(project.code)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section id="background" className="py-16 px-6 relative z-10">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-10 text-[#1a2332] dark:text-white/90">Background</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Timeline
                experiences={experiences}
                educations={educations}
                services={services}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 relative z-10 border-t border-white/20 dark:border-white/[0.04]">
          <div className="max-w-[1200px] mx-auto text-center text-[#8b95a5] dark:text-white/30">
            &copy; {new Date().getFullYear()} Wenli Xiao. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
