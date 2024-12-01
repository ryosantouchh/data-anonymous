import { Navbar, SideBar } from "@/components";

export default function BlogByIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="block sm:grid sm:grid-cols-layout-2 justify-center w-[100%] h-full sm:h-[calc(100vh-60px)]">
        <SideBar />
        <div className="justify-self-center bg-white w-full h-full py-6 sm:py-8 px-4 sm:px-32">
          <div className={`flex flex-col`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
