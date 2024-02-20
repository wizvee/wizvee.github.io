import { PostList } from "@/components/PostList";
import TypingText from "@/components/TypingText";
import { getAllPosts } from "@/lib/api";

export default async function Home() {
  const MAX_POSTS_DISPLAYED = 5;
  const limitedPosts = (await getAllPosts()).slice(0, MAX_POSTS_DISPLAYED);

  return (
    <>
      <section className="h-96 bg-blue-500">
        <TypingText />
      </section>
      <section>
        <PostList posts={limitedPosts} />
      </section>
    </>
  );
}
