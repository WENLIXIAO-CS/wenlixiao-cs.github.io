export interface NewsItem {
  date: string;
  content: string;
  href?: string;
  logo?: string;
  logoDark?: string;
  suffix?: string;
  /**
   * Inline link rendered between `content` and `suffix` (e.g. a journal name).
   * For items that link only part of their text — use `href` to link the whole item.
   */
  link?: { text: string; href: string };
}

export const newsItems: NewsItem[] = [
  {
    date: "2026 Sep",
    content: "ENPIRE was accepted by CoRL 2026!"
  },
  {
    date: "2026 Aug",
    content: "SONIC was accepted by ",
    link: {
      text: "Science Robotics",
      href: "https://www.science.org/doi/10.1126/scirobotics.aed4592"
    },
    suffix: "!"
  },
  {
    date: "2026 Jun",
    content: "Joined Physical Intelligence",
    href: "https://www.pi.website/",
    logo: "/images/pi-logo.png",
    logoDark: "/images/pi-logo-dark.png"
  },
  {
    date: "2026 Jun",
    content: "ENPIRE released!",
    href: "https://x.com/DrJimFan/status/2066921736369766762"
  },
  {
    date: "2026 Apr",
    content: "CaP-X was accepted by ICML 2026!"
  },
  {
    date: "2026 Feb",
    content: "VIRAL and DoorMan were accepted by CVPR 2026!"
  },
  {
    date: "2026 Jan",
    content: "PLD was accepted by ICLR 2026!"
  },
  {
    date: "2025 Oct",
    content: "Received CMU RI Presidential Fellowship!"
  }
];
