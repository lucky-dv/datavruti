import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export default function ServiceCard({
  title,
  description,
  href,
  icon,
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="relative">
        <div className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 h-full border-2 border-neutral-100 hover:border-primary overflow-hidden">
          <div className="relative z-10">
            {icon && (
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                {getIcon(icon)}
              </div>
            )}
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary transition-colors duration-300 font-heading">
              {title}
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">{description}</p>
            <span className="text-primary font-semibold inline-flex items-center group-hover:gap-3 transition-all duration-300">
              Learn more
              <svg
                className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function getIcon(iconName: string) {
  const icons: { [key: string]: JSX.Element } = {
    database: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    chart: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    lightbulb: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  };
  return icons[iconName] || icons.chart;
}
