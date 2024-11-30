import { Navbar, SideBar } from "@/components";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <SideBar />

      <div className="flex justify-center w-[100%] pt-8">
        <div className="w-[800px]">
          <div className={`flex flex-col`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
