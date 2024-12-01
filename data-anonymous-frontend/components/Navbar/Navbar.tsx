"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import avatar2Image from "../../public/images/avatar2.png";

export default function Navbar() {
  const { data } = useSession();

  return (
    <div className="bg-green-500 flex w-full justify-center">
      <div className="h-[60px] flex items-center justify-between bg-green-500 p-6 max-w-[1440px] flex-1">
        <p className="text-xl text-white italic">a Board</p>
        {data ? (
          <Image src={avatar2Image} alt={"avatar"} width={32} height={32} />
        ) : (
          <button className="bg-success text-[16px] w-[105px] h-10 text-white rounded-lg">
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
