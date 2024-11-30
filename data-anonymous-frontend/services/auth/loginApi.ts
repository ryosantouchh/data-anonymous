"use client";

import { signIn } from "next-auth/react";

export const login = async (data: { username: string }) => {
  const { username } = data;
  try {
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password: "1234", // HARD_CODE,
    });

    if (result?.error) {
      return { success: false, message: result.error };
    }

    if (result?.ok) {
      console.log(result, "this is login result");
      return { success: true, message: "Login successful" };
    }

    return { success: false, message: "An unexpected error occurred" };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};
