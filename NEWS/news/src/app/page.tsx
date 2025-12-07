import HeaderNav from "@/components/HeaderNav";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import { fetchLatestArticles, fetchCategories } from "@/lib/sanityQueries";

export const revalidate = 60;

export default async function Home() {
  const [articles, categories] = await Promise.all([fetchLatestArticles(), fetchCategories()]);
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <HeaderNav links={categories.map((c) => ({ href: `/${c.slug}`, label: c.title }))} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="mb-4 text-2xl font-bold">Latest Articles</h1>
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

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Subscribe to our newsletter</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Get the latest articles in your inbox.</p>
          <div className="mt-3">
            <NewsletterSubscription />
          </div>
        </div>
      </main>
    </div>
  );
}
