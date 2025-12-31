import Hero from '@/components/Hero';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.datavruti.com';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Service | datavruti - Data Recruitment Services',
    description: 'Read datavruti\'s terms of service to understand the terms and conditions for using our data recruitment and staffing services.',
    alternates: {
      canonical: `${siteUrl}/terms-of-service`,
    },
    openGraph: {
      url: `${siteUrl}/terms-of-service`,
      title: 'Terms of Service | datavruti - Data Recruitment Services',
      description: 'Read datavruti\'s terms of service to understand the terms and conditions for using our data recruitment and staffing services.',
    },
    twitter: {
      title: 'Terms of Service | datavruti - Data Recruitment Services',
      description: 'Read datavruti\'s terms of service to understand the terms and conditions for using our data recruitment and staffing services.',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function TermsOfServicePage() {
  return (
    <>
      <Hero
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
        showCTAs={false}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-neutral-600 mb-8">
              Last Updated: January 2025
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-neutral-700 mb-6">
              By accessing and using the services provided by Reflion Tech Private Limited (operating as "datavruti"),
              you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to
              these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">2. Services</h2>
            <p className="text-neutral-700 mb-4">
              datavruti provides recruitment and staffing services including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-6 space-y-2">
              <li>Consult & Deliver - HR consulting and advisory services</li>
              <li>Search & Select - Permanent recruitment services</li>
              <li>Staffing & Payroll - Contract staffing and payroll management</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">3. User Responsibilities</h2>
            <p className="text-neutral-700 mb-4">
              When using our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of any account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not engage in any activity that could harm our reputation or services</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">4. Client Terms</h2>
            <p className="text-neutral-700 mb-6">
              Clients engaging our recruitment services agree to work with us in good faith, provide necessary
              information for candidate searches, and adhere to agreed-upon payment terms and conditions as
              outlined in individual service agreements.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">5. Candidate Terms</h2>
            <p className="text-neutral-700 mb-6">
              Candidates using our platform agree to provide truthful information in their profiles and applications,
              maintain professional conduct throughout the recruitment process, and promptly communicate any changes
              in their job search status.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">6. Confidentiality</h2>
            <p className="text-neutral-700 mb-6">
              We maintain strict confidentiality regarding all client and candidate information. All parties agree
              to keep confidential any proprietary or sensitive information shared during the recruitment process.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">7. Intellectual Property</h2>
            <p className="text-neutral-700 mb-6">
              All content on the datavruti website, including text, graphics, logos, and software, is the property
              of Reflion Tech Private Limited and is protected by copyright and intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-neutral-700 mb-6">
              datavruti shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use or inability to use our services. We make no warranties regarding the suitability
              of candidates or guarantee of successful placements.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">9. Termination</h2>
            <p className="text-neutral-700 mb-6">
              We reserve the right to terminate or suspend access to our services immediately, without prior notice,
              for any reason, including breach of these Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">10. Governing Law</h2>
            <p className="text-neutral-700 mb-6">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes
              arising from these terms shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">11. Changes to Terms</h2>
            <p className="text-neutral-700 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon
              posting to our website. Your continued use of our services after changes constitutes acceptance of
              the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">12. Contact Information</h2>
            <p className="text-neutral-700 mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-neutral-50 p-6 rounded-xl mb-8">
              <p className="text-neutral-700 mb-2">
                <strong>Email:</strong> vikram@datavruti.com
              </p>
              <p className="text-neutral-700 mb-2">
                <strong>Phone:</strong> +91 98679 98866
              </p>
              <p className="text-neutral-700">
                <strong>Address:</strong> B-1302 Karmyog Heights, S. V. Desai Marg, Navrangpura, Ahmedabad 380009, Gujarat, India
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
