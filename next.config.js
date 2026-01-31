/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix workspace root warning
  outputFileTracingRoot: __dirname,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  
  // Image optimization
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Required for static export
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Static export configuration for Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
};

module.exports = nextConfig;
