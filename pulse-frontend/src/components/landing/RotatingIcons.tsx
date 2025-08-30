import { Zap } from "lucide-react";
import Image from "next/image";
import type React from "react";

const RotatingIcons: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 md:px-6 mt-10">
      <h1 className="text-center max-w-1xl mx-auto text-4xl tracking-tighter text-white md:text-4xl lg:text-5xl">
        We notify you{" "}
        <span className="text-blue-200">when your users need you</span>
      </h1>

      <div className="flex items-center justify-center gap-8">
        <div className="rounded-full bg-red-600/20 p-4">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>

        <Zap className="text-white h-12 w-12" />

        <div className="rounded-full bg-blue-800/20 p-4">
          <Image
            src="/assets/gmail.svg"
            alt="Gmail Icon"
            width={34}
            height={34}
          />
        </div>
      </div>
    </div>
  );
};

export default RotatingIcons;
