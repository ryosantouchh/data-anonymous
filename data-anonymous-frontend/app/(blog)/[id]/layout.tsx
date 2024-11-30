import { Navbar, SideBar } from "@/components";

export default function BlogByIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="grid grid-cols-layout-2 justify-center w-[100%] pt-8">
        <SideBar />
        <div className="justify-self-center mb-12">
          <div className={`flex flex-col`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
