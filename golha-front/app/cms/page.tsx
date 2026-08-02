import React from "react";
import Link from "next/link";
import Image from "next/image";

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
  created_at: string;
  updated_at: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.73.183.121:8000/api/v1";

const CATEGORY_TABS = ["توسعه", "طراحی", "کد نویسی", "کسب و کار", "مشاوره"];

// ==========================================
// تابع واکشی اطلاعات همراه با لاگ‌های تفصیلی دیباگ تصویر در ترمینال
// ==========================================
async function fetchNewsFromApi(search?: string, category?: string): Promise<{ data: CmsPost[] | null; error: string | null; isBackendFault: boolean }> {
  let endpoint = `${API_BASE}/cms/articles/`;
  
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const queryString = params.toString();
  if (queryString) {
    endpoint += `?${queryString}`;
  }

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        data: null,
        error: `[خطای بک‌بند] پاسخ ناموفق بود (کد وضعیت: ${res.status}).`,
        isBackendFault: true
      };
    }

    const data = await res.json();

    // 🔍 ۱. لاگ تفصیلی کل جی‌سان دریافتی در ترمینال فرانت‌ساید جهت بررسی فیلد image
    console.log("=========================================");
    console.log("🔍 [دیباگ] دیتای خام دریافتی از بک‌بند در صفحه CMS:");
    console.log(JSON.stringify(data, null, 2));
    console.log("=========================================");

    if (!Array.isArray(data)) {
      return {
        data: null,
        error: `[خطای ساختار داده] خروجی بک‌بند آرایه (Array) نیست.`,
        isBackendFault: true
      };
    }

    const publishedData = data.filter((item: CmsPost) => item.is_published);
    return { data: publishedData, error: null, isBackendFault: false };

  } catch (err: unknown) {
    return {
      data: null,
      error: `[خطای ارتباط شبکه] امکان اتصال به سرور بک‌بند در آدرس ${API_BASE} وجود ندارد.`,
      isBackendFault: false
    };
  }
}

