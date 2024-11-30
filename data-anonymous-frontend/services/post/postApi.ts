import { apiService } from "../apiService";

const BASE_URL = "http://localhost:3333/post";

export async function fetchPostsService() {
  const { data } = await apiService({ method: "GET", endPoint: BASE_URL });
  return data;
}
