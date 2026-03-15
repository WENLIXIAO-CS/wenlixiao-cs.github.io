import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-white dark:border-[#333] shadow-lg">
        <Image
          src="/images/wenli-cmu.jpg"
          alt="Wenli Xiao"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 md:mb-3">Wenli Xiao</h2>
        <p className="hidden md:block text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 mb-3 md:mb-4">Robotics PhD Student at CMU School of Computer Science</p>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
          I&apos;m a PhD student at CMU Robotics, advised by <a href="https://www.gshi.me/" target="_blank" rel="noopener noreferrer" className="underline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Prof. Guanya Shi</a>. My vision is to build scalable general intelligent robots in the real world. I am generally interested in dexterous manipulation and humanoid robots.
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mt-4">
          I&apos;m a Research Scientist Intern at NVIDIA GEAR Lab, doing Foundation Model Post-training with <a href="https://jimfan.me/" target="_blank" rel="noopener noreferrer" className="underline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Dr. Jim Fan</a> and <a href="https://yukezhu.me/" target="_blank" rel="noopener noreferrer" className="underline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Prof. Yuke Zhu</a>.
        </p>
        <div className="mt-4 md:mt-6 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          <a href="mailto:randyxiao64@gmail.com" className="text-gray-700 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-white transition-colors text-base md:text-lg">Email</a>
          <a href="https://scholar.google.com/citations?user=WGbVYzsAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-white transition-colors text-base md:text-lg">Google Scholar</a>
          <a href="https://twitter.com/_wenlixiao" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-white transition-colors text-base md:text-lg">Twitter</a>
          <a href="https://github.com/WENLIXIAO-CS" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-white transition-colors text-base md:text-lg">Github</a>
        </div>
      </div>
    </div>
  );
}
