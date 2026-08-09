// types/announcement.ts
export interface Announcement {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  category: string;
  created_at?: string;
  is_emergency: boolean;
  is_published: boolean;
}