"use client";
import { CreatePostModal, PostCard } from "@/components";
import DeletePostModal from "@/components/Modal/DeletePostModal";
import { useCreatePostModal, useDeletePostModal, useMyPost } from "@/hooks";

export default function BlogPageByMe() {
  const { posts } = useMyPost();

  const { isShowModal: isShowEditPostModal } = useCreatePostModal();
  const { isShowModal: isShowDeletePostModal } = useDeletePostModal();

  return (
    <div className="flex flex-col py-8">
      <PostCard posts={posts} />
      {isShowEditPostModal && <CreatePostModal />}
      {isShowDeletePostModal && <DeletePostModal />}
    </div>
  );
}
