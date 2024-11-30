"use client";

import { CommentIcon } from "@/icons";
import { TPost } from "@/types";

export default function PostCard({ posts }: { posts: TPost[] }) {
  return posts.map((post, index) => {
    const { user, category } = post;

    return (
      <div
        className={`
          bg-white p-5 border-b-gray-100
          ${posts.length > 1 ? (index === posts.length - 1 ? "" : "border-b-[1px]") : ""}
          ${index === 0 ? "rounded-t-lg" : ""}
          ${index === posts.length - 1 ? "rounded-b-lg" : ""}
        `}
        key={post.id}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="rounded-full bg-gray-100 w-8 h-8" />
          <p className="text-gray-300 text-sm">{`${user.firstName} ${user.lastName}`}</p>
        </div>
        <div className="text-xs text-[#4A4A4A] bg-surface py-1 px-2 text-center w-[55px] h-6 rounded-2xl mb-2">
          <p>{category.name}</p>
        </div>
        <h3 className="text-dark text-[16px]">{post.title}</h3>
        <p className="text-dark text-xs mb-2">{post.content}</p>
        <div className="text-gray-300 text-xs flex items-center gap-1">
          <CommentIcon />
          <p>number</p>
          <p>comment</p>
        </div>
      </div>
    );
  });
}
