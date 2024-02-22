import { getAllPosts, getPostBySlug } from "@/lib/api";

export async function generateStaticParams() {
  return await getAllPosts();
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { title, date, content } = await getPostBySlug(params.slug);
  return (
    <article>
      <h1>{title}</h1>
      <time>{date}</time>
      {content}
    </article>
  );
}
