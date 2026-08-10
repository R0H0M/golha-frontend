// app/layout.tsx
import localFont from "next/font/local";
import "./globals.css";

// تعریف فونت محلی Kook
const kookFont = localFont({
  src: [
    {
      path: "./fonts/kook-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/kook-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kook",
  display: "swap",
});

export const metadata = {
  title: "داشبورد مدیریت دهکده گل‌ها",
  description: "سامانه متمرکز مدیریت",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${kookFont.className} ${kookFont.variable} bg-[#f4f8fb] text-[#1f2937] antialiased`}>
        {children}
      </body>
    </html>
  );
}