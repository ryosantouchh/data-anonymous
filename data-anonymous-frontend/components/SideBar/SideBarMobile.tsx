"use client";

import { useSideBarMobile } from "@/hooks";
import { ArrowRightWhiteIcon, BlogWhiteIcon, HomeWhiteIcon } from "@/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SideBarMobile() {
  const pathname = usePathname();
  const { setIsShowSideBarMobile } = useSideBarMobile();

  const router = useRouter();

  useEffect(() => {
    return () => {
      setIsShowSideBarMobile(false);
    };
  }, []);

  return (
    <div className="fixed flex left-0 top-0 h-screen w-screen bg-black bg-opacity-50 z-40 justify-end">
      <div className="relative sm:hidden w-[280px] rounded-s-lg -right-1 flex-col gap-8 flex pt-8 px-6 bg-green-500 h-screen">
        <button onClick={() => setIsShowSideBarMobile(false)}>
          <ArrowRightWhiteIcon />
        </button>
        <div className="flex flex-col gap-4">
          <button
            className="flex gap-2"
            onClick={() => {
              setIsShowSideBarMobile(false);
              router.push("/");
            }}
          >
            <HomeWhiteIcon />
            <span
              className={`text-white text-[16px] ${pathname === "/" ? "font-bold" : ""}`}
            >
              Home
            </span>
          </button>
          <button
            className="flex gap-2"
            onClick={() => {
              setIsShowSideBarMobile(false);
              router.push("/my-blog");
            }}
          >
            <BlogWhiteIcon />
            <span
              className={`text-white text-[16px] ${pathname === "/my-blog" ? "font-bold" : ""}`}
            >
              Our Blog
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
