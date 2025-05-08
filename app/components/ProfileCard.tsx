import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-[#f8f6ff] p-4 md:p-8 rounded-3xl shadow-lg max-w-[1200px] mx-auto space-y-4 md:space-y-0 md:space-x-8">
      <div className="flex-shrink-0">
        <Image
          className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-md"
          src="/images/wenli-ny.jpeg"
          alt="Profile"
          width={160}
          height={160}
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-3">Wenli Xiao</h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 mb-3 md:mb-4">Robotics PhD Student at CMU School of Computer Science</p>
        <p className="text-[#666] dark:text-[#888] text-base md:text-lg leading-relaxed">
          I&apos;m a PhD student at CMU Robotics, advised by <a href="https://www.gshi.me/" target="_blank" rel="noopener noreferrer" className="text-[#666] dark:text-[#888] hover:text-[#444] dark:hover:text-[#999] transition-colors">Prof. Guanya Shi</a>. My vision is to build general intelligent robot that can<span className="border-b border-[#666] dark:border-[#888]"> progressively improve its capabilities in the real world</span> to produce meaningful contributions to the society. I am generally interested in dexterous manipulation and humanoid robots.
        </p>
        <p className="text-[#666] dark:text-[#888] text-base md:text-lg leading-relaxed mt-4">
          I used to work on robot control with <a href="https://www.gshi.me/" target="_blank" rel="noopener noreferrer" className="text-[#666] dark:text-[#888] hover:text-[#444] dark:hover:text-[#999] transition-colors">Prof. Guanya Shi</a> and <a href="https://www.ri.cmu.edu/ri-faculty/john-m-dolan/" target="_blank" rel="noopener noreferrer" className="text-[#666] dark:text-[#888] hover:text-[#444] dark:hover:text-[#999] transition-colors">Prof. John Dolan</a> at CMU during my master study, where I gained extensive experience with real-world robot and system building (Unitree G1, Booster T1, Unitree Go1/Go2, etc.).
        </p>
        <p className="text-[#666] dark:text-[#888] text-base md:text-lg leading-relaxed mt-4">
          I am currently doing a research internship at NVIDIA GEAR Lab, working with Dr. Jim Fan and Prof. Yuke Zhu, where I am leveraging industrial-level resources for scaling up <span className="border-b border-[#666] dark:border-[#888]">foundation model learning for humanoid robots.</span>
        </p>
        <div className="mt-4 md:mt-6 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          <a href="mailto:randyxiao64@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors text-base md:text-lg">Email</a>
          <a href="https://scholar.google.com/citations?user=WGbVYzsAAAAJ&hl=en" className="text-blue-600 hover:text-blue-800 transition-colors text-base md:text-lg">Google Scholar</a>
          <a href="https://twitter.com/_wenlixiao" className="text-blue-600 hover:text-blue-800 transition-colors text-base md:text-lg">Twitter</a>
          <a href="https://github.com/WENLIXIAO-CS" className="text-blue-600 hover:text-blue-800 transition-colors text-base md:text-lg">Github</a>
        </div>
      </div>
    </div>
  );
} 