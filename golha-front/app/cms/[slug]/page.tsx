import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentForm from "@/components/comment-form";

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

// اینترفیس دیدگاه‌ها
interface CommentItem {
  id: number;
  name: string;
  comment: string;
  date: string;
}

// دیتای محلی استاتیک مقالات
const STATIC_ARTICLES: CmsPost[] = [
  {
    id: 1,
    title: "روش‌های جدید و بهینه آبیاری گیاهان دهکده گل‌ها",
    slug: "modern-watering-system",
    excerpt: "بررسی الگوهای نوین آبیاری قطره‌ای اتوماتیک در زون‌های مسکونی دهکده گل‌ها جهت کاهش مصرف آب و سرسبزی پایدار باغچه‌ها.",
    body: `
      <p>توسعه فضای سبز پایدار یکی از اولویت‌های اصلی مدیریت دهکده گل‌های کرمان است. در این راستا، فاز اول هوشمندسازی شبکه آبرسانی زون‌های مسکونی با موفقیت به پایان رسید.</p>
      <p>با استفاده از سیستم‌های هوشمند، رطوبت خاک پایش شده و آبیاری به صورت کاملاً خودکار انجام می‌گیرد. این امر موجب کاهش ۴۵ درصدی مصرف منابع آب در زون‌های مسکونی شده است.</p>
      <p>همچنین با همکاری دپارتمان محیط‌زیست دهکده، درختان قدیمی پلاک‌ها شناسایی و شناسنامه‌دار شده‌اند تا از آسیب به ریشه‌ها در حین ساخت‌وساز جلوگیری گردد.</p>
    `,
    category: "توسعه",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "مدیر دپارتمان فنی",
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
    body: `
      <p>کرمان با قدمت دیرینه خود همواره مهد فرهنگ و معماری اصیل ایرانی بوده است. دهکده گل‌ها با تکیه بر این اصالت، فضایی آرام و مدرن را برای ساکنین فراهم کرده است.</p>
    `,
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
    body: `
      <p>ضوابط جدید ساخت‌وساز با هدف حفظ یکدستی بصری و تراکم استاندارد زون‌های مسکونی ابلاغ گردید. کلیه مالکین محترم موظف به رعایت حریم ۲ متری از پلاک‌های مجاور می‌باشند.</p>
    `,
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
];

// دیتای محلی دیدگاه‌های تایید شده
const STATIC_COMMENTS: CommentItem[] = [
  {
    id: 1,
    name: "مهندس رضا کریمی",
    comment: "با تشکر از دپارتمان فنی دهکده. اجرای این طرح آبیاری هوشمند در زون ۲ تأثیر چشمگیری در صرفه‌جویی آب داشته است.",
    date: "۱۴۰۲/۰۵/۱۱",
  },
  {
    id: 2,
    name: "دکتر سارا احمدی",
    comment: "مطلب بسیار مفیدی بود. امیدوارم این طرح در زون‌های شرقی هم سریع‌تر عملیاتی بشود.",
    date: "۱۴۰۲/۰۵/۱۲",
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SingleNewsPage(props: PageProps) {
  const { slug } = await props.params;

  // یافتن مقاله بر اساس اسلاگ از دیتای محلی (در صورت عدم پیدا شدن، مقاله اول نشان داده می‌شود)
  const article = STATIC_ARTICLES.find((item) => item.slug === slug) || STATIC_ARTICLES[0];

  if (!article) {
    notFound();
  }

  const categoryBadgeColor = 
    article.category === "توسعه" 
      ? "text-primary bg-primary/10" 
      : "text-secondary bg-secondary/10";

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28 max-w-[1400px] mx-auto grid grid-cols-1 gap-12">
        
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
                <Image src={article.authorAvatar} alt={article.author} fill={true} sizes="28px" className="object-cover" unoptimized={true} />
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
            src={article.image}
            alt={article.title}
            fill={true}
            priority={true}
            sizes="100vw"
            className="object-cover"
            unoptimized={true}
          />
        </div>

        {/* بدنه اصلی متن مقاله (بزرگ، خوانا و بدون المان زاید) */}
        <div className="max-w-4xl mx-auto w-full space-y-8 text-right">
          <div 
            className="prose prose-neutral max-w-none text-neutral-dark/90 font-semibold text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose text-justify space-y-6"
            dangerouslySetInnerHTML={{ __html: article.body }} 
          />

          {/* برچسب‌ها و دکمه‌های اشتراک‌گذاری */}
          <div className="border-t border-b border-neutral-dark/10 py-6 my-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs md:text-sm font-bold text-neutral-dark/50">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-neutral-dark">برچسب‌ها:</span>
              <Link href={`/cms?category=${article.category}`} className="bg-white hover:bg-neutral-light/10 text-neutral-dark/70 border border-neutral-dark/10 px-3.5 py-1.5 rounded-lg transition-colors">
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

          {/* لیست دیدگاه‌های تاییدشده کاربران */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-dark/10 shadow-sm space-y-6 text-right">
            <div className="flex items-center justify-between border-b border-neutral-dark/10 pb-4">
              <h3 className="text-lg md:text-xl font-black text-neutral-dark border-r-4 border-primary pr-3 leading-none">
                دیدگاه‌های کاربران
              </h3>
              <span className="text-xs font-bold text-neutral-dark/50 bg-neutral-bg px-3 py-1 rounded-full">
                {STATIC_COMMENTS.length} دیدگاه ثبت‌شده
              </span>
            </div>

            <div className="space-y-4">
              {STATIC_COMMENTS.map((item) => (
                <div key={item.id} className="bg-neutral-bg/40 p-5 rounded-2xl border border-neutral-dark/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0 select-none">
                        {item.name.charAt(0)}
                      </div>
                      <span className="text-xs md:text-sm font-black text-neutral-dark">{item.name}</span>
                    </div>
                    <span className="text-[10px] md:text-xs text-neutral-dark/40 font-bold">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-neutral-dark/80 leading-relaxed pr-10">
                    {item.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* فرم ثبت دیدگاه جدید */}
          <CommentForm slug={slug} />

        </div>

      </div>
    </section>
  );
}