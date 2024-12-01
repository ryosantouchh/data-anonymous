"use client";

import { CreatePostModal, PostCard, SearchBar } from "@/components";
import { useCreatePostModal, usePost } from "@/hooks";

export default function HomePage() {
  const { posts } = usePost();

  const { isShowModal: isShowCreatePostModal } = useCreatePostModal();

  return (
    <div className="flex flex-col py-8">
      <SearchBar />
      <PostCard posts={posts} />
      {isShowCreatePostModal && <CreatePostModal />}
    </div>
  );
}
