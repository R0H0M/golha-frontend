import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  date_display: string;
  location: string;
  image: string;
  status: "ongoing" | "upcoming" | "past";
  is_published: boolean;
}
console.log("🌐 آدرس متغیر محیطی خوانده شده در Next.js:", process.env.NEXT_PUBLIC_API_URL);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.73.183.121:8000/api/v1";

// ==========================================
// تابع واکشی اطلاعات رویدادها از API واقعی بک‌بند
// ==========================================
async function fetchEventsFromApi(): Promise<{ data: EventItem[] | null; error: string | null; isBackendFault: boolean }> {
  const url = `${API_BASE}/cms/events/`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      if (res.status >= 500) {
        return {
          data: null,
          error: `[خطای بک‌بند] سرور در پردازش لیست رویدادها با ارور داخلی مواجه شد (کد وضعیت: ${res.status}).`,
          isBackendFault: true
        };
      }
      return {
        data: null,
        error: `[خطای کلاینت/آدرس] درخواست لیست رویدادها نامعتبر است (کد وضعیت: ${res.status}).`,
        isBackendFault: false
      };
    }

    const data = await res.json();
    
    // 🔍 ۱. چاپ دیتای خام رویدادها در ترمینال جهت دیباگ فیلد image
    console.log("=========================================");
    console.log("🔍 [دیباگ رویدادها] دیتای خام دریافتی از بک‌بند در صفحه Events:");
    console.log(JSON.stringify(data, null, 2));
    console.log("=========================================");

    if (!Array.isArray(data)) {
      return {
        data: null,
        error: `[خطای ساختار داده] خروجی دیتابیس موفقیت‌آمیز بود اما آرایه (Array) ارسال نشده است.`,
        isBackendFault: true
      };
    }

    const publishedEvents = data.filter((item: EventItem) => item.is_published);
    return { data: publishedEvents, error: null, isBackendFault: false };

  } catch (err: unknown) {
    return {
      data: null,
      error: `[خطای ارتباط شبکه] امکان لود رویدادها از آدرس ${API_BASE} وجود ندارد. لطفا از فعال بودن جنگو مطمئن شوید.`,
      isBackendFault: false
    };
  }
}

// ==========================================
// 🛠️ تابع کمکی جهت تصحیح، تبدیل و لاگ‌گذاری آدرس عکس‌های رویداد
// ==========================================
function getCorrectImageUrl(imagePath: string | undefined | null, fallbackUrl: string): string {
  if (!imagePath) {
    console.warn("⚠️ [تصویر رویداد] فیلد عکس خالی است. تصویر پیش‌فرض اعمال شد.");
    return fallbackUrl;
  }

  console.log(`📸 [تصویر رویداد] آدرس خام دریافتی از بک‌بند: "${imagePath}"`);

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // تبدیل آدرس نسبی (/media/...) به آدرس کامل و مطلق سرور جنگو
  const domain = API_BASE.replace("/api/v1", ""); // استخراج http://10.73.183.121:8000
  const correctedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  const finalUrl = `${domain}${correctedPath}`;

  console.log(`🛠️ [تصحیح تصویر رویداد] آدرس کامل ساخته‌شده: "${finalUrl}"`);
  return finalUrl;
}

