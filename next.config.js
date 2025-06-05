/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // Performance optimizations that are supported in Next.js 15.3.3
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production' ? {
        exclude: ['error', 'warn']
      } : false,
    },
    reactStrictMode: false,
    poweredByHeader: false,
    
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
