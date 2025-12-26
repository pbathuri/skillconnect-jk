/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.kastatic.org',
      },
      {
        protocol: 'https',
        hostname: 'd3njjcbhbojbot.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'nptel.ac.in',
      },
      {
        protocol: 'https',
        hostname: 'www.swayam.gov.in',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

