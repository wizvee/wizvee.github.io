"use client";

import Link from "next/link";

function Tag({ tag, href }: { tag: string; href: string }) {
  return <Link href={href}>{tag}</Link>;
}

export default function TagList({ tags }: { tags: [string, number][] }) {
  return (
    <section>
      {tags.map(([tag]) => (
        <Tag key={tag} tag={tag} href="" />
      ))}
    </section>
  );
}
