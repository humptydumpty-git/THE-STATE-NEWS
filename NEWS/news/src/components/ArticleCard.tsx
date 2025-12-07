import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  excerpt?: string;
  image?: { src: string; alt?: string; width?: number; height?: number };
  href: string;
  category?: string;
  author?: string;
  date?: string;
};

export default function ArticleCard({ title, excerpt, image, href, category, author, date }: Props) {
  return (
    <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {image?.src && (
        <Link href={href}>
          <div className="relative h-48 w-full">
            <Image
              src={image.src}
              alt={image.alt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </Link>
      )}
      <div className="p-4">
        <div className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
          {category}
        </div>
        <Link href={href} className="block">
          <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        </Link>
        {excerpt && <p className="mt-2 text-zinc-700 dark:text-zinc-300">{excerpt}</p>}
        <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          {author} {date && `• ${new Date(date).toLocaleDateString()}`}
        </div>
      </div>
    </article>
  );
}

