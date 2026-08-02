import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ۱. این خط را برای صدور مجوز اتصال به آی‌پی خصوصی اضافه کنید
    dangerouslyAllowSVG: true, // اگر لوگو svg دارید لازم است
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "10.73.183.121",
        port: "8000",
      },
    ],
  },
};

export default nextConfig;