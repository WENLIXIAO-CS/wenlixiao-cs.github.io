'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import TabBar from './TabBar';
import { Experience, Education, Service } from '../data/background';

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  january: 1, february: 2, march: 3, april: 4, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

function parseDatePart(s: string): number {
  if (/present/i.test(s)) return 2026.3;
  const yearMatch = s.match(/(\d{4})/);
  if (!yearMatch) return 0;
  const year = parseInt(yearMatch[1]);
  const monthMatch = s.match(/([A-Za-z]+)/);
  const month = monthMatch ? (MONTHS[monthMatch[1].toLowerCase()] || 1) : 1;
  return year + (month - 1) / 12;
}

function parsePeriod(period: string): { start: number; end: number } {
  const parts = period.split(/\s*[-–—]\s*/);
  const start = parseDatePart(parts[0].trim());
  const end = parts[1] ? parseDatePart(parts[1].trim()) : start + 0.5;
  return { start, end };
}

function formatAdvisor(advisor: string): string {
  const names = advisor.split('\n').map(n => n.trim()).filter(Boolean);
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return names.slice(0, -1).join(', ') + ' & ' + names[names.length - 1];
}

function extractAbbreviation(full: string): string {
  const match = full.match(/\(([^)]+)\)/);
  return match ? match[1] : full;
}

const bgTabs = [
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'service', label: 'Service' },
];

interface NodeData {
  icon: string;
  title: string;
  subtitle: string;
  period: string;
  advisor?: string;
  startDate: number;
  endDate: number;
}

interface TimelineProps {
  experiences: Experience[];
  educations: Education[];
  services: Service[];
  compact?: boolean;
}

