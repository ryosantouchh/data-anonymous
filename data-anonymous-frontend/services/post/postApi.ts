import { apiService } from "../apiService";

const BASE_URL = "http://localhost:3333/post";

export async function fetchPostsService() {
  const { data } = await apiService({ method: "GET", endPoint: BASE_URL });
  return data;
}

export async function fetchPostByIdService() {
  const { data } = await apiService({ method: "GET", endPoint: BASE_URL });
  return data;
}

export async function fetchPostByMeService() {
  const { data } = await apiService({ method: "GET", endPoint: BASE_URL });
  return data;
}
