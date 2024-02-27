"use client";

import Pagination from "@/app/_components/Pagination";
import { PostList } from "@/app/_components/PostList";
import usePagination from "@/app/_hooks/usePagination";
import { Post } from "@/app/_lib/api";

interface Props {
  posts: Post[];
  currentPage: number;
}

export default function ListLayout({ posts, currentPage }: Props) {
  const { currentPosts, totalPages, previousPage, nextPage } = usePagination(
    posts,
    currentPage
  );

  return (
    <section>
      <PostList posts={currentPosts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </section>
  );
}
