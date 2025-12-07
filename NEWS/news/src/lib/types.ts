export type Category = {
  _id: string;
  slug: string;
  title: string;
};

export type Author = {
  _id: string;
  name: string;
  avatarUrl?: string;
};

export type Article = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body?: unknown;
  mainImageUrl?: string;
  category?: Category;
  author?: Author;
  publishedAt?: string;
};