// ==========================================
// تابع کمکی و هوشمند جهت بررسی، لاگ‌گذاری و تصحیح خودکار آدرس عکس‌ها در ترمینال
// ==========================================
function getCorrectImageUrl(imagePath: string | undefined | null): string {
  // اگر عکس خالی بود، یک عکس پیش‌فرض لود می‌شود تا فرانت‌ساید کرش نکند
  if (!imagePath) {
    console.warn("⚠️ [هشدار تصویر] فیلد عکس در پاسخ بک‌بند خالی (null یا undefined) است. تصویر پیش‌فرض لود شد.");
    return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800";
  }

  // چاپ آدرس دریافتی در ترمینال
  console.log(`📸 [بررسی تصویر] آدرس خام دریافتی از بک‌بند: "${imagePath}"`);

  // اگر عکس آدرس کامل بود
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // 🛠️ اگر عکس آدرس نسبی بود (مانند /media/...)، دامنه اصلی را به ابتدا اضافه می‌کند
  const domain = API_BASE.replace("/api/v1", ""); // استخراج http://10.73.183.121:8000
  const correctedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  const finalUrl = `${domain}${correctedPath}`;

  console.log(`🛠️ [تصحیح تصویر نسبی] آدرس کامل ساخته‌شده: "${finalUrl}"`);
  return finalUrl;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function NewsArchivePage(props: { searchParams: SearchParams }) {
  const params = await props.searchParams;
  const activeSearch = typeof params.search === "string" ? params.search : "";
  const activeCategory = typeof params.category === "string" ? params.category : "";

  const { data: newsItems, error, isBackendFault } = await fetchNewsFromApi(activeSearch, activeCategory);

  const featuredNews = newsItems ? newsItems.filter(item => item.is_featured) : [];
  const standardNews = newsItems ? newsItems.filter(item => !item.is_featured) : [];

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28">
        
        <div className="mb-12 text-right">
          <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">خبرنامه و ابلاغیه‌ها</span>
          <h1 className="text-3xl md:text-5xl font-black text-neutral-dark tracking-tight leading-tight">اخبار و مطالب دهکده</h1>
        </div>

        {error ? (
          <div className="bg-white rounded-3xl p-8 border border-neutral-dark/10 shadow-sm text-right max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-accent-ochre">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <h3 className="font-extrabold text-lg">خطا در دریافت لیست اخبار از بک‌بند</h3>
            </div>
            <p className="text-xs md:text-sm text-neutral-dark/80 font-bold leading-relaxed">{error}</p>
            <div className="bg-neutral-bg/50 p-4 rounded-xl text-xs space-y-2 border border-neutral-dark/5">
              <span className="font-black text-neutral-dark">منشأ احتمالی خطا:</span>
              <p className="font-bold text-neutral-dark/60">
                {isBackendFault 
                  ? "👈 مشکل از سمت کدهای سرور بک‌بند یا ساختار پایگاه داده است." 
                  : `👈 امکان اتصال به ${API_BASE}/cms/articles/ وجود ندارد.`}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* بخش ۱: پرطرفدارترین‌ها */}
            {featuredNews.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-2 mb-6 text-neutral-dark/80">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-ochre animate-pulse" />
                  <h2 className="text-lg md:text-xl font-extrabold tracking-tight">مطالب برجسته و پرطرفدار</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {featuredNews.slice(0, 3).map((post, idx) => {
                    const overlayBg = idx === 0 ? "bg-accent-ochre/95" : idx === 1 ? "bg-secondary/95" : "bg-primary/95";
                    
                    // بررسی و تصحیح هوشمند آدرس عکس
                    const correctedImg = getCorrectImageUrl(post.image);

                    return (
                      <Link 
                        key={idx} 
                        href={`/cms/${post.slug}`} 
                        className="relative h-[280px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer"
                      >
                        <Image
                          src={correctedImg}
                          alt={post.title}
                          fill={true}
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority={true}
                        />
                        <div className={`absolute inset-0 ${overlayBg} p-6 flex flex-col justify-end transition-transform duration-500 ease-out transform translate-y-[calc(100%-100px)] group-hover:translate-y-0`} >
                          <div className="flex items-center">
                            <h3 className="text-white text-base md:text-lg font-extrabold leading-snug text-right border-r-4 border-white pr-3.5 w-full">
                              {post.title}
                            </h3>
                          </div>
                          <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 mt-4 text-white/90 text-xs md:text-sm leading-relaxed text-right line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* بخش ۲: نوار فیلتر و جستجو */}
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
                    href={`/cms?category=${cat}${activeSearch ? `&search=${activeSearch}` : ""}`}
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* بخش ۳: گرید اصلی ۳ ستونه مقالات دهکده */}
            {standardNews.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-neutral-dark/10 shadow-sm flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-neutral-dark/30 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <p className="text-sm font-bold text-neutral-dark/50">هیچ مطلب یا ابلاغیه‌ای منطبق با جستجوی شما یافت نشد.</p>
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

                  // بررسی و تصحیح هوشمند آدرس عکس
                  const correctedImg = getCorrectImageUrl(item.image);

                  return (
                    <article 
                      key={idx}
                      className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-dark/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-[310px] group select-none"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4 select-none">
                          <span className={`inline-flex items-center text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full ${badgeColor}`}>
                            {item.category}
                          </span>
                          <span className="text-[10px] text-neutral-dark/40 font-bold">{item.readingTime}</span>
                        </div>
                        
                        <Link href={`/cms/${item.slug}`} className="block">
                          <h3 className="text-base md:text-[17px] font-black text-neutral-dark group-hover:text-primary transition-colors duration-300 leading-snug tracking-tight text-right line-clamp-2">
                            {item.title}
                          </h3>
                        </Link>
                        
                        <p className="text-[11px] md:text-xs font-bold text-neutral-dark/50 leading-relaxed text-right mt-3 line-clamp-3">
                          {item.excerpt}
                        </p>
                      </div>

                      <div className="border-t border-neutral-dark/5 pt-4 mt-4 flex items-center justify-between text-[11px] md:text-xs text-neutral-dark/50">
                        <div className="flex items-center gap-2">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-neutral-light/10">
                            {/* بررسی و لود ایمن آواتار نویسنده */}
                            <Image 
                              src={item.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} 
                              alt={item.author} 
                              fill={true}
                              sizes="24px"
                              className="object-cover" 
                            />
                          </div>
                          <span className="font-extrabold text-[10px] md:text-xs">{item.author}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 font-bold text-[10px] md:text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-neutral-dark/30">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15z" />
                          </svg>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}