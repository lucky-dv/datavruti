import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Chatbot from '@/components/Chatbot';
import { defaultSEO } from '@/utils/seo-config';

const raleway = Raleway({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.datavruti.com'),
  title: {
    default: defaultSEO.title as string,
    template: '%s | datavruti - Global Data Talent Recruitment',
  },
  description: defaultSEO.description,
  keywords: [
    'data recruitment agency',
    'hire data engineers',
    'hire data scientists',
    'data analytics recruitment',
    'AI recruitment',
    'machine learning recruitment',
    'data talent acquisition',
    'tech recruitment India',
    'data jobs India',
    'recruitment agency Mumbai',
    'recruitment agency Ahmedabad',
    'IT staffing',
    'contract staffing',
    'permanent hiring',
    'RPO services',
    'data science jobs',
    'data engineering jobs',
    'analytics jobs',
    'BFSI recruitment',
    'SaaS recruitment',
    'startup hiring',
  ],
  authors: [{ name: 'datavruti' }],
  creator: 'Reflion Tech Private Limited',
  publisher: 'datavruti',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: defaultSEO.canonical,
    siteName: 'datavruti',
    title: defaultSEO.title as string,
    description: defaultSEO.description as string,
    images: [
      {
        url: '/datavruti-full.jpg',
        width: 1200,
        height: 630,
        alt: 'datavruti - Global Data Talent Recruitment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultSEO.title as string,
    description: defaultSEO.description as string,
    images: ['/datavruti-full.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={raleway.variable}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <Chatbot />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
