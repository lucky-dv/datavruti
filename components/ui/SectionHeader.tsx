import { ReactNode } from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string | ReactNode;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignmentClasses[align]} ${className}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 bg-primary-100 rounded-full text-sm font-semibold text-primary-700 mb-4">
          {badge}
        </span>
      )}
      {typeof title === 'string' ? (
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight pb-1">
          {title}
        </h2>
      ) : (
        title
      )}
      {subtitle && (
        <p className="text-lg text-neutral-600 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
