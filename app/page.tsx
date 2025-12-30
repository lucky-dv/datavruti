import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import CTAButton from '@/components/CTAButton';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/ui/CTASection';
import PartnerLogoCarousel from '@/components/PartnerLogoCarousel';
import services from '@/content/services.json';
import testimonials from '@/content/testimonials.json';
import aboutData from '@/content/about.json';
import { organizationSchema, localBusinessSchema, websiteSchema, breadcrumbSchema } from '@/utils/seo-config';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://datavruti.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Recruitment Agency For Data Professionals | Hire Data Engineers, Scientists & Analysts',
    description: 'datavruti is a specialized data recruitment agency connecting companies with top data talent. We help you hire skilled data engineers, data scientists, and analytics professionals globally.',
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      url: siteUrl,
      title: 'Data Recruitment Agency | Hire Data Engineers, Scientists & Analysts',
      description: 'datavruti is a specialized data recruitment agency connecting companies with top data talent. We help you hire skilled data engineers, data scientists, and analytics professionals globally.',
    },
    twitter: {
      title: 'Data Recruitment Agency | Hire Data Engineers, Scientists & Analysts',
      description: 'datavruti is a specialized data recruitment agency connecting companies with top data talent. We help you hire skilled data engineers, data scientists, and analytics professionals globally.',
    },
  };
}

export default function Home() {
  const partnerLogos = aboutData.partnerLogos ?? [];
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: siteUrl }])) }}
      />

      {/* Hero Section */}
      <Hero
        title="Specialists in hiring all things data
"
        subtitle="datavruti helps global enterprises and well funded startups in India and the US to hire deeply curated data talent, from Data Analysts to PhDs and everything in between.
