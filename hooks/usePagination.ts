import { Post } from "@/lib/api";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { usePathname } from "next/navigation";

function getPagePath(basePath: string, page: number, total: number): string {
  if (page < 1 || page > total) return "";
  return page === 1 ? `${basePath}` : `${basePath}/page/${page}`;
}

export default function usePagination(posts: Post[], currentPage: number) {
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const path = usePathname().replace(/\/page\/\d+$/, "");

  const previous = getPagePath(path, currentPage - 1, totalPages);
  const next = getPagePath(path, currentPage + 1, totalPages);

  return { currentPosts, totalPages, previous, next };
}
