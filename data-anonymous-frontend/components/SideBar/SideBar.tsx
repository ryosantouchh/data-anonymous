"use client";

import BlogIcon from "@/icons/blog";
import HomeIcon from "@/icons/home";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="w-[280px] flex flex-col gap-6 pt-8 px-6">
      <Link className="flex gap-2" href="/">
        <HomeIcon />
        <span className={`text-[16px] ${pathname === "/" ? "font-bold" : ""}`}>
          Home
        </span>
      </Link>
      <Link className="flex gap-2 pl-[2px]" href="/my-blog">
        <BlogIcon />
        <span
          className={`text-[16px] ${pathname === "/my-blog" ? "font-bold" : ""}`}
        >
          Our Blog
        </span>
      </Link>
    </div>
  );
}
