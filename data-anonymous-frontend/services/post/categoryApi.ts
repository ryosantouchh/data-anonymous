import { getSession } from "next-auth/react";
import { apiService } from "../apiService";

const BASE_URL = "http://localhost:3333/category";

export async function fetchCategoriesService() {
  const session = await getSession();
  const { data } = await apiService({
    method: "GET",
    endPoint: BASE_URL,
    config: { accessToken: session!.accessToken },
  });
  return data;
}
