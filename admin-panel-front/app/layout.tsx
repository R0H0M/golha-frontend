// app/layout.tsx
import "./globals.css";

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
      <body className="bg-[#f4f8fb] text-[#1f2937] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}