"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <section className="relative w-full h-[80vh] md:h-[85vh] min-h-[550px] max-h-[750px] overflow-hidden bg-[#2D1E16]">

      {/* بک‌گراند محلی بهینه‌سازی شده از پوشه public */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/hero2.jpg" // آدرس عکس محلی شما در پوشه public
          alt="نمای هوایی دهکده گل‌های کرمان"
          fill={true}
          priority={true} // بارگذاری آنی و بهبود چشمگیر سرعت لود اولیه سایت
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* لایه گرادینت تیره روی تصویر برای حفظ کنتراست تایتل در مقابل آسمان */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1B110B]/80 via-[#2D1E16]/40 to-[#3D2B20]/30 z-10" />

      {/* بالا سمت راست: متن خوش‌آمدگویی (تغییر کلاس text-right به text-center جهت وسط‌چین شدن خطوط نسبت به هم) */}
      <div className="absolute top-7 md:top-20 right-8 md:right-16 lg:right-8 lg:top-0 z-20 text-center max-w-lg">
        <motion.h1
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-[1.3] tracking-tight"
        >
          به دهکده گل‌ها <br />
          خوش آمدید
        </motion.h1>
      </div>

      {/* وسط پایین: باکس جستجوی ظریف روی جاده خاکی پایین هیرو قرار می‌گیرد */}
      <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 md:px-0">
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          onSubmit={handleSearchSubmit}
          className="w-full bg-white/95 backdrop-blur-md rounded-full border border-neutral-dark/15 shadow-md p-1 flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary/35 transition-all"
        >
          <input
            type="text"
            placeholder="به چه خدمتی نیاز دارید؟"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm md:text-base text-[#2D1E16] placeholder-[#2D1E16]/50 focus:outline-none pr-6 py-2.5 md:py-3"
          />

          <button
            type="submit"
            className="p-2.5 text-[#2D1E16]/70 hover:text-primary transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="جستجو"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5.5 h-5.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
            </svg>
          </button>
        </motion.form>
      </div>

    </section>
  );
}