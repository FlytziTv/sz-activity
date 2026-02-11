// import Sleeps from "@/components/items/sleeps";
// import Weight from "@/components/items/weight";
import HeaderPhone from "@/components/sz/headerPhone";
import Link from "next/link";
// import { Plus, Settings } from "lucide-react";
// import Link from "next/link";

// const size_icons = 20;

export default function Dashboard() {
  return (
    <main className="flex w-full flex-col p-4 items-center justify-center font-sans">
      <HeaderPhone />

      <div className="flex flex-col w-full items-start">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        {/* <div className="flex flex-row items-center gap-2">
          <Link
            href="/"
            className="bg-transparent hover:bg-[#171717] p-2 rounded-full"
          >
            <Settings size={size_icons} />
          </Link>
          <Link
            href="/"
            className="bg-transparent hover:bg-[#171717] p-2 rounded-full"
          >
            <Plus size={size_icons} />
          </Link>
        </div> */}
        <div className="grid grid-cols-2 auto-rows-fr gap-2 w-full">
          <div className="aspect-square bg-red-300 w-full rounded-xl"></div>
        </div>
      </div>
    </main>
  );
}
