/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'i.imgur.com', '*'],
  },
  async redirects() {
    return [
      {
        source: '/my-checkin',
        destination: '/my-checkin?category=conference-rooms',
        permanent: true,
      },
      {
        source: '/vocal',
        destination: '/vocal?category=visitors',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
