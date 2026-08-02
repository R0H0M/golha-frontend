import { Announcement } from "@/types/announcement";
import AlertBannerClient from "./alert-banner-client";


// ==========================================
// فراخوانی آخرین اطلاعیه دیتابیس با اولویت اضطراری ها از API واقعی بک‌بند
// ==========================================


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.73.183.121:8000/api/v1";

async function fetchLatestAnnouncementFromApi(): Promise<Announcement | null> {
  // تراز دقیق مسیر بر اساس متغیر محیطی جدید شما
  const url: string = `${API_BASE}/cms/announcements/latest/`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      return null;
    }

    const data: Announcement = await res.json();
    return data;

  } catch (err: unknown) {
    console.error("[آلرت بنر] خطا در برقراری ارتباط با دیتابیس:", err);
    return null;
  }
}

export default async function AlertBanner() {
  const announcement = await fetchLatestAnnouncementFromApi();

  // امنیت بصری: بنر بالای هدر فقط و فقط در صورتی نمایش داده می‌شود که:
  // ۱. اطلاعیه‌ای در دیتابیس وجود داشته باشد.
  // ۲. فیلد is_emergency آن برابر با true (بحران/اضطراری) باشد.
  if (!announcement || !announcement.is_emergency) {
    return null;
  }

  // پاس دادن دیتای تایید شده به کامپوننت فرعی کلاینت جهت لود انیمیشن‌ها
  return <AlertBannerClient announcement={announcement} />;
}