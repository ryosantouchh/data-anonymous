import { getSession } from "next-auth/react";
import { apiService } from "../apiService";

const BASE_URL = "http://localhost:3333/post";

export async function fetchPostsService(categoryId?: number) {
  const endPoint = categoryId
    ? `${BASE_URL}?categoryId=${categoryId}`
    : BASE_URL;

  const { data } = await apiService({ method: "GET", endPoint });

  return data;
}

export async function fetchPostByIdService(postId: number) {
  const { data } = await apiService({
    method: "GET",
    endPoint: `${BASE_URL}/${postId}`,
  });
  return data;
}

export async function fetchPostByMeService() {
  const session = await getSession();

  const { data } = await apiService({
    method: "GET",
    endPoint: `${BASE_URL}/by/me`,
    config: { accessToken: session!.accessToken },
  });
  return data;
}

export async function createPostService(newPost: {
  title: string;
  content: string;
  categoryId: number;
}) {
  const session = await getSession();

  const { data } = await apiService({
    method: "POST",
    endPoint: `${BASE_URL}`,
    data: newPost,
    config: { accessToken: session!.accessToken },
  });

  return data;
}

export async function editPostService(
  postId: number,
  newPost: {
    title?: string;
    content?: string;
    categoryId?: number;
  },
) {
  const session = await getSession();

  const { data } = await apiService({
    method: "PATCH",
    endPoint: `${BASE_URL}/${postId}`,
    data: newPost,
    config: { accessToken: session!.accessToken },
  });

  return data;
}

export async function deletePostService(postId: number) {
  const session = await getSession();

  const { data } = await apiService({
    method: "DELETE",
    endPoint: `${BASE_URL}/${postId}`,
    config: { accessToken: session!.accessToken },
  });

  return data;
}
