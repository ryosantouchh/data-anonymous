import { useEffect } from "react";

import { fetchPostsService } from "@/services";
import usePostStore from "./usePostStore";

export default function usePost() {
  const { posts, appendPost } = usePostStore();

  const fetchPosts = async () => {
    const data = await fetchPostsService();
    appendPost(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, appendPost };
}
