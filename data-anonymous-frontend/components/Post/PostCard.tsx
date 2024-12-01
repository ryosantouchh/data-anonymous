"use client";

import { CommentIcon, DeleteIcon, EditIcon } from "@/icons";
import { TPost } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import avatar2Image from "../../public/images/avatar2.png";
import Image from "next/image";
import { useCreatePostModal, useDeletePostModal } from "@/hooks";
import { useEffect } from "react";

export default function PostCard({ posts }: { posts: TPost[] }) {
  const router = useRouter();

  const pathname = usePathname();

  const handleClickPostCard = (postId: number) => {
    router.push(`/${postId}`);
  };

  const {
    setSelectedPost,
    setIsShowModal: setIsShowCreatePostModal,
    setPostModalAction,
  } = useCreatePostModal();

  const { setIsShowModal: setIsShowDeletePostModal } = useDeletePostModal();

  useEffect(() => {
    return () => {
      setSelectedPost(null);
      setIsShowDeletePostModal(false);
      setIsShowCreatePostModal(false);
    };
  }, []);

  return posts.map((post, index) => {
    const { user, category } = post;

    return (
      <div
        className={`
          bg-white p-5 border-b-gray-100
          ${posts.length > 1 ? (index === posts.length - 1 ? "" : "border-b-[1px]") : ""}
          ${index === 0 ? "rounded-t-lg" : ""}
          ${index === posts.length - 1 ? "rounded-b-lg" : ""}
          relative z-0
        `}
        key={post.id}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Image src={avatar2Image} alt={"avatar"} width={32} height={32} />
            <p className="text-gray-300 text-sm">{`${user.firstName} ${user.lastName}`}</p>
          </div>

          {pathname === "/my-blog" && (
            <div className="flex items-center gap-3 mb-3">
              <button
                className="relative z-30"
                onClick={() => {
                  setSelectedPost(post.id);
                  setPostModalAction("EDIT");
                  setIsShowCreatePostModal(true);
                }}
              >
                <EditIcon />
              </button>
              <button
                className="relative z-30"
                onClick={() => {
                  setSelectedPost(post.id);
                  setIsShowDeletePostModal(true);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
        <div className="text-xs text-[#4A4A4A] bg-surface py-1 px-2 text-center w-[55px] h-6 rounded-2xl mb-2">
          <p>{category.name}</p>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleClickPostCard(post.id)}
        >
          <h3 className="text-dark text-[16px]">{post.title}</h3>
          <p className="text-dark text-xs mb-2">{post.content}</p>
          <div className="text-gray-300 text-xs flex items-center gap-1">
            <CommentIcon />
            <p>{post.commentCount}</p>
            <p>comment</p>
          </div>
        </div>
      </div>
    );
  });
}
