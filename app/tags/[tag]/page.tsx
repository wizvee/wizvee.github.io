import ListLayout from "@/layouts/ListLayout";
import { getAllTags, getPostsByTag } from "@/lib/api";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(([tag]) => ({ tag }));
}

export default async function Tag({
  params: { tag },
}: {
  params: { tag: string };
}) {
  const posts = await getPostsByTag(tag);
  return <ListLayout posts={posts} currentPage={1} />;
}
