import Image from "next/image";

import notebookImage from "../../../public/images/notebook.png";

import { SignInForm } from "@/components";

export default function SignInPage() {
  return (
    <div className="flex flex-col-reverse justify-between sm:flex-row bg-green-500 h-screen">
      <div className="w:full sm:w-[56%] bg-green-500 sm:h-screen flex flex-col items-center justify-center">
        <div className="w-full sm:w-[384px] mb-24 sm:mb-20 px-4 sm:px-0">
          <h2 className="text-[28px] text-white mb-6 font-semibold">Sign In</h2>
          <SignInForm />
        </div>
      </div>
      <div className="w-full sm:w-[44%] bg-green-300 sm:h-screen rounded-b-[36px] sm:rounded-l-[36px] flex flex-col items-center justify-center gap-6">
        <Image alt="notebook" src={notebookImage} width={300} height={230} />
        <h3 className="text-[28px] italic text-white font-semibold">a Board</h3>
      </div>
    </div>
  );
}
