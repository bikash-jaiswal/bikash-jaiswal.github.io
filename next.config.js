/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: "https",
        hostname: 'raw.githubusercontent.com'
      },
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
