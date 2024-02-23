import { getAllPosts } from "@/lib/api";
import ListLayout from "@/layouts/ListLayout";

export default async function Blog() {
  const posts = await getAllPosts();
  return <ListLayout posts={posts} currentPage={1} />;
}