"
        primaryCTA={{ text: 'Hire Talent', href: '/contact' }}
        secondaryCTA={{ text: 'Apply Now', href: '/apply' }}
        variant="dark"
      />

      {/* Why Choose Us - Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose datavruti
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We hire for you like it’s our brand, our money and our reputation at stake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Specialized Focus',
                description: 'Exclusively focused on data, analytics, and AI roles. We speak your language.',
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Fast Turnaround',
                description: 'Average 3 weeks to hire. We respect your timeline and move with urgency.',
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Deeply Technical',
                description: 'Technical recruiters who ask the right questions to detect AI slop',
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Massive Pool',
                description: 'Sourced across channels ensuring fastest access to relevant talent.',
              },
            ].map((feature, index) => {
              return (
                <div key={index} className="text-center group relative">
                  <div className={`relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-neutral-100 h-full flex flex-col ${
                    index === 0 ? 'hover:border-primary-500' :
                    index === 1 ? 'hover:border-secondary-500' :
                    index === 2 ? 'hover:border-accent-500' :
                    'hover:border-primary-500'
                  }`}>
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ${
                      index === 0 ? 'bg-primary-50' :
                      index === 1 ? 'bg-secondary-50' :
                      index === 2 ? 'bg-accent-50' :
                      'bg-primary-50'
                    }`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                About datavruti
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed mb-6">
                datavruti is India's premier recruitment agency specializing exclusively in data, analytics, and AI talent. We bridge the gap between innovative companies and exceptional data professionals.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Founded by industry veterans who understand the unique challenges of hiring in this domain, we combine deep technical expertise with proven recruitment excellence. Our mission is simple: connect the right talent with the right opportunity, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Our Specialized Services
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-4">
Whether you are looking for an experienced strategic partner to guide your talent function or need to attract top talent for niche roles or deploy resources on a short notice - we've got you covered.            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                href={`/services/${service.slug}`}
                icon={service.icon}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <CTAButton href="/services" variant="outline" size="lg">
              View All Services
            </CTAButton>
          </div>
        </div>
      </section>

      {/* How We Work - Process */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              How We Work
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our proven 4-step process ensures you get the best data talent, quickly and efficiently
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  step: '01',
                  title: 'Discovery & Requirements',
                  description: 'We start with a deep dive into your needs - tech stack, team culture, growth plans, and specific role requirements. We believe in understanding the "why" behind every hire.',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  gradient: 'from-accent-500 to-accent-600',
                },
                {
                  step: '02',
                  title: 'Sourcing & Screening',
                  description: 'Leveraging our extensive network and technical expertise, we identify and vet candidates. Every professional goes through rigorous technical and cultural assessments.',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  gradient: 'from-secondary-600 to-secondary-700',
                },
                {
                  step: '03',
                  title: 'Candidate Presentation',
                  description: 'We present only the best-matched candidates with detailed profiles, technical screening, and our insights. Quality over quantity, always.',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  gradient: 'from-primary-600 to-primary-700',
                },
                {
                  step: '04',
                  title: 'Interview & Onboarding Support',
                  description: 'We facilitate the interview process, provide feedback coordination, and support salary negotiations. Our partnership continues through successful onboarding.',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  gradient: 'from-accent-500 to-accent-600',
                },
              ].map((process, index) => {
                const stepColors = [
                  'text-accent-200',
                  'text-secondary-200',
                  'text-primary-200',
                  'text-accent-200'
                ];
                const bgColors = ['bg-accent', 'bg-secondary', 'bg-primary', 'bg-accent'];
                return (
                  <div key={index} className="group relative">
                    <div className={`relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-neutral-100 h-full flex flex-col ${
                      index === 0 ? 'hover:border-accent-500' :
                      index === 1 ? 'hover:border-secondary-500' :
                      index === 2 ? 'hover:border-primary-500' :
                      'hover:border-accent-500'
                    }`}>
                      <div className={`absolute top-4 right-4 text-6xl font-bold ${stepColors[index]}`}>
                        {process.step}
                      </div>
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300 ${bgColors[index]}`}>
                        {process.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        {process.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed flex-grow">
                        {process.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We've successfully placed data professionals across diverse industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              {
                name: 'Fintech',
                icon: (
                  <svg className="w-12 h-12 text-accent-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                name: 'E-commerce',
                icon: (
                  <svg className="w-12 h-12 text-secondary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                name: 'Healthcare',
                icon: (
                  <svg className="w-12 h-12 text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                )
              },
              {
                name: 'SaaS',
                icon: (
                  <svg className="w-12 h-12 text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                name: 'Consulting',
                icon: (
                  <svg className="w-12 h-12 text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                name: 'Startups',
                icon: (
                  <svg className="w-12 h-12 text-secondary-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
            ].map((industry, index) => {
              return (
                <div key={index} className="group relative">
                  <div className={`relative text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border-2 border-neutral-100 ${
                    index === 0 ? 'hover:border-accent' :
                    index === 1 ? 'hover:border-primary' :
                    index === 2 ? 'hover:border-secondary' :
                    index === 3 ? 'hover:border-accent' :
                    index === 4 ? 'hover:border-primary' :
                    'hover:border-secondary'
                  }`}>
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                      {industry.icon}
                    </div>
                    <p className="font-semibold text-neutral-900">{industry.name}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From early-stage startups to established enterprises, we understand the unique data hiring needs of each industry and company stage.
            </p>
          </div>
        </div>
      </section>

      {/* Trusted by Leading Companies - Partner Logos */}
      {partnerLogos.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Trusted by Leading Companies
              </h2>
              <p className="text-lg text-neutral-600">
                The data leaders we place come from some of the most admired companies in the world.
              </p>
            </div>

            <PartnerLogoCarousel logos={partnerLogos} bgColor="neutral-50" />
          </div>
        </section>
      )}

      {/* Roles We Fill */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Roles We Fill
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From technical specialists to leadership positions, we recruit across all data functions
            </p>
          </div>

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
                roles: ['MLOps Engineer', 'DataOps Engineer', 'Data Quality Engineer', 'BI Architect', ' Analytics Platform Engineer'],
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

          <div className="mt-12 text-center">
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-6">
              Don't see the exact role you're hiring for? Our coverage goes well beyond these roles and we'll be happy to understand your specific requirements.
            </p>
            <CTAButton href="/contact" variant="primary" size="lg">
              Discuss Your Hiring Needs
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Trusted by leading companies for data hiring excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-neutral-100 flex flex-col">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <svg className="w-20 h-20 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-grow">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-base text-neutral-700 leading-relaxed mb-6 flex-grow">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-500 to-secondary-600 flex items-center justify-center text-white text-xl font-bold shadow-md flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-lg font-bold text-neutral-900">{testimonial.name}</p>
                      <p className="text-sm text-neutral-600">{testimonial.position}</p>
                      <p className="text-sm text-neutral-500 truncate">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTASection
        title="Ready to Build Your Data Team?"
        subtitle="Let's connect you with top data professionals who can drive your business forward."
        actions={[
          { label: 'Hire Talent', href: '/contact', variant: 'primary' },
          { label: 'Apply Now', href: '/apply', variant: 'outline-light' },
        ]}
      />
    </>
  );
}
