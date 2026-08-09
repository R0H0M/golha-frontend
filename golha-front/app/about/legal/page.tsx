import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface LegalDocument {
  id: number;
  title: string;
  docNumber: string;
  approvalDate: string;
  authority: string;
  signatory: string;
  status: "لازم‌الاجرا" | "در حال بررسی" | "ابلاغ‌شده";
  summary: string;
  scannedImage: string;
  pdfUrl: string;
  relatedZones: string[];
  addressInfo: string;
}

// تنظیم دیتای واقعی استخراج‌شده مستقیم از نامه رسمی دادگستری
const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 1,
    title: "دستورالعمل الزام ثبت و تایپ الکترونیکی لوایح، گزارش‌ها و نظریات کارشناسی",
    docNumber: "شماره ابلاغیه: ۹۰۱/۸۵۸۹/۶۳۱",
    approvalDate: "۱۴۰۱/۰۷/۰۹",
    authority: "معاونت فناوری اطلاعات و برنامه‌ریزی دادگستری کل (پیرو بخشنامه ۹۰۱۸/۱۲۶۷/۶۳۱)",
    signatory: "علی‌اکبر شیرسوار (معاون قضایی رئیس کل دادگستری)",
    status: "لازم‌الاجرا",
    summary: "پیرو بررسی‌های صورت‌گرفته از سامانه خدمات الکترونیک قضایی، کلیه وکلا، کارشناسان رسمی و دفاتر خدمات مکلف هستند متن لایحه، گزارش و نظریه کارشناسی را مستقیماً در سامانه تایپ نموده و از اسکن کاغذی و پیوست تصویر خودداری نمایند.",
    scannedImage: "/legal.jpg", // عکس محلی قرار گرفته در پوشه public
    pdfUrl: "/docs/dadgostari-notice.pdf",
    relatedZones: ["دفاتر خدمات قضایی", "کانون وکلا و کارشناسان رسمی", "امور حقوقی دهکده"],
    addressInfo: "ساری - خیابان مازیار - ساختمان شهید بهشتی (www.dadgostari-mz.com)",
  },
];

export default function LegalPage() {
  return (
    <section className="w-full bg-[#f4f8fb] pt-20 pb-16 md:pt-16 md:pb-24">
      {/* پدینگ عریض هماهنگ با هدر ۶۴ پیکسلی بر روی px-28 */}
      <div className="w-full px-4 lg:px-28 space-y-16">
        
        {/* ۱. هدر مینی‌مال صفحه حقوقی */}
        <div className="border-b border-neutral-dark/10 pb-8 text-right">
          <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">
            شفافیت و پیگیری‌های قضایی
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-neutral-dark tracking-tight leading-tight">
            دستورالعمل‌ها و بخشنامه‌های حقوقی
          </h1>
          <p className="text-xs md:text-sm font-bold text-neutral-dark/50 mt-3 max-w-3xl leading-relaxed">
            آرشیو استعلامات رسمی، بخشنامه‌های قضایی و ابلاغیه‌های دادگستری مرتبط با امور حقوقی دهکده.
          </p>
        </div>

        {/* ۲. نمایش کارت بنتو اسپلیت حقوقی بر اساس نامه واقعی */}
        <div className="space-y-12">
          {LEGAL_DOCUMENTS.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white rounded-3xl p-6 md:p-10 border border-neutral-dark/10 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              
              {/* بخش راست (۸ ستون): توضیحات و مشخصات واقعی نامه */}
              <div className="lg:col-span-7 space-y-6 text-right">
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-secondary/10 text-secondary text-xs font-extrabold px-3.5 py-1 rounded-full">
                    ✓ {doc.status}
                  </span>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3.5 py-1 rounded-full">
                    {doc.docNumber}
                  </span>
                  <span className="text-xs font-bold text-neutral-dark/40 mr-auto">
                    تاریخ صدور: {doc.approvalDate}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-black text-neutral-dark leading-snug tracking-tight">
                  {doc.title}
                </h2>

                <p className="text-xs md:text-sm font-semibold text-neutral-dark/70 leading-relaxed text-justify">
                  {doc.summary}
                </p>

                {/* مرجع صادرکننده و امضاکننده واقعی */}
                <div className="bg-neutral-bg/60 rounded-2xl p-4 border border-neutral-dark/5 space-y-2 text-xs font-bold text-neutral-dark/60">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-black">• مرجع صادرکننده:</span>
                    <span>{doc.authority}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-black">• مقام امضاکننده:</span>
                    <span>{doc.signatory}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-black">• نشانی ثبت:</span>
                    <span>{doc.addressInfo}</span>
                  </div>
                </div>

                {/* دکمه‌های دانلود و اشتراک‌گذاری */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={doc.pdfUrl}
                    download
                    className="bg-primary hover:bg-primary-hover text-white text-xs md:text-sm font-bold py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    دانلود نسخه اصل ابلاغیه PDF
                  </a>

                  <button className="border border-neutral-dark/15 hover:bg-neutral-bg text-neutral-dark/80 text-xs md:text-sm font-bold py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.187a2.25 2.25 0 000 2.186m0-2.187l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 100-2.186m0 2.186a2.25 2.25 0 100-2.186" />
                    </svg>
                    اشتراک‌گذاری بخشنامه
                  </button>
                </div>

              </div>

              {/* بخش چپ (۵ ستون): پیش‌نمایش برگه اسکن‌شده اصل نامه */}
              <div className="lg:col-span-5 relative group">
                <div className="relative h-[340px] md:h-[420px] w-full rounded-2xl overflow-hidden border border-neutral-dark/15 shadow-sm bg-white p-2">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={doc.scannedImage}
                      alt={doc.title}
                      fill={true}
                      unoptimized={true} // عدم محدودیت آی‌پی و لود آنی
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-neutral-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-sm text-neutral-dark text-xs font-black py-2.5 px-5 rounded-xl shadow-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637zM10.5 7.5v6m3-3h-6" />
                        </svg>
                        مشاهده کامل اصل نامه اسکن‌شده
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ۳. بخش ارتباط مستقیم با دپارتمان حقوقی دهکده */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-neutral-dark/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-black text-neutral-dark border-r-4 border-accent-ochre pr-3 leading-none">
              نیازمند مشاوره یا پیگیری بخشنامه‌های قضایی هستید؟
            </h3>
            <p className="text-xs md:text-sm font-semibold text-neutral-dark/50">
              دپارتمان حقوقی دهکده گل‌ها آماده پاسخگویی و ارائه توضیحات تکمیلی درباره ابلاغیه‌های قضایی می‌باشد.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <div className="text-right text-xs font-bold text-neutral-dark/70 space-y-1 bg-neutral-bg/60 p-3.5 rounded-2xl border border-neutral-dark/5">
              <div>☎️ تلفن دفتر حقوقی: <span className="text-primary font-black dir-ltr">۰۳۴-۳۴۵۶۷۸۹</span></div>
              <div>✉️ ایمیل: <span className="text-primary font-black">legal@golhakerman.com</span></div>
            </div>

            <Link
              href="/contact"
              className="bg-secondary hover:bg-secondary-hover text-white text-xs md:text-sm font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm"
            >
              ثبت درخواست مشاوره
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}