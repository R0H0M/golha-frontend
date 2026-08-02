export interface CmsPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  author: string;
  authorAvatar: string;
  readingTime: string;
  image: string;
  is_featured: boolean;
  view_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}