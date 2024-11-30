import BlogIcon from "@/icons/blog";
import HomeIcon from "@/icons/home";

export default function SideBar() {
  return (
    <div className="w-[280px] flex flex-col gap-6 pt-8 px-6">
      <button className="flex gap-2">
        <HomeIcon />
        <span className="text-[16px]">Home</span>
      </button>
      <button className="flex gap-2 pl-[2px]">
        <BlogIcon />
        <span className="text-[16px]">Our Blog</span>
      </button>
    </div>
  );
}
