import Link from "next/link";
import { Post } from "@/app/_lib/api";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="flex flex-wrap">
      {posts.map(({ slug, title, date }) => (
        <li key={slug} className="w-full md:w-1/2 p-2">
          <Link href={`/blog/${slug}`} className="block p-2 button hover:box-shadow">
            <h2>{title}</h2>
            <p>{date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
