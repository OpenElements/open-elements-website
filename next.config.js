import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "standalone", // Disabled for local development - enable on deployment platform if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/support-care-maven',
        destination: '/support-care',
        permanent: true,
      },
      {
        source: '/en/support-care-maven',
        destination: '/en/support-care',
        permanent: true,
      },
      {
        source: '/de/support-care-maven',
        destination: '/de/support-care',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
