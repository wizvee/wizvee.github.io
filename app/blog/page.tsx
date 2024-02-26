import { getAllPosts } from "@/lib/api";
import ListLayout from "@/app/components/layouts/ListLayout";

interface SearchParams {
  tags?: string[];
  page?: number;
}

export default async function Blog({
  searchParams: { page },
}: {
  searchParams: SearchParams;
}) {
  const posts = await getAllPosts();
  return <ListLayout posts={posts} currentPage={page ?? 1} />;
}
