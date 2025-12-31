import CTAButton from '@/components/CTAButton';
import Hero from '@/components/Hero';
import PartnerLogoCarousel from '@/components/PartnerLogoCarousel';
import GlowCard from '@/components/ui/GlowCard';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/ui/CTASection';
import IconBadge from '@/components/ui/IconBadge';
import aboutData from '@/content/about.json';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.datavruti.com';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us | datavruti - Specialized Data Recruitment Agency',
    description: 'Learn about datavruti - India\'s premier data recruitment agency. Discover our mission to connect companies with exceptional data engineers, scientists, and analytics talent.',
    alternates: {
      canonical: `${siteUrl}/about`,
    },
    openGraph: {
      url: `${siteUrl}/about`,
      title: 'About Us | datavruti - Specialized Data Recruitment Agency',
      description: 'Learn about datavruti - India\'s premier data recruitment agency. Discover our mission to connect companies with exceptional data engineers, scientists, and analytics talent.',
    },
    twitter: {
      title: 'About Us | datavruti - Specialized Data Recruitment Agency',
      description: 'Learn about datavruti - India\'s premier data recruitment agency. Discover our mission to connect companies with exceptional data engineers, scientists, and analytics talent.',
    },
  };
}

export default function AboutPage() {
  const partnerLogos = aboutData.partnerLogos ?? [];

  return (
    <>
      <Hero
        title="About datavruti"
        subtitle="Bridging the gap between exceptional data talent and innovative companies"
        showCTAs={false}
      />

      {/* Mission & Vision */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-neutral-100 hover:border-primary">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">{aboutData.mission}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-neutral-100 hover:border-accent">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-accent mb-4">Our Mision</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">{aboutData.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100/40 rounded-full blur-3xl -z-0"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge="Our Journey"
              title="Our Story"
              align="center"
              className="mb-12"
            />
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-neutral-100 p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {aboutData.story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-neutral-700 mb-6 text-lg leading-relaxed first:text-xl first:text-neutral-800 first:font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Types - Trusted By */}
      {aboutData.clientList && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                badge="Trusted Globally"
                title="Who We Work With"
                align="center"
                className="mb-12"
              />
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-neutral-100 p-8 md:p-12">
                <p className="text-base text-neutral-600 mb-8 text-center">
                  Trusted by 50+ clients worldwide, including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutData.clientList.map((client, idx) => {
                    const colors = [
                      'text-primary-600',
                      'text-secondary-600',
                      'text-accent-600',
                    ];
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <svg className={`w-5 h-5 ${colors[idx % 3]} flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-neutral-700">{client}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Sectors & Job Families */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sectors */}
            {aboutData.sectors && (
              <div>
                <SectionHeader
                  badge="Industries"
                  title="Our Top Sectors"
                  align="left"
                  className="mb-8"
                />
                <div className="space-y-4">
                  {aboutData.sectors.map((sector: any, index: number) => (
                    <div key={index} className="group relative">
                      <div className="relative bg-neutral-50 rounded-xl p-5 border-2 border-neutral-200 hover:border-primary transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-neutral-900">{sector.name}</span>
                          <span className="text-2xl font-bold text-primary">
                            {sector.percentage}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Job Families */}
            {aboutData.jobFamilies && (
              <div>
                <SectionHeader
                  badge="Expertise"
                  title="Job Families We Excel At"
                  align="left"
                  className="mb-8"
                />
                <div className="space-y-4">
                  {aboutData.jobFamilies.map((family: any, index: number) => (
                    <div key={index} className="group relative">
                      <div className="relative bg-neutral-50 rounded-xl p-5 border-2 border-neutral-200 hover:border-secondary transition-all duration-300">
                        <h4 className="text-lg font-bold text-neutral-900 mb-2">{family.category}</h4>
                        <p className="text-neutral-600">{family.roles}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      {aboutData.engagementModels && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <SectionHeader
              badge="How We Work"
              title="Engagement Models"
              subtitle="Flexible solutions tailored to your needs"
              align="center"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {aboutData.engagementModels.map((model: any, index: number) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-neutral-100 text-center flex flex-col h-full ${
                    index === 0 ? 'hover:border-primary' :
                    index === 1 ? 'hover:border-accent' :
                    'hover:border-secondary'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg flex-shrink-0 ${
                    index === 0 ? 'bg-primary' :
                    index === 1 ? 'bg-accent' :
                    'bg-secondary'
                  }`}>
                    <span className="text-3xl font-bold text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{model.name}</h3>
                  <p className="text-neutral-600 leading-relaxed flex-grow">{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            badge="What Drives Us"
            title="Our Values"
            align="center"
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((value, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-neutral-100 hover:border-primary h-full flex flex-col">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-6">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 text-center group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 text-center leading-relaxed flex-grow">{value.description}</p>
                  <div className="mt-4 h-1 w-0 bg-primary rounded-full mx-auto group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-40 md:py-32 md:mb-0 -mb-28">
        {/* Animated orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-sm font-semibold text-primary-300 mb-4">
              By The Numbers
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Our Impact
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Delivering measurable results that transform businesses
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-700 group-hover:border-primary transition-all duration-500 h-full flex flex-col items-center justify-center hover:scale-105">
                  <p className="text-5xl md:text-6xl font-bold text-accent group-hover:scale-110 transition-transform duration-300 mb-3">
                    {stat.number}
                  </p>
                  <p className="text-slate-300 font-medium text-center group-hover:text-white transition-colors duration-300">{stat.label}</p>
                  <div className="mt-4 h-1 w-0 bg-accent rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos
      {partnerLogos.length > 0 && (
        <section className="py-16 md:py-20 bg-white relative">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">
                Attracting Top Talent
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-4 mb-4">
                Attracting top talent from great companies
              </h2>
              <p className="text-lg text-neutral-600">
                The data leaders we place come from some of the most admired companies in the world.
              </p>
            </div>

            <PartnerLogoCarousel logos={partnerLogos} />
          </div>
        </section>
      )} */}

      {/* CTA Banner */}
      <CTASection
        title="Ready to Build Your Data Team?"
        subtitle="Let's connect you with top data professionals who can drive your business forward."
        actions={[
          { label: 'Hire Talent', href: '/contact', variant: 'primary' },
          { label: 'Join as Candidate', href: '/candidates', variant: 'outline-light' },
        ]}
      />

    </>
  );
}
