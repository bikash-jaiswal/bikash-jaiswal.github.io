/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // Disable TypeScript checking during build to prevent errors with generated types
    typescript: {
        // !! WARN !! 
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        ignoreBuildErrors: true,
    },
    images: {
    unoptimized: true,
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
