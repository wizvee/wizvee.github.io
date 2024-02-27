import { getAllPosts, getAllTags } from "@/app/_lib/api";
import TagList from "@/app/_components/TagList";
import ListLayout from "@/app/_components/layouts/ListLayout";

interface SearchParams {
  tag?: string[];
  page?: number;
}

export default async function Blog({
  searchParams: { tag, page },
}: {
  searchParams: SearchParams;
}) {
  const tags = await getAllTags();
  const selectedTags = tag ? (Array.isArray(tag) ? tag : [tag]) : [];

  const posts = await getAllPosts();
  const currentPage = page ? Number(page) : 1;

  return (
    <>
      <TagList tags={tags} selectedTags={selectedTags} />
      <ListLayout posts={posts} currentPage={currentPage} />
    </>
  );
}
