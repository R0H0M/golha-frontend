import Link from "next/link";

const MAIN_LINKS = [
  { name: "پرتال اختصاصی مالکین", href: "/owners" },
  { name: "منطقه نمونه گردشگری", href: "/about" },
  { name: "امور مشترکین و خدمات", href: "/services" },
];

const SECONDARY_LINKS = [
  { name: "درباره دهکده", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
  { name: "اخبار و اطلاعیه‌ها", href: "/cms" },
  { name: "قوانین و بخش حقوقی", href: "/about/legal" },
  { name: "تاریخچه دهکده", href: "/about/history" },
  { name: "نقشه تعاملی پلاک‌ها", href: "/services/map" },
];

export default function Footer() {
  return (
    // کاهش پدینگ عمودی از py-16 md:py-20 به py-10 md:py-12 برای ظرافت بیشتر
    <footer className="w-full bg-[#121212] text-white py-10 md:py-12 border-t border-white/5 select-none">
      <div className="w-full px-4 lg:px-28 flex flex-col items-center justify-center text-center">
        
        {/* ۱. لوگوی متنی مینی‌مال با مارجین بهینه‌شده (mb-5) */}
        <Link href="/" className="mb-5 block group">
          <span className="font-black text-xl md:text-2xl text-white tracking-widest flex items-center gap-1 transition-transform group-hover:scale-102">
            دهکده گل‌ها
            <span className="text-accent-gold text-xl">•</span>
          </span>
        </Link>

        {/* ۲. ردیف دوم: دسترسی‌های کلیدی با مارجین بهینه‌شده (mb-5) */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-5 text-xs md:text-sm font-extrabold tracking-wide text-white/90">
          {MAIN_LINKS.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className="hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ۳. خط تفکیک‌کننده عمودی با مارجین فشرده‌تر (my-3) */}
        <div className="w-full max-w-4xl border-t border-white/10 my-3" />

        {/* ۴. ردیف سوم: لینک‌های ثانویه ظریف با مارجین بهینه‌شده (mb-6) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-3 mb-6 text-[11px] md:text-xs font-bold text-white/50">
          {SECONDARY_LINKS.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className="hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ۵. ردیف چهارم: آیکون‌های دایره‌ای با مارجین بهینه‌شده (mb-8) */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300" aria-label="اینستاگرام">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300" aria-label="تلگرام">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.184 14.839l-1.843 8.706c-.139.615-.506.764-1.022.474l-2.808-2.068-1.353 1.302c-.149.149-.276.276-.566.276l.201-2.859 5.204-4.7c.226-.201-.049-.313-.35-.112l-6.433 4.049-2.771-.867c-.602-.189-.615-.602.126-.892l10.824-4.173c.501-.184.94.115.736.139z"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300" aria-label="لینکدین">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300" aria-label="توییتر">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>

        {/* ۶. ردیف پنجم: کپی‌رایت با قلم مینی‌مال */}
        <div className="text-[10px] md:text-xs text-white/35 font-bold space-y-1.5">
          <div className="flex items-center justify-center gap-3">
            <Link href="/terms" className="hover:text-white transition-colors duration-300">شرایط و قوانین استفاده</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">حریم خصوصی مالکین</Link>
          </div>
          <p className="tracking-wide leading-relaxed">
            تمامی حقوق مادی، معنوی و مالکیتی این پورتال متعلق به مجموعه نمونه گردشگری دهکده گل‌های کرمان می‌باشد. ۱۴۰۵ ©
          </p>
        </div>

      </div>
    </footer>
  );
}