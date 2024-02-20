import { join } from "path";
import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";

type Frontmatter = {
  title: string;
  date: Date;
};

export type Post = {
  slug: string;
  content: any;
  title: string;
  date: string;
};

const postsDirectory = join(process.cwd(), "_posts");

function dateTimeFormat(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR").format(date);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);

  const fileContents = await fs.readFile(fullPath, "utf8");
  const {
    content,
    frontmatter: { title, date },
  } = await compileMDX<Frontmatter>({
    source: fileContents,
    options: { parseFrontmatter: true },
  });

  return { slug: realSlug, content, title, date: dateTimeFormat(date) } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await fs.readdir(postsDirectory);
  const posts = await Promise.all(slugs.map(getPostBySlug));
  return posts;
}
