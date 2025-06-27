/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'www.hotpresidents.com'],
    deviceSizes: [300, 500, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;