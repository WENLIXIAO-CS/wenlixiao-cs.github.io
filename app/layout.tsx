import type { Metadata } from "next";
import { Source_Serif_4 } from 'next/font/google'
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wenlixiao.com'),
  title: {
    default: 'Wenli Xiao | CMU Robotics PhD',
    template: '%s | Wenli Xiao',
  },
  description: 'Wenli Xiao is a Robotics PhD student at Carnegie Mellon University, working on humanoid robots, robot foundation models, and agile mobility.',
  keywords: ['robotics', 'humanoid', 'CMU', 'robot learning', 'reinforcement learning', 'foundation models', 'Wenli Xiao'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Wenli Xiao | CMU Robotics PhD',
    description: 'Robotics PhD student at Carnegie Mellon University, working on humanoid robots, robot foundation models, and agile mobility.',
    url: 'https://wenlixiao.com',
    siteName: 'Wenli Xiao',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wenli Xiao - CMU Robotics PhD',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wenli Xiao | CMU Robotics PhD',
    description: 'Robotics PhD student at CMU, working on humanoid robots and robot foundation models.',
    creator: '@_wenlixiao',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">🤖</text></svg>',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${sourceSerif.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
