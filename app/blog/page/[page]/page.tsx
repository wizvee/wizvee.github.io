import { getAllPosts } from "@/lib/api";
import { POSTS_PER_PAGE } from "@/lib/constants";
import ListLayout from "@/layouts/ListLayout";

export const generateStaticParams = async () => {
  const posts = await getAllPosts();
  const length = Math.ceil(posts.length / POSTS_PER_PAGE);

  return Array.from({ length }, (_, i) => ({ page: (i + 1).toString() }));
};

export default async function Page({ params }: { params: { page: number } }) {
  const posts = await getAllPosts();
  return <ListLayout posts={posts} currentPage={params.page} />;
}
