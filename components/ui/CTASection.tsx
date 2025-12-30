import { ReactNode } from 'react';
import CTAButton from '@/components/CTAButton';

interface CTAAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
}

interface CTASectionProps {
  title: string;
  subtitle?: string;
  actions?: CTAAction[];
  children?: ReactNode;
  className?: string;
}

export default function CTASection({
  title,
  subtitle,
  actions = [],
  children,
  className = '',
}: CTASectionProps) {
  return (
    <section className={`relative overflow-hidden bg-slate-900 text-white py-16 md:py-32 ${className}`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900"></div>

      {/* Very subtle animated orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary-500/6 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-heading">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          {actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {actions.map((action, index) => (
                <CTAButton
                  key={index}
                  href={action.href}
                  variant={action.variant || 'primary'}
                  size={action.size || 'lg'}
                >
                  {action.label}
                </CTAButton>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
