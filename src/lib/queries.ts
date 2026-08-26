import { createClient } from "@/lib/supabase/server";
import { categoryToSlug, ALL_CATEGORY_LABEL, ALL_CATEGORY_SLUG } from "@/lib/constants";
import type { Article, CategorySummary, GalleryItem } from "@/lib/types";

export async function getCategories(): Promise<CategorySummary[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("category, image_url")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  const map = new Map<string, CategorySummary>();
  for (const row of data) {
    const slug = categoryToSlug(row.category);
    if (!map.has(slug)) {
      map.set(slug, {
        name: row.category,
        slug,
        image_url: row.image_url,
        count: 1,
      });
    } else {
      map.get(slug)!.count += 1;
    }
  }

  const categories = Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const allThumbnail = data[0]?.image_url ?? "";

  return [
    {
      name: ALL_CATEGORY_LABEL,
      slug: ALL_CATEGORY_SLUG,
      image_url: allThumbnail,
      count: data.length,
    },
    ...categories,
  ];
}

interface GetArticlesParams {
  categorySlug?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getArticles({
  categorySlug,
  search,
  page = 1,
  pageSize = 8,
}: GetArticlesParams): Promise<{ articles: Article[]; total: number; categoryName: string | null }> {
  const supabase = createClient();

  let query = supabase.from("articles").select("*", { count: "exact" });

  let categoryName: string | null = null;

  if (categorySlug && categorySlug !== ALL_CATEGORY_SLUG) {
    // Kita perlu tahu nama kategori asli dari slug-nya
    const { data: catRows } = await supabase.from("articles").select("category");
    const match = catRows?.find((r) => categoryToSlug(r.category) === categorySlug);
    if (match) {
      categoryName = match.category;
      query = query.eq("category", match.category);
    }
  }

  if (search && search.trim().length > 0) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%`
    );
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  query = query.order("published_at", { ascending: false }).range(from, to);

  const { data, error, count } = await query;

  if (error || !data) return { articles: [], total: 0, categoryName };

  return { articles: data as Article[], total: count ?? 0, categoryName };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Article;
}

export async function getRelatedArticles(
  category: string,
  excludeSlug: string,
  limit = 4
): Promise<Article[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  return (data as Article[]) ?? [];
}

export async function getLatestArticles(limit = 8): Promise<Article[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  return (data as Article[]) ?? [];
}

export async function getOtherArticles(excludeSlug: string, limit = 4): Promise<Article[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  return (data as Article[]) ?? [];
}

export async function getGallery(page = 1, pageSize = 9): Promise<{ items: GalleryItem[]; total: number }> {
  const supabase = createClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("gallery")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error || !data) return { items: [], total: 0 };
  return { items: data as GalleryItem[], total: count ?? 0 };
}

export async function getGalleryPreview(limit = 6): Promise<GalleryItem[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data as GalleryItem[]) ?? [];
}
