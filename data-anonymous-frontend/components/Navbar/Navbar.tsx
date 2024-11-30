export default function Navbar() {
  return (
    <div className="h-[60px] flex items-center justify-between bg-green-500 p-6">
      <p className="text-xl text-white italic">a Board</p>
      <button className="bg-success text-[16px] w-[105px] h-10 text-white rounded-lg">
        Sign In
      </button>
    </div>
  );
}
