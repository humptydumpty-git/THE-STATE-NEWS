import { sanityClient } from "./sanityClient";
import type { Article, Category } from "./types";

export async function fetchLatestArticles(): Promise<Article[]> {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "article"]|order(publishedAt desc)[0...12]{
        _id,
        "slug": slug.current,
        title,
        excerpt,
        publishedAt,
        "mainImageUrl": mainImage.asset->url,
        category->{_id, title, "slug": slug.current},
        author->{_id, name}
      }`
    );
    return data as Article[];
  } catch {
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "category"]|order(title asc){_id, title, "slug": slug.current}`
    );
    return data as Category[];
  } catch {
    return [];
  }
}

export async function fetchArticlesByCategorySlug(slug: string): Promise<Article[]> {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "article" && category->slug.current == $slug]|order(publishedAt desc){
        _id,
        "slug": slug.current,
        title,
        excerpt,
        publishedAt,
        "mainImageUrl": mainImage.asset->url,
        category->{_id, title, "slug": slug.current},
        author->{_id, name}
      }`,
      { slug }
    );
    return data as Article[];
  } catch {
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await sanityClient.fetch(
      `*[_type == "article" && slug.current == $slug][0]{
        _id,
        "slug": slug.current,
        title,
        excerpt,
        body,
        publishedAt,
        "mainImageUrl": mainImage.asset->url,
        category->{_id, title, "slug": slug.current},
        author->{_id, name}
      }`,
      { slug }
    );
    return (data || null) as Article | null;
  } catch {
    return null;
  }
}

export async function fetchAllArticleSlugs(): Promise<string[]> {
  try {
    const data = await sanityClient.fetch(`*[_type == "article"].slug.current`);
    return data as string[];
  } catch {
    return [];
  }
}

export async function fetchAllCategorySlugs(): Promise<string[]> {
  try {
    const data = await sanityClient.fetch(`*[_type == "category"].slug.current`);
    return data as string[];
  } catch {
    return [];
  }
}

