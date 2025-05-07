'use client';

import Image from "next/image";
import ProfileCard from "./components/ProfileCard";
import ProjectCard from "./components/ProjectCard";
import ProjectCategories from "./components/ProjectCategories";
import { useState } from "react";
import ExperienceCard from "./components/ExperienceCard";
import SectionCategories from "./components/SectionCategories";
import EducationCard from "./components/EducationCard";
import Script from 'next/script';

const projects = [
  {
    id: 'hover',
    title: "HOVER: Versatile Neural Whole-Body Controller for Humanoid Robots",
    image: "/images/hover.gif",
    imageType: "gif" as const,
    category: "foundation",
    points: [
      "ICRA 2025",
      "TL;DR: HOVER is a 1.5M-parameter neural network to control the body of a humanoid robot. It takes a lot of subconscious processing for us humans to walk, maintain balance, and maneuver our arms and legs into desired positions. We capture this 'subconsciousness' in HOVER, a single model that learns how to coordinate the motors of a humanoid robot to support locomotion and manipulation."
    ],
    arxiv: "https://arxiv.org/abs/2410.21229",
    website: "https://hover-versatile-humanoid.github.io/",
    twitter: "https://x.com/DrJimFan/status/1851643431803830551",
    authors: ["Tairan He*", "Wenli Xiao*", "Toru Lin", "Zhengyi Luo", "Zhengjia Xu", "Zhenyu Jiang", "Jan Kautz", "Changliu Liu", "Guanya Shi", "Xiaolong Wang", "Linxi 'Jim' Fan†", "Yuke Zhu†"]
  },
  {
    id: 'anycar',
    title: "AnyCar to Anywhere: Learning Universal Dynamics Model",
    image: "/images/anycar.gif",
    imageType: "gif" as const,
    category: "foundation",
    points: [
      "CoRL 2024, X-Embodiment workshop",
      "ICRA 2025",
      "TL;DR: AnyCar is a generalist vehicle dynamics model for agile mobility. It can adapt to various cars, tasks, and envs via in-context adaptation, outperforming well-tuned generalist models up to 54%."
    ],
    arxiv: "https://arxiv.org/abs/2409.15783",
    website: "https://lecar-lab.github.io/anycar/",
    twitter: "https://x.com/_wenlixiao/status/1846582020585275565",
    authors: ["Wenli Xiao*", "Haoru Xue*", "Tony Tao", "Dvij Kalaria", "John Dolan", "Guanya Shi"]
  },
  {
    id: 'asap',
    title: "ASAP: Aligning Simulation and Real-World Physics",
    image: "/images/ASAP.gif",
    imageType: "gif" as const,
    category: "humanoid",
    points: [
      "In Submission",
      "TL;DR: ASAP learns agile whole-body humanoid motions via learning a residual action model from the real world to align sim and real physics."
    ],
    arxiv: "https://arxiv.org/abs/2502.01143",
    website: "https://agile.human2humanoid.com/",
    code: "https://github.com/LeCAR-Lab/ASAP",
    twitter: "https://x.com/_wenlixiao/status/1886805380354728392",
    authors: ["Tairan He*", "Jiawei Gao*", "Wenli Xiao*", "Yuanhang Zhang*", "Zi Wang", "Jiashun Wang", "Zhengyi Luo", "Guanqi He", "Nikhil Sobanbab", "Chaoyi Pan", "Zeji Yi", "Guannan Qu", "Kris Kitani", "Jessica Hodgins", "Linxi 'Jim' Fan", "Yuke Zhu", "Changliu Liu", "Guanya Shi"]
  },
  {
    id: 'wococo',
    title: "WoCoCo: Learning Whole-Body Humanoid Control with Sequential Contacts",
    image: "/images/wococo.gif",
    imageType: "gif" as const,
    category: "humanoid",
    points: [
      "CoRL 2024 (Spotlight)",
      "RSS 2024, Task Specification Workshop",
      "TL;DR: WoCoCo is the first unified RL framework to learn whole-body humanoid control with sequential contacts."
    ],
    arxiv: "https://arxiv.org/abs/2406.06005",
    website: "https://lecar-lab.github.io/wococo/",
    video: "https://youtu.be/L18X-QbXqPI",
    twitter: "https://x.com/_wenlixiao/status/1801305252760850903",
    authors: ["Chong Zhang*", "Wenli Xiao*", "Tairan He", "Guanya Shi"]
  },
  {
    id: 'omnih2o',
    title: "OmniH2O: Universal and Dexterous Human-to-Humanoid Whole-Body Teleoperation and Learning",
    image: "/images/omnih2o.gif",
    imageType: "gif" as const,
    category: "humanoid",
    points: [
      "CoRL 2024",
      "TL;DR: OmniH2O provides the first universal whole-body humanoid control interface that enables diverse teleoperation and autonomy methods."
    ],
    arxiv: "https://arxiv.org/abs/2406.08858",
    website: "https://omni.human2humanoid.com/",
    video: "https://www.youtube.com/watch?v=ofgxZHv0GMk",
    twitter: "https://x.com/TairanHe99/status/1799053120846402012",
    authors: ["Tairan He*", "Zhengyi Luo*", "Xialin He*", "Wenli Xiao", "Chong Zhang", "Weinan Zhang", "Kris Kitani", "Changliu Liu", "Guanya Shi"]
  },
  {
    id: 'h2o',
    title: "Learning Human-to-Humanoid Real-Time Whole-Body Teleoperation",
    image: "/images/h2o.gif",
    imageType: "gif" as const,
    category: "humanoid",
    points: [
      "IROS 2024 (Oral presentation)",
      "ICRA 2024, Agile Robotics Workshop (Spotlight)",
      "TL;DR: H2O enables real-time whole-body teleoperation of a full-sized humanoid to perform tasks like pick and place, walking, kicking, boxing, etc."
    ],
    arxiv: "https://arxiv.org/abs/2403.04436",
    website: "https://human2humanoid.com/",
    video: "https://www.youtube.com/watch?v=0W4N2q7xtcQ",
    authors: ["Tairan He*", "Zhengyi Luo*", "Wenli Xiao", "Chong Zhang", "Kris Kitani", "Changliu Liu", "Guanya Shi"]
  },
  {
    id: 'safedpa',
    title: "Safe Deep Policy Adaptation",
    image: "/images/SafeDPA.gif",
    imageType: "gif" as const,
    category: "mobility",
    points: [
      "ICRA 2024",
      "CoRL 2023 Deployable Workshop",
      "TL;DR: This paper jointly tackles policy adaptation and safe reinforcement learning with safety guarantees. Comprehensive experiments on (1) classic control problems (Inverted Pendulum), (2) simulation benchmarks (Safety Gym), and (3) a real-world agile robotics platform (RC Car) demonstrate great superiority of SafeDPA in both safety and task performance, over state-of-the-art baselines."
    ],
    arxiv: "https://arxiv.org/abs/2310.08602",
    website: "https://sites.google.com/view/safe-deep-policy-adaptation",
    video: "https://www.youtube.com/watch?v=PkyRzlRQVbE",
    twitter: "https://x.com/_wenlixiao/status/1790909857496961300",
    authors: ["Wenli Xiao*", "Tairan He*", "John Dolan", "Guanya Shi"]
  },
  {
    id: 'abs',
    title: "Agile But Safe: Learning Collision-Free High-Speed Legged Locomotion",
    image: "/images/abs.gif",
    imageType: "gif" as const,
    category: "mobility",
    points: [
      "RSS 2024 (Outstanding Student Paper Award Finalist - Top 3)",
      "ICRA 2024, Agile Robotics Workshop (Spotlight)",
      "TL;DR: Legged robots navigating cluttered environments must be jointly agile for efficient task execution and safe to avoid collisions with obstacles or humans. Existing studies either develop conservative controllers (< 1.0 m/s) to ensure safety, or focus on agility without considering potentially fatal collisions. This paper introduces Agile But Safe (ABS), a learning-based control framework that enables agile and collision-free locomotion for quadrupedal robots."
    ],
    arxiv: "https://arxiv.org/abs/2401.17583",
    website: "https://agile-but-safe.github.io/",
    video: "https://www.youtube.com/watch?v=elWwPn5IhjA",
    authors: ["Tairan He*", "Chong Zhang*", "Wenli Xiao", "Guanqi He", "Changliu Liu", "Guanya Shi"]
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('foundation');
  const [activeSection, setActiveSection] = useState('experience');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#fafafa]/80 dark:bg-black/80 backdrop-blur-sm z-50 border-b border-[#eaeaea] dark:border-[#333]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="text-lg font-medium text-black dark:text-white">Wenli Xiao</div>
            <div className="flex gap-8">
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

      {/* Projects Section */}
      <section className="py-16 px-6 bg-[#f8f6ff]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-black dark:text-white">Research Projects</h2>
          <ProjectCategories 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
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
                authors={project.authors}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience, Education, and Service Section */}
      <section className="py-16 px-6 bg-white dark:bg-[#111]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-black dark:text-white">Background</h2>
          <SectionCategories 
            activeCategory={activeSection}
            onCategoryChange={setActiveSection}
          />
          
          {activeSection === 'experience' && (
            <div className="relative">
              <div className="overflow-x-auto pb-6 hide-scrollbar">
                <div className="flex gap-8 min-w-max px-8 py-4">
                  <ExperienceCard
                    title="Research Intern"
                    company="NVIDIA GEAR Lab"
                    period="2024 - Present"
                    description="Working with Dr. Jim Fan and Prof. Yuke Zhu on foundation model for humanoids."
                    index={0}
                    totalCards={4}
                    icon="/images/nvidia.png"
                    advisor="Dr. Jim Fan, Prof. Yuke Zhu"
                  />
                  <ExperienceCard
                    title="Robotics Institute Summer Scholar (RISS)"
                    company="Carnegie Mellon University"
                    period="June 2022 - Aug 2023"
                    description="Research Intern working with Prof. John Dolan and Yiwei Lyu."
                    index={1}
                    totalCards={4}
                    icon="/images/cmu-logo.jpg"
                    advisor="Prof. John Dolan, Yiwei Lyu"
                  />
                  <ExperienceCard
                    title="Research Intern"
                    company="RISE Lab, UC Berkeley"
                    period="March 2022 - May 2022"
                    description="Working with Prof. Joseph E. Gonzalez and Tianjun Zhang."
                    index={2}
                    totalCards={4}
                    icon="/images/berkeley-logo.png"
                    advisor="Prof. Joseph E. Gonzalez, Tianjun Zhang"
                  />
                  <ExperienceCard
                    title="Research Intern"
                    company="NCEL Lab, Shenzhen AIRS"
                    period="Aug 2020 - March 2022"
                    description="Working with Prof. Jianwei Huang and Prof. Bing Luo."
                    index={3}
                    totalCards={4}
                    icon="/images/airs-logo.jpeg"
                    advisor="Prof. Jianwei Huang, Prof. Bing Luo"
                  />
                </div>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#111] to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#111] to-transparent pointer-events-none"></div>
            </div>
          )}

          {activeSection === 'education' && (
            <div className="relative">
              <div className="overflow-x-auto pb-6 hide-scrollbar">
                <div className="flex gap-8 min-w-max px-8 py-4">
                  <EducationCard
                    school="Carnegie Mellon University"
                    degree="MS, Robotics"
                    period="Sep 2023 - May 2025 (expected)"
                    index={0}
                    totalCards={3}
                    icon="/images/cmu-logo.jpg"
                  />
                  <EducationCard
                    school="UC Berkeley"
                    degree="EECS Visiting"
                    period="Jan 2022 - May 2022"
                    index={1}
                    totalCards={3}
                    icon="/images/berkeley-logo.png"
                  />
                  <EducationCard
                    school="The Chinese University of Hong Kong, Shenzhen"
                    degree="B.S. in Electric Information Engineering"
                    period="Sep 2019 - Jun 2023"
                    index={2}
                    totalCards={3}
                    icon="/images/cuhksz-logo.png"
                  />
                </div>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#111] to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#111] to-transparent pointer-events-none"></div>
            </div>
          )}

          {activeSection === 'service' && (
            <div className="relative">
              <div className="overflow-x-auto pb-6 hide-scrollbar">
                <div className="flex gap-8 min-w-max px-8 py-4">
                  <ExperienceCard
                    title="Reviewer"
                    company=""
                    period=""
                    description={[
                      "IROS",
                      "ICRA",
                      "RA-L",
                      "CoRL"
                    ].join('\n')}
                    index={0}
                    totalCards={1}
                    icon=""
                  />
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
        <div className="max-w-[1200px] mx-auto text-center text-[#666] dark:text-[#888]">
          © {new Date().getFullYear()} Wenli Xiao. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
