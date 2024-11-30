import Image from "next/image";

import notebookImage from "../../../public/images/notebook.png";

import { SignInForm } from "@/components";

export default function SignInPage() {
  return (
    <div className="flex bg-green-500">
      <div className="w-[800px] bg-green-500 h-screen flex flex-col items-center justify-center">
        <div className="w-[384px] mb-20">
          <h2 className="text-[28px] text-white mb-6 font-semibold">Sign In</h2>
          <SignInForm />
        </div>
      </div>
      <div className="w-[640px] bg-green-300 h-screen rounded-l-[36px] flex flex-col items-center justify-center gap-6">
        <Image alt="notebook" src={notebookImage} width={300} height={230} />
        <h3 className="text-[28px] italic text-white font-semibold">a Board</h3>
      </div>
    </div>
  );
}
