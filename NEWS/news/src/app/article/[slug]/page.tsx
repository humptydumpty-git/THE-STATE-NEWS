import Image from "next/image";
import Link from "next/link";
import SocialShareButtons from "@/components/SocialShareButtons";
import { fetchArticleBySlug, fetchAllArticleSlugs } from "@/lib/sanityQueries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await fetchArticleBySlug(params.slug);
  if (!article) return <div className="mx-auto max-w-3xl px-4 py-6">Not found</div>;
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Link href="/" className="underline">Home</Link>
      <h1 className="mt-2 text-3xl font-bold">{article.title}</h1>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {article.author?.name} {article.publishedAt && `• ${new Date(article.publishedAt).toLocaleDateString()}`}
      </div>
      {article.mainImageUrl && (
        <div className="relative mt-6 h-72 w-full">
          <Image src={article.mainImageUrl} alt={article.title} fill className="object-cover" />
        </div>
      )}
      <div className="prose prose-zinc dark:prose-invert mt-6 max-w-none">
        {article.excerpt && <p>{article.excerpt}</p>}
      </div>
      <div className="mt-6">
        <SocialShareButtons url={url} title={article.title} />
      </div>
    </div>
  );
}

