import { useEffect } from "react";

import { fetchPostsService } from "@/services";
import usePostStore from "./usePostStore";

export default function usePost() {
  const { posts, appendPost, clearPost, categoryId } = usePostStore();

  const fetchPosts = async (categoryId?: number) => {
    if (categoryId !== null) {
      clearPost();
    }
    const data = await fetchPostsService(categoryId);
    appendPost(data);
  };

  useEffect(() => {
    fetchPosts();

    return () => clearPost();
  }, []);

  useEffect(() => {
    if (categoryId !== null) {
      fetchPosts(categoryId);
    }
  }, [categoryId]);

  return { posts, appendPost, categoryId };
}
