const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

module.exports = withNextIntl(nextConfig);
