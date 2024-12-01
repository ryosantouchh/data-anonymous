import { TComment } from "@/types";
import { create } from "zustand";

interface CommentState {
  comments: Array<TComment>;
  setComments: (comment: TComment[]) => void;
  clearComments: () => void;
}

const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  setComments: (commentList) => set(() => ({ comments: commentList })),
  clearComments: () => set(() => ({ comments: [] })),
}));

export default useCommentStore;
