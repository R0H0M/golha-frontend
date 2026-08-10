import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentForm from "@/components/comment-form";

// تعریف اینترفیس مقاله
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

// تعریف اینترفیس دیدگاه‌های دریافتی از API جدید
export interface CommentItem {
  id: number;
  article: number;
  name: string;
  email: string;
  website?: string;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.73.183.121:8001/api/v1";

// ==========================================
// ۱. تابع دریافت اطلاعات تکی مقالات از API بک‌بند
// ==========================================
async function fetchArticleFromApi(slug: string): Promise<{ data: CmsPost | null; error: string | null; isBackendFault: boolean }> {
  const encodedSlug = encodeURIComponent(slug);
  const url = `${API_BASE}/cms/articles/${encodedSlug}/`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return { data: null, error: null, isBackendFault: false };
      }
      if (res.status >= 500) {
        return {
          data: null,
          error: `[خطای سرور بک‌بند] سرور در پردازش تکی مقاله با خطا مواجه شد (کد وضعیت: ${res.status}).`,
          isBackendFault: true
        };
      }
      return {
        data: null,
        error: `[خطای کلاینت/آدرس] درخواست غیرمجاز است یا فرمت آدرس اشکال دارد (کد وضعیت: ${res.status}).`,
        isBackendFault: false
      };
    }

    const data: CmsPost = await res.json();

    if (!data || !data.slug || !data.body) {
      return {
        data: null,
        error: `[خطای فرمت ساختاری] فیلدهای ضروری (مانند slug یا body) در پاسخ بک‌بند وجود ندارند.`,
        isBackendFault: true
      };
    }

    return { data, error: null, isBackendFault: false };

  } catch (err: unknown) {
    return {
      data: null,
      error: `[خطای شبکه] امکان اتصال به سرور بک‌بند جهت لود مقاله وجود ندارد.`,
      isBackendFault: false
    };
  }
}

// ==========================================
// ۲. تابع دریافت لیست دیدگاه‌های تایید شده یک مقاله از API جدید (/cms/articles/{slug}/comments/)
// ==========================================
async function fetchArticleCommentsFromApi(slug: string): Promise<CommentItem[]> {
  const encodedSlug = encodeURIComponent(slug);
  const url = `${API_BASE}/cms/articles/${encodedSlug}/comments/`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 10 }, // بازآفرینی سریع ۱۰ ثانیه‌ای جهت لود آنی دیدگاه‌های جدید تایید شده
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(`[دیدگاه‌ها] خطا در دریافت دیدگاه‌های مقاله ${slug}:`, err);
    return [];
  }
}

