import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { fetchArticlesByCategorySlug, fetchAllCategorySlugs } from "@/lib/sanityQueries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchAllCategorySlugs();
  return slugs.map((slug) => ({ category: slug }));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const articles = await fetchArticlesByCategorySlug(params.category);
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold capitalize">{params.category}</h1>
        <Link href="/" className="underline">Home</Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard
            key={a._id}
            title={a.title}
            excerpt={a.excerpt}
            image={a.mainImageUrl ? { src: a.mainImageUrl, alt: a.title } : undefined}
            href={`/article/${a.slug}`}
            category={a.category?.title}
            author={a.author?.name}
            date={a.publishedAt}
          />
        ))}
      </div>
      {articles.length === 0 && <div>No articles</div>}
    </div>
  );
}

