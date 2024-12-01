"use client";

import { UserIcon } from "@/icons";
import { TComment } from "@/types";

export default function CommentCard({ comment }: { comment: TComment }) {
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-surface">
          <UserIcon />
        </div>
        <span className="font-medium text-text text-sm">
          {comment.user.username}
        </span>
        <span className="text-gray-300 text-xs">12h ago</span>
      </div>

      <div className="pl-[52px]">
        <p className="font-medium text-text text-xs">{comment.content}</p>
      </div>
    </div>
  );
}
