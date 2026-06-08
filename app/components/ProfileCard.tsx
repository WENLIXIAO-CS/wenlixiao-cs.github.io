import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-white/70 dark:border-white/10 shadow-[0_8px_32px_rgba(100,120,180,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <Image
          src="/images/wenli-cmu.jpg"
          alt="Wenli Xiao"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] dark:text-white/90 mb-2 md:mb-3">Wenli Xiao</h2>
        <p className="hidden md:block text-lg md:text-xl font-medium text-[#4a5568] dark:text-white/50 mb-3 md:mb-4">Robotics PhD Student at CMU School of Computer Science</p>
        <p className="text-[#4a5568] dark:text-white/50 text-base md:text-lg leading-relaxed">
          I&apos;m a PhD student at CMU Robotics, advised by <a href="https://www.gshi.me/" target="_blank" rel="noopener noreferrer" className="underline text-[#4a5568] dark:text-white/50 hover:text-[#1a2332] dark:hover:text-white/80 transition-colors">Prof. Guanya Shi</a>. My vision is to build scalable general intelligent robots in the real world. I am generally interested in dexterous manipulation and humanoid robots.
        </p>
        <p className="text-[#4a5568] dark:text-white/50 text-base md:text-lg leading-relaxed mt-4">
          I spent two wonderful years (2024-2026) interning at NVIDIA GEAR Lab, doing Foundation Model Post-training and Physical Auto-Research with <a href="https://jimfan.me/" target="_blank" rel="noopener noreferrer" className="underline text-[#4a5568] dark:text-white/50 hover:text-[#1a2332] dark:hover:text-white/80 transition-colors">Dr. Jim Fan</a> and <a href="https://yukezhu.me/" target="_blank" rel="noopener noreferrer" className="underline text-[#4a5568] dark:text-white/50 hover:text-[#1a2332] dark:hover:text-white/80 transition-colors">Prof. Yuke Zhu</a>.
        </p>
        <div className="mt-4 md:mt-6 flex flex-wrap justify-center md:justify-start gap-2.5">
          <SocialPill href="mailto:randyxiao64@gmail.com" label="Email" icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          } />
          <SocialPill href="https://scholar.google.com/citations?user=WGbVYzsAAAAJ&hl=en" label="Scholar" icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
          } />
          <SocialPill href="https://twitter.com/_wenlixiao" label="Twitter" icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          } />
          <SocialPill href="https://github.com/WENLIXIAO-CS" label="Github" icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          } />
        </div>
      </div>
    </div>
  );
}

function SocialPill({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#4a5568] dark:text-white/50 bg-white/50 dark:bg-white/[0.06] backdrop-blur-sm border border-white/60 dark:border-white/[0.08] shadow-[0_2px_8px_rgba(100,120,180,0.06)] hover:bg-white/80 dark:hover:bg-white/10 hover:text-[#1a2332] dark:hover:text-white/80 hover:shadow-[0_4px_16px_rgba(100,120,180,0.1)] hover:-translate-y-0.5 transition-all duration-200"
    >
      {icon}
      {label}
    </a>
  );
}
