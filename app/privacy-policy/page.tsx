import Hero from '@/components/Hero';
import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://datavruti.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy | DataVruti - Data Recruitment Agency',
    description: 'Read DataVruti\'s privacy policy to understand how we collect, use, and protect your personal information during recruitment services.',
    alternates: {
      canonical: `${siteUrl}/privacy-policy`,
    },
    openGraph: {
      url: `${siteUrl}/privacy-policy`,
      title: 'Privacy Policy | DataVruti - Data Recruitment Agency',
      description: 'Read DataVruti\'s privacy policy to understand how we collect, use, and protect your personal information during recruitment services.',
    },
    twitter: {
      title: 'Privacy Policy | DataVruti - Data Recruitment Agency',
      description: 'Read DataVruti\'s privacy policy to understand how we collect, use, and protect your personal information during recruitment services.',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero
        title="Privacy Policy"
        subtitle="Your privacy is important to us"
        showCTAs={false}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-neutral-600 mb-8">
              Last Updated: January 2025
            </p>

            <p className="text-neutral-700 mb-6">
              At Reflion Tech Private Limited (operating as "DataVruti"), we are committed to protecting your
              privacy and ensuring the security of your personal information. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you use our services.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">1.1 Personal Information</h3>
            <p className="text-neutral-700 mb-4">
              We may collect personal information that you provide to us, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-6 space-y-2">
              <li>Name, email address, phone number</li>
              <li>Professional information (resume, work history, education, skills)</li>
              <li>Company information (for clients)</li>
              <li>Job preferences and requirements</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">1.2 Automatically Collected Information</h3>
            <p className="text-neutral-700 mb-4">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-6 space-y-2">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-neutral-700 mb-4">
              We use the collected information for various purposes:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-6 space-y-2">
              <li>To provide and maintain our recruitment services</li>
              <li>To match candidates with suitable job opportunities</li>
              <li>To communicate with you about jobs, services, and updates</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and ensure security</li>
              <li>To analyze usage patterns and optimize user experience</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">3. Information Sharing and Disclosure</h2>
            <p className="text-neutral-700 mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-6 space-y-2">
              <li><strong>With Clients:</strong> Candidate information is shared with potential employers for recruitment purposes, with candidate consent</li>
              <li><strong>With Candidates:</strong> Job opportunities and company information are shared with qualified candidates</li>
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who assist in our operations</li>
              <li><strong>Legal Requirements:</strong> We may disclose information to comply with legal obligations or protect our rights</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">4. Data Security</h2>
            <p className="text-neutral-700 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. However, no method
              of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">5. Data Retention</h2>
            <p className="text-neutral-700 mb-6">
              We retain personal information for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required by law. Candidate information may be
              retained for future job opportunities unless you request deletion.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">6. Your Rights</h2>
            <p className="text-neutral-700 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-6 space-y-2">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to certain types of data processing</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-neutral-700 mb-6">
              We use cookies and similar tracking technologies to track activity on our website and store certain
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is
              being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">8. Third-Party Links</h2>
            <p className="text-neutral-700 mb-6">
              Our website may contain links to third-party websites. We are not responsible for the privacy
              practices or content of these external sites. We encourage you to read the privacy policies of
              any third-party sites you visit.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">9. Children's Privacy</h2>
            <p className="text-neutral-700 mb-6">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect
              personal information from children. If you believe we have collected information from a child,
              please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">10. International Data Transfers</h2>
            <p className="text-neutral-700 mb-6">
              Your information may be transferred to and maintained on servers located outside of your state,
              province, country, or other governmental jurisdiction where data protection laws may differ.
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-neutral-700 mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to
              review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="text-neutral-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-neutral-50 p-6 rounded-xl mb-8">
              <p className="text-neutral-700 mb-2">
                <strong>Email:</strong> sales@datavruti.com
              </p>
              <p className="text-neutral-700 mb-2">
                <strong>Phone:</strong> +91 9378092086
              </p>
              <p className="text-neutral-700">
                <strong>Address:</strong> B-1302 Karmyog Heights, S. V. Desai Marg, Navrangpura, Ahmedabad 380009, Gujarat, India
              </p>
            </div>

            <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-xl mt-8">
              <p className="text-neutral-700">
                <strong>Note:</strong> By using DataVruti's services, you acknowledge that you have read and
                understood this Privacy Policy and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
