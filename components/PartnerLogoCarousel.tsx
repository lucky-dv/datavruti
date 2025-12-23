'use client';

import { useMemo } from 'react';
import Image from 'next/image';

type PartnerLogo = {
  name: string;
  image: string;
};

type PartnerLogoCarouselProps = {
  logos: PartnerLogo[];
  bgColor?: 'white' | 'neutral-50';
};

const logoGradients = [
  'from-slate-50/95 via-white to-slate-100/80',
  'from-blue-50/90 via-white to-blue-100/70',
  'from-indigo-50/90 via-white to-indigo-100/70',
  'from-emerald-50/90 via-white to-emerald-100/70',
  'from-amber-50/90 via-white to-amber-100/70',
  'from-rose-50/90 via-white to-rose-100/70',
];

export default function PartnerLogoCarousel({ logos, bgColor = 'white' }: PartnerLogoCarouselProps) {
  const marqueeLogos = useMemo(() => {
    if (logos.length === 0) return [];
    return [...logos, ...logos];
  }, [logos]);

  if (marqueeLogos.length === 0) {
    return null;
  }

  const fadeGradientClass = bgColor === 'neutral-50'
    ? 'from-neutral-50 via-neutral-50/80'
    : 'from-white via-white/80';

  return (
    <div className="relative overflow-hidden group" aria-label="Logos of companies that hire through datavruti">
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r ${fadeGradientClass} to-transparent`}></div>
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l ${fadeGradientClass} to-transparent`}></div>

      <div className="mask-fade-x">
        <div
          className="flex w-max min-w-full items-center gap-6 sm:gap-8 logo-marquee motion-safe:group-hover:[animation-play-state:paused] motion-safe:group-focus-within:[animation-play-state:paused]"
          tabIndex={0}
        >
          {marqueeLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex h-28 w-44 sm:h-32 sm:w-52 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-neutral-200/50 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 px-6 py-4"
            >
              <div className="flex flex-1 w-full items-center justify-center relative h-16 w-full">
                <Image
                  src={logo.image}
                  alt={`${logo.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 176px, 208px"
                />
              </div>
              <p className="mt-2 w-full text-xs font-medium text-neutral-500 text-center truncate">
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
