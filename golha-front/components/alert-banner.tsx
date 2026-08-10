import { Announcement } from "@/types/announcement";
import { MOCK_ANNOUNCEMENTS } from "@/lib/mock-data";
import AlertBannerClient from "./alert-banner-client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://10.176.114.121:8001/api/v1";

async function fetchLatestAnnouncementFromApi(): Promise<Announcement | null> {
  const url = `${API_BASE}/cms/announcements/latest/`;

  try {
    const res = await fetch(url, { next: { revalidate: 10 } });
    if (res.ok) {
      const data: Announcement = await res.json();
      return data;
    }
  } catch (err) {
    // سوئیچ خودکار به اطلاعیه اضطراری ماک در صورت آفلاین بودن بک‌بند
    console.warn("⚠️ [حالت دمو] لود اطلاعیه اضطراری ماک آفلاین.");
  }

  // بازگرداندن اطلاعیه اضطراری از فایل ماک
  return MOCK_ANNOUNCEMENTS.find(item => item.is_emergency) || MOCK_ANNOUNCEMENTS[0];
}

export default async function AlertBanner() {
  const announcement = await fetchLatestAnnouncementFromApi();
  if (!announcement || !announcement.is_emergency) return null;
  return <AlertBannerClient announcement={announcement} />;
}