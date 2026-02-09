import HeaderPhone from "@/components/sz/headerPhone";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";

const size_icons = 20;

export default function Dashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-black">
      <main className="flex min-h-screen w-full flex-col items-center p-4">
        <HeaderPhone />

        <div className="flex flex-row w-full justify-between items-center">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex flex-row items-center gap-2">
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
          </div>
        </div>
      </main>
    </div>
  );
}
