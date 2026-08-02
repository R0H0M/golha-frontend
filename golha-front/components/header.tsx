"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MENU_ITEMS = [
  { name: "صفحه اصلی", href: "/" },
  { name: "اطلاعیه‌ها", href: "/announcements" },
  { name: "اخبار", href: "/cms" },
  { name: "رویدادها", href: "/events" },
  { name: "رسانه", href: "/media" },
  { name: "تاریخچه", href: "/about/history" },
  { name: "حقوقی", href: "/about/legal" },
  { name: "درباره ما", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-neutral-dark/10 sticky top-0 z-50">
      {/* حفظ دقیق عرض اصلی بخش‌ها با هماهنگی کامل px-4 lg:px-28 */}
      <div className="w-full px-4 lg:px-28 h-16 flex items-center justify-between gap-12">

        {/* ۱. بخش راست: لوگوی رسمی دهکده */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center group">
            <div className="relative w-24 h-16 shrink-0 transition-transform duration-300 group-hover:scale-103">
              <Image
                src="/logo.svg" 
                alt="پورتال رسمی دهکده گل‌های کرمان"
                fill={true}
                className="object-contain"
                priority={true}
              />
            </div>
          </Link>
        </div>

        {/* ۲. بخش وسط: منوی اصلی کاملاً وسط‌چین شده به صورت طبیعی و بدون تغییر در عرض بخش‌ها */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-x-6 xl:gap-x-8 text-[16px] font-extrabold text-neutral-dark/85">
          {MENU_ITEMS.map((item, idx) => (
            <React.Fragment key={idx}>
              <Link
                href={item.href}
                className={`hover:text-primary hover:border-b-2 border-primary transition-all py-1.5 tracking-tight whitespace-nowrap
                  ${pathname === item.href ? "text-primary border-b-2 border-primary" : ""}`}
              >
                {item.name}
              </Link>
              {/* خطوط تفکیک‌کننده عریض سبز زنده */}
              {idx < MENU_ITEMS.length - 1 && (
                <span className="w-[2px] h-4 bg-secondary rounded-full shrink-0 select-none block" />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* دکمه منوی همبرگری موبایل */}
        <div className="lg:hidden flex items-center shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-neutral-light/20 text-neutral-dark transition-colors"
            aria-label="منو"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* منوی موبایل کشویی */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-neutral-dark/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-3.5 font-bold text-sm">
              {MENU_ITEMS.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 border-b border-neutral-dark/5 last:border-0 hover:text-primary transition-colors
                    ${pathname === item.href ? "text-primary font-extrabold" : "text-neutral-dark/80"}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 flex items-center justify-between text-xs text-neutral-dark/50">
                <Link href="/owners" className="text-primary font-bold">ورود به پرتال مالکین</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}