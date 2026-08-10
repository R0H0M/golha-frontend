// types/admin.ts
import { CmsPost } from "./cms";
import { Announcement } from "./announcement";

export type TabType = "news" | "announcements" | "events" | "comments";
export type ViewType = "list" | "create" | "edit";

export type CmsItem = CmsPost | Announcement | EventItem;

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  body?: string;
  date_display: string;
  location?: string;
  status?: "ongoing" | "upcoming" | "past";
  image?: string;
  is_published: boolean;
}

export interface CommentItem {
  id: number;
  name: string;
  email: string;
  website?: string;
  comment: string;
  is_approved: boolean;
  article_title?: string;
  created_at: string;
}

export interface NewsFormData {
  title: string;
  slug: string;
  summary: string;
  body: string;
  category?: string;
  author: string;
  author_avatar: string;
  reading_time: string;
  image?: File | string | null; // ✅ پذیرش فایل و متن
  is_featured: boolean;
  is_published: boolean;
}

export interface AnnouncementFormData {
  title: string;
  slug: string;
  summary: string;
  content?: string;
  category: "بحران" | "عمرانی" | "رویداد" | "عمومی" | string;
  is_emergency: boolean;
  is_published: boolean;
}

export interface EventFormData {
  title: string;
  slug: string;
  summary: string;
  body: string;
  date_display: string;
  location: string;
  image?: File | string | null; // ✅ پذیرش فایل و متن
  is_published: boolean;
}

export interface StatusMessage {
  text: string;
  success: boolean;
}