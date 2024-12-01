import { create } from "zustand";

interface CommentState {
  comments: Array<unknown>;
  setComments: (comment: unknown[]) => void;
  clearComments: () => void;
}

const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  setComments: (commentList) => set(() => ({ comments: commentList })),
  clearComments: () => set(() => ({ comments: [] })),
}));

export default useCommentStore;
