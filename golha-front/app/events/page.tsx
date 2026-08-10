import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_EVENTS } from "@/lib/mock-data";

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  date_display: string;
  location: string;
  image: string;
  status: "ongoing" | "upcoming" | "past";
  is_published: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.176.114.121:8001/api/v1";

async function fetchEventsFromApi(): Promise<{ data: EventItem[] | null; error: string | null }> {
  const url = `${API_BASE}/cms/events/`;

  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (res.ok) {
      const data: EventItem[] = await res.json();
      if (Array.isArray(data)) {
        return { data: data.filter((item) => item.is_published), error: null };
      }
    }
  } catch (err) {
    console.warn("⚠️ [حالت دمو] اتصال به بک‌بند برقرار نشد. دیتای ماک رویدادها لود شد.");
  }

  // سوئیچ خودکار به رویدادهای ماک
  return { data: MOCK_EVENTS.filter((item) => item.is_published), error: null };
}

function getCorrectImageUrl(imagePath: string | undefined | null, fallbackUrl: string): string {
  if (!imagePath) return fallbackUrl;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
  const domain = API_BASE.replace("/api/v1", "");
  const correctedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${domain}${correctedPath}`;
}

export default async function EventsPage() {
  const { data: events, error } = await fetchEventsFromApi();

  const ongoingEvents = events ? events.filter((item) => item.status === "ongoing") : [];
  const upcomingEvents = events ? events.filter((item) => item.status === "upcoming") : [];
  const pastEvents = events ? events.filter((item) => item.status === "past") : [];

  return (
    <section className="w-full bg-[#f4f8fb] py-16 md:py-24">
      <div className="w-full px-4 lg:px-28">
        
        <div className="mb-12 border-b border-neutral-dark/10 pb-8 text-right">
          <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">گاه‌شمار برنامه‌های تفریحی و فرهنگی</span>
          <h1 className="text-3xl md:text-5xl font-black text-neutral-dark tracking-tight leading-tight">رویدادها و مناسبت‌های دهکده</h1>
        </div>

        {error ? (
          <div className="bg-white rounded-3xl p-8 text-right">
            <h3 className="font-extrabold text-lg text-accent-ochre">{error}</h3>
          </div>
        ) : (
          events && (
            <div className="space-y-16">

              {/* رویدادهای در حال اجرا */}
              {ongoingEvents.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#e3725b] font-black select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-ochre animate-pulse" />
                    <h2 className="text-lg md:text-xl tracking-tight">رویدادهای در حال برگزاری</h2>
                  </div>

                  {ongoingEvents.slice(0, 1).map((event) => {
                    const correctedImg = getCorrectImageUrl(event.image, "https://images.unsplash.com/photo-1584132967334-10e028bd69f7");
                    return (
                      <div key={event.id} className="bg-white rounded-3xl overflow-hidden border border-neutral-dark/10 shadow-sm flex flex-col lg:flex-row w-full h-auto lg:h-[380px] group select-none">
                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-between text-right">
                          <div className="space-y-4">
                            <span className="inline-flex items-center text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full bg-accent-ochre/10 text-accent-ochre animate-pulse">
                              ● در حال برگزاری زنده
                            </span>
                            <Link href={`/events/${event.slug}`}>
                              <h3 className="text-xl md:text-3xl font-black text-neutral-dark hover:text-primary transition-colors leading-snug">{event.title}</h3>
                            </Link>
                            <p className="text-xs md:text-sm font-bold text-neutral-dark/50 leading-relaxed text-justify line-clamp-3">{event.excerpt}</p>
                          </div>

                          <div className="border-t border-neutral-dark/5 pt-5 mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-neutral-dark/50">
                            <span className="flex items-center gap-1.5 text-primary">📍 {event.location}</span>
                            <span>📅 {event.date_display}</span>
                            <Link href={`/events/${event.slug}`} className="text-primary hover:underline font-black flex items-center gap-1">
                              ورود به رویداد →
                            </Link>
                          </div>
                        </div>

                        <div className="relative w-full lg:w-3/5 h-64 lg:h-full overflow-hidden shrink-0">
                          <Image src={correctedImg} alt={event.title} fill={true} sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-103" priority={true} unoptimized={true} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* رویدادهای آتی */}
              {upcomingEvents.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary font-black select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <h2 className="text-lg md:text-xl tracking-tight">رویدادهای آینده و پیش‌رو</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, idx) => {
                      const correctedImg = getCorrectImageUrl(event.image, "https://images.unsplash.com/photo-1541888946425-d81bb19240f5");
                      return (
                        <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-neutral-dark/10 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-[420px] group select-none">
                          <div className="relative h-48 w-full overflow-hidden shrink-0">
                            <Image src={correctedImg} alt={event.title} fill={true} sizes="(max-width: 768px) 100vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized={true} />
                            <span className="absolute top-4 right-4 bg-accent-gold text-neutral-dark text-[10px] font-black py-1.5 px-3 rounded-lg shadow-sm z-10">{event.date_display}</span>
                          </div>

                          <div className="p-6 md:p-8 flex-grow flex flex-col justify-between text-right">
                            <div className="space-y-2.5">
                              <Link href={`/events/${event.slug}`}>
                                <h3 className="text-base md:text-lg font-black text-neutral-dark group-hover:text-primary transition-colors line-clamp-2 leading-snug">{event.title}</h3>
                              </Link>
                              <p className="text-[11px] md:text-xs font-bold text-neutral-dark/50 leading-relaxed line-clamp-3">{event.excerpt}</p>
                            </div>

                            <div className="border-t border-neutral-dark/5 pt-4 mt-4 flex items-center justify-between text-[11px] md:text-xs text-neutral-dark/45 font-bold">
                              <span className="flex items-center gap-1">📍 {event.location}</span>
                              <Link href={`/events/${event.slug}`} className="text-primary hover:underline font-extrabold flex items-center gap-1">
                                اطلاعات بیشتر →
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* رویدادهای برگزار شده */}
              {pastEvents.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-neutral-dark/50 font-black select-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-dark/30" />
                    <h2 className="text-lg md:text-xl tracking-tight">رویدادهای پایان‌یافته و آرشیو</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastEvents.map((event, idx) => {
                      const correctedImg = getCorrectImageUrl(event.image, "https://images.unsplash.com/photo-1558904541-efa8c3a30fc9");
                      return (
                        <div key={idx} className="bg-white rounded-3xl p-5 border border-neutral-dark/10 shadow-sm flex items-center gap-5 group/past cursor-pointer select-none">
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-neutral-light/10 shrink-0 filter grayscale group-hover/past:grayscale-0 transition-all duration-500">
                            <Image src={correctedImg} alt={event.title} fill={true} sizes="100px" className="object-cover" unoptimized={true} />
                          </div>

                          <div className="flex-grow flex flex-col justify-between text-right h-24 py-1">
                            <div className="space-y-1">
                              <h3 className="text-sm md:text-base font-extrabold text-neutral-dark/70 group-hover/past:text-primary transition-colors line-clamp-1">{event.title}</h3>
                              <p className="text-[10px] md:text-xs font-semibold text-neutral-dark/40 leading-relaxed line-clamp-2">{event.excerpt}</p>
                            </div>

                            <div className="flex items-center justify-between text-[10px] md:text-xs text-neutral-dark/40 font-bold border-t border-neutral-dark/5 pt-2">
                              <span>📅 برگزاری در: {event.date_display}</span>
                              <span className="text-neutral-dark/30 font-black">✓ خاتمه یافته</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )
        )}

      </div>
    </section>
  );
}