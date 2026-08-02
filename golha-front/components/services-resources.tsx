import React from "react";
import Link from "next/link";

const SERVICES = [
  {
    name: "بیمه سلامت شهروندی",
    href: "/services/health-insurance",
    icon: (
      <svg className="w-12 h-12 transition-all duration-300 stroke-neutral-dark group-hover:stroke-primary group-hover:-translate-y-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.5h6M12 7v5" />
      </svg>
    ),
  },
  {
    name: "بیمه خودرو و ترانزیت",
    href: "/services/car-insurance",
    icon: (
      <svg className="w-12 h-12 transition-all duration-300 stroke-neutral-dark group-hover:stroke-primary group-hover:-translate-y-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.75a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V14.25M3.75 14.25h16.5M5.25 14.25H4.242a2.25 2.25 0 0 1-1.93-1.09l1.621-2.916A2.25 2.25 0 0 1 5.864 9h12.272a2.25 2.25 0 0 1 1.93 1.09l1.621 2.916a2.25 2.25 0 0 1-1.93 1.09H18.75" />
      </svg>
    ),
  },
  {
    name: "بیمه باربری و ترخیص",
    href: "/services/cargo-insurance",
    icon: (
      <svg className="w-12 h-12 transition-all duration-300 stroke-neutral-dark group-hover:stroke-primary group-hover:-translate-y-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.75a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V14.25M3.75 14.25h16.5M5.25 14.25H4.242c-.22 0-.44-.03-.655-.09l-1.345-.375a1.125 1.125 0 0 1-.823-1.082V7.125C1.419 6.504 1.927 6 2.548 6h11.233c.621 0 1.129.504 1.129 1.125v7.125c0 .621-.508 1.125-1.129 1.125h-5.5" />
      </svg>
    ),
  },
  {
    name: "سامانه قبوض و شارژ",
    href: "/services/bills",
    icon: (
      <svg className="w-12 h-12 transition-all duration-300 stroke-neutral-dark group-hover:stroke-primary group-hover:-translate-y-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5z" />
      </svg>
    ),
  },
  {
    name: "ثبت گزارش و درخواست",
    href: "/services/requests",
    icon: (
      <svg className="w-12 h-12 transition-all duration-300 stroke-neutral-dark group-hover:stroke-primary group-hover:-translate-y-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" />
      </svg>
    ),
  },
  {
    name: "نقشه پلاک‌های دهکده",
    href: "/services/map",
    icon: (
      <svg className="w-12 h-12 transition-all duration-300 stroke-neutral-dark group-hover:stroke-primary group-hover:-translate-y-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6.75V15m-12-3 .75-7.5h16.5l.75 7.5m-18 0h18M12 12v9m-4.5-9h9M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      </svg>
    ),
  },
  {
    name: "تقویم جلسات و رویدادها",
    href: "/events",
    icon: (
      <svg className="w-12 h-12 transition-all duration-300 stroke-neutral-dark group-hover:stroke-primary group-hover:-translate-y-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
  },
  {
    name: "قوانین و پروانه‌های ساخت",
    href: "/about/legal",
    icon: (
      <svg className="w-12 h-12 transition-all duration-300 stroke-neutral-dark group-hover:stroke-primary group-hover:-translate-y-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V13m-3.5 6h7" />
      </svg>
    ),
  },
];

export default function ServicesResources() {
  return (
    // رنگ پس‌زمینه دقیقاً به رنگ اختصاصی و فوق‌العاده شیکِ آبی-خاکستری سانتا مونیکا تغییر یافت (#f4f8fb)
    <section className="relative w-full bg-[#f4f8fb] pt-28 pb-28 md:pt-36 md:pb-36 overflow-hidden">
      
      {/* ================= ۱. شکل موج نامتقارن بالایی (کپی دقیق سانتا مونیکا) ================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-[1px]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-20">
          <path 
            d="M0,0 C380,100 840,10 1440,80 L1440,0 L0,0 Z" 
            className="fill-white" 
          />
        </svg>
      </div>

      <div className="w-full px-4 lg:px-28 flex flex-col items-center relative z-20">
        
        {/* عنوان بخش */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark text-center mb-16 tracking-tight">
          خدمات و منابع دهکده
        </h2>

        {/* شبکه منظم آیکونی */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 w-full max-w-[1200px]">
          {SERVICES.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group flex flex-col items-center text-center space-y-4 cursor-pointer focus:outline-none"
            >
              <div className="flex items-center justify-center w-16 h-16 shrink-0">
                {service.icon}
              </div>
              <span className="text-sm md:text-base font-extrabold text-neutral-dark/85 group-hover:text-primary transition-colors duration-300 tracking-tight leading-relaxed select-none">
                {service.name}
              </span>
            </Link>
          ))}
        </div>

      </div>

      {/* ================= ۲. شکل موج نامتقارن پایینی (کپی دقیق سانتا مونیکا) ================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-0">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-20">
          <path 
            d="M0,120 C380,20 840,110 1440,40 L1440,120 L0,120 Z" 
            className="fill-white" 
          />
        </svg>
      </div>

    </section>
  );
}