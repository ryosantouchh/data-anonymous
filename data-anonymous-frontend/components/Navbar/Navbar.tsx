"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import avatar2Image from "../../public/images/avatar2.png";
import { useScreenSize, useSideBarMobile } from "@/hooks";
import { useEffect } from "react";
import { HamburgerWhiteIcon } from "@/icons";

export default function Navbar() {
  const { data } = useSession();

  const { setIsShowSideBarMobile } = useSideBarMobile();
  const screenSize = useScreenSize();

  useEffect(() => {
    return () => {
      setIsShowSideBarMobile(false);
    };
  }, []);

  return (
    <div className="bg-green-500 flex w-full justify-center">
      <div className="h-[60px] flex items-center justify-between bg-green-500 p-6 max-w-[1440px] flex-1">
        <p className="text-xl text-white italic">a Board</p>
        {screenSize.width >= 640 ? (
          data ? (
            <Image src={avatar2Image} alt={"avatar"} width={32} height={32} />
          ) : (
            <button className="bg-success text-[16px] w-[105px] h-10 text-white rounded-lg">
              Sign In
            </button>
          )
        ) : (
          <button onClick={() => setIsShowSideBarMobile(true)}>
            <HamburgerWhiteIcon />
          </button>
        )}
      </div>
    </div>
  );
}
