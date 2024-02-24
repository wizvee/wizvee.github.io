import { getAllTags } from "@/lib/api";
import Link from "next/link";

export default async function Tags() {
  const tags = await getAllTags();
  return (
    <section>
      {tags.map(([tag, count]) => (
        <Link key={tag} href={`tags/${tag}`} className="mx-1">
          {tag}
          <span>{count}</span>
        </Link>
      ))}
    </section>
  );
}
