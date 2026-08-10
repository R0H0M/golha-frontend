import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // تزریق مستقیم و تضمینی متغیر محیطی در Next.js
  env: {
    NEXT_PUBLIC_API_URL: "http://10.73.183.121:8001/api/v1",
  },
  images: {
    dangerouslyAllowLocalIP: true,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "http://10.73.183.121",
        port: "8001",
      },
    ],
  },
};

export default nextConfig;