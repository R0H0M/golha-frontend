import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
// ایمپورت بنر هشدار
import AlertBanner from "@/components/alert-banner";
import Header from "@/components/header";
import Footer from "@/components/footer";

const kookFont = localFont({
  src: [
    {
      path: "./fonts/Kook-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Kook-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kook",
  display: "swap",
});

export const metadata: Metadata = {
  title: "پورتال اختصاصی دهکده گل‌ها | منطقه گردشگری و مسکونی کرمان",
  description: "سامانه هوشمند خدمات، املاک، اخبار و دایرکتوری مالکین دهکده گل‌های کرمان.",
};

export const viewport: Viewport = {
  themeColor: "#1C39BB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${kookFont.variable} scroll-pt-20`}>
      <body className="flex flex-col min-h-screen">
        {/* ۱. بنر هشدار در بالاترین بخش قرار می‌گیرد */}
        <AlertBanner />
        
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}