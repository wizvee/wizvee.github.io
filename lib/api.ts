import { join } from "path";
import fs from "fs/promises";
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

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);

  const fileContents = await fs.readFile(fullPath, "utf8");
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: fileContents,
    options: { parseFrontmatter: true },
  });

  return {
    slug: realSlug,
    content,
    ...processFrontmatter(frontmatter),
  } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await fs.readdir(postsDirectory);
  const posts = await Promise.all(slugs.map(getPostBySlug));
  return posts;
}
