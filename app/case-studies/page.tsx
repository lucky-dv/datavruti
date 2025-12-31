import Hero from '@/components/Hero';
import CaseStudyCard from '@/components/CaseStudyCard';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/ui/CTASection';
import caseStudies from '@/content/case-studies.json';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.datavruti.com';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Data Hiring Case Studies | Recruitment Success Stories | datavruti',
    description: 'Explore datavruti\'s data hiring success stories and case studies. Learn how we helped BFSI, SaaS companies, and startups build world-class data teams through strategic recruitment partnerships.',
    alternates: {
      canonical: `${siteUrl}/case-studies`,
    },
    openGraph: {
      url: `${siteUrl}/case-studies`,
      title: 'Data Hiring Case Studies | Recruitment Success Stories | datavruti',
      description: 'Explore datavruti\'s data hiring success stories and case studies. Learn how we helped BFSI, SaaS companies, and startups build world-class data teams through strategic recruitment partnerships.',
    },
    twitter: {
      title: 'Data Hiring Case Studies | Recruitment Success Stories | datavruti',
      description: 'Explore datavruti\'s data hiring success stories and case studies. Learn how we helped BFSI, SaaS companies, and startups build world-class data teams through strategic recruitment partnerships.',
    },
  };
}

export default function CaseStudiesPage() {
  return (
    <>
      <Hero
        title="Case Studies"
        subtitle="Real results from our data hiring partnerships"
        showCTAs={false}
      />

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            badge="Success Stories"
            title="Proven Results Across Industries"
            subtitle="Discover how we've helped companies build world-class data teams and achieve measurable business outcomes."
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.id}
                slug={caseStudy.slug}
                title={caseStudy.title}
                client={caseStudy.client}
                industry={caseStudy.industry}
                result={caseStudy.result}
                timeframe={caseStudy.timeframe}
                placements={caseStudy.placements}
              />
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
          { label: 'Join as Candidate', href: '/candidates', variant: 'outline-light' },
        ]}
      />
    </>
  );
}
