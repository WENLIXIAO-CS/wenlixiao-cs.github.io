export interface NewsItem {
  date: string;
  content: string;
  href?: string;
}

export const newsItems: NewsItem[] = [
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
