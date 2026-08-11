import React from "react";
import Link from "next/link";

// اینترفیس کامل دیتای اطلاعیه‌ها
export interface Announcement {
  id: number;
  title: string;
  excerpt: string;
  category: "بحران" | "عمرانی" | "رویداد" | "عمومی" | string;
  date: string;
  slug: string;
  is_emergency: boolean;
  is_published: boolean;
  created_at: string;
}

// ۱. لیست دسته‌بندی‌های اطلاعیه‌ها
const CATEGORY_TABS = ["بحران", "عمرانی", "رویداد", "عمومی"];

// ۲. دیتای کاملاً استاتیک و محلی اطلاعیه‌ها
const STATIC_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "قطع موقت آب شرب در زون غربی به دلیل تعمیرات زیرساختی",
    slug: "water-outage-notice",
    excerpt: "به اطلاع ساکنین محترم زون ۲ می‌رساند فردا چهارشنبه از ساعت ۹ الی ۱۳ آب جهت ارتقای شبکه قطعی موقت خواهد داشت.",
    category: "بحران",
    date: "۱۴۰۲/۰۵/۱۰",
    is_emergency: true,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
  },
  {
    id: 2,
    title: "آغاز عملیات آسفالت‌ریزی و لکه‌گیری معابر اصلی زون ۱",
    slug: "asphalt-renovation-zone-1",
    excerpt: "عملیات بهسازی آسفالت بلوار زنبق از روز شنبه آغاز شده و مسیرهای جایگزین جهت تردد خودروها مشخص گردیده است.",
    category: "عمرانی",
    date: "۱۴۰۲/۰۵/۱۱",
    is_emergency: false,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
  },
  {
    id: 3,
    title: "فراخوان ثبت‌نام در مجمع عمومی سالانه مالکین دهکده",
    slug: "annual-owners-assembly-call",
    excerpt: "از تمامی مالکین محترم پلاک‌های ثبتی دعوت می‌شود جهت شرکت در نشست سالانه شورا در تاریخ ۱۵ مرداد حضور به عمل آورند.",
    category: "عمومی",
    date: "۱۴۰۲/۰۵/۱۲",
    is_emergency: false,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
  },
  {
    id: 4,
    title: "برگزاری کارگاه تخصصی نگهداری فضای سبز ویلاها",
    slug: "green-space-workshop",
    excerpt: "دپارتمان محیط‌زیست دهکده کارگاه آموزشی رایگان اصول هرس و کوددهی درختان فصلی را روز پنجشنبه برگزار می‌کند.",
    category: "رویداد",
    date: "۱۴۰۲/۰۵/۱۴",
    is_emergency: false,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
  },
  {
    id: 5,
    title: "اطلاعیه ساعت کاری جدید دفتر مدیریت و حراست دهکده",
    slug: "office-working-hours",
    excerpt: "ساعت کاری بخش اداری و پاسخگویی تلفنی دفتر دهکده در فصل تابستان از ساعت ۸:۰۰ صبح الی ۱۴:۳۰ خواهد بود.",
    category: "عمومی",
    date: "۱۴۰۲/۰۵/۱۵",
    is_emergency: false,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
  },
  {
    id: 6,
    title: "ارتقای سیستم پایش تصویری و دوربین‌های پلاک‌خوان ورودی",
    slug: "security-camera-upgrade",
    excerpt: "سامانه هوشمند ثبت پلاک ورودی‌های اصلی جهت رفاه و افزایش امنیت ساکنین با موفقیت راه‌اندازی و تست گردید.",
    category: "عمرانی",
    date: "۱۴۰۲/۰۵/۱۶",
    is_emergency: false,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
  },
];

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function AnnouncementsPage(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const activeSearch = typeof params.search === "string" ? params.search.trim().toLowerCase() : "";
  const activeCategory = typeof params.category === "string" ? params.category.trim() : "";

  // فیلترینگ کاملاً استاتیک در حافظه
  let filteredList = STATIC_ANNOUNCEMENTS.filter((item) => item.is_published);

  if (activeCategory) {
    filteredList = filteredList.filter((item) => item.category === activeCategory);
  }

  if (activeSearch) {
    filteredList = filteredList.filter(
      (item) => item.title.toLowerCase().includes(activeSearch) || item.excerpt.toLowerCase().includes(activeSearch)
    );
  }

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28">
        
        {/* هدر صفحه */}
        <div className="mb-12 border-b border-neutral-dark/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
          <div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">پورتال اطلاع‌رسانی دهکده</span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-dark tracking-tight">اطلاعیه‌ها و بیانیه‌های رسمی</h1>
          </div>
          <span className="text-xs font-semibold text-neutral-dark/40">تعداد اطلاعیه‌ها: {filteredList.length} مورد</span>
        </div>

        {/* نوار فیلتر و سرچ استاتیک */}
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
        {filteredList.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-neutral-dark/10 shadow-sm">
            <p className="text-sm font-bold text-neutral-dark/50">هیچ اطلاعیه‌ای منطبق با جستجوی شما یافت نشد.</p>
            <Link href="/announcements" className="mt-4 text-xs font-bold text-primary underline underline-offset-4 block">پاک کردن همه فیلترها</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredList.map((item, idx) => {
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

      </div>
    </section>
  );
}