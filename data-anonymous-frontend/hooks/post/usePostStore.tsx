import { TPostData } from "@/types";
import { create } from "zustand";

interface PostState {
  posts: Array<TPostData>;
  categoryId: number | null;
  setPosts: (postList: TPostData[]) => void;
  appendSinglePost: (newPosts: TPostData) => void;
  appendPost: (newPosts: TPostData[]) => void;
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
