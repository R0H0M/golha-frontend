// types/cms.ts
export interface CmsPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  body: string;
  category?: string;
  created_at?: string;
  author: string;
  author_avatar: string;
  reading_time: string;
  image?: string;
  is_featured: boolean;
  is_published: boolean;
}