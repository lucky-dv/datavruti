import Link from 'next/link';
import CTAButton from './CTAButton';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  showCTAs?: boolean;
  variant?: 'dark' | 'light';
}

export default function Hero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  showCTAs = true,
  variant = 'dark',
}: HeroProps) {
  const isDark = variant === 'dark';

  return (
    <section className={`${
      isDark
        ? 'bg-slate-900'
        : 'bg-slate-50'
    } section-padding relative overflow-hidden`}>
      {/* Background decoration */}
      {isDark ? (
        <>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </>
      ) : (
        <>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/25 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </>
      )}

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading ${
            isDark ? 'text-white drop-shadow-lg' : 'text-neutral-900'
          } animate-fade-in-up`}>
            {title}
          </h1>
          <p className={`text-xl md:text-2xl mb-10 leading-relaxed max-w-3xl mx-auto ${
            isDark ? 'text-neutral-300' : 'text-neutral-600'
          } animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
            {subtitle}
          </p>
          {showCTAs && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {primaryCTA && (
                <CTAButton
                  href={primaryCTA.href}
                  variant={isDark ? 'primary' : 'primary'}
                  size="lg"
                >
                  {primaryCTA.text}
                </CTAButton>
              )}
              {secondaryCTA && (
                <CTAButton
                  href={secondaryCTA.href}
                  variant={isDark ? 'outline-light' : 'secondary'}
                  size="lg"
                >
                  {secondaryCTA.text}
                </CTAButton>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
