export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: string;
  advisor?: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  icon: string;
  advisor?: string;
}

export interface Service {
  title: string;
  items: string[];
}

export const experiences: Experience[] = [
  {
    title: "Research Intern",
    company: "NVIDIA GEAR Lab",
    period: "2024 - Present",
    description: "",
    icon: "/images/nvidia.png",
    advisor: "Dr. Jim Fan\nProf. Yuke Zhu"
  },
  {
    title: "Research Intern",
    company: "Carnegie Mellon Univ Robotics Institute Summer Scholar, RISS",
    period: "June 2022 - Aug 2023",
    description: "",
    icon: "/images/cmu-logo.jpg",
    advisor: "Prof. John Dolan\nYiwei Lyu"
  },
  {
    title: "Research Intern",
    company: "RISE Lab, UC Berkeley",
    period: "March 2022 - May 2022",
    description: "",
    icon: "/images/berkeley-logo.png",
    advisor: "Prof. Joseph E. Gonzalez\nTianjun Zhang"
  },
  {
    title: "Research Intern",
    company: "NCEL Lab, Shenzhen AIRS",
    period: "Aug 2020 - Feb 2022",
    description: "",
    icon: "/images/airs-logo.jpeg",
    advisor: "Prof. Jianwei Huang\nProf. Bing Luo"
  }
];

export const educations: Education[] = [
  {
    school: "Carnegie Mellon University",
    degree: "Ph.D. in Robotics",
    period: "Aug 2025 - Present",
    advisor: "Prof. Guanya Shi",
    icon: "/images/cmu-logo.jpg"
  },
  {
    school: "Carnegie Mellon University",
    degree: "M.S. in Robotics",
    period: "Sep 2023 - May 2025",
    advisor: "Prof. Guanya Shi\nProf. John Dolan",
    icon: "/images/cmu-logo.jpg"
  },
  {
    school: "UC Berkeley",
    degree: "Visiting in EECS",
    period: "Jan 2022 - May 2022",
    icon: "/images/berkeley-logo.png"
  },
  {
    school: "The Chinese University of Hong Kong, Shenzhen",
    degree: "B.S. in Electric Information Engineering",
    period: "Sep 2019 - Jun 2023",
    icon: "/images/cuhksz-logo.png"
  }
];

export const services: Service[] = [
  {
    title: "Conference and Journal Reviewer",
    items: [
      "International Conference on Robotics and Automation (ICRA)",
      "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
      "IEEE Robotics and Automation Letters (RA-L)",
      "Conference on Robot Learning (CoRL)",
      "The International Journal of Robotics Research (IJRR)"
    ]
  }
];
