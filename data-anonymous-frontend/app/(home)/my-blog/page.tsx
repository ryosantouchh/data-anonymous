"use client";
import { PostCard } from "@/components";
import { useMyPost } from "@/hooks";

export default function BlogPageByMe() {
  const { posts } = useMyPost();

  return (
    <div className="flex flex-col py-8">
      <PostCard posts={posts} />
    </div>
  );
}