// ==========================================
// تابع کمکی تبدیل آدرس نسبی به آدرس کامل و مطلق دیتابیس
// ==========================================
function getCorrectImageUrl(imagePath: string | undefined | null, fallbackUrl: string): string {
  if (!imagePath) {
    return fallbackUrl;
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const domain = API_BASE.replace("/api/v1", ""); // استخراج http://10.73.183.121:8001
  const correctedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${domain}${correctedPath}`;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SingleNewsPage(props: PageProps) {
  const { slug } = await props.params;
  
  // واکشی موازی و همزمان اطلاعات مقاله و لیست دیدگاه‌های تاییدشده از بک‌بند
  const [articleResult, comments] = await Promise.all([
    fetchArticleFromApi(slug),
    fetchArticleCommentsFromApi(slug)
  ]);

  const { data: article, error, isBackendFault } = articleResult;

  if (!error && !article) {
    notFound();
  }

  const correctedMainImage = article ? getCorrectImageUrl(article.image, "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb") : "";
  const correctedAuthorAvatar = article ? getCorrectImageUrl(article.authorAvatar, "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde") : "";

  const categoryBadgeColor = 
    article?.category === "توسعه" 
      ? "text-primary bg-primary/10" 
      : "text-secondary bg-secondary/10";

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28 max-w-[1400px] mx-auto grid grid-cols-1 gap-12">
        
        {/* پنل هوشمند عیب‌یابی خطاها */}
        {error ? (
          <div className="bg-white rounded-3xl p-8 border border-neutral-dark/10 shadow-sm text-right max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-accent-ochre">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <h3 className="font-extrabold text-lg">خطا در واکشی جزئیات مقاله از بک‌بند</h3>
            </div>
            <p className="text-xs md:text-sm text-neutral-dark/80 font-bold leading-relaxed">{error}</p>
            <div className="bg-neutral-bg/50 p-4 rounded-xl text-xs space-y-2 border border-neutral-dark/5">
              <span className="font-black text-neutral-dark">منشأ احتمالی خطا:</span>
              <p className="font-bold text-neutral-dark/60">
                {isBackendFault 
                  ? "👈 این خطا از سمت کدهای سرور دیتابیس است (خطای داخلی بک‌بند)." 
                  : `👈 مشکل به سرور محلی، عدم تطابق آدرس، خاموش بودن پورت بک‌بند در آدرس ${API_BASE} یا مسدود شدن درخواست توسط CORS در کدهای بک‌بند مربوط می‌شود.`}
              </p>
            </div>
          </div>
        ) : (
          article && (
            <>
              {/* هدر خبر */}
              <div className="text-right space-y-4">
                <span className={`inline-flex items-center text-xs font-extrabold px-3.5 py-1 rounded-full ${categoryBadgeColor}`}>
                  {article.category}
                </span>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-neutral-dark leading-tight tracking-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-neutral-dark/50 font-bold pt-2 border-b border-neutral-dark/10 pb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden bg-neutral-light/10">
                      <Image src={correctedAuthorAvatar} alt={article.author} fill={true} sizes="28px" className="object-cover" unoptimized={true} />
                    </div>
                    <span className="text-neutral-dark font-extrabold">{article.author}</span>
                  </div>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>
              </div>

              {/* عکس اصلی مقاله */}
              <div className="relative w-full h-[300px] md:h-[520px] rounded-3xl overflow-hidden border border-neutral-dark/10 shadow-sm">
                <Image
                  src={correctedMainImage}
                  alt={article.title}
                  fill={true}
                  priority={true}
                  sizes="100vw"
                  className="object-cover"
                  unoptimized={true}
                />
              </div>

              {/* بدنه اصلی متن مقاله */}
              <div className="max-w-4xl mx-auto w-full space-y-8 text-right">
                <div 
                  className="prose prose-neutral max-w-none text-neutral-dark/90 font-semibold text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose text-justify space-y-6"
                  dangerouslySetInnerHTML={{ __html: article.body }} 
                />

                {/* برچسب‌ها و دکمه‌های اشتراک‌گذاری */}
                <div className="border-t border-b border-neutral-dark/10 py-6 my-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs md:text-sm font-bold text-neutral-dark/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-neutral-dark">برچسب‌ها:</span>
                    <Link href={`/cms?search=${article.category}`} className="bg-white hover:bg-neutral-light/10 text-neutral-dark/70 border border-neutral-dark/10 px-3.5 py-1.5 rounded-lg transition-colors">
                      {article.category}
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>اشتراک‌گذاری:</span>
                    <div className="flex items-center gap-2">
                      <span className="hover:text-primary transition-colors cursor-pointer">لینکدین</span>
                      <span>•</span>
                      <span className="hover:text-primary transition-colors cursor-pointer">توییتر</span>
                      <span>•</span>
                      <span className="hover:text-primary transition-colors cursor-pointer">فیسبوک</span>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* بخش جدید: لیست دیدگاه‌های تاییدشده کاربران (لود زنده از API) */}
                {/* ========================================================================= */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-dark/10 shadow-sm space-y-6 text-right">
                  <div className="flex items-center justify-between border-b border-neutral-dark/10 pb-4">
                    <h3 className="text-lg md:text-xl font-black text-neutral-dark border-r-4 border-primary pr-3 leading-none">
                      دیدگاه‌های کاربران
                    </h3>
                    <span className="text-xs font-bold text-neutral-dark/50 bg-neutral-bg px-3 py-1 rounded-full">
                      {comments.length} دیدگاه ثبت‌شده
                    </span>
                  </div>

                  {comments.length === 0 ? (
                    <p className="text-xs md:text-sm font-semibold text-neutral-dark/50 text-center py-6">
                      هنوز دیدگاهی برای این مقاله منتشر نشده است. اولین نفری باشید که نظر خود را ثبت می‌کنید!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {comments.map((item) => (
                        <div key={item.id} className="bg-neutral-bg/40 p-5 rounded-2xl border border-neutral-dark/5 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              {/* آواتار متنی مینی‌مال با حرف اول نام فرستنده */}
                              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0 select-none">
                                {item.name ? item.name.charAt(0) : "؟"}
                              </div>
                              <span className="text-xs md:text-sm font-black text-neutral-dark">{item.name}</span>
                            </div>
                            <span className="text-[10px] md:text-xs text-neutral-dark/40 font-bold">
                              {item.created_at ? new Date(item.created_at).toLocaleDateString("fa-IR") : ""}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm font-semibold text-neutral-dark/80 leading-relaxed pr-10">
                            {item.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* فرم تعاملی ارسال دیدگاه جدید */}
                <CommentForm slug={slug} />

              </div>
            </>
          )
        )}

      </div>
    </section>
  );
}