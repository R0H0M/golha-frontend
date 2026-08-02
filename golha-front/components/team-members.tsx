import Image from "next/image";

// آرایه دیتای اعضای تیم منطبق بر سایت فعلی شما به همراه توضیحات متناسب با پورتال رسمی
const TEAM_MEMBERS = [
  {
    name: "مهندس محمد اسکندری",
    role: "مدیرعامل، رئیس هیئت مدیره و مدیر فنی دهکده",
    desc: "مدیریت ارشد اجرایی، برنامه‌ریزی استراتژیک و نظارت عالی بر توسعه زیرساخت‌های عمرانی دهکده گل‌ها.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500&h=650", // پرتره بیزینس مرد
  },
  {
    name: "دکتر حمیرا اسکندری",
    role: "نایب رئیس هیئت مدیره و مدیر حقوقی و امور سهامداران",
    desc: "مدیریت حقوقی، نظارت بر مشارکت‌های سرمایه‌گذاری و هماهنگ‌کننده گروه‌های عمرانی و گردشگری دهکده.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500&h=650", // پرتره بیزینس زن (مطابق عکس پورتال شما)
  },
  {
    name: "مهندس سعید زعیم",
    role: "مدیر گروه معماری و مسکن دهکده گل‌ها",
    desc: "طراحی، نظارت زیباشناختی و هدایت دپارتمان تخصصی معماری و ساخت‌وسازهای مسکونی زون‌ها.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500&h=650", // پرتره بیزینس مرد
  },
  {
    name: "سجاد ایوانمنش",
    role: "مدیر روابط عمومی و رسانه دهکده گل‌ها",
    desc: "مسئول ارتباطات مردمی، مدیریت پورتال اطلاع‌رسانی رسمی و هماهنگ‌کننده رویدادهای عمومی منطقه.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500&h=650", // پرتره بیزینس مرد
  },
];

export default function TeamMembers() {
  return (
    // بخش اعضا با پس‌زمینه کاملاً سفید و مینی‌مال جهت ایجاد حداکثر فضای خالی چشم‌نواز
    <section className="w-full bg-white py-16 md:py-24 border-b border-neutral-light/10">
      <div className="w-full px-4 lg:px-28 flex flex-col items-center">
        
        {/* عنوان بخش مینی‌مال به سبک پورتال‌های دولتی */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-dark text-center mb-2.5 tracking-tight">
          مدیریت و شورای توسعه دهکده گل‌ها
        </h2>
        
        <p className="text-sm text-neutral-dark/50 font-bold mb-16 text-center">
          مدیران و تصمیم‌گیران ارشد حوزه عمرانی، حقوقی و روابط عمومی منطقه نمونه گردشگری
        </p>

        {/* گرید ۴ ستونه متقارن بدون حاشیه‌های اضافی سنگین */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full max-w-[1300px]">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="flex flex-col group select-none">
              
              {/* کادر تصویر پرتره متحرک با لبه‌های گرد ظریف */}
              <div className="relative h-[340px] w-full rounded-2xl overflow-hidden bg-neutral-light/10 mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* نام عضو */}
              <h3 className="text-base md:text-lg font-extrabold text-neutral-dark text-right leading-tight">
                {member.name}
              </h3>

              {/* خط تفکیک‌کننده مینی‌مال که در حالت هاور به آبی کاربنی تغییر رنگ می‌دهد */}
              <span className="w-8 h-[3px] bg-neutral-dark/15 group-hover:bg-primary transition-colors duration-300 my-3 block rounded-full" />

              {/* عنوان شغلی (نقش مدیریتی) */}
              <span className="text-xs font-black text-primary leading-relaxed text-right mb-2.5 block">
                {member.role}
              </span>

              {/* توضیحات مسئولیت به رنگ خاکستری ظریف با کنتراست عالی */}
              <p className="text-[12px] md:text-xs font-bold text-neutral-dark/60 leading-relaxed text-right">
                {member.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}