/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // images locales en dev
      {
        protocol: 'http',
        hostname: 'localhost',
      },

      // Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },

      // (optionnel) Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
