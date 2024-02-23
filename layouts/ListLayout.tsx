"use client";

import Pagination from "@/components/Pagination";
import { PostList } from "@/components/PostList";
import usePagination from "@/hooks/usePagination";
import { Post } from "@/lib/api";

interface Props {
  posts: Post[];
  currentPage: number;
}

export default function ListLayout({ posts, currentPage }: Props) {
  const { currentPosts, totalPages, previous, next } = usePagination(posts, currentPage);

  return (
    <section>
      <PostList posts={currentPosts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        previous={previous}
        next={next}
      />
    </section>
  );
}
