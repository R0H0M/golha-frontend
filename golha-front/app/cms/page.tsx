import React from "react";
import Link from "next/link";
import Image from "next/image";

// اینترفیس کامل دیتای مقالات
export interface CmsPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  author: string;
  authorAvatar: string;
  readingTime: string;
  image: string;
  is_featured: boolean;
  view_count: number;
  is_published: boolean;
}

// ۱. لیست ۶ دسته‌بندی دقیق شما
const CATEGORY_TABS = ["توسعه", "طراحی", "کسب و کار", "مشاوره", "اخبار دهکده", "اطلاعیه‌ها"];

// ۲. دیتای کاملاً استاتیک و محلی مقالات و اخبار دهکده
const STATIC_ARTICLES: CmsPost[] = [
  {
    id: 1,
    title: "روش‌های جدید و بهینه آبیاری گیاهان دهکده گل‌ها",
    slug: "modern-watering-system",
    excerpt: "بررسی الگوهای نوین آبیاری قطره‌ای اتوماتیک در زون‌های مسکونی دهکده گل‌ها جهت کاهش مصرف آب و سرسبزی پایدار باغچه‌ها.",
    body: "متن کامل خبر...",
    category: "توسعه",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "مدیر فنی",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
    readingTime: "۳ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1558904541-efa8c3a30fc9?auto=format&fit=crop&q=80&w=800",
    is_featured: true,
    view_count: 342,
    is_published: true,
  },
  {
    id: 2,
    title: "مقاله‌ای خواندنی درباره تاریخچه و اصالت کرمان",
    slug: "kerman-history-article",
    excerpt: "گذری بر اصالت تاریخی و جاذبه‌های باستانی منطقه کرمان و نقش مواصلاتی دهکده گل‌ها به عنوان یکی از ریه‌های تفریحی منطقه.",
    body: "متن کامل خبر...",
    category: "طراحی",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "مدیر روابط عمومی",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100",
    readingTime: "۵ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    is_featured: true,
    view_count: 210,
    is_published: true,
  },
  {
    id: 3,
    title: "همه چیز درباره شرایط ساخت‌وساز در هفت باغ",
    slug: "seven-gardens-standards",
    excerpt: "بررسی آخرین مصوبات شورا درباره ضوابط تراکم، ارتفاع، حریم فضای سبز و رعایت اصول مینی‌مال در معماری ویلاهای جدید.",
    body: "متن کامل خبر...",
    category: "اخبار دهکده",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "مدیر فنی",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
    readingTime: "۴ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    is_featured: true,
    view_count: 512,
    is_published: true,
  },
  {
    id: 4,
    title: "روند و شرایط قانونی ساخت ویلا در دهکده",
    slug: "construction-regulations",
    excerpt: "راهنمای گام‌به‌گام صدور پروانه‌های ساختمانی، نظارت مهندسین مشاور و ضوابط تطبیق طرح‌های معماری با استاندارد دهکده.",
    body: "متن کامل خبر...",
    category: "توسعه",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "مدیر فنی",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
    readingTime: "۶ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
    is_featured: false,
    view_count: 140,
    is_published: true,
  },
  {
    id: 5,
    title: "اطلاعیه شماره ۴ مدیریت دهکده گل‌ها",
    slug: "management-notice-4",
    excerpt: "ابلاغیه رسمی شورای تصمیم‌گیری درباره ارتقای دپارتمان نگهبانی زون‌های غربی و نصب سیستم‌های پایش الکترونیکی معابر.",
    body: "متن کامل خبر...",
    category: "اطلاعیه‌ها",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "ستاد مدیریت",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    readingTime: "۲ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    is_featured: false,
    view_count: 670,
    is_published: true,
  },
  {
    id: 6,
    title: "نصب دزدگیر و سیستم‌های امنیتی هوشمند برای باغ و ویلا",
    slug: "security-systems-installation",
    excerpt: "راهنمای هماهنگ‌سازی دزدگیرهای شخصی با اتاق کنترل حراست دهکده و استفاده از تجهیزات حفاظتی تایید شده توسط شورا.",
    body: "متن کامل خبر...",
    category: "مشاوره",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "مدیر حراست",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100",
    readingTime: "۳ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
    is_featured: false,
    view_count: 420,
    is_published: true,
  },
  {
    id: 7,
    title: "راهنمای کامل سرمایه‌گذاری تجاری در زون‌های گردشگری",
    slug: "business-investment-guide",
    excerpt: "فرصت‌های بی‌نظیر مشارکت در احداث مجتمع‌های ورزشی، رستوران‌ها و مراکز تفریحی دهکده با تسهیلات ویژه شورا.",
    body: "متن کامل خبر...",
    category: "کسب و کار",
    date: "۱۴۰۲/۰۵/۱۲",
    author: "دپارتمان سرمایه‌گذاری",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    readingTime: "۴ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
    is_featured: false,
    view_count: 310,
    is_published: true,
  },
];

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function NewsArchivePage(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const activeSearch = typeof params.search === "string" ? params.search.trim().toLowerCase() : "";
  const activeCategory = typeof params.category === "string" ? params.category.trim() : "";

  // فیلترینگ کاملاً استاتیک در حافظه
  let filteredList = STATIC_ARTICLES.filter((item) => item.is_published);

  if (activeCategory) {
    filteredList = filteredList.filter((item) => item.category === activeCategory);
  }

  if (activeSearch) {
    filteredList = filteredList.filter(
      (item) => item.title.toLowerCase().includes(activeSearch) || item.excerpt.toLowerCase().includes(activeSearch)
    );
  }

  // جداسازی اخبار پرطرفدار و عادی
  const featuredNews = filteredList.filter((item) => item.is_featured);
  const standardNews = filteredList.filter((item) => !item.is_featured);

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28">
        
        {/* هدر صفحه */}
        <div className="mb-12 text-right">
          <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">خبرنامه و ابلاغیه‌ها</span>
          <h1 className="text-3xl md:text-5xl font-black text-neutral-dark tracking-tight leading-tight">اخبار و مطالب دهکده</h1>
        </div>

        {/* بخش ۱: پرطرفدارترین‌ها (استاتیک و بدون ارور) */}
        {featuredNews.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6 text-neutral-dark/80">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-ochre animate-pulse" />
              <h2 className="text-lg md:text-xl font-extrabold tracking-tight">مطالب برجسته و پرطرفدار</h2>
            </div>
            
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 w-full scrollbar-none">
              {featuredNews.slice(0, 3).map((post, idx) => {
                const overlayBg = 
                  idx === 0 
                    ? "bg-accent-ochre/95 backdrop-blur-sm" 
                    : idx === 1 
                      ? "bg-secondary/95 backdrop-blur-sm" 
                      : "bg-primary/95 backdrop-blur-sm";

                return (
                  <Link 
                    key={idx} 
                    href={`/cms/${post.slug}`} 
                    className="relative h-[320px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer snap-center shrink-0 w-[85vw] sm:w-[60vw] lg:w-full"
                  >
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill={true} 
                      sizes="(max-width: 768px) 100vw, 30vw" 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      priority={true} 
                      unoptimized={true} 
                    />
                    <div className={`absolute bottom-0 left-0 right-0 h-full ${overlayBg} p-6 md:p-8 flex flex-col justify-start transition-transform duration-500 ease-out transform translate-y-[calc(100%-110px)] md:translate-y-[calc(100%-120px)] group-hover:translate-y-0`}>
                      <div className="flex items-center min-h-[50px]">
                        <h3 className="text-white text-base md:text-lg font-extrabold leading-snug text-right border-r-4 border-white pr-3.5 w-full line-clamp-2">{post.title}</h3>
                      </div>
                      <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 mt-4 text-white/90 text-xs md:text-sm leading-relaxed text-right line-clamp-3">{post.excerpt}</p>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 mt-auto text-accent-gold text-xs font-bold flex items-center gap-1.5 self-start">
                        ادامه مطلب
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* بخش ۲: نوار فیلتر و جستجو استاتیک */}
        <div className="w-full bg-white rounded-2xl border border-neutral-dark/10 p-3 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
            <Link 
              href="/cms"
              className={`text-xs md:text-sm font-extrabold py-2 px-4 rounded-full transition-all whitespace-nowrap
                ${!activeCategory ? "bg-primary text-white" : "bg-neutral-bg hover:bg-neutral-light/20 text-neutral-dark/70 hover:text-neutral-dark"}`}
            >
              همه مطالب
            </Link>
            {CATEGORY_TABS.map((cat, idx) => (
              <Link 
                key={idx}
                href={`/cms?category=${encodeURIComponent(cat)}${activeSearch ? `&search=${encodeURIComponent(activeSearch)}` : ""}`}
                className={`text-xs md:text-sm font-extrabold py-2 px-4 rounded-full transition-all whitespace-nowrap
                  ${activeCategory === cat ? "bg-primary text-white" : "bg-neutral-bg hover:bg-neutral-light/20 text-neutral-dark/70 hover:text-neutral-dark"}`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="w-full md:w-80 shrink-0">
            <form action="/cms" method="GET" className="relative flex items-center border border-neutral-dark/15 rounded-full px-4 py-1.5 bg-neutral-bg/30 w-full focus-within:ring-2 focus-within:ring-primary/30 transition-all">
              <input 
                type="text" 
                name="search"
                defaultValue={activeSearch}
                placeholder="جستجو در مطالب دهکده..." 
                className="bg-transparent focus:outline-none text-xs md:text-sm w-full text-neutral-dark placeholder-neutral-dark/40 font-bold py-1.5"
              />
              {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
              <button type="submit" className="text-neutral-dark/50 hover:text-primary transition-colors cursor-pointer shrink-0 mr-1.5" aria-label="جستجو">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" /></svg>
              </button>
            </form>
          </div>
        </div>

        {/* بخش ۳: گرید ۳ ستونه اصلی مقالات */}
        {standardNews.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-neutral-dark/10 shadow-sm flex flex-col items-center">
            <p className="text-sm font-bold text-neutral-dark/50">هیچ مطلبی منطبق با فیلتر یا جستجوی شما یافت نشد.</p>
            <Link href="/cms" className="mt-4 text-xs font-bold text-primary underline underline-offset-4">پاک کردن همه فیلترها</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardNews.map((item, idx) => {
              const badgeColor = 
                item.category === "توسعه" 
                  ? "text-primary bg-primary/10" 
                  : item.category === "طراحی" 
                    ? "text-secondary bg-secondary/10" 
                    : "text-accent-ochre bg-accent-ochre/10";

              return (
                <article key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-dark/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-[310px] group select-none">
                  <div>
                    <div className="flex items-center justify-between mb-4 select-none">
                      <span className={`inline-flex items-center text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full ${badgeColor}`}>
                        {item.category}
                      </span>
                      <span className="text-[10px] text-neutral-dark/40 font-bold">{item.readingTime}</span>
                    </div>
                    <Link href={`/cms/${item.slug}`} className="block">
                      <h3 className="text-base md:text-[17px] font-black text-neutral-dark group-hover:text-primary transition-colors duration-300 leading-snug tracking-tight text-right line-clamp-2">{item.title}</h3>
                    </Link>
                    <p className="text-[11px] md:text-xs font-bold text-neutral-dark/50 leading-relaxed text-right mt-3 line-clamp-3">{item.excerpt}</p>
                  </div>

                  <div className="border-t border-neutral-dark/5 pt-4 mt-4 flex items-center justify-between text-[11px] md:text-xs text-neutral-dark/50">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden bg-neutral-light/10">
                        <Image src={item.authorAvatar} alt={item.author} fill={true} sizes="24px" className="object-cover" unoptimized={true} />
                      </div>
                      <span className="font-extrabold text-[10px] md:text-xs">{item.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-[10px] md:text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-neutral-dark/30"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15z" /></svg>
                      <span>{item.date}</span>
                    </div>
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