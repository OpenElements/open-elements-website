import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "standalone", // Disabled for local development - enable on deployment platform if needed
};

export default withNextIntl(nextConfig);
