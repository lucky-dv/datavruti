import Hero from '@/components/Hero';
import TalentPoolForm from '@/components/TalentPoolForm';
import SectionHeader from '@/components/ui/SectionHeader';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://datavruti.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Apply Now | Join DataVruti Talent Pool',
    description: 'Apply to join DataVruti\'s talent pool and get matched with top data jobs. Quick 3-step application process for Data Engineers, Scientists, Analysts, and more.',
    alternates: {
      canonical: `${siteUrl}/apply`,
    },
    openGraph: {
      url: `${siteUrl}/apply`,
      title: 'Apply Now | Join DataVruti Talent Pool',
      description: 'Apply to join DataVruti\'s talent pool and get matched with top data jobs. Quick 3-step application process for Data Engineers, Scientists, Analysts, and more.',
    },
    twitter: {
      title: 'Apply Now | Join DataVruti Talent Pool',
      description: 'Apply to join DataVruti\'s talent pool and get matched with top data jobs. Quick 3-step application process for Data Engineers, Scientists, Analysts, and more.',
    },
  };
}

export default function ApplyPage() {
  return (
    <>
      <Hero
        title="Apply Now"
        subtitle="Join our talent pool and get matched with top data opportunities. Quick 3-step application process."
        showCTAs={false}
      />

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              badge="Join Our Talent Pool"
              title="Start Your Application"
              subtitle="Complete the 3-step application form to join our network. We'll match you with relevant opportunities from our 75+ renowned clients."
              align="center"
              className="mb-12"
            />
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-neutral-200">
              <div className="mb-8 p-6 bg-primary-50 rounded-lg border-l-4 border-primary">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  📋 Quick Application Process
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">1</span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">Job Information</p>
                      <p className="text-xs text-neutral-600">Role & preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">2</span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">Basic Information</p>
                      <p className="text-xs text-neutral-600">Personal & experience details</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">3</span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">Professional Details</p>
                      <p className="text-xs text-neutral-600">Skills, certifications & resume</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 mt-4">
                  ⏱️ Takes only 5-7 minutes to complete • Resume upload required (PDF/Word, max 10MB)
                </p>
              </div>
              <TalentPoolForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
