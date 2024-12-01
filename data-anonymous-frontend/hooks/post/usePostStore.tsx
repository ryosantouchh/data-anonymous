import { TPost } from "@/types";
import { create } from "zustand";

interface PostState {
  posts: Array<TPost>;
  categoryId: number | null;
  appendPost: (newPosts: TPost[]) => void;
  clearPost: () => void;
  setCategoryId: (id: number) => void;
  clearCategoryId: () => void;
}

const usePostStore = create<PostState>((set) => ({
  posts: [],
  categoryId: null,

  appendPost: (newPosts) =>
    set((state) => ({ posts: [...newPosts, ...state.posts] })),
  clearPost: () => set({ posts: [] }),

  setCategoryId: (id) => set(() => ({ categoryId: id })),
  clearCategoryId: () => set(() => ({ categoryId: null })),
}));

export default usePostStore;
