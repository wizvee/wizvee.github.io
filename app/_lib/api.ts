import { join } from "path";
import fs from "fs/promises";
import remarkGfm from "remark-gfm";
import { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";

type Frontmatter = {
  title: string;
  date: Date;
  tags: string[];
};

type FrontmatterProcessed = Omit<Frontmatter, "date"> & {
  date: string;
};

export type Post = {
  slug: string;
  content: ReactElement;
} & FrontmatterProcessed;

const postsDirectory = join(process.cwd(), "_posts");

function dateTimeFormat(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR").format(date);
}

function processFrontmatter(data: Frontmatter): FrontmatterProcessed {
  const { title, date, tags } = data;
  return { title, date: dateTimeFormat(date), tags };
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);

  const fileContents = await fs.readFile(fullPath, "utf8");
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: fileContents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  return { slug: realSlug, content, ...processFrontmatter(frontmatter) };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await fs.readdir(postsDirectory);
  const posts = await Promise.all(slugs.map(getPostBySlug));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

type TagData = {
  count: number;
  relatedTags: Set<string>;
};

export type Tag = {
  tag: string;
  relatedTags: string[];
};

export async function getAllTags(): Promise<Tag[]> {
  const posts = await getAllPosts();
  const tagMap = new Map<string, TagData>();

  posts.forEach(({ tags }) => {
    tags.forEach((tag) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, { count: 0, relatedTags: new Set() });
      }
      const tagData = tagMap.get(tag)!;
      tagData.count += 1;

      tags.forEach((t) => {
        if (t !== tag) tagData.relatedTags.add(t);
      });
    });
  });

  return Array.from(tagMap)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([tag, { relatedTags }]) => ({
      tag,
      relatedTags: Array.from(relatedTags),
    }));
}
