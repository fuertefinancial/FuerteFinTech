/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // GitHub Pages serves from subdirectory in production
  basePath: process.env.NODE_ENV === 'production' ? '/FuerteFinTech' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/FuerteFinTech' : '',
  
  // Image optimization settings for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for proper GitHub Pages routing
  trailingSlash: true,
  
  // Performance and security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },
  
  // Environment variables for build time
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://yourusername.github.io/FuerteFinTech' 
      : 'http://localhost:3000',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || '',
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  },
  
  // Webpack configuration for Three.js and GLSL
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    })
    
    // Ensure proper module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    }
    
    return config
  },
  
  // Experimental features
  experimental: {
    // Enable new app directory structure
    appDir: false, // Using pages directory for GitHub Pages compatibility
  },
  
  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig 