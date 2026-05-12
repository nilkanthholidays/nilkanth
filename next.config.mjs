const nextConfig = {
  output: 'export',
  trailingSlash: true,  assetPrefix: '/next/',  
  // Disable static optimization to ensure files are served correctly
  staticPageGenerationTimeout: 1000,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
