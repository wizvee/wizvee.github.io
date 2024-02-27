import { Post } from "@/app/_lib/api";
import { POSTS_PER_PAGE } from "@/app/_lib/constants";
import { usePathname } from "next/navigation";
import useQueryString from "./useQueryString";

export default function usePagination(posts: Post[], currentPage: number) {
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const pathname = usePathname();
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const prevPath = useQueryString("page", prevPage.toString());
  const nextPath = useQueryString("page", nextPage.toString());

  const previous =
    currentPage > 1 ? (prevPage === 1 ? pathname : prevPath) : "";
  const next = currentPage < totalPages ? nextPath : "";

  return { currentPosts, totalPages, previous, next };
}
