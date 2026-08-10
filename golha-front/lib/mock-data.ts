import { CmsPost } from "@/app/cms/page";
import { Announcement } from "@/types/announcement";
import { EventItem } from "@/app/events/page";

// ۱. ماک دیتای مقالات و اخبار (CMS Articles)
export const MOCK_ARTICLES: CmsPost[] = [
  {
    id: 1,
    title: "روش‌های جدید و بهینه آبیاری گیاهان دهکده گل‌ها",
    slug: "modern-watering-system",
    excerpt: "بررسی الگوهای نوین آبیاری قطره‌ای اتوماتیک در زون‌های مسکونی دهکده گل‌ها جهت کاهش مصرف آب و سرسبزی پایدار باغچه‌ها.",
    body: `
      <p>توسعه فضای سبز پایدار یکی از اولویت‌های اصلی مدیریت دهکده گل‌های کرمان است. در این راستا، فاز اول هوشمندسازی شبکه آبرسانی زون‌های مسکونی با موفقیت به پایان رسید.</p>
      <p>با استفاده از این سیستم، میزان هدررفت آب تا ۴۵ درصد کاهش یافته و رطوبت خاک به صورت خودکار پایش می‌شود.</p>
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
    created_at: "2026-07-31T07:13:12.275Z",
    updated_at: "2026-07-31T07:13:12.275Z",
  },
  {
    id: 2,
    title: "مقاله‌ای خواندنی درباره تاریخچه و اصالت کرمان",
    slug: "kerman-history-article",
    excerpt: "گذری بر اصالت تاریخی و جاذبه‌های باستانی منطقه کرمان و نقش مواصلاتی دهکده گل‌ها به عنوان یکی از ریه‌های تفریحی منطقه.",
    body: `<p>کرمان با قدمت دیرینه خود همواره مهد فرهنگ و معماری اصیل ایرانی بوده است...</p>`,
    category: "طراحی",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "مدیر روابط عمومی",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100",
    readingTime: "۵ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    is_featured: true,
    view_count: 210,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
    updated_at: "2026-07-31T07:13:12.275Z",
  },
  {
    id: 3,
    title: "همه چیز درباره شرایط ساخت‌وساز در هفت باغ",
    slug: "seven-gardens-standards",
    excerpt: "بررسی آخرین مصوبات شورا درباره ضوابط تراکم، ارتفاع، حریم فضای سبز و رعایت اصول مینی‌مال در معماری ویلاهای جدید.",
    body: `<p>ضوابط جدید ساخت‌وساز با هدف حفظ یکدستی بصری و تراکم استاندارد زون‌های مسکونی ابلاغ گردید...</p>`,
    category: "اخبار دهکده",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "مدیر فنی",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
    readingTime: "۴ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    is_featured: true,
    view_count: 512,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
    updated_at: "2026-07-31T07:13:12.275Z",
  },
  {
    id: 4,
    title: "نصب سیستم‌های امنیتی و حراستی هوشمند در زون ۲",
    slug: "security-systems-installation",
    excerpt: "راهنمای هماهنگ‌سازی دزدگیرهای شخصی ویلاها با اتاق کنترل حراست دهکده و استفاده از تجهیزات حفاظتی تایید شده.",
    body: `<p>ارتقای ضریب امنیت دهکده با نصب دوربین‌های پلاک‌خوان در ورودی‌های اصلی آغاز شد...</p>`,
    category: "مشاوره",
    date: "۱۴۰۲/۰۵/۱۰",
    author: "مدیر حراست",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100",
    readingTime: "۳ دقیقه مطالعه",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    is_featured: false,
    view_count: 189,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
    updated_at: "2026-07-31T07:13:12.275Z",
  },
];

// ۲. ماک دیتای اطلاعیه‌ها (Announcements)
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "قطع موقت آب شرب در زون غربی به دلیل تعمیرات زیرساختی",
    slug: "water-outage-notice",
    excerpt: "به اطلاع ساکنین محترم زون ۲ می‌رساند فردا چهارشنبه از ساعت ۹ الی ۱۳ آب جهت ارتقای شبکه قطعی موقت خواهد داشت.",
    category: "بحران",
    date: "۱۴۰۲/۰۵/۱۰",
    is_emergency: true, // نمایش در آلرت بنر بالای هدر
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
  },
  {
    id: 2,
    title: "آغاز عملیات آسفالت‌ریزی و لکه‌گیری معابر اصلی زون ۱",
    slug: "asphalt-renovation-zone-1",
    excerpt: "عملیات بهسازی آسفالت بلوار زنبق از روز شنبه آغاز شده و مسیرهای جایگزین جهت تردد خودروها مشخص گردیده است.",
    category: "عمرانی",
    date: "۱۴۰۲/۰۵/۱۰",
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
    date: "۱۴۰۲/۰۵/۱۰",
    is_emergency: false,
    is_published: true,
    created_at: "2026-07-31T07:13:12.275Z",
  },
];

// ۳. ماک دیتای رویدادها (Events)
export const MOCK_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "جشنواره بزرگ گل‌های فصلی و نمایشگاه گیاهان زینتی دهکده",
    slug: "flower-festival-1405",
    excerpt: "برگزاری بزرگ‌ترین نمایشگاه گل و گیاهان زینتی به همراه کارگاه‌های آموزشی نگهداری برای ساکنین محترم.",
    body: "<p>این جشنواره با هدف معرفی گونه‌های بومی سازگار با اقلیم کرمان برگزار می‌شود...</p>",
    date_display: "هر روز تا یکشنبه ۱۰ مرداد - ساعت ۱۷ الی ۲۲",
    location: "باغ مرکزی دهکده گل‌ها - زون تفریحی",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    status: "ongoing", // در حال برگزاری
    is_published: true,
  },
  {
    id: 2,
    title: "مسابقات دوچرخه‌سواری خانوادگی زون غربی",
    slug: "family-cycling-match",
    excerpt: "رقابت پرنشاط دوچرخه‌سواری ویژه ساکنین دهکده در جاده تندرستی به همراه اهدای جوایز ارزنده.",
    body: "<p>مسابقات در دو رده سنی بزرگسالان و کودکان برگزار می‌شود...</p>",
    date_display: "جمعه ۱۵ مرداد ساعت ۸:۰۰ صبح",
    location: "جاده سلامت - ورودی زون غربی",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    status: "upcoming", // آتی
    is_published: true,
  },
  {
    id: 3,
    title: "نشست هم‌اندیشی سالانه مالکین و هیئت‌مدیره دهکده گل‌ها",
    slug: "annual-owners-meeting",
    excerpt: "مجمع عمومی سالانه جهت بررسی ترازنامه مالی و تصمیم‌گیری درباره ارتقای امنیت معابر.",
    body: "<p>نشست سالانه با حضور اکثریت اعضای هیئت‌مدیره برگزار شد...</p>",
    date_display: "جمعه ۲۶ تیرماه ساعت ۱۰:۰۰ صبح",
    location: "سالن اجتماعات شورا - ساختمان اداری",
    image: "https://images.unsplash.com/photo-1558904541-efa8c3a30fc9?auto=format&fit=crop&q=80&w=800",
    status: "past", // برگزار شده
    is_published: true,
  },
];