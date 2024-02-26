import { getAllPosts } from "@/lib/api";
import ListLayout from "../components/layouts/ListLayout";

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
  const currentPage = page ? Number(page) : 1;
  return <ListLayout posts={posts} currentPage={currentPage} />;
}
