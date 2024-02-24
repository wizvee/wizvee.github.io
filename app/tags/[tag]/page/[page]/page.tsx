import { getAllTags, getPostsByTag } from "@/lib/api";
import { POSTS_PER_PAGE } from "@/lib/constants";
import ListLayout from "@/layouts/ListLayout";

async function createTagPages([tag]: [string, number]) {
  const posts = await getPostsByTag(tag);
  const length = Math.ceil(posts.length / POSTS_PER_PAGE);
  return Array.from({ length }, (_, i) => ({ tag, page: (i + 1).toString() }));
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  const pages = await Promise.all(tags.map(createTagPages));
  return pages.flat();
}

export default async function TagPage({
  params: { tag, page },
}: {
  params: { tag: string; page: string };
}) {
  const posts = await getPostsByTag(tag);
  return <ListLayout posts={posts} currentPage={Number(page)} />;
}