export default async function EventsPage() {
  const { data: events, error, isBackendFault } = await fetchEventsFromApi();

  const ongoingEvents = events ? events.filter(item => item.status === "ongoing") : [];
  const upcomingEvents = events ? events.filter(item => item.status === "upcoming") : [];
  const pastEvents = events ? events.filter(item => item.status === "past") : [];

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28">
        
        {/* هدر صفحه */}
        <div className="mb-12 border-b border-neutral-dark/10 pb-8 text-right">
          <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">گاه‌شمار برنامه‌های تفریحی و فرهنگی</span>
          <h1 className="text-3xl md:text-5xl font-black text-neutral-dark tracking-tight leading-tight">رویدادها و مناسبت‌های دهکده</h1>
        </div>

        {/* پنل هوشمند عیب‌یابی خطاها */}
        {error ? (
          <div className="bg-white rounded-3xl p-8 border border-neutral-dark/10 shadow-sm text-right max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-accent-ochre">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <h3 className="font-extrabold text-lg">خطا در دریافت لیست رویدادها از بک‌بند</h3>
            </div>
            <p className="text-xs md:text-sm text-neutral-dark/80 font-bold leading-relaxed">{error}</p>
            <div className="bg-neutral-bg/50 p-4 rounded-xl text-xs space-y-2 border border-neutral-dark/5">
              <span className="font-black text-neutral-dark">منشأ احتمالی خطا:</span>
              <p className="font-bold text-neutral-dark/60">
                {isBackendFault 
                  ? "👈 خطای ۵۰۰ بک‌بند است. کدهای مربوط به API رویدادها را در جنگو بررسی کنید." 
                  : `👈 اتصال به ${API_BASE}/cms/events/ قطع است. بررسی کنید سرور و CORS فعال باشند.`}
              </p>
            </div>
          </div>
        ) : (
          events && (
            <div className="space-y-16">

              {/* ================= بخش اول: رویدادهای در حال اجرا ================= */}
              {ongoingEvents.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#e3725b] font-black select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-ochre animate-pulse" />
                    <h2 className="text-lg md:text-xl tracking-tight">رویدادهای در حال برگزاری</h2>
                  </div>

                  {ongoingEvents.slice(0, 1).map((event) => {
                    const correctedImg = getCorrectImageUrl(event.image, "https://images.unsplash.com/photo-1584132967334-10e028bd69f7");
                    return (
                      <div key={event.id} className="bg-white rounded-3xl overflow-hidden border border-neutral-dark/10 shadow-sm flex flex-col lg:flex-row w-full h-auto lg:h-[380px] group select-none">
                        
                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-between text-right">
                          <div className="space-y-4">
                            <span className="inline-flex items-center text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full bg-accent-ochre/10 text-accent-ochre animate-pulse">
                              ● در حال برگزاری زنده
                            </span>
                            <Link href={`/events/${event.slug}`}>
                              <h3 className="text-xl md:text-3xl font-black text-neutral-dark hover:text-primary transition-colors leading-snug">{event.title}</h3>
                            </Link>
                            <p className="text-xs md:text-sm font-bold text-neutral-dark/50 leading-relaxed text-justify line-clamp-3">{event.excerpt}</p>
                          </div>

                          <div className="border-t border-neutral-dark/5 pt-5 mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-neutral-dark/50">
                            <span className="flex items-center gap-1.5 text-primary">📍 {event.location}</span>
                            <span>📅 {event.date_display}</span>
                            <Link href={`/events/${event.slug}`} className="text-primary hover:underline font-black flex items-center gap-1">
                              ورود به رویداد
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                            </Link>
                          </div>
                        </div>

                        {/* تصویر با ویژگی unoptimized={true} جهت رفع خطای IP لوکال */}
                        <div className="relative w-full lg:w-3/5 h-64 lg:h-full overflow-hidden shrink-0">
                          <Image 
                            src={correctedImg} 
                            alt={event.title} 
                            fill={true} 
                            sizes="(max-width: 1024px) 100vw, 60vw" 
                            className="object-cover transition-transform duration-700 group-hover:scale-103" 
                            priority={true} 
                            unoptimized={true}
                          />
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}


              {/* ================= بخش دوم: رویدادهای آتی ================= */}
              {upcomingEvents.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-black select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <h2 className="text-lg md:text-xl tracking-tight">رویدادهای آینده و پیش‌رو</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, idx) => {
                      const correctedImg = getCorrectImageUrl(event.image, "https://images.unsplash.com/photo-1541888946425-d81bb19240f5");
                      return (
                        <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-neutral-dark/10 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-[420px] group select-none">
                          <div className="relative h-48 w-full overflow-hidden shrink-0">
                            {/* تصویر با unoptimized={true} */}
                            <Image 
                              src={correctedImg} 
                              alt={event.title} 
                              fill={true} 
                              sizes="(max-width: 768px) 100vw, 30vw" 
                              className="object-cover transition-transform duration-700 group-hover:scale-105" 
                              unoptimized={true}
                            />
                            <span className="absolute top-4 right-4 bg-accent-gold text-neutral-dark text-[10px] font-black py-1.5 px-3 rounded-lg shadow-sm z-10">{event.date_display}</span>
                          </div>

                          <div className="p-6 md:p-8 flex-grow flex flex-col justify-between text-right">
                            <div className="space-y-2.5">
                              <Link href={`/events/${event.slug}`}>
                                <h3 className="text-base md:text-lg font-black text-neutral-dark group-hover:text-primary transition-colors line-clamp-2 leading-snug">{event.title}</h3>
                              </Link>
                              <p className="text-[11px] md:text-xs font-bold text-neutral-dark/50 leading-relaxed line-clamp-3">{event.excerpt}</p>
                            </div>

                            <div className="border-t border-neutral-dark/5 pt-4 mt-4 flex items-center justify-between text-[11px] md:text-xs text-neutral-dark/45 font-bold">
                              <span className="flex items-center gap-1">📍 {event.location}</span>
                              <Link href={`/events/${event.slug}`} className="text-primary hover:underline font-extrabold flex items-center gap-1">
                                اطلاعات بیشتر
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


              {/* ================= بخش سوم: رویدادهای برگزار شده ================= */}
              {pastEvents.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-neutral-dark/50 font-black select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-dark/30" />
                    <h2 className="text-lg md:text-xl tracking-tight">رویدادهای پایان‌یافته و آرشیو</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastEvents.map((event, idx) => {
                      const correctedImg = getCorrectImageUrl(event.image, "https://images.unsplash.com/photo-1558904541-efa8c3a30fc9");
                      return (
                        <div key={idx} className="bg-white rounded-3xl p-5 border border-neutral-dark/10 shadow-sm flex items-center gap-5 group/past cursor-pointer select-none">
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-neutral-light/10 shrink-0 filter grayscale group-hover/past:grayscale-0 transition-all duration-500">
                            {/* تصویر با unoptimized={true} */}
                            <Image 
                              src={correctedImg} 
                              alt={event.title} 
                              fill={true} 
                              sizes="100px" 
                              className="object-cover" 
                              unoptimized={true}
                            />
                          </div>

                          <div className="flex-grow flex flex-col justify-between text-right h-24 py-1">
                            <div className="space-y-1">
                              <h3 className="text-sm md:text-base font-extrabold text-neutral-dark/70 group-hover/past:text-primary transition-colors line-clamp-1">{event.title}</h3>
                              <p className="text-[10px] md:text-xs font-semibold text-neutral-dark/40 leading-relaxed line-clamp-2">{event.excerpt}</p>
                            </div>

                            <div className="flex items-center justify-between text-[10px] md:text-xs text-neutral-dark/40 font-bold border-t border-neutral-dark/5 pt-2">
                              <span>📅 برگزاری در: {event.date_display}</span>
                              <span className="text-neutral-dark/30 font-black">✓ خاتمه یافته</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )
        )}

      </div>
    </section>
  );
}