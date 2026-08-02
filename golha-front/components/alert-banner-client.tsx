"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Announcement } from "@/types/announcement";
import Link from "next/link";

interface AlertBannerClientProps {
  announcement: Announcement;
}

export default function AlertBannerClient({ announcement }: AlertBannerClientProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // انیمیشن نرم کشویی خروج
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-accent-ochre text-white overflow-hidden relative z-50 border-b border-white/10"
        >
          <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4 text-xs md:text-sm">
            
            {/* بخش راست: آیکون بلندگوی متحرک و متن تایتل اطلاعیه */}
            <div className="flex items-center gap-2.5 flex-grow justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 shrink-0 animate-pulse text-accent-gold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.357.205a1.125 1.125 0 0 1-1.5-.377l-.852-1.48a12.868 12.868 0 0 1-1.68-4.642m4.852-6.412a13.48 13.48 0 0 1 2.34-1.355c.928-.38 2.002.23 2.002 1.24v11.13c0 1.01-1.074 1.62-2.002 1.24a13.48 13.48 0 0 1-2.34-1.355m2.34-11.13c-.496-.198-.997-.369-1.5-.512m1.5 11.642c-.496.198-.997.369-1.5.512m-6.51-.512a12.94 12.94 0 0 0-1.71 0m1.71-8.384a12.94 12.94 0 0 0-1.71 0"
                />
              </svg>
              <p className="font-semibold text-center md:text-right leading-relaxed">
                <span className="font-extrabold text-accent-gold ml-1.5">اطلاعیه مهم:</span> 
                {announcement.title}
              </p>
            </div>

            {/* بخش چپ: دکمه اقدام و دکمه بستن ملایم */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/announcements/${announcement.slug}`}
                className="hidden sm:inline-block bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-1.5 px-3.5 rounded transition-colors whitespace-nowrap"
              >
                بیشتر بدانید
              </Link>
              
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="بستن"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}