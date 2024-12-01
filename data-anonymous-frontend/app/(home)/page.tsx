"use client";

import { PostCard, SearchBar } from "@/components";
import { usePost } from "@/hooks";

export default function HomePage() {
  const { posts } = usePost();

  return (
    <div className="flex flex-col py-8">
      <SearchBar />
      <PostCard posts={posts} />
    </div>
  );
}
