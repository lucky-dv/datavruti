import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  borderHover?: string;
  className?: string;
}

export default function GlowCard({
  children,
  borderHover = 'hover:border-primary',
  className = '',
}: GlowCardProps) {
  return (
    <div className="group relative">
      <div
        className={`relative bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-neutral-100 ${borderHover} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
