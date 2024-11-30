"use client";

import { login } from "@/services";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleSignIn = async (data: { username: string }) => {
    try {
      const response = await login(data);
      if (response.success) {
        router.push("/");
      } else {
        setIsError(true);
      }

      setUsername("");
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    setIsError(false);
  }, [username]);

  return (
    <div className="flex flex-col gap-4">
      <input
        placeholder="Username"
        className="h-[44px] px-4 rounded-lg"
        value={username}
        onChange={(e) => handleChangeInput(e)}
      />
      <button
        className={`
          h-[44px] bg-success rounded-lg
          border-1 ${isError ? "border-red-500" : "border-success"}
          text-white text-xs
        `}
        onClick={() => handleSignIn({ username })}
      >
        Sign In
      </button>
    </div>
  );
}
