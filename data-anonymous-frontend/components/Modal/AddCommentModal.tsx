"use client";

import { useAddCommentModal, useCommentStore } from "@/hooks";
import { createCommentService } from "@/services";
import { useEffect, useState } from "react";

export default function AddCommentModal({ postId }: { postId: number }) {
  const [content, setContent] = useState("");

  const { comments: newCommentList, setComments: setNewCommentList } =
    useCommentStore();

  const { setIsShowModal: setIsShowAddCommentModal } = useAddCommentModal();

  const handleSubmitComment = async () => {
    if (content) {
      const createdComment = await createCommentService({
        content,
        postId: +postId,
      });

      const updateList = [createdComment, ...newCommentList];
      setNewCommentList(updateList);

      setContent("");
      setIsShowAddCommentModal(false);
    }
  };

  useEffect(() => {
    return () => {
      setNewCommentList([]);
      setContent("");
      setIsShowAddCommentModal(false);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-white p-4 sm:p-6 rounded-xl w-[90%] sm:w-[685px]">
        <button
          className="font-semibold absolute right-4 top-2"
          onClick={() => setIsShowAddCommentModal(false)}
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Comment</h2>

        <textarea
          className="mb-5 sm:mb-1 w-full h-[120px] p-3 border border-[#DADADA] resize-none focus:outline-none rounded-lg"
          placeholder="What's on your mind..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex flex-col gap-2 justify-end">
          <button
            className={`bg-white rounded-lg w-full h-[40px] border border-success`}
            onClick={() => setIsShowAddCommentModal(false)}
          >
            <span className="text-success font-semibold text-sm">Cancel</span>
          </button>

          <button
            className={`bg-success rounded-lg w-full h-[40px] border-1 border-success`}
            onClick={() => handleSubmitComment()}
          >
            <span className="text-white font-semibold text-sm">Post</span>
          </button>
        </div>
      </div>
    </div>
  );
}
