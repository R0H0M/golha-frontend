export interface Announcement {
  id: number;
  title: string;
  excerpt: string;
  category: "بحران" | "عمرانی" | "رویداد" | "عمومی"; // دسته‌بندی‌های استاندارد دهکده
  date: string;
  slug: string;
  is_emergency: boolean;
  created_at: string;
}