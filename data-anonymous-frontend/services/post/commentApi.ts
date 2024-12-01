import { getSession } from "next-auth/react";
import { apiService } from "../apiService";

const BASE_URL = "http://localhost:3333/comment";

export async function createCommentService(newComment: {
  content: string;
  postId: number;
}) {
  const session = await getSession();

  const { data } = await apiService({
    method: "POST",
    endPoint: `${BASE_URL}`,
    data: newComment,
    config: { accessToken: session!.accessToken },
  });

  return data;
}
