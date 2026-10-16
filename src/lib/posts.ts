import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts are visible only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, '-');
}

export function postUrl(post: Post): string {
  return `/blog/${post.id}/`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' });
}

export function isoDate(date: Date): string {
  return date.toISOString();
}
