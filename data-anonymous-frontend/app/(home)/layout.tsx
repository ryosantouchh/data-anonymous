"use client";

import { Navbar, SideBar, SideBarMobile } from "@/components";
import { useSideBarMobile } from "@/hooks";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isShowSideBarMobile } = useSideBarMobile();

  return (
    <div className="bg-gray-100">
      <Navbar />
      {isShowSideBarMobile && <SideBarMobile />}

      <div className="flex px-4 sm:p-0 sm:grid sm:grid-cols-layout-1 sm:justify-center w-[100%]">
        <SideBar />
        <div className="justify-self-center mb-12 w-full">
          <div className={`flex flex-col`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
