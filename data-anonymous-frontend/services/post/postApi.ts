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
