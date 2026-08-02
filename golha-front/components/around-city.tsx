"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const CARDS_DATA = [
  {
    title: "انسداد موقت مسیر اقاقیا",
    description: "به دلیل عملیات بازسازی آسفالت و هرس درختان زون شرقی، این مسیر از روز دوشنبه به مدت سه روز مسدود بوده و مسیر جایگزین از بلوار زنبق خواهد بود.",
    image: "/999.jpg",
  },
  {
    title: "تابستان در دهکده گل‌ها",
    description: "مجموعه برنامه‌های تفریحی تابستانی شامل جشنواره گل‌های فصلی، مسابقات ورزشی خانواده و شب‌های فرهنگی در باغ مرکزی دهکده برگزار می‌گردد.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "ترازنامه سالانه توسعه",
    description: "انتشار رسمی گزارش پیشرفت فیزیکی پروژه‌های عمرانی، بودجه تخصیص یافته به فضای سبز و خلاصه تراز مالی سال گذشته دهکده جهت آگاهی مالکین محترم.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
  },
];

export default function AroundCity() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // محاسبه و به روزرسانی نقطه فعال در حین اسکرول (چه با کلیک و چه با لمس در موبایل)
  const handleScrollEvent = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = Math.abs(container.scrollLeft);
    const cardWidth = container.firstElementChild?.clientWidth || 300;
    const gap = 24; // gap-6 معادل 24 پیکسل
    const index = Math.round(scrollLeft / (cardWidth + gap));
    
    // اطمینان از اینکه اندیس خارج از محدوده کارت‌ها نرود
    if (index >= 0 && index < CARDS_DATA.length) {
      setActiveIndex(index);
    }
  };

  // تابع اسکرول نرم با دکمه‌های قبلی و بعدی متناسب با استاندارد RTL مرورگرها
  const handleScroll = (direction: "prev" | "next") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth || 300;
    const gap = 24; 
    const scrollAmount = cardWidth + gap;

    if (direction === "next") {
      // در ساختار RTL برای رفتن به کارت بعدی (سمت چپ) باید مقدار منفی اسکرول کنیم
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      // برای برگشتن به کارت قبلی (سمت راست) مقدار مثبت اسکرول می‌کنیم
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // اسکرول مستقیم به کارت خاص با کلیک روی نقطه‌ها
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth || 300;
    const gap = 24;
    
    // در RTL موقعیت اسکرول کارت iام معادل منفیِ ضرب اندیس در ابعاد است
    container.scrollTo({
      left: -(index * (cardWidth + gap)),
      behavior: "smooth"
    });
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="w-full px-4 lg:px-28 flex flex-col items-center">
        
        {/* عنوان بخش */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark text-center mb-12 tracking-tight">
          پیرامون دهکده ما
        </h2>

        {/* ظرف نگه‌دارنده اسلایدر */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScrollEvent}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 w-full max-w-[1400px] scrollbar-none"
        >
          {CARDS_DATA.map((card, idx) => {
            const cardBgColor = 
              idx === 0 
                ? "bg-primary/95 backdrop-blur-sm" 
                : idx === 1 
                  ? "bg-secondary/95 backdrop-blur-sm" 
                  : "bg-accent-ochre/95 backdrop-blur-sm"; // رنگ قرمز اخرایی جدید شما (#e3725b)

            return (
              <div
                key={idx}
                className="relative h-[420px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer snap-center shrink-0 w-[85vw] sm:w-[60vw] lg:w-full"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={idx === 0}
                />

                <div 
                  className={`absolute bottom-0 left-0 right-0 h-full ${cardBgColor} p-6 md:p-8 flex flex-col justify-start transition-transform duration-500 ease-out transform translate-y-[calc(100%-110px)] md:translate-y-[calc(100%-130px)] group-hover:translate-y-0`}
                >
                  <div className="flex items-center min-h-[50px]">
                    {/* قرارگیری خط سفید در سمت راست تایتل بر اساس RTL */}
                    <h3 className="text-white text-lg md:text-xl font-extrabold leading-snug text-right border-r-4 border-white pr-4 w-full">
                      {card.title}
                    </h3>
                  </div>

                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 mt-6 text-white/90 text-sm md:text-[15px] leading-relaxed font-semibold text-right">
                    {card.description}
                  </p>
                  
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 mt-auto text-accent-gold text-xs font-bold flex items-center gap-1.5 self-start">
                    ادامه مطلب
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* دکمه‌های ناوبری مینی‌مال تعاملی */}
        <div className="flex items-center gap-6 mt-12 text-neutral-dark/40 font-bold">
          
          {/* دکمه قبلی (راست در RTL) */}
          <button 
            onClick={() => handleScroll("prev")}
            className="p-2 hover:text-primary transition-colors cursor-pointer" 
            aria-label="قبلی"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* نقطه‌های هدایت‌کننده فعال و کلیک‌پذیر */}
          <div className="flex items-center gap-2">
            {CARDS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer 
                  ${activeIndex === index 
                    ? "w-2.5 h-2.5 bg-primary" 
                    : "w-2 h-2 bg-neutral-dark/25 hover:bg-neutral-dark/45"}`}
                aria-label={`اسلاید شماره ${index + 1}`}
              />
            ))}
          </div>

          {/* دکمه بعدی (چپ در RTL) */}
          <button 
            onClick={() => handleScroll("next")}
            className="p-2 hover:text-primary transition-colors cursor-pointer" 
            aria-label="بعدی"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}