export type ProjectCategory = 'foundation' | 'humanoid' | 'mobility' | 'all';

export interface Project {
  id: string;
  title: string;
  image: string;
  imageType: 'gif' | 'static';
  category: ProjectCategory;
  role: string;
  points: string[];
  website?: string;
  arxiv?: string;
  video?: string;
  code?: string;
  twitter?: string;
  pdf?: string;
  authors?: string[];
}

export const projects: Project[] = [
  {
    id: 'pld',
    title: "Self-Improving Vision-Language-Action Models with Data Generation via Residual RL",
    image: "/images/pld-teaser.gif",
    imageType: "gif",
    category: "foundation",
    role: "Co-Lead",
    points: [
      "ICLR 2026",
      "TL;DR: PLD (Probe, Learn, Distill) is a plug-and-play recipe for Vision-Language-Action (VLA) post-training. It is model agnostic, supporting both autoregressive and diffusion architectures, and can push success rates to 99%."
    ],
    website: "https://www.wenlixiao.com/self-improve-VLA-PLD",
    twitter: "https://x.com/_wenlixiao/status/1984307913247375428",
    authors: ["Wenli Xiao*", "Haotian Lin*", "Andy Peng", "Haoru Xue", "Tairan He", "Yuqi Xie", "Fengyuan Hu", "Jimmy Wu", "Zhengyi Luo", "Linxi \"Jim\" Fan\u2020", "Guanya Shi", "Yuke Zhu\u2020"]
  },
  {
    id: 'hover',
    title: "HOVER: Versatile Neural Whole-Body Controller for Humanoid Robots",
    image: "/images/hover.gif",
    imageType: "gif",
    category: "foundation",
    role: "Co-Lead",
    points: [
      "ICRA 2025",
      "TL;DR: HOVER is a 1.5M-parameter neural network to control the body of a humanoid robot. It takes a lot of subconscious processing for us humans to walk, maintain balance, and maneuver our arms and legs into desired positions. We capture this 'subconsciousness' in HOVER, a single model that learns how to coordinate the motors of a humanoid robot to support locomotion and manipulation."
    ],
    arxiv: "https://arxiv.org/abs/2410.21229",
    website: "https://hover-versatile-humanoid.github.io/",
    twitter: "https://x.com/DrJimFan/status/1851643431803830551",
    code: "https://github.com/NVlabs/HOVER/",
    authors: ["Tairan He*", "Wenli Xiao*", "Toru Lin", "Zhengyi Luo", "Zhengjia Xu", "Zhenyu Jiang", "Jan Kautz", "Changliu Liu", "Guanya Shi", "Xiaolong Wang", "Linxi 'Jim' Fan\u2020", "Yuke Zhu\u2020"]
  },
  {
    id: 'anycar',
    title: "AnyCar to Anywhere: Learning Universal Dynamics Model",
    image: "/images/anycar.gif",
    imageType: "gif",
    category: "foundation",
    role: "Co-Lead",
    points: [
      "CoRL 2024, X-Embodiment workshop",
      "ICRA 2025",
      "TL;DR: AnyCar is a generalist vehicle dynamics model for agile mobility. It can adapt to various cars, tasks, and envs via in-context adaptation, outperforming well-tuned generalist models up to 54%."
    ],
    arxiv: "https://arxiv.org/abs/2409.15783",
    website: "https://lecar-lab.github.io/anycar/",
    twitter: "https://x.com/_wenlixiao/status/1846582020585275565",
    code: "https://github.com/LeCAR-Lab/anycar",
    video: "https://www.youtube.com/embed/BiSYeNb0Y70",
    authors: ["Wenli Xiao*", "Haoru Xue*", "Tony Tao", "Dvij Kalaria", "John Dolan", "Guanya Shi"]
  },
  {
    id: 'asap',
    title: "ASAP: Aligning Simulation and Real-World Physics",
    image: "/images/ASAP.gif",
    imageType: "gif",
    category: "humanoid",
    role: "Co-Lead",
    points: [
      "RSS 2024",
      "TL;DR: ASAP learns agile whole-body humanoid motions via learning a residual action model from the real world to align sim and real physics."
    ],
    arxiv: "https://arxiv.org/abs/2502.01143",
    website: "https://agile.human2humanoid.com/",
    code: "https://github.com/LeCAR-Lab/ASAP",
    twitter: "https://x.com/_wenlixiao/status/1886805380354728392",
    authors: ["Tairan He*", "Jiawei Gao*", "Wenli Xiao*", "Yuanhang Zhang*", "Zi Wang", "Jiashun Wang", "Zhengyi Luo", "Guanqi He", "Nikhil Sobanbab", "Chaoyi Pan", "Zeji Yi", "Guannan Qu", "Kris Kitani", "Jessica Hodgins", "Linxi 'Jim' Fan", "Yuke Zhu", "Changliu Liu", "Guanya Shi"]
  },
  {
    id: 'sonic',
    title: "SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control",
    image: "/images/sonic.gif",
    imageType: "gif",
    category: "humanoid",
    role: "Core Engineer",
    points: [
      "TL;DR: SONIC is a general humanoid whole-body motion tracker supporting various control modes."
    ],
    arxiv: "https://arxiv.org/abs/2511.07820",
    website: "https://nvlabs.github.io/SONIC/",
    twitter: "https://x.com/zhengyiluo/status/1988277780258386038",
    authors: ["Zhengyi Luo", "Ye Yuan", "Tingwu Wang", "Chenran Li", "Sirui Chen", "Fernando Castañeda", "Zi-Ang Cao", "Jiefeng Li", "David Minor", "Qingwei Ben", "Xingye Da", "Runyu Ding", "Cyrus Hogg", "Lina Song", "Edy Lim", "Eugene Jeong", "Tairan He", "Haoru Xue", "Wenli Xiao", "Zi Wang", "Simon Yuen", "Jan Kautz", "Yan Chang", "Umar Iqbal", "Linxi \"Jim\" Fan", "Yuke Zhu"]
  },
  {
    id: 'doorman',
    title: "DoorMan: Opening the Sim-to-Real Door for Humanoid Pixel-to-Action Policy Transfer",
    image: "/images/doorman.gif",
    imageType: "gif",
    category: "humanoid",
    role: "Core Engineer",
    points: [
      "TL;DR: DoorMan is a teacher-student-bootstrap framework for humanoid loco-manipulation, achieving 31.7% faster than human performance on real-world door opening."
    ],
    arxiv: "https://arxiv.org/abs/2512.01061",
    website: "https://doorman-humanoid.github.io/",
    twitter: "https://x.com/HaoruXue/status/1995903819964899498",
    authors: ["Haoru Xue*", "Tairan He*", "Zi Wang*", "Qingwei Ben", "Wenli Xiao", "Zhengyi Luo", "Ye Yuan", "Xingye Da", "Fernando Castañeda", "Guanya Shi", "Shankar Sastry", "Linxi \"Jim\" Fan", "Yuke Zhu"]
  },
  {
    id: 'viral',
    title: "VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation",
    image: "/images/viral.gif",
    imageType: "gif",
    category: "humanoid",
    role: "Core Engineer",
    points: [
      "TL;DR: VIRAL investigates the scaling law of visual sim-to-real for humanoid loco-manipulation with zero-shot, robust, continuous real-world deployment."
    ],
    arxiv: "https://arxiv.org/abs/2511.15200",
    website: "https://viral-humanoid.github.io/",
    twitter: "https://x.com/TairanHe99/status/1991546857097687372",
    authors: ["Tairan He*", "Zi Wang*", "Haoru Xue*", "Qingwei Ben*", "Zhengyi Luo", "Wenli Xiao", "Ye Yuan", "Xingye Da", "Fernando Castañeda", "Shankar Sastry", "Changliu Liu", "Guanya Shi", "Linxi \"Jim\" Fan", "Yuke Zhu"]
  },
  {
    id: 'softa',
    title: "Hold My Beer: Learning Gentle Humanoid Locomotion and End-Effector Stabilization Control",
    image: "/images/softa.gif",
    imageType: "gif",
    category: "humanoid",
    role: "Mentor",
    points: [
      "TL;DR: SoFTA is a slow-fast two-agent sim2real RL framework achieving human-level end-effector stability for humanoids."
    ],
    arxiv: "https://arxiv.org/abs/2505.24198",
    website: "https://lecar-lab.github.io/SoFTA/",
    code: "https://github.com/LeCAR-Lab/SoFTA",
    authors: ["Yitang Li", "Yuanhang Zhang", "Wenli Xiao", "Chaoyi Pan", "Haoyang Weng", "Guanqi He", "Tairan He", "Guanya Shi"]
  },
  {
    id: 'omnih2o',
    title: "OmniH2O: Universal and Dexterous Human-to-Humanoid Whole-Body Teleoperation and Learning",
    image: "/images/omnih2o.gif",
    imageType: "gif",
    category: "humanoid",
    role: "Core Engineer",
    points: [
      "CoRL 2024",
      "TL;DR: OmniH2O provides the first universal whole-body humanoid control interface that enables diverse teleoperation and autonomy methods."
    ],
    arxiv: "https://arxiv.org/abs/2406.08858",
    website: "https://omni.human2humanoid.com/",
    video: "https://www.youtube.com/watch?v=ofgxZHv0GMk",
    twitter: "https://x.com/TairanHe99/status/1799053120846402012",
    code: "https://github.com/LeCAR-Lab/human2humanoid",
    authors: ["Tairan He*", "Zhengyi Luo*", "Xialin He*", "Wenli Xiao", "Chong Zhang", "Weinan Zhang", "Kris Kitani", "Changliu Liu", "Guanya Shi"]
  },
  {
    id: 'wococo',
    title: "WoCoCo: Learning Whole-Body Humanoid Control with Sequential Contacts",
    image: "/images/wococo.gif",
    imageType: "gif",
    category: "humanoid",
    role: "Co-Lead",
    points: [
      "CoRL 2024 (Spotlight)",
      "RSS 2024, Task Specification Workshop",
      "TL;DR: WoCoCo is the first unified RL framework to learn whole-body humanoid control with sequential contacts."
    ],
    arxiv: "https://arxiv.org/abs/2406.06005",
    website: "https://lecar-lab.github.io/wococo/",
    video: "https://youtu.be/L18X-QbXqPI",
    twitter: "https://x.com/_wenlixiao/status/1801305252760850903",
    code: "https://github.com/LeCAR-Lab/wococo",
    authors: ["Chong Zhang*", "Wenli Xiao*", "Tairan He", "Guanya Shi"]
  },
  {
    id: 'h2o',
    title: "Learning Human-to-Humanoid Real-Time Whole-Body Teleoperation",
    image: "/images/h2o.gif",
    imageType: "gif",
    category: "humanoid",
    role: "Core Engineer",
    points: [
      "IROS 2024 (Oral presentation)",
      "ICRA 2024, Agile Robotics Workshop (Spotlight)",
      "TL;DR: H2O enables real-time whole-body teleoperation of a full-sized humanoid to perform tasks like pick and place, walking, kicking, boxing, etc."
    ],
    arxiv: "https://arxiv.org/abs/2403.04436",
    website: "https://human2humanoid.com/",
    video: "https://www.youtube.com/watch?v=0W4N2q7xtcQ",
    code: "https://github.com/LeCAR-Lab/human2humanoid",
    authors: ["Tairan He*", "Zhengyi Luo*", "Wenli Xiao", "Chong Zhang", "Kris Kitani", "Changliu Liu", "Guanya Shi"]
  },
  {
    id: 'safedpa',
    title: "Safe Deep Policy Adaptation",
    image: "/images/SafeDPA.gif",
    imageType: "gif",
    category: "mobility",
    role: "Co-Lead",
    points: [
      "ICRA 2024",
      "CoRL 2023 Deployable Workshop",
      "TL;DR: This paper jointly tackles policy adaptation and safe reinforcement learning with safety guarantees. Comprehensive experiments on (1) classic control problems (Inverted Pendulum), (2) simulation benchmarks (Safety Gym), and (3) a real-world agile robotics platform (RC Car) demonstrate great superiority of SafeDPA in both safety and task performance, over state-of-the-art baselines."
    ],
    arxiv: "https://arxiv.org/abs/2310.08602",
    website: "https://sites.google.com/view/safe-deep-policy-adaptation",
    video: "https://www.youtube.com/watch?v=PkyRzlRQVbE",
    twitter: "https://x.com/_wenlixiao/status/1790909857496961300",
    code: "https://github.com/LeCAR-Lab/SafeDPA",
    authors: ["Wenli Xiao*", "Tairan He*", "John Dolan", "Guanya Shi"]
  },
  {
    id: 'abs',
    title: "Agile But Safe: Learning Collision-Free High-Speed Legged Locomotion",
    image: "/images/abs.gif",
    imageType: "gif",
    category: "mobility",
    role: "Core Engineer",
    points: [
      "RSS 2024 (Outstanding Student Paper Award Finalist - Top 3)",
      "ICRA 2024, Agile Robotics Workshop (Spotlight)",
      "TL;DR: Legged robots navigating cluttered environments must be jointly agile for efficient task execution and safe to avoid collisions with obstacles or humans. Existing studies either develop conservative controllers (< 1.0 m/s) to ensure safety, or focus on agility without considering potentially fatal collisions. This paper introduces Agile But Safe (ABS), a learning-based control framework that enables agile and collision-free locomotion for quadrupedal robots."
    ],
    arxiv: "https://arxiv.org/abs/2401.17583",
    website: "https://agile-but-safe.github.io/",
    video: "https://www.youtube.com/watch?v=elWwPn5IhjA",
    code: "https://github.com/LeCAR-Lab/ABS",
    authors: ["Tairan He*", "Chong Zhang*", "Wenli Xiao", "Guanqi He", "Changliu Liu", "Guanya Shi"]
  }
];
