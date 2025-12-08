This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Componentized UI: `HeaderNav`, `ArticleCard`, `SocialShareButtons`, `NewsletterSubscription`
- Dynamic routing: home, category pages (`/[category]`), article pages (`/article/[slug]`)
- CMS ready: Sanity client and GROQ queries with env-based configuration
- Image optimization: `next/image` with remote patterns for Sanity CDN
- Newsletter API: `POST /api/subscribe` stubbed, ready to integrate a provider

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CMS Setup (Sanity)

1. Create a Sanity project at https://www.sanity.io/ and note `projectId` and `dataset`.
2. Copy `.env.example` to `.env.local` and fill values:

```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2023-10-01
# SANITY_READ_TOKEN=optional_if_private_dataset
```

3. Add schemas (article, category, author) in a Sanity Studio (optional) and publish content.
4. Restart `npm run dev` to load envs.

Without envs, pages build and render with empty lists.

## Key Files

- `src/components/HeaderNav.tsx`: top navigation
- `src/components/ArticleCard.tsx`: article preview with optimized image
- `src/components/SocialShareButtons.tsx`: share links + copy
- `src/components/NewsletterSubscription.tsx`: newsletter form hitting `/api/subscribe`
- `src/lib/sanityClient.ts`: initializes Sanity client from env
- `src/lib/sanityQueries.ts`: GROQ queries for articles/categories
- `src/app/[category]/page.tsx`: category route with SSG
- `src/app/article/[slug]/page.tsx`: article route with SSG
- `next.config.ts`: image remote patterns for Sanity CDN

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
