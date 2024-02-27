import { useMemo, useCallback } from "react";
import { Post } from "@/app/_lib/api";
import { POSTS_PER_PAGE } from "@/app/_lib/constants";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationResult {
  currentPosts: Post[];
  totalPages: number;
  previousPage: string;
  nextPage: string;
}

export default function usePagination(
  posts: Post[],
  currentPage: number
): PaginationResult {
  const selectedTags = useSearchParams().getAll("tag");

  const filteredPosts = useMemo(() => {
    return selectedTags.length > 0
      ? posts.filter(({ tags }) =>
          selectedTags.every((tag) => tags.includes(tag))
        )
      : posts;
  }, [posts, selectedTags]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    [filteredPosts.length]
  );

  const currentPosts = useMemo(() => {
    return filteredPosts.slice(
      (currentPage - 1) * POSTS_PER_PAGE,
      currentPage * POSTS_PER_PAGE
    );
  }, [filteredPosts, currentPage]);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getNavPath = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      if (page === 1) params.delete("page");
      else params.set("page", page.toString());

      return `${pathname}?${params}`;
    },
    [pathname, searchParams]
  );

  const previousPage = currentPage > 1 ? getNavPath(currentPage - 1) : "";
  const nextPage = currentPage < totalPages ? getNavPath(currentPage + 1) : "";

  return { currentPosts, totalPages, previousPage, nextPage };
}
