import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Announcement } from "@/types/announcement";
import { MOCK_ANNOUNCEMENTS } from "@/lib/mock-data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.176.114.121:8001/api/v1";

async function fetchSingleAnnouncementFromApi(slug: string): Promise<{ data: Announcement | null; error: string | null }> {
  const encodedSlug = encodeURIComponent(slug);
  const url = `${API_BASE}/cms/announcements/${encodedSlug}/`;

  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (res.ok) {
      const data: Announcement = await res.json();
      if (data && data.slug) return { data, error: null };
    }
  } catch (err) {
    console.warn(`⚠️ [حالت دمو] لود تکی اطلاعیه ${slug} از دیتای ماک.`);
  }

  // سوئیچ خودکار به اطلاعیه ماک
  const found = MOCK_ANNOUNCEMENTS.find((item) => item.slug === slug) || MOCK_ANNOUNCEMENTS[0];
  return { data: found, error: null };
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SingleAnnouncementPage(props: PageProps) {
  const { slug } = await props.params;
  const { data: item, error } = await fetchSingleAnnouncementFromApi(slug);

  if (!error && !item) {
    notFound();
  }

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28 max-w-[1000px] mx-auto">
        {item && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-dark/10 shadow-sm text-right space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-dark/10 pb-6">
              <span className="text-xs font-extrabold px-3.5 py-1 rounded-full text-primary bg-primary/10">
                {item.category}
              </span>
              <span className="text-xs text-neutral-dark/40 font-bold">تاریخ ثبت: {item.date}</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-neutral-dark leading-snug tracking-tight">
              {item.title}
            </h1>

            <div className="p-6 bg-neutral-bg/50 rounded-2xl border border-neutral-dark/5 text-xs md:text-sm font-semibold leading-relaxed text-neutral-dark/80 text-justify">
              {item.excerpt}
            </div>

            <div className="pt-6 border-t border-neutral-dark/10 flex justify-between items-center text-xs font-bold">
              <Link href="/announcements" className="text-primary hover:underline">
                ← بازگشت به لیست اطلاعیه‌ها
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}