'use client';

import { useState, useRef } from 'react';
import type { Project } from '../data/projects';

interface Props {
  projects: Project[];
  getStars: (code?: string) => number | undefined;
  onSwipeOverflow?: (dir: 'left' | 'right') => void;
}

function getVideoSources(gifPath: string) {
  const name = gifPath.replace('/images/', '').replace('.gif', '');
  return { webm: `/videos/${name}.webm`, mp4: `/videos/${name}.mp4` };
}

export default function MobileProjectDeck({ projects, getStars, onSwipeOverflow }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDir, setExitDir] = useState<'left' | 'right' | null>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);
  const isHorizontal = useRef<boolean | null>(null);

  const THRESHOLD = 80;
  const VELOCITY_THRESHOLD = 0.4;

  const handleStart = (clientX: number, clientY: number) => {
    if (exitDir) return;
    startX.current = clientX;
    startY.current = clientY;
    startTime.current = Date.now();
    isHorizontal.current = null;
    setIsDragging(true);
    setOffset(0);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || exitDir) return;
    const dx = clientX - startX.current;
    const dy = clientY - startY.current;

    if (isHorizontal.current === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      isHorizontal.current = Math.abs(dx) > Math.abs(dy);
    }

    if (isHorizontal.current) {
      setOffset(dx);
    }
  };

  const handleEnd = () => {
    if (!isDragging || exitDir) return;
    setIsDragging(false);

    if (!isHorizontal.current) {
      setOffset(0);
      return;
    }

    const dt = Date.now() - startTime.current;
    const velocity = Math.abs(offset) / Math.max(dt, 1);
    const pastThreshold = Math.abs(offset) > THRESHOLD || velocity > VELOCITY_THRESHOLD;

    if (pastThreshold) {
      const dir = offset < 0 ? 'left' : 'right';
      const canGo = dir === 'left'
        ? currentIndex < projects.length - 1
        : currentIndex > 0;

      if (canGo) {
        setExitDir(dir);
        return;
      } else if (onSwipeOverflow) {
        onSwipeOverflow(dir);
        setOffset(0);
        return;
      }
    }
    setOffset(0);
  };

  const handleTransitionEnd = () => {
    if (!exitDir) return;
    setCurrentIndex(i => exitDir === 'left' ? i + 1 : i - 1);
    setExitDir(null);
    setOffset(0);
  };

  const progress = Math.min(Math.abs(offset) / THRESHOLD, 1);

  const getCardStyle = (stackPos: number): React.CSSProperties => {
    if (stackPos === 0) {
      if (exitDir) {
        return {
          transform: `translateX(${exitDir === 'left' ? '-120%' : '120%'}) rotate(${exitDir === 'left' ? -15 : 15}deg)`,
          transition: 'transform 0.3s ease-out',
          zIndex: 10,
        };
      }
      return {
        transform: `translateX(${offset}px) rotate(${offset * 0.06}deg)`,
        transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 10,
      };
    }

    const baseScale = 1 - stackPos * 0.05;
    const scale = baseScale + progress * 0.05;
    const y = stackPos * 12 - progress * 4;
    return {
      transform: `scale(${scale}) translateY(${y}px)`,
      transition: isDragging ? 'none' : 'transform 0.3s ease-out',
      zIndex: 10 - stackPos,
      pointerEvents: 'none' as const,
    };
  };

  const visibleIndices: number[] = [];
  for (let i = Math.min(currentIndex + 2, projects.length - 1); i >= currentIndex; i--) {
    visibleIndices.push(i);
  }

  return (
    <div>
      <div className="relative" style={{ height: 'calc(100vh - 260px)', minHeight: '400px', maxHeight: '540px' }}>
        {visibleIndices.map(i => {
          const stackPos = i - currentIndex;
          const isCurrent = stackPos === 0;
          return (
            <div
              key={projects[i].id}
              className="absolute inset-x-0 inset-y-0"
              style={{
                ...getCardStyle(stackPos),
                touchAction: isCurrent ? 'pan-y' : 'none',
              }}
              {...(isCurrent ? {
                onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY),
                onTouchMove: (e: React.TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY),
                onTouchEnd: handleEnd,
                onMouseDown: (e: React.MouseEvent) => handleStart(e.clientX, e.clientY),
                onMouseMove: (e: React.MouseEvent) => { if (isDragging) handleMove(e.clientX, e.clientY); },
                onMouseUp: handleEnd,
                onMouseLeave: () => { if (isDragging) handleEnd(); },
                onTransitionEnd: handleTransitionEnd,
              } : {})}
            >
              <CardContent
                project={projects[i]}
                stars={getStars(projects[i].code)}
                showVideo={isCurrent && !exitDir}
                counter={`${currentIndex + 1} / ${projects.length}`}
                showCounter={isCurrent}
              />
            </div>
          );
        })}

        {/* Swipe hint overlay */}
        {isDragging && isHorizontal.current && Math.abs(offset) > 20 && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none z-20"
            style={{
              background: offset < 0
                ? `rgba(59, 130, 246, ${Math.min(Math.abs(offset) / 300, 0.12)})`
                : `rgba(168, 85, 247, ${Math.min(Math.abs(offset) / 300, 0.12)})`,
              transition: 'none',
            }}
          />
        )}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-1.5 mt-5">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentIndex(i); setOffset(0); setExitDir(null); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'bg-[#1a2332] dark:bg-white/80 w-5'
                : 'bg-[#c0c8d4] dark:bg-white/15 w-1.5'
            }`}
          />
        ))}
      </div>

      {/* Swipe hint text */}
      <p className="text-center text-[10px] text-[#a0aab8] dark:text-white/20 mt-2 select-none">
        swipe to browse
      </p>
    </div>
  );
}

function CardContent({
  project,
  stars,
  showVideo,
  counter,
  showCounter,
}: {
  project: Project;
  stars?: number;
  showVideo: boolean;
  counter: string;
  showCounter: boolean;
}) {
  const videoSources = project.imageType === 'gif' ? getVideoSources(project.image) : null;
  const venues = project.points.filter(p => !p.startsWith('TL;DR'));
  const tldr = project.points.find(p => p.startsWith('TL;DR'))?.replace('TL;DR: ', '');

  return (
    <div className="h-full bg-[#fbf9f4]/80 dark:bg-white/[0.06] backdrop-blur-md rounded-3xl shadow-[0_8px_40px_rgba(70,55,40,0.12),0_2px_8px_rgba(70,55,40,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-white/60 dark:border-white/[0.08]" style={{ borderTopColor: 'rgba(255,255,255,0.8)', borderLeftColor: 'rgba(255,255,255,0.7)' }}>
      {/* Video / Media */}
      <div className="relative flex-shrink-0" style={{ height: '38%' }}>
        {showVideo && videoSources ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={videoSources.webm} type="video/webm" />
            <source src={videoSources.mp4} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:to-[#222]" />
        )}

        {project.role && (
          <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
            {project.role}
          </span>
        )}
        {showCounter && (
          <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white/80 px-2.5 py-1 rounded-full text-xs tabular-nums">
            {counter}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-3 pb-3 flex flex-col overflow-hidden min-h-0">
        <h3 className="text-[15px] font-bold text-[#1a2332] dark:text-white/90 leading-snug tracking-tight">
          {project.website ? (
            <a href={project.website} target="_blank" rel="noopener noreferrer">{project.title}</a>
          ) : (
            project.title
          )}
        </h3>

        {venues.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {venues.map((v, i) => (
              <span
                key={i}
                className="text-[10px] bg-[#9a5b3c]/10 dark:bg-[#c89472]/15 text-[#8a4f33] dark:text-[#d8a888] px-2 py-0.5 rounded-full font-semibold leading-tight border border-[#9a5b3c]/20 dark:border-[#c89472]/15"
              >
                {v}
              </span>
            ))}
          </div>
        )}

        {tldr && (
          <p className="mt-2 text-xs text-[#6b7a8d] dark:text-white/40 line-clamp-3 leading-relaxed">
            {tldr}
          </p>
        )}

        {project.authors && (
          <p className="mt-1.5 text-[10px] text-[#8b95a5] dark:text-white/30 leading-relaxed">
            {project.authors.map((a, i) => (
              <span key={i}>
                {a.includes('Wenli Xiao') ? (
                  <span className="font-bold text-[#2d3f54] dark:text-white/70">{a}</span>
                ) : a}
                {i < project.authors!.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}

        {/* Action row */}
        <div className="flex items-center gap-2 flex-wrap pt-3 mt-auto border-t border-[#1a2332]/[0.06] dark:border-white/[0.06]">
          {project.arxiv && <ActionPill href={project.arxiv} label="arXiv" />}
          {project.website && <ActionPill href={project.website} label="Website" />}
          {project.code && (
            <ActionPill
              href={project.code}
              label={stars ? `Code \u2605 ${stars.toLocaleString()}` : 'Code'}
            />
          )}
          {project.video && <ActionPill href={project.video} label="Video" />}
          {project.twitter && <ActionPill href={project.twitter} label="Twitter" />}
        </div>
      </div>
    </div>
  );
}

function ActionPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[11px] font-medium text-[#4a5568] dark:text-white/50 px-2.5 py-1 rounded-full bg-[#f4f1ea]/85 dark:bg-white/[0.06] backdrop-blur-sm border border-white/60 dark:border-white/[0.08] active:bg-white/70 dark:active:bg-white/10 transition-colors select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {label}
    </a>
  );
}
