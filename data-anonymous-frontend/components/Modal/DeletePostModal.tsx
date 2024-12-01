"use client";

import { useCreatePostModal, useDeletePostModal, usePostStore } from "@/hooks";
import { deletePostService } from "@/services";
import { useEffect } from "react";

export default function DeletePostModal() {
  const { selectedPost, setSelectedPost } = useCreatePostModal();
  const { setIsShowModal: setIsShowDeletePostModal } = useDeletePostModal();
  const { posts, setPosts } = usePostStore();

  const handleDeletePost = async () => {
    if (selectedPost) {
      await deletePostService(selectedPost);

      const tempPosts = [...posts];
      const updatedIndex = tempPosts.findIndex(
        (post) => post.id === selectedPost,
      );

      tempPosts.splice(updatedIndex, 1);

      setPosts(tempPosts);
      setIsShowDeletePostModal(false);
    }
  };

  useEffect(() => {
    return () => {
      setSelectedPost(null);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-xl w-[90%] sm:w-[400px]">
        <h2 className="text-[16px] font-semibold mb-4 text-dark text-center">
          Please confirm if you wish to delete the post
        </h2>

        <p className="text-sm text-[#475467] mb-4 text-center">
          Are you sure you want to delete the post? Once deleted, it cannot be
          recovered.
        </p>

        <div className="flex gap-2 flex-col-reverse sm:flex-row justify-center">
          <button
            className={`bg-white rounded-lg w-full h-[40px] border border-[#DADADA]`}
            onClick={() => setIsShowDeletePostModal(false)}
          >
            <span className="text-sm text-[#5B5B5B] font-semibold">Cancel</span>
          </button>

          <button
            className={`bg-critical rounded-lg w-full h-[40px] border-1 border-critical`}
            onClick={() => handleDeletePost()}
          >
            <span className="text-sm text-white font-semibold">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
