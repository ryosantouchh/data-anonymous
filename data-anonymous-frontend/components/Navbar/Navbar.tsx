"use client";

import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();

  return (
    <div className="bg-green-500 flex w-full justify-center">
      <div className="h-[60px] flex items-center justify-between bg-green-500 p-6 max-w-[1440px] flex-1">
        <p className="text-xl text-white italic">a Board</p>
        {data ? (
          <div className="rounded-full bg-gray-100 w-[36px] h-[36px]" />
        ) : (
          <button className="bg-success text-[16px] w-[105px] h-10 text-white rounded-lg">
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
