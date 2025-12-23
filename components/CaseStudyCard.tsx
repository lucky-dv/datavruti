import Link from 'next/link';

interface CaseStudyCardProps {
  slug: string;
  title: string;
  client: string;
  industry: string;
  result: string;
  timeframe: string;
  placements: number;
}

export default function CaseStudyCard({
  slug,
  title,
  client,
  industry,
  result,
  timeframe,
  placements,
}: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${slug}`} className="block group h-full">
      <div className="relative h-full">
        <div className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-neutral-100 hover:border-primary h-full flex flex-col">
          <div className="relative p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-primary-700 bg-primary-100 px-4 py-1.5 rounded-full shadow-sm">
                {industry}
              </span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors duration-300 font-heading">{title}</h3>
            <p className="text-sm text-neutral-600 mb-4 font-medium">{client}</p>
            <p className="text-neutral-700 mb-4 line-clamp-3 leading-relaxed flex-grow">{result}</p>
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 group-hover:border-primary-200 transition-colors duration-300">
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-neutral-500 text-xs mb-1">Timeframe</p>
                  <p className="font-bold text-neutral-900 flex items-center gap-1">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {timeframe}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500 text-xs mb-1">Placements</p>
                  <p className="font-bold text-primary flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {placements}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                <span>View</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
