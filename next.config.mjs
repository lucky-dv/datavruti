/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone',

  // SEO: Enforce www canonical domain
  async redirects() {
    return [
      // Redirect non-www to www (Vercel handles http->https automatically)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'datavruti.com',
          },
        ],
        destination: 'https://www.datavruti.com/:path*',
        permanent: true,
      },
    ];
  },

  // SEO: Add security and SEO headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
