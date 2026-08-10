"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CmsPost } from "@/app/cms/page";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.73.183.121:8000/api/v1";

function getCorrectImageUrl(imagePath: string | undefined | null): string {
  if (!imagePath) {
    return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800";
  }
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const domain = API_BASE.replace("/api/v1", "");
  const correctedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${domain}${correctedPath}`;
}

interface FeaturedNewsCarouselProps {
  posts: CmsPost[];
}

export default function FeaturedNewsCarousel({ posts }: FeaturedNewsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // تابع اسکرول نرم به اندیس خاص
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const card = container.firstElementChild as HTMLElement;
    if (!card) return;

    const cardWidth = card.clientWidth;
    const gap = 24; // gap-6
    
    container.scrollTo({
      left: -(index * (cardWidth + gap)), // محاسبه موقعیت اسکرول RTL
      behavior: "smooth"
    });
  };

  // تایمر ۵ ثانیه‌ای تعویض خودکار اسلایدها
  useEffect(() => {
    if (isHovered || posts.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % posts.length;
        scrollToCard(nextIndex);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, posts.length]);

  // اکشن اسکرول با دکمه‌های قبلی و بعدی
  const handleScroll = (direction: "prev" | "next") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const card = container.firstElementChild as HTMLElement;
    if (!card) return;

    const cardWidth = card.clientWidth;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    if (direction === "next") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // پایش اسکرول دستی کاربر جهت به‌روزرسانی نقطه‌های فعال
  const handleScrollEvent = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = Math.abs(container.scrollLeft);
    const card = container.firstElementChild as HTMLElement;
    if (!card) return;

    const cardWidth = card.clientWidth;
    const gap = 24;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    
    if (index >= 0 && index < posts.length) {
      setActiveIndex(index);
    }
  };

  return (
    <div 
      className="mb-16 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* هدر بخش مطالب برجسته به همراه دکمه‌ها و نقطه‌های ناوبری */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-neutral-dark/80">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-ochre animate-pulse" />
          <h2 className="text-lg md:text-xl font-extrabold tracking-tight">مطالب برجسته و پرطرفدار</h2>
        </div>

        {/* دکمه‌های فلش قبلی/بعدی و نقطه‌های راهنما در دسکتاپ و موبایل */}
        <div className="flex items-center gap-4 text-neutral-dark/50 font-bold">
          
          {/* دکمه قبلی (راست در RTL) */}
          <button 
            onClick={() => handleScroll("prev")}
            className="p-1.5 hover:text-primary transition-colors cursor-pointer" 
            aria-label="قبلی"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* نقطه‌های راهنمای فعال */}
          <div className="flex items-center gap-1.5 dir-ltr">
            {posts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  scrollToCard(idx);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer 
                  ${activeIndex === idx ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-neutral-dark/20 hover:bg-neutral-dark/40"}`}
                aria-label={`اسلاید ${idx + 1}`}
              />
            ))}
          </div>

          {/* دکمه بعدی (چپ در RTL) */}
          <button 
            onClick={() => handleScroll("next")}
            className="p-1.5 hover:text-primary transition-colors cursor-pointer" 
            aria-label="بعدی"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

        </div>
      </div>

      {/* اسلایدر افقی: در موبایل ۱ کارت، در تبلت ۲ کارت، در دسکتاپ دقیقاً ۳ کارت */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScrollEvent}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 w-full scrollbar-none"
      >
        {posts.map((post, idx) => {
          // چرخش داینامیک رنگ‌های اورلی
          const overlayBg = 
            idx % 3 === 0 
              ? "bg-accent-ochre/95 backdrop-blur-sm" 
              : idx % 3 === 1 
                ? "bg-secondary/95 backdrop-blur-sm" 
                : "bg-primary/95 backdrop-blur-sm";

          const correctedImg = getCorrectImageUrl(post.image);

          return (
            <Link 
              key={idx} 
              href={`/cms/${post.slug}`} 
              // تنظیم عرض دقیق: موبایل (85vw)، تبلت (50%)، دسکتاپ (دقیقاً ۳ کارت در صفحه)
              className="relative h-[320px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer snap-start shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
            >
              <Image
                src={correctedImg}
                alt={post.title}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={idx < 3}
                unoptimized={true}
              />
              
              <div className={`absolute bottom-0 left-0 right-0 h-full ${overlayBg} p-6 md:p-8 flex flex-col justify-start transition-transform duration-500 ease-out transform translate-y-[calc(100%-110px)] md:translate-y-[calc(100%-120px)] group-hover:translate-y-0`}>
                <div className="flex items-center min-h-[50px]">
                  <h3 className="text-white text-base md:text-lg font-extrabold leading-snug text-right border-r-4 border-white pr-3.5 w-full line-clamp-2">
                    {post.title}
                  </h3>
                </div>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 mt-4 text-white/90 text-xs md:text-sm leading-relaxed text-right line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 mt-auto text-accent-gold text-xs font-bold flex items-center gap-1.5 self-start">
                  ادامه مطلب
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}