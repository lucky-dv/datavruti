import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  onClick,
}: CTAButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center text-center font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-600 shadow-lg hover:shadow-2xl hover:shadow-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary-600 shadow-lg hover:shadow-xl hover:shadow-secondary/40',
    outline: 'border-2 border-accent text-accent hover:bg-accent-50 hover:border-accent-600 shadow-sm hover:shadow-md',
    'outline-light': 'border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm hover:shadow-lg hover:shadow-white/20',
  };

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass}`;

  if (onClick) {
    return (
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
