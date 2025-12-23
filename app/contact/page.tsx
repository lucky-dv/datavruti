import Hero from '@/components/Hero';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://datavruti.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us | DataVruti - Data Hiring Experts',
    description: 'Get in touch with DataVruti to discuss your data hiring needs. Contact our recruitment experts in Ahmedabad and Mumbai to build exceptional data teams.',
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
    openGraph: {
      url: `${siteUrl}/contact`,
      title: 'Contact Us | DataVruti - Data Hiring Experts',
      description: 'Get in touch with DataVruti to discuss your data hiring needs. Contact our recruitment experts in Ahmedabad and Mumbai to build exceptional data teams.',
    },
    twitter: {
      title: 'Contact Us | DataVruti - Data Hiring Experts',
      description: 'Get in touch with DataVruti to discuss your data hiring needs. Contact our recruitment experts in Ahmedabad and Mumbai to build exceptional data teams.',
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Let's Talk"
        subtitle="Ready to build your data team? Get in touch with us today."
        showCTAs={false}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Whether it's permanent hiring, RPO or urgent staffing requirements, write to us and one of our experts will connect with you.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                    <a
                      href="mailto:sales@datavruti.com"
                      className="text-primary-600 hover:text-primary-700"
                    >
                    sales@datavruti.com
                    </a>
                  </div>
                </div>

                {/* Call/WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Call/WhatsApp</h3>
                    <a
                      href="https://api.whatsapp.com/send/?phone=919378092086&text=Hi+datavruti+Team%2C%0AGot+your+reference+from+the+website.+Can+we+chat%3F&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700"
                    >
                      +91 9378092086
                    </a>
                  </div>
                </div>

                {/* Offices */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Locations</h3>
                    <p className="text-neutral-600">
                      Ahmedabad, Mumbai
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 p-6 bg-neutral-50 rounded-xl">
                <h3 className="font-semibold text-neutral-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-neutral-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                  Share Your Hiring Requirements
                </h3>
                <ContactForm type="contact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
