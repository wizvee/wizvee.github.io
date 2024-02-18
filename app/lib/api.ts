import fs from "fs";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";

type Frontmatter = {
  date: string;
};

export type Post = {
  slug: string;
  content: any;
  frontmatter: Frontmatter;
};

const postsDirectory = join(process.cwd(), "_posts");

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: fs.readFileSync(fullPath, "utf8"),
    options: { parseFrontmatter: true },
  });

  return { slug: realSlug, content, frontmatter } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts;
}
