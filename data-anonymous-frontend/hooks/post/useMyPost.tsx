import { fetchPostByMeService } from "@/services";
import usePostStore from "./usePostStore";
import { useEffect } from "react";

export default function useMyPost() {
  const { posts, appendPost, clearPost } = usePostStore();

  const fetchPosts = async () => {
    const data = await fetchPostByMeService();
    appendPost(data);
  };

  useEffect(() => {
    fetchPosts();

    return () => clearPost();
  }, []);

  return { posts, appendPost };
}
