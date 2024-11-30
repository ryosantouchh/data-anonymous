import { fetchPosts } from "@/services";
import { apiService } from "@/services/apiService";
import { TPost } from "@/types";
import { create } from "zustand";

interface PostState {
  posts: Array<TPost>;
  appendPost: (newPosts: TPost[]) => void;
  clearPost: () => void;
}

const usePostStore = create<PostState>((set) => ({
  posts: [],
  appendPost: (newPosts) =>
    set((state) => ({ posts: [...state.posts, ...newPosts] })),

  clearPost: () => set({ posts: [] }),
}));

export default usePostStore;
