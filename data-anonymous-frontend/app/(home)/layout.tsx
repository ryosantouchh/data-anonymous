import { Navbar, SideBar } from "@/components";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="grid grid-cols-layout-1 justify-center w-[100%]">
        <SideBar />
        <div className="justify-self-center mb-12 w-full">
          <div className={`flex flex-col`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
