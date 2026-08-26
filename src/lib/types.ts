export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  image_url: string;
  description: string;
  published_at: string; // ISO date
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export interface CategorySummary {
  name: string;
  slug: string;
  image_url: string;
  count: number;
}
