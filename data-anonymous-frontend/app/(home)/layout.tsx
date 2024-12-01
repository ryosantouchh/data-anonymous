import { Navbar, SideBar } from "@/components";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="flex px-4 sm:p-0 sm:grid sm:grid-cols-layout-1 sm:justify-center w-[100%]">
        <SideBar />
        <div className="justify-self-center mb-12 w-full">
          <div className={`flex flex-col`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
