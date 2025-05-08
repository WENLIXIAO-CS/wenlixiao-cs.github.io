'use client';

import Image from 'next/image';

const logos = [
  { src: '/carousel/nvidia.png', alt: 'NVIDIA' },
  { src: '/carousel/cmu-ri.gif', alt: 'CMU RI' },
  { src: '/carousel/lecar.png', alt: 'LeCAR Lab' },
  { src: '/carousel/drive.png', alt: 'Drive' },
];

export default function LogoCarousel() {
  return (
    <div className="w-full bg-white dark:bg-[#111] py-8">
      <div className="flex justify-center items-center gap-16">
        {logos.map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={120}
              className="object-contain h-12 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
} 