import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// تعریف اینترفیس منطبق بر فرمت ارسالی بک‌بند شما (CmsPost)
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

// ==========================================
// تابع دریافت اطلاعات تکی مقالات از API واقعی بک‌بند (/cms/articles/{slug}/)
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
// تابع کمکی تبدیل آدرس نسبی به آدرس کامل و مطلق دیتابیس شما
// ==========================================
function getCorrectImageUrl(imagePath: string | undefined | null, fallbackUrl: string): string {
  if (!imagePath) {
    return fallbackUrl;
  }

  // اگر عکس قبلاً آدرس کامل بود
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // تصحیح آدرس نسبی (مانند /media/...) با استخراج دامنه اصلی از API_BASE
  const domain = API_BASE.replace("/api/v1", ""); // استخراج http://10.73.183.121:8000
  const correctedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${domain}${correctedPath}`;
}

// اکشن سرور برای ارسال دیدگاه‌ها
async function submitCommentAction(formData: FormData) {
  "use server";
  
  const name = formData.get("name");
  const email = formData.get("email");
  const website = formData.get("website");
  const comment = formData.get("comment");

  console.log("ارسال دیدگاه به بک‌بند با فرمت دیتابیس:", { name, email, website, comment });
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SingleNewsPage(props: PageProps) {
  const { slug } = await props.params;
  const { data: article, error, isBackendFault } = await fetchArticleFromApi(slug);

  if (!error && !article) {
    notFound();
  }

  // ۱. تصحیح و تبدیل آدرس تصاویر به آدرس کامل و مطلق بک‌بند
  const correctedMainImage = article ? getCorrectImageUrl(article.image, "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb") : "";
  const correctedAuthorAvatar = article ? getCorrectImageUrl(article.authorAvatar, "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde") : "";

  const categoryBadgeColor = 
    article?.category === "توسعه" 
      ? "text-primary bg-primary/10" 
      : "text-secondary bg-secondary/10";

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28 max-w-[1400px] mx-auto grid grid-cols-1 gap-12">
        
        {/* پنل هوشمند بررسی و عیب‌یابی خطاها */}
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
                <h1 className="text-2xl md:text-4xl font-black text-neutral-dark leading-tight tracking-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-dark/50 font-bold pt-2 border-b border-neutral-dark/10 pb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden bg-neutral-light/10">
                      {/* ۲. استفاده از تصویر تصحیح شده آواتار */}
                      <Image src={correctedAuthorAvatar} alt={article.author} fill={true} sizes="24px" className="object-cover" />
                    </div>
                    <span className="text-neutral-dark font-extrabold">{article.author}</span>
                  </div>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>
              </div>

              {/* عکس اصلی با استفاده از آدرس مطلق تصحیح شده */}
              <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-neutral-dark/10 shadow-sm">
                <Image
                  src={correctedMainImage}
                  alt={article.title}
                  fill={true}
                  priority={true}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* بدنه محتوایی */}
              <div className="max-w-4xl mx-auto w-full space-y-8 text-right">
                <div 
                  className="prose prose-neutral max-w-none text-neutral-dark/85 font-semibold text-xs md:text-sm leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ __html: article.body }} 
                />

                {/* نقل قول */}
                <blockquote className="border-r-4 border-secondary bg-secondary/5 rounded-2xl p-6 md:p-8 my-10 flex gap-4 items-start text-right">
                  <span className="text-secondary text-4xl leading-none select-none font-serif">“</span>
                  <p className="text-xs md:text-base font-extrabold text-secondary leading-relaxed">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                  </p>
                </blockquote>

                {/* ویژگی‌ها */}
                <div className="space-y-6 pt-4">
                  <h2 className="text-lg md:text-xl font-black text-neutral-dark tracking-tight">
                    بهینه‌سازی سیستم‌های آبرسانی و سرعت انتقال آب
                  </h2>
                  <p className="text-xs md:text-sm text-neutral-dark/75 leading-relaxed font-semibold text-justify">
                    {article.excerpt}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6">
                    <div className="space-y-4">
                      <h3 className="text-sm md:text-base font-extrabold text-neutral-dark mb-4">معرفی برخی از ویژگی‌ها</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-xs md:text-sm font-extrabold text-neutral-dark/80">
                          <svg className="w-5 h-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          بیمه اموال تجاری زون‌ها
                        </li>
                        <li className="flex items-center gap-3 text-xs md:text-sm font-extrabold text-neutral-dark/80">
                          <svg className="w-5 h-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          تم مناسب و هماهنگ با بودجه
                        </li>
                        <li className="flex items-center gap-3 text-xs md:text-sm font-extrabold text-neutral-dark/80">
                          <svg className="w-5 h-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          رضایت حداکثری مالکین
                        </li>
                      </ul>
                    </div>

                    <div className="relative h-56 rounded-3xl overflow-hidden border border-neutral-dark/10 group cursor-pointer shadow-sm">
                      {/* استفاده از تصویر اصلی تصحیح‌شده برای پلیر ویدیو */}
                      <Image src={correctedMainImage} alt="فیلم معرفی" fill={true} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-103" />
                      <div className="absolute inset-0 bg-neutral-dark/20 flex items-center justify-center transition-colors group-hover:bg-neutral-dark/30 z-10">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary shadow-xl transition-transform duration-300 group-hover:scale-108 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* تگ‌ها */}
                <div className="border-t border-b border-neutral-dark/10 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold text-neutral-dark/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-neutral-dark">برچسب‌ها:</span>
                    <Link href={`/cms?search=${article.category}`} className="bg-white hover:bg-neutral-light/10 text-neutral-dark/70 border border-neutral-dark/10 px-3 py-1.5 rounded-lg transition-colors">
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

                {/* فرم تعاملی ارسال دیدگاه */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-dark/10 shadow-sm mt-12 text-right space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-neutral-dark border-r-4 border-primary pr-3 leading-none">ارسال دیدگاه</h3>
                    <p className="text-[11px] md:text-xs font-semibold text-neutral-dark/45 mt-3">
                      نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند *
                    </p>
                  </div>

                  <form action={submitCommentAction} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-neutral-dark/80">نام *</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          placeholder="نام خود را وارد کنید"
                          className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-neutral-dark/80">ایمیل *</label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          placeholder="آدرس ایمیل خود را وارد کنید"
                          className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">آدرس وب‌سایت (اختیاری)</label>
                      <input 
                        type="url" 
                        name="website" 
                        placeholder="https://example.com"
                        className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-left"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-neutral-dark/80">دیدگاه شما *</label>
                      <textarea 
                        name="comment" 
                        required 
                        rows={5}
                        placeholder="دیدگاه خود را اینجا وارد کنید..."
                        className="w-full bg-neutral-bg/30 border border-neutral-dark/15 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all min-h-[120px]"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="bg-primary hover:bg-primary-hover text-white text-xs md:text-sm font-bold py-3.5 px-8 rounded-xl transition-all cursor-pointer flex items-center gap-2 self-start shadow-sm"
                    >
                      ارسال دیدگاه
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </form>
                </div>

              </div>
            </>
          )
        )}

      </div>
    </section>
  );
}