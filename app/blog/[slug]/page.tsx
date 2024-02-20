import { getAllPosts, getPostBySlug } from "@/lib/api";

export async function generateStaticParams() {
  return await getAllPosts();
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { content } = await getPostBySlug(params.slug);
  return <>{content}</>;
}
