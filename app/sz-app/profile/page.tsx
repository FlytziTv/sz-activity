import HeaderPhone from "@/components/sz/headerPhone";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const username = "Alexis DE JESUS";
const pos = "Triel-sur-Seine, France";

export default function Profile() {
  return (
    <main className="flex w-full flex-col p-4 items-center justify-center font-sans">
      <HeaderPhone />
      <div className="w-full flex flex-col items-center gap-4">
        <div className="w-full aspect-16/6 rounded-lg relative ">
          <div className="flex flex-col items-center justify-center absolute inset-0 z-10">
            <h1 className="text-4xl font-bold uppercase">{username}</h1>
            <p className="text-base font-medium ">{pos}</p>
          </div>
          <Image
            src={
              "https://i.pinimg.com/1200x/ba/45/40/ba454082f03a954ca7dda614c4eb49cf.jpg"
            }
            alt="Profile Image"
            fill
            className="object-cover rounded-lg object-center opacity-75"
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-4 h-20">
          <div className="bg-[#141414] w-full h-full rounded-lg px-2 py-1"></div>
          <div className="bg-[#141414] w-full h-full rounded-lg px-2 py-1"></div>
        </div>
      </div>
    </main>
  );
}
