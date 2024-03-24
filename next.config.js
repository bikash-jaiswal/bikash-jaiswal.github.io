/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/bikash-jaiswal/content_assets/**',
      },
    ],
  },
}

module.exports = nextConfig
