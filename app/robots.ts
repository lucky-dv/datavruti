import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Hardcode canonical domain - never use env vars that could resolve to vercel.app
  const baseUrl = 'https://www.datavruti.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