export default function Timeline({ experiences, educations, services, compact }: TimelineProps) {
  const [activeTab, setActiveTab] = useState('experience');
  const sectionRef = useRef<HTMLDivElement>(null);

  const expNodes: NodeData[] = [...experiences]
    .map(exp => { const p = parsePeriod(exp.period); return { icon: exp.icon, title: exp.title, subtitle: exp.company, period: exp.period, advisor: exp.advisor, startDate: p.start, endDate: p.end }; })
    .sort((a, b) => a.startDate - b.startDate);

  const eduNodes: NodeData[] = [...educations]
    .map(edu => { const p = parsePeriod(edu.period); return { icon: edu.icon, title: edu.degree, subtitle: edu.school, period: edu.period, advisor: edu.advisor, startDate: p.start, endDate: p.end }; })
    .sort((a, b) => a.startDate - b.startDate);

  const handleTabChange = useCallback((key: string) => {
    // Capture the tab bar's position relative to viewport before switch
    const rect = sectionRef.current?.getBoundingClientRect();
    const offsetBefore = rect?.top ?? 0;

    setActiveTab(key);

    // After React re-renders, restore so the tab bar stays in the same viewport position
    requestAnimationFrame(() => {
      const rectAfter = sectionRef.current?.getBoundingClientRect();
      if (rectAfter) {
        const drift = rectAfter.top - offsetBefore;
        if (Math.abs(drift) > 2) {
          window.scrollBy({ top: drift, behavior: 'instant' });
        }
      }
    });
  }, []);

  return (
    <div ref={sectionRef}>
      <TabBar tabs={bgTabs} activeKey={activeTab} onTabChange={handleTabChange} />

      {activeTab === 'experience' && (compact
        ? <VerticalTimeline nodes={[...expNodes].reverse()} color="blue" />
        : <DotTimeline nodes={expNodes} color="blue" />
      )}
      {activeTab === 'education' && (compact
        ? <VerticalTimeline nodes={[...eduNodes].reverse()} color="emerald" />
        : <DotTimeline nodes={eduNodes} color="emerald" />
      )}

      {activeTab === 'service' && (
        <div className="flex flex-wrap gap-2">
          {services.flatMap(svc =>
            svc.items.map((item, j) => (
              <span
                key={j}
                title={item}
                className="px-4 py-2 text-sm rounded-full bg-white/50 dark:bg-white/[0.06] backdrop-blur-sm text-[#4a5568] dark:text-white/50 border border-white/60 dark:border-white/[0.08]"
              >
                {extractAbbreviation(item)}
              </span>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function resolvePositions(
  nodes: NodeData[],
  totalSpan: number,
  globalMin: number,
  cardW: number,
  containerW: number,
  padding: number,
) {
  const usable = containerW - padding * 2;
  const positions = nodes.map((node, i) => {
    const startPx = padding + (((node.startDate - globalMin) / totalSpan) * usable);
    const endPx = padding + (((node.endDate - globalMin) / totalSpan) * usable);
    const dotPx = (startPx + endPx) / 2; // connector goes from center of bar
    return { index: i, isAbove: i % 2 === 0, centerPx: dotPx, dotPx, startPx, endPx };
  });

  for (const row of [true, false]) {
    const rowItems = positions.filter(p => p.isAbove === row).sort((a, b) => a.centerPx - b.centerPx);
    for (let j = 1; j < rowItems.length; j++) {
      const prev = rowItems[j - 1];
      const curr = rowItems[j];
      const minGap = cardW + 16;
      if (curr.centerPx - prev.centerPx < minGap) {
        curr.centerPx = prev.centerPx + minGap;
      }
    }
  }

  for (const p of positions) {
    p.centerPx = Math.max(padding + cardW / 2, Math.min(containerW - padding - cardW / 2, p.centerPx));
  }

  return positions;
}

function DotTimeline({ nodes, color }: { nodes: NodeData[]; color: 'blue' | 'emerald' }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  // Measure card heights to size the rows
  const cardElsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const [rowHeights, setRowHeights] = useState<{ top: number; bottom: number }>({ top: 0, bottom: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setContainerW(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // After cards render, measure their heights per row
  useEffect(() => {
    requestAnimationFrame(() => {
      let topMax = 0;
      let bottomMax = 0;
      cardElsRef.current.forEach((el, idx) => {
        const h = el.offsetHeight;
        if (idx % 2 === 0) topMax = Math.max(topMax, h);
        else bottomMax = Math.max(bottomMax, h);
      });
      if (topMax > 0 || bottomMax > 0) {
        setRowHeights({ top: topMax, bottom: bottomMax });
      }
    });
  }, [containerW, nodes]);

  const globalMin = Math.floor(Math.min(...nodes.map(n => n.startDate)));
  const globalMax = Math.ceil(Math.max(...nodes.map(n => n.startDate))) + 1;
  const totalSpan = globalMax - globalMin || 1;

  const yearTicks: number[] = [];
  for (let y = globalMin; y <= globalMax; y++) yearTicks.push(y);

  // Per-entry color palette so overlapping bars are distinguishable
  const palette = color === 'blue'
    ? [
        { bar: 'bg-blue-400/60 dark:bg-blue-400/35', dot: 'bg-blue-500 dark:bg-blue-400', ring: 'ring-blue-500/20 dark:ring-blue-400/20', stroke: 'rgba(96,165,250,0.35)' },
        { bar: 'bg-indigo-400/60 dark:bg-indigo-400/35', dot: 'bg-indigo-500 dark:bg-indigo-400', ring: 'ring-indigo-500/20 dark:ring-indigo-400/20', stroke: 'rgba(129,140,248,0.35)' },
        { bar: 'bg-violet-400/60 dark:bg-violet-400/35', dot: 'bg-violet-500 dark:bg-violet-400', ring: 'ring-violet-500/20 dark:ring-violet-400/20', stroke: 'rgba(167,139,250,0.35)' },
        { bar: 'bg-cyan-400/60 dark:bg-cyan-400/35', dot: 'bg-cyan-500 dark:bg-cyan-400', ring: 'ring-cyan-500/20 dark:ring-cyan-400/20', stroke: 'rgba(34,211,238,0.35)' },
      ]
    : [
        { bar: 'bg-emerald-400/60 dark:bg-emerald-400/35', dot: 'bg-emerald-500 dark:bg-emerald-400', ring: 'ring-emerald-500/20 dark:ring-emerald-400/20', stroke: 'rgba(52,211,153,0.35)' },
        { bar: 'bg-teal-400/60 dark:bg-teal-400/35', dot: 'bg-teal-500 dark:bg-teal-400', ring: 'ring-teal-500/20 dark:ring-teal-400/20', stroke: 'rgba(45,212,191,0.35)' },
        { bar: 'bg-green-400/60 dark:bg-green-400/35', dot: 'bg-green-500 dark:bg-green-400', ring: 'ring-green-500/20 dark:ring-green-400/20', stroke: 'rgba(74,222,128,0.35)' },
        { bar: 'bg-lime-400/60 dark:bg-lime-400/35', dot: 'bg-lime-500 dark:bg-lime-400', ring: 'ring-lime-500/20 dark:ring-lime-400/20', stroke: 'rgba(163,230,53,0.35)' },
      ];

  const cardW = 240;
  const padding = 24;
  const axisZoneH = 56;
  const connectorGap = 20;
  const usable = containerW - padding * 2;

  const positions = containerW > 0
    ? resolvePositions(nodes, totalSpan, globalMin, cardW, containerW, padding)
    : [];

  const abovePositions = positions.filter(p => p.isAbove);
  const belowPositions = positions.filter(p => !p.isAbove);

  const topRowH = rowHeights.top || 180;
  const bottomRowH = rowHeights.bottom || 180;

  // Ref callback for measuring card elements
  const setCardRef = useCallback((idx: number) => (el: HTMLDivElement | null) => {
    if (el) cardElsRef.current.set(idx, el);
    else cardElsRef.current.delete(idx);
  }, []);

  return (
    <div ref={wrapRef} className="w-full">
      {containerW > 0 && (
        <div className="flex flex-col">
          {/* ── Top card row ── */}
          <div className="relative" style={{ height: topRowH }}>
            {abovePositions.map(pos => (
              <div
                key={pos.index}
                ref={setCardRef(pos.index)}
                className="absolute bottom-0"
                style={{ left: pos.centerPx - cardW / 2, width: cardW }}
              >
                <TimelineCard node={nodes[pos.index]} />
              </div>
            ))}
          </div>

          {/* Gap: top cards → axis */}
          <div style={{ height: connectorGap }} />

          {/* ── Axis zone ── */}
          <div className="relative" style={{ height: axisZoneH }}>
            {/* SVG connectors from bars to card edges */}
            <svg
              className="absolute pointer-events-none overflow-visible"
              style={{ left: 0, top: -connectorGap, width: containerW, height: axisZoneH + connectorGap * 2 }}
            >
              {positions.map((pos, i) => {
                const c = palette[i % palette.length];
                const dotX = pos.dotPx;
                const cardX = pos.centerPx;
                const axisCenter = connectorGap + axisZoneH / 2;
                const cardEdge = pos.isAbove ? 0 : connectorGap * 2 + axisZoneH;
                return (
                  <line
                    key={i}
                    x1={dotX} y1={axisCenter}
                    x2={cardX} y2={cardEdge}
                    stroke={c.stroke}
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                  />
                );
              })}
            </svg>

            {/* Axis line */}
            <div
              className="absolute h-[2px] bg-gray-200/70 dark:bg-white/[0.07]"
              style={{ left: padding, right: padding, top: '50%', transform: 'translateY(-50%)' }}
            />

            {/* Year ticks + labels */}
            {yearTicks.map(year => {
              const leftPx = padding + ((year - globalMin) / totalSpan) * usable;
              return (
                <div key={year}>
                  <span
                    className="absolute -translate-x-1/2 text-[11px] font-medium tabular-nums text-[#8b95a5] dark:text-white/25 whitespace-nowrap"
                    style={{ left: leftPx, top: 4 }}
                  >
                    {year}
                  </span>
                  <div
                    className="absolute w-px h-3 bg-gray-300/50 dark:bg-white/[0.08] -translate-x-1/2"
                    style={{ left: leftPx, top: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                </div>
              );
            })}

            {/* Duration bars + dots (per-entry color) */}
            {positions.map((pos, i) => {
              const c = palette[i % palette.length];
              const barW = Math.max(pos.endPx - pos.startPx, 6);
              const isPresent = /present/i.test(nodes[pos.index].period);
              return (
                <div key={`bar-${i}`}>
                  {/* Bar */}
                  <div
                    className={`absolute ${c.bar} rounded-full`}
                    style={{
                      left: pos.startPx,
                      width: barW,
                      height: 6,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      borderTopRightRadius: isPresent ? 2 : undefined,
                      borderBottomRightRadius: isPresent ? 2 : undefined,
                    }}
                  />
                  {/* Start dot */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: pos.startPx, top: '50%' }}
                  >
                    <div className={`w-[10px] h-[10px] rounded-full ${c.dot} ring-3 ${c.ring}`} />
                  </div>
                  {/* End dot */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: pos.endPx, top: '50%' }}
                  >
                    {isPresent ? (
                      <div className="relative">
                        <div className={`w-[10px] h-[10px] rounded-full ${c.dot}`} />
                        <div className={`absolute inset-0 rounded-full ${c.dot} animate-ping opacity-30`} />
                      </div>
                    ) : (
                      <div className={`w-[8px] h-[8px] rounded-full ${c.dot} opacity-60`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gap: axis → bottom cards */}
          <div style={{ height: connectorGap }} />

          {/* ── Bottom card row ── */}
          <div className="relative" style={{ height: bottomRowH }}>
            {belowPositions.map(pos => (
              <div
                key={pos.index}
                ref={setCardRef(pos.index)}
                className="absolute top-0"
                style={{ left: pos.centerPx - cardW / 2, width: cardW }}
              >
                <TimelineCard node={nodes[pos.index]} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════ Vertical (mobile) ═══════════════════════ */

function VerticalTimeline({ nodes, color }: { nodes: NodeData[]; color: 'blue' | 'emerald' }) {
  const vPalette = color === 'blue'
    ? [
        { dot: 'bg-blue-500 dark:bg-blue-400', bar: 'bg-blue-400/40 dark:bg-blue-400/20' },
        { dot: 'bg-indigo-500 dark:bg-indigo-400', bar: 'bg-indigo-400/40 dark:bg-indigo-400/20' },
        { dot: 'bg-violet-500 dark:bg-violet-400', bar: 'bg-violet-400/40 dark:bg-violet-400/20' },
        { dot: 'bg-cyan-500 dark:bg-cyan-400', bar: 'bg-cyan-400/40 dark:bg-cyan-400/20' },
      ]
    : [
        { dot: 'bg-emerald-500 dark:bg-emerald-400', bar: 'bg-emerald-400/40 dark:bg-emerald-400/20' },
        { dot: 'bg-teal-500 dark:bg-teal-400', bar: 'bg-teal-400/40 dark:bg-teal-400/20' },
        { dot: 'bg-green-500 dark:bg-green-400', bar: 'bg-green-400/40 dark:bg-green-400/20' },
        { dot: 'bg-lime-500 dark:bg-lime-400', bar: 'bg-lime-400/40 dark:bg-lime-400/20' },
      ];

  return (
    <div className="relative pl-8">
      {/* Vertical spine */}
      <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gray-200/60 dark:bg-white/[0.07]" />

      <div className="space-y-5">
        {nodes.map((node, i) => {
          const c = vPalette[i % vPalette.length];
          const isPresent = /present/i.test(node.period);
          return (
            <div key={i} className="relative">
              {/* Dot on spine */}
              <div className="absolute -left-8 top-4">
                <div className={`w-[10px] h-[10px] rounded-full ${c.dot} ring-3 ring-white/50 dark:ring-[#0a0c12]/50`} style={{ marginLeft: 6 }} />
                {isPresent && (
                  <div className={`absolute inset-0 rounded-full ${c.dot} animate-ping opacity-30`} style={{ marginLeft: 6 }} />
                )}
              </div>

              {/* Card */}
              <TimelineCard node={node} compact />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineCard({ node, compact }: { node: NodeData; compact?: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="bg-white/50 dark:bg-white/[0.07] backdrop-blur-2xl backdrop-saturate-150 border border-white/60 dark:border-white/[0.08] rounded-2xl p-4 shadow-[0_4px_24px_rgba(100,120,180,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(100,120,180,0.14)] transition-shadow duration-300"
      style={{ borderTopColor: 'rgba(255,255,255,0.8)', borderLeftColor: 'rgba(255,255,255,0.7)' }}
    >
      <div className="flex items-start gap-3">
        <div className={`${compact ? 'w-9 h-9' : 'w-10 h-10'} rounded-xl overflow-hidden bg-white dark:bg-[#141620] border border-gray-100 dark:border-white/[0.08] shadow-sm flex-shrink-0`}>
          {!imgError ? (
            <Image
              src={node.icon}
              alt={node.subtitle}
              width={40}
              height={40}
              className="object-cover w-full h-full"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-400 dark:text-gray-500">
              {node.subtitle.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`${compact ? 'text-xs' : 'text-sm'} text-[#8b95a5] dark:text-white/30 mb-0.5`}>
            {node.period}
          </p>
          <h3 className={`${compact ? 'text-sm' : 'text-[15px]'} font-semibold text-[#1a2332] dark:text-white/90 tracking-tight leading-snug`}>
            {node.title}
          </h3>
          <p className={`${compact ? 'text-xs' : 'text-sm'} text-[#4a5568] dark:text-white/50 mt-0.5 leading-snug`}>
            {node.subtitle}
          </p>
          {node.advisor && (
            <p className={`${compact ? 'text-[11px]' : 'text-xs'} text-[#8b95a5] dark:text-white/30 mt-1.5`}>
              Advised by {formatAdvisor(node.advisor)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
