import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import CTAButton from '@/components/CTAButton';
import services from '@/content/services.json';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

const siteUrl = 'https://www.datavruti.com';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const canonicalUrl = `${siteUrl}/services/${service.slug}`;

  return {
    title: `${service.title} | datavruti`,
    description: service.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      title: `${service.title} | datavruti`,
      description: service.description,
    },
    twitter: {
      title: `${service.title} | datavruti`,
      description: service.description,
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Hero title={service.title} subtitle={service.shortDescription} showCTAs={false} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                Overview
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                What You Get
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-neutral-50 rounded-lg"
                  >
                    <svg
                      className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-neutral-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                Our Process
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Understanding Your Needs',
                    description: 'We start with a deep dive into your requirements, tech stack, and team culture.',
                  },
                  {
                    step: '2',
                    title: 'Sourcing & Screening',
                    description: 'We leverage our network and expertise to find and thoroughly vet candidates.',
                  },
                  {
                    step: '3',
                    title: 'Presentation',
                    description: 'We present only the best-matched candidates with detailed profiles.',
                  },
                  {
                    step: '4',
                    title: 'Support & Follow-up',
                    description: 'We support the interview process and ensure smooth onboarding.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-lg text-neutral-600 mb-6">
                Let's discuss how we can help you find the perfect {service.title.toLowerCase()}.
              </p>
              <CTAButton href="/contact" variant="primary" size="lg">
                Contact Us
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
