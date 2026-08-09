import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ۱. فلگ حیاتی Next.js 16 جهت اجازه دادن به لود از محدوده آی‌پی‌های محلی و خصوصی
    dangerouslyAllowLocalIP: true, 
    
    // ۲. دور زدن بهینه‌ساز برای محیط لوکال
    unoptimized: true, 
    
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