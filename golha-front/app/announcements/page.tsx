import React from "react";
import Link from "next/link";
import { Announcement } from "@/types/announcement";



// دیتای فیلترهای کپسولی بالای صفحه اطلاعیه‌ها
const CATEGORY_TABS = ["بحران", "عمرانی", "رویداد", "عمومی"];

// ==========================================
// تابع واکشی اطلاعات اطلاعیه‌ها از API واقعی بک‌بند
// ==========================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.73.183.121:8000/api/v1";

async function fetchAnnouncementsFromApi(search?: string, category?: string): Promise<{ data: Announcement[] | null; error: string | null; isBackendFault: boolean }> {
  // به دلیل اینکه API_BASE خود شامل /api/v1 است، مسیر را مستقیماً از /cms شروع می‌کنیم
  let endpoint: string = `${API_BASE}/cms/announcements/`;
  
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const queryString: string = params.toString();
  if (queryString) {
    endpoint += `?${queryString}`;
  }

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      if (res.status >= 500) {
        return { data: null, error: `[خطای سرور] (کد: ${res.status})`, isBackendFault: true };
      }
      return { data: null, error: `[خطای آدرس] (کد: ${res.status})`, isBackendFault: false };
    }

    const data: Announcement[] = await res.json();
    return { data, error: null, isBackendFault: false };

  } catch (err: unknown) {
    return {
      data: null,
      error: `[خطای اتصال شبکه] امکان ارتباط با سرور دیتابیس در آدرس ${API_BASE} وجود ندارد.`,
      isBackendFault: false
    };
  }
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function AnnouncementsPage(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const activeSearch = typeof params.search === "string" ? params.search : "";
  const activeCategory = typeof params.category === "string" ? params.category : "";

  // دریافت اطلاعات زنده از بک‌بند دپارتمان دهکده گل‌ها
  const { data: announcements, error, isBackendFault } = await fetchAnnouncementsFromApi(activeSearch, activeCategory);

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28">
        
        {/* هدر صفحه اطلاعیه‌ها */}
        <div className="mb-12 border-b border-neutral-dark/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-right">
            <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">پورتال اطلاع‌رسانی دهکده</span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-dark tracking-tight">اطلاعیه‌ها و بیانیه‌های رسمی</h1>
          </div>
          {announcements && (
            <span className="text-xs font-semibold text-neutral-dark/40">تعداد اطلاعیه‌ها: {announcements.length} مورد</span>
          )}
        </div>

        {/* بررسی و عیب‌یابی خطاهای اتصال به بک‌بند */}
        {error ? (
          <div className="bg-white rounded-3xl p-8 border border-neutral-dark/10 shadow-sm text-right max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-accent-ochre">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <h3 className="font-extrabold text-lg">خطا در دریافت لیست اطلاعیه‌ها از بک‌بند</h3>
            </div>
            <p className="text-xs md:text-sm text-neutral-dark/80 font-bold leading-relaxed">{error}</p>
            <div className="bg-neutral-bg/50 p-4 rounded-xl text-xs space-y-2 border border-neutral-dark/5">
              <span className="font-black text-neutral-dark">منشأ احتمالی خطا:</span>
              <p className="font-bold text-neutral-dark/60">
                {isBackendFault 
                  ? "👈 بک‌بند ارور ۵۰۰ صادر کرده است. کدهای جنگو/فست‌اپی را در ویو مربوط به API اطلاعیه‌ها بررسی کنید." 
                  : `👈 امکان اتصال به آدرس ${API_BASE}/api/v1/cms/announcements/ وجود ندارد. از فعال بودن جنگو و باز بودن دسترسی CORS اطمینان حاصل کنید.`}
              </p>
            </div>
          </div>
        ) : (
          announcements && (
            <>
              {/* بخش ۱: نوار فیلتر و جستجوی افقی مینی‌مال بالای صفحه */}
              <div className="w-full bg-white rounded-2xl border border-neutral-dark/10 p-3 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                
                {/* راست: فیلترهای کپسولی (Pills) دسته‌بندی‌ها */}
                <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
                  <Link 
                    href="/announcements"
                    className={`text-xs md:text-sm font-extrabold py-2 px-4 rounded-full transition-all whitespace-nowrap
                      ${!activeCategory 
                        ? "bg-primary text-white" 
                        : "bg-neutral-bg hover:bg-neutral-light/20 text-neutral-dark/70 hover:text-neutral-dark"}`}
                  >
                    همه اطلاعیه‌ها
                  </Link>
                  {CATEGORY_TABS.map((cat, idx) => (
                    <Link 
                      key={idx}
                      href={`/announcements?category=${cat}${activeSearch ? `&search=${activeSearch}` : ""}`}
                      className={`text-xs md:text-sm font-extrabold py-2 px-4 rounded-full transition-all whitespace-nowrap
                        ${activeCategory === cat 
                          ? "bg-primary text-white" 
                          : "bg-neutral-bg hover:bg-neutral-light/20 text-neutral-dark/70 hover:text-neutral-dark"}`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>

                {/* چپ: کادر جستجوی کپسولی ظریف */}
                <div className="w-full md:w-80 shrink-0">
                  <form action="/announcements" method="GET" className="relative flex items-center border border-neutral-dark/15 rounded-full px-4 py-1.5 bg-neutral-bg/30 w-full focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                    <input 
                      type="text" 
                      name="search"
                      defaultValue={activeSearch}
                      placeholder="جستجو در اطلاعیه‌ها..." 
                      className="bg-transparent focus:outline-none text-xs md:text-sm w-full text-neutral-dark placeholder-neutral-dark/40 font-bold py-1.5"
                    />
                    {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
                    <button type="submit" className="text-neutral-dark/50 hover:text-primary transition-colors cursor-pointer shrink-0 mr-1.5" aria-label="جستجو">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>

              {/* بخش ۲: گرید اصلی ۳ ستونه اطلاعیه‌های دهکده */}
              {announcements.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center border border-neutral-dark/10 shadow-sm flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-neutral-dark/30 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <p className="text-sm font-bold text-neutral-dark/50">هیچ اطلاعیه یا بیانیه‌ای منطبق با فیلتر یا جستجوی شما یافت نشد.</p>
                  <Link href="/announcements" className="mt-4 text-xs font-bold text-primary underline underline-offset-4">پاک کردن همه فیلترها</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {announcements.map((item, idx) => {
                    const badgeColor = 
                      item.category === "بحران" 
                        ? "text-accent-ochre bg-accent-ochre/10" // قرمز اخرایی اختصاصی (#e3725b)
                        : item.category === "عمرانی" 
                          ? "text-secondary bg-secondary/10" // سبز کله‌غازی زنده
                          : "text-primary bg-primary/10"; // آبی کاربنی اصلی

                    return (
                      <article 
                        key={idx}
                        className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-dark/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-[280px] group select-none"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4 select-none">
                            <span className={`inline-flex items-center text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full ${badgeColor}`}>
                              {item.category}
                            </span>
                            {item.is_emergency && (
                              <span className="text-[10px] text-accent-ochre font-extrabold animate-pulse">● بسیار فوری</span>
                            )}
                          </div>
                          
                          <Link href={`/announcements/${item.slug}`} className="block">
                            <h3 className="text-base md:text-[17px] font-black text-neutral-dark group-hover:text-primary transition-colors duration-300 leading-snug tracking-tight text-right line-clamp-2">
                              {item.title}
                            </h3>
                          </Link>
                          
                          <p className="text-[11px] md:text-xs font-bold text-neutral-dark/50 leading-relaxed text-right mt-3 line-clamp-3">
                            {item.excerpt}
                          </p>
                        </div>

                        <div className="border-t border-neutral-dark/5 pt-4 mt-4 flex items-center justify-between text-[11px] md:text-xs text-neutral-dark/50 font-bold">
                          <div className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-neutral-dark/30">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15z" />
                            </svg>
                            <span>{item.date}</span>
                          </div>
                          
                          <Link href={`/announcements/${item.slug}`} className="text-primary group-hover:underline text-[11px] md:text-xs font-extrabold flex items-center gap-1">
                            مشاهده جزئیات
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )
        )}

      </div>
    </section>
  );
}