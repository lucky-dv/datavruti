import Hero from '@/components/Hero';
import Link from 'next/link';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.datavruti.com';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Join Talent Pool | 100+ Data Jobs | Data Engineers & Scientists',
    description: 'Apply for 100+ permanent and contract data jobs across all levels. Data Engineers, Scientists, Analysts, DevOps, MLOps & more. Join datavruti\'s curated talent pool and get matched with top companies.',
    alternates: {
      canonical: `${siteUrl}/candidates`,
    },
    openGraph: {
      url: `${siteUrl}/candidates`,
      title: 'Join Talent Pool | 100+ Data Jobs | Data Engineers & Scientists',
      description: 'Apply for 100+ permanent and contract data jobs across all levels. Data Engineers, Scientists, Analysts, DevOps, MLOps & more. Join datavruti\'s curated talent pool and get matched with top companies.',
    },
    twitter: {
      title: 'Join Talent Pool | 100+ Data Jobs | Data Engineers & Scientists',
      description: 'Apply for 100+ permanent and contract data jobs across all levels. Data Engineers, Scientists, Analysts, DevOps, MLOps & more. Join datavruti\'s curated talent pool and get matched with top companies.',
    },
  };
}

export default function CandidatesPage() {
  return (
    <>
      <Hero
        title="Join Our Talent Pool -  Data Jobs"
        subtitle="Permanent & Contract opportunities across all levels - Data Engineers, Scientists, Analysts, DevOps, MLOps & more. Ready to start within 2 weeks."
        showCTAs={false}
      />

      {/* Why Join */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Why Candidates Choose datavruti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Curated Opportunities',
                  description: 'We match you with roles that align with your skills, experience, and career goals.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Top Companies',
                  description: 'Access exclusive opportunities with leading startups and enterprises.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Career Guidance',
                  description: 'Receive personalized support throughout your job search and interview process.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Fast Process',
                  description: 'No lengthy applications. We focus on getting you interviews quickly.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: 'Long-term Partnership',
                  description: 'We support your career growth beyond the initial placement.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: 'Confidential',
                  description: 'Your information is kept confidential and only shared with your consent.',
                },
              ].map((item, index) => {
                return (
                  <div key={index} className="group relative">
                    <div className={`relative flex gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-neutral-100 ${
                      index === 0 ? 'hover:border-primary' :
                      index === 1 ? 'hover:border-accent' :
                      index === 2 ? 'hover:border-secondary' :
                      index === 3 ? 'hover:border-primary' :
                      index === 4 ? 'hover:border-accent' :
                      'hover:border-secondary'
                    }`}>
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                        index === 0 ? 'bg-primary-100' :
                        index === 1 ? 'bg-accent-100' :
                        index === 2 ? 'bg-secondary-100' :
                        index === 3 ? 'bg-primary-100' :
                        index === 4 ? 'bg-accent-100' :
                        'bg-secondary-100'
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-neutral-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Roles We Fill */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-center">
            Our Clients Trust Us
            </h2>
            <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
to hire for permanent & contract positions across all things data
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: 'Data Engineering',
                  roles: ['Data Engineer', 'ETL / ELT Developer', 'Data Architect', 'Platform Engineer', 'Big Data Engineer'],
                },
                {
                  category: 'Data Science & Applied AI',
                  roles: ['Data Scientist', 'Applied Scientist', 'Machine Learning Engineer', 'AI Engineer', 'Research Scientist'],
                },
                {
                  category: 'Business Intelligence & Analytics',
                  roles: ['Data Analyst', 'Analytics Engineer', 'BI Developer', 'Business Analyst', 'Visualization Specialist'],
                },
                {
                  category: 'Data Leadership',
                  roles: ['Chief Data Officer', 'VP of Data', 'Head of Analytics', 'Data Science Manager', 'Data Engineering Manager'],
                },
                {
                  category: 'Specialized Roles',
                  roles: ['MLOps Engineer', 'DataOps Engineer', 'Data Quality Engineer', 'BI Architect', 'Analytics Platform Engineer'],
                },
                {
                  category: 'Emerging Tech',
                  roles: ['Agentic AI Engineer', 'Voice AI Engineer', 'LLM Systems Engineer', 'Conversational AI Engineer', 'AI Product Manager'],
                },
              ].map((roleGroup, index) => {
                return (
                  <div key={index} className="group relative">
                    <div className={`relative bg-white p-8 rounded-2xl border-2 border-neutral-100 shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col ${
                      index === 0 ? 'hover:border-primary' :
                      index === 1 ? 'hover:border-accent' :
                      index === 2 ? 'hover:border-secondary' :
                      index === 3 ? 'hover:border-primary' :
                      index === 4 ? 'hover:border-accent' :
                      'hover:border-secondary'
                    }`}>
                      <h3 className="text-xl font-bold text-neutral-900 mb-4 pb-3 border-b border-neutral-200">
                        {roleGroup.category}
                      </h3>
                      <ul className="space-y-2">
                        {roleGroup.roles.map((role, idx) => {
                          const iconColors = ['text-accent', 'text-secondary', 'text-primary'];
                          const colorClass = iconColors[idx % 3];
                          return (
                            <li key={idx} className="flex items-center text-neutral-700">
                              <svg className={`w-5 h-5 ${colorClass} mr-3 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {role}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Industries & Technologies
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Industries & Technologies We Cover
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative h-full">
                <div className="relative bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-neutral-100 hover:border-primary h-full flex flex-col">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Industries
                  </h3>
                  <ul className="grid grid-cols-2 gap-3 flex-grow">
                    {['BFSI', 'Retail', 'Manufacturing', 'eCommerce', 'Telecom', 'Healthcare', 'Automotive', 'Chemicals'].map((industry) => (
                      <li key={industry} className="flex items-center text-neutral-700">
                        <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                        {industry}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="group relative h-full">
                <div className="relative bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-neutral-100 hover:border-secondary h-full flex flex-col">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-secondary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    Cloud Platforms
                  </h3>
                  <ul className="grid grid-cols-2 gap-3 flex-grow">
                    {['AWS', 'Azure', 'GCP', 'Oracle Cloud', 'IBM Cloud', 'Alibaba Cloud', 'DigitalOcean', 'Linode'].map((cloud) => (
                      <li key={cloud} className="flex items-center text-neutral-700">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                        {cloud}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

    </>
  );
}
