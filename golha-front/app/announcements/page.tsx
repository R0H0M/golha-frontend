import React from "react";
import Link from "next/link";
import { Announcement } from "@/types/announcement";
import { MOCK_ANNOUNCEMENTS } from "@/lib/mock-data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.176.114.121:8001/api/v1";
const CATEGORY_TABS = ["بحران", "عمرانی", "رویداد", "عمومی"];

// تابع هوشمند واکشی اطلاعیه‌ها با فال‌بک خودکار ماک
async function fetchAnnouncementsFromApi(search?: string, category?: string): Promise<{ data: Announcement[] | null; error: string | null; isBackendFault: boolean }> {
  let endpoint = `${API_BASE}/cms/announcements/`;
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const queryString = params.toString();
  if (queryString) {
    endpoint += `?${queryString}`;
  }

  try {
    const res = await fetch(endpoint, { next: { revalidate: 30 } });
    if (res.ok) {
      const data: Announcement[] = await res.json();
      if (Array.isArray(data)) {
        return { data: filterAnnouncements(data, search, category), error: null, isBackendFault: false };
      }
    }
  } catch (err) {
    console.warn("⚠️ [حالت دمو] امکان اتصال به بک‌بند وجود ندارد. دیتای ماک اطلاعیه‌ها لود شد.");
  }

  // سوئیچ خودکار به دیتای آفلاین ماک
  return { data: filterAnnouncements(MOCK_ANNOUNCEMENTS, search, category), error: null, isBackendFault: false };
}

function filterAnnouncements(list: Announcement[], search?: string, category?: string): Announcement[] {
  let filtered = list.filter((item: Announcement) => item.is_published);
  if (category?.trim()) {
    filtered = filtered.filter((item: Announcement) => item.category?.trim() === category.trim());
  }
  if (search?.trim()) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter((item: Announcement) =>
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(query))
    );
  }
  return filtered;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function AnnouncementsPage(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const activeSearch = typeof params.search === "string" ? params.search : "";
  const activeCategory = typeof params.category === "string" ? params.category : "";

  const { data: announcements, error } = await fetchAnnouncementsFromApi(activeSearch, activeCategory);

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28">
        
        <div className="mb-12 border-b border-neutral-dark/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
          <div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">پورتال اطلاع‌رسانی دهکده</span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-dark tracking-tight">اطلاعیه‌ها و بیانیه‌های رسمی</h1>
          </div>
          {announcements && (
            <span className="text-xs font-semibold text-neutral-dark/40">تعداد اطلاعیه‌ها: {announcements.length} مورد</span>
          )}
        </div>

        {error ? (
          <div className="bg-white rounded-3xl p-8 border border-neutral-dark/10 shadow-sm text-right max-w-4xl mx-auto space-y-4">
            <h3 className="font-extrabold text-lg text-accent-ochre">خطا در دریافت لیست اطلاعیه‌ها</h3>
            <p className="text-xs md:text-sm text-neutral-dark/80 font-bold">{error}</p>
          </div>
        ) : (
          announcements && (
            <>
              {/* نوار فیلتر و سرچ */}
              <div className="w-full bg-white rounded-2xl border border-neutral-dark/10 p-3 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
                  <Link 
                    href="/announcements"
                    className={`text-xs md:text-sm font-extrabold py-2 px-4 rounded-full transition-all whitespace-nowrap
                      ${!activeCategory ? "bg-primary text-white" : "bg-neutral-bg hover:bg-neutral-light/20 text-neutral-dark/70 hover:text-neutral-dark"}`}
                  >
                    همه اطلاعیه‌ها
                  </Link>
                  {CATEGORY_TABS.map((cat, idx) => (
                    <Link 
                      key={idx}
                      href={`/announcements?category=${encodeURIComponent(cat)}${activeSearch ? `&search=${encodeURIComponent(activeSearch)}` : ""}`}
                      className={`text-xs md:text-sm font-extrabold py-2 px-4 rounded-full transition-all whitespace-nowrap
                        ${activeCategory === cat ? "bg-primary text-white" : "bg-neutral-bg hover:bg-neutral-light/20 text-neutral-dark/70 hover:text-neutral-dark"}`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>

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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" /></svg>
                    </button>
                  </form>
                </div>
              </div>

              {/* گرید اطلاعیه‌ها */}
              {announcements.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center border border-neutral-dark/10 shadow-sm">
                  <p className="text-sm font-bold text-neutral-dark/50">هیچ اطلاعیه‌ای منطبق با جستجوی شما یافت نشد.</p>
                  <Link href="/announcements" className="mt-4 text-xs font-bold text-primary underline underline-offset-4 block">پاک کردن فیلترها</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {announcements.map((item, idx) => {
                    const badgeColor = 
                      item.category === "بحران" 
                        ? "text-accent-ochre bg-accent-ochre/10" 
                        : item.category === "عمرانی" 
                          ? "text-secondary bg-secondary/10" 
                          : "text-primary bg-primary/10";

                    return (
                      <article key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-dark/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-[280px] group select-none">
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
                            <h3 className="text-base md:text-[17px] font-black text-neutral-dark group-hover:text-primary transition-colors duration-300 leading-snug tracking-tight text-right line-clamp-2">{item.title}</h3>
                          </Link>
                          <p className="text-[11px] md:text-xs font-bold text-neutral-dark/50 leading-relaxed text-right mt-3 line-clamp-3">{item.excerpt}</p>
                        </div>

                        <div className="border-t border-neutral-dark/5 pt-4 mt-4 flex items-center justify-between text-[11px] md:text-xs text-neutral-dark/50 font-bold">
                          <span>📅 {item.date}</span>
                          <Link href={`/announcements/${item.slug}`} className="text-primary group-hover:underline text-[11px] md:text-xs font-extrabold">
                            مشاهده جزئیات
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