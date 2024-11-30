"use client";

import { fetchPostByIdService } from "@/services";
import { useEffect, useState } from "react";

export default function BlogPageById({ params }) {
  const [post, setPost] = useState({});
  const { id: postId } = params;

  const fetchPostById = async () => {
    const data = await fetchPostByIdService(postId);
    setPost(data);
  };

  useEffect(() => {
    fetchPostById();
  }, [postId]);

  return <div>Blog Page By Id</div>;
}
