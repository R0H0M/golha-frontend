import Image from "next/image";
import AnimatedCounter from "@/components/animated-counter";

export default function VillageIntroduction() {
  return (
    // پس‌زمینه سفید یکدست برای افزایش کنتراست
    <section className="w-full bg-white py-16 md:py-24 border-b border-neutral-light/20">
      <div className="w-full px-4 lg:px-28 flex flex-col items-center">
        
        {/* عنوان بخش معرفی */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark text-center mb-16 tracking-tight">
          شناخت دهکده گل‌ها
        </h2>

        {/* چیدمان نامتقارن بنتو گرید */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1200px]">
          
          {/* ================= کارت ۱ (معرفی متنی - عرض ۲ ستون) ================= */}
          <div className="relative md:col-span-2 bg-neutral-bg rounded-3xl p-8 flex flex-col md:flex-row justify-between gap-8 border border-neutral-light/25 overflow-hidden">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-5 select-none">
                  معرفی دهکده
                </span>
                <h3 className="text-xl md:text-2xl font-black text-neutral-dark mb-4 leading-tight">
                  گل‌ها، نگین کرمان
                </h3>
                <p className="text-xs md:text-sm text-neutral-dark/70 leading-relaxed font-semibold text-justify">
                  دهکده گل‌ها در سال ۱۳۹۲ با خرید پلاک، تفکیک آن به ۷ بخش تحت مدیریت مالکین آغاز به کار نمود. این پروژه با همیاری ساکنین توانست مصوبه شورا به شماره ۲۲۲۱ را دریافت کرده و به عنوان یکی از منسجم‌ترین مناطق تفریحی کرمان پایه‌گذاری شود.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-light/30 flex gap-4 text-xs font-bold text-primary">
                <span>• مسکونی و اقامتی</span>
                <span>• منطقه نمونه جنوب شرق</span>
              </div>
            </div>
            
            {/* تصویر اول: غروب آفتاب گرم و مینی‌مال ویلا هماهنگ با تم سایت فعلی شما */}
            <div className="relative w-full md:w-2/5 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"
                alt="نمای ویلای دهکده در غروب"
                fill={true}
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* ================= کارت ۲ (آمارهای کلیدی انیمیشنی - عرض ۱ ستون) ================= */}
          <div className="relative md:col-span-1 bg-primary text-white rounded-3xl p-8 flex flex-col justify-between border border-primary/20 shadow-sm">
            <span className="text-xs font-bold text-accent-gold select-none">شاخص‌های توسعه دهکده</span>
            
            {/* لیست آمارهای کلیدی با شمارنده‌های متحرک بهینه */}
            <div className="space-y-6 my-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <span className="text-xs font-bold text-white/70">تعداد کل پروژه‌ها</span>
                <span className="text-2xl font-black text-accent-gold tracking-tight">
                  <AnimatedCounter target={500} prefix="+" />
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <span className="text-xs font-bold text-white/70">تعداد مالکین و ساکنین</span>
                <span className="text-2xl font-black text-accent-gold tracking-tight">
                  <AnimatedCounter target={1000} prefix="+" />
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/15 pb-2">
                <span className="text-xs font-bold text-white/70">ضریب امنیت و حراست</span>
                <span className="text-2xl font-black text-accent-gold tracking-tight">
                  <AnimatedCounter target={100} suffix="%" />
                </span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-white/70">تأمین پایدار آب شرب</span>
                <span className="text-2xl font-black text-accent-gold tracking-tight">
                  <AnimatedCounter target={100} suffix="%" />
                </span>
              </div>
            </div>

            <p className="text-[10px] text-white/50 leading-relaxed font-semibold">
              آمارهای فوق بر اساس آخرین ترازنامه و سرشماری عمومی زون‌های دهکده گل‌ها بروزرسانی شده است.
            </p>
          </div>

          {/* ================= کارت ۳ (نشان‌ها و هویت - عرض ۱ ستون) ================= */}
          <div className="relative md:col-span-1 bg-[#f5e2c1] text-[#414042] rounded-3xl p-8 flex flex-col justify-between border border-[#E8D1AE] shadow-sm">
            <span className="text-xs font-extrabold text-primary select-none">اصالت و اعتبار منطقه</span>
            
            <div className="space-y-4 my-6">
              <div className="flex items-start gap-2.5">
                <span className="text-accent-ochre text-lg font-black">•</span>
                <p className="text-xs font-extrabold leading-relaxed text-neutral-dark/85">منطقه نمونه گردشگری و تفریحی جنوب شرق کشور</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-accent-ochre text-lg font-black">•</span>
                <p className="text-xs font-extrabold leading-relaxed text-neutral-dark/85">بیش از ۲۱ سال همراهی و حاکمیت مالکین</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-accent-ochre text-lg font-black">•</span>
                <p className="text-xs font-extrabold leading-relaxed text-neutral-dark/85">ویلاهای مدرن مسکونی و اقامتی تراز اول</p>
              </div>
            </div>

            <span className="text-[11px] font-black text-primary/70 leading-none">
              دهکده گل‌ها؛ جایی برای بودن.
            </span>
          </div>

          {/* ================= کارت ۴ (تصویر پهن پانوراما با تم جنگل غروب - عرض ۲ ستون) ================= */}
          <div className="relative md:col-span-2 h-64 md:h-auto min-h-[220px] rounded-3xl overflow-hidden border border-neutral-light/25 shadow-sm">
            {/* تصویر دوم: جنگلی با انوار غروب گرم خاکی هماهنگ با تصاویر سایت شما */}
            <Image
              src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200"
              alt="طبیعت و فضاهای سبز دهکده"
              fill={true}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B110B]/60 via-transparent to-transparent z-10" />
            <span className="absolute bottom-6 right-6 z-20 text-xs font-extrabold text-white/90 select-none">
              نمایی از پوشش گیاهی و توسعه فضای سبز زون‌های غربی دهکده
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}