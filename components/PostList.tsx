import Link from "next/link";
import { Post } from "@/lib/api";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map(({ slug, title, date }) => (
        <li key={slug}>
          <Link href={`/blog/${slug}`}>
            <h2>{title}</h2>
            <p>{date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
