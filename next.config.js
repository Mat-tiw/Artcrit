/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
    },
    async rewrites() {
        return [
          {
            source: '/',
            destination: '/home',
          },
          {
            source: '/:path((?!user/[0-9]+|post/[0-9]+).*)',
            destination: '/',
          },
        ];
      }
};

module.exports = nextConfig;
