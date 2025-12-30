import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  title: 'datavruti | Hire Data & Analytics Talent',
  description: 'Leading recruitment agency connecting businesses with data, analytics, and AI professionals. Expert hiring solutions for data engineers, data scientists, and analytics consultants.',
  canonical: 'https://www.datavruti.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.datavruti.com',
    siteName: 'datavruti',
    title: 'datavruti | Hire Data & Analytics Talent',
    description: 'Leading recruitment agency connecting businesses with data, analytics, and AI professionals.',
    images: [
      {
        url: 'https://www.datavruti.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'datavruti - Hire Data & Analytics Talent',
      },
    ],
  },
  twitter: {
    handle: '@datavruti',
    site: '@datavruti',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'data hiring agency, hire data engineers, hire data scientists, AI recruitment, analytics recruitment, data talent, data hiring agency India, tech recruitment',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.datavruti.com/#organization',
  name: 'datavruti',
  legalName: 'Reflion Tech Private Limited',
  url: 'https://www.datavruti.com',
  logo: 'https://www.datavruti.com/datavruti-full.jpg',
  description: 'datavruti is a specialist recruitment agency focused on global data talent. We provide Consult & Deliver, Search & Select, and Staffing & Payroll services for data professionals.',
  email: 'sales@datavruti.com',
  telephone: '+91-9378092086',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'B-1302 Karmyog Heights, S. V. Desai Marg, Navrangpura',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380009',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  ],
  sameAs: [
    'https://in.linkedin.com/company/datavruti',
  ],
  areaServed: [
    {
      '@type': 'Country',
      name: 'India',
    },
    {
      '@type': 'Country',
      name: 'United States',
    },
  ],
  serviceType: [
    'Recruitment Services',
    'Staffing Solutions',
    'HR Consulting',
    'Data Talent Acquisition',
  ],
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://www.datavruti.com/#localbusiness',
  name: 'datavruti',
  image: 'https://www.datavruti.com/datavruti-full.jpg',
  url: 'https://www.datavruti.com',
  telephone: '+91-9378092086',
  email: 'sales@datavruti.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'B-1302 Karmyog Heights, S. V. Desai Marg, Navrangpura',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380009',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.0358,
    longitude: 72.5665,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [
    'https://in.linkedin.com/company/datavruti',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.datavruti.com/#website',
  url: 'https://www.datavruti.com',
  name: 'datavruti',
  description: 'Global Data Talent Recruitment - Specialist recruitment agency for data professionals',
  publisher: {
    '@id': 'https://www.datavruti.com/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.datavruti.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
