"use client";

import { ArrowLeftIcon, CommentIcon } from "@/icons";
import { createCommentService, fetchPostByIdService } from "@/services";
import Image from "next/image";
import { useEffect, useState } from "react";
import avatarImage from "../../../public/images/avatar.png";
import { isEmpty } from "lodash";
import { AddCommentModal, CommentCard } from "@/components";
import { useRouter } from "next/navigation";
import { useAddCommentModal, useCommentStore, useScreenSize } from "@/hooks";

export default function BlogPageById({ params }: { params: { id: number } }) {
  const [post, setPost] = useState({});
  const [isShowCommentInput, setIsShowCommentInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const { comments: newCommentList, setComments: setNewCommentList } =
    useCommentStore();

  const screenSize = useScreenSize();

  const router = useRouter();
  const { id: postId } = params;

  const fetchPostById = async () => {
    const data = await fetchPostByIdService(postId);
    setPost(data);
  };

  const {
    isShowModal: isShowAddCommentModal,
    setIsShowModal: setIsShowAddCommentModal,
  } = useAddCommentModal();

  const handleSubmitComment = async () => {
    if (commentInput) {
      const createdComment = await createCommentService({
        content: commentInput,
        postId: +postId,
      });

      const updateList = [createdComment, ...newCommentList];
      setNewCommentList(updateList);

      setCommentInput("");
      setIsShowCommentInput(false);
    }
  };

  useEffect(() => {
    fetchPostById();

    return () => {
      setCommentInput("");
      setNewCommentList([]);
      setPost({});
    };
  }, [postId]);

  return (
    !isEmpty(post) && (
      <div className="w-[90%] box-border">
        <button
          className="flex justify-center items-center bg-green-100 rounded-full w-10 h-10 mb-8 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon />
        </button>

        <div className="flex items-center gap-4 mb-2">
          <Image src={avatarImage} alt={"avatar"} width={48} height={48} />
          <p className="text-sm text-text">{post.user.firstName}</p>
          <p className="text-xs text-gray-300">5mo. ago</p>
        </div>

        <div className="text-xs text-[#4A4A4A] bg-surface py-1 px-2 text-center w-[55px] h-6 rounded-2xl mb-2">
          <p>{post.category.name}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-dark text-[28px] font-semibold">{post.title}</h1>
          <p className="text-text text-xs font-normal">{post.content}</p>
          <div className="text-gray-300 text-xs flex items-center gap-1 py-6">
            <CommentIcon />
            <p>{post.comments.length}</p>
            <p>comment</p>
          </div>
        </div>

        {isShowAddCommentModal && (
          <AddCommentModal
            setNewCommentList={setNewCommentList}
            postId={postId}
          />
        )}

        {isShowCommentInput ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="w-full h-[100px] p-3 border border-[#DADADA] resize-none focus:outline-none rounded-lg"
              placeholder="What's on your mind..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <button
                className={`bg-white rounded-lg w-[105px] h-[40px] border border-success`}
                onClick={() => setIsShowCommentInput(false)}
              >
                <span className="text-success font-semibold">Cancel</span>
              </button>

              <button
                className={`bg-success rounded-lg w-[105px] h-[40px] border-1 border-success`}
                onClick={() => handleSubmitComment()}
              >
                <span className="text-white font-semibold">Post</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            className={`bg-white rounded-lg w-[132px] h-[40px] border border-success`}
            onClick={() => {
              if (screenSize.width >= 640) {
                setIsShowCommentInput(true);
              } else {
                setIsShowAddCommentModal(true);
              }
            }}
          >
            <span className="text-success font-semibold text-sm">
              Add Comment
            </span>
          </button>
        )}

        <div className="py-4">
          {!isEmpty(newCommentList) &&
            newCommentList.map((newComment) => {
              return <CommentCard comment={newComment} key={newComment.id} />;
            })}

          {post.comments.length > 0 &&
            post.comments.map((comment) => {
              return <CommentCard comment={comment} key={comment.id} />;
            })}
        </div>
      </div>
    )
  );
}
