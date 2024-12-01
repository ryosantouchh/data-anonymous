import { TPost } from "@/types";
import { create } from "zustand";

interface PostState {
  posts: Array<TPost>;
  categoryId: number | null;
  setPosts: (postList: TPost[]) => void;
  appendSinglePost: (newPosts: TPost) => void;
  appendPost: (newPosts: TPost[]) => void;
  clearPost: () => void;
  setCategoryId: (id: number) => void;
  clearCategoryId: () => void;
}

const usePostStore = create<PostState>((set) => ({
  posts: [],
  categoryId: null,

  setPosts: (postList) => set(() => ({ posts: postList })),

  appendSinglePost: (newPost) =>
    set((state) => ({ posts: [newPost, ...state.posts] })),
  appendPost: (newPosts) =>
    set((state) => ({ posts: [...newPosts, ...state.posts] })),
  clearPost: () => set({ posts: [] }),

  setCategoryId: (id) => set(() => ({ categoryId: id })),
  clearCategoryId: () => set(() => ({ categoryId: null })),
}));

export default usePostStore;
