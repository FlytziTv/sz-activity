"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  return (
    <nav className="bg-[#242424]/90 border border-[#303030] p-1 rounded-full flex flex-row items-center gap-1">
      <ButtonNav url="/" text="Home" />
      <ButtonNav url="/explore" text="Explore" />
      <ButtonNav url="/lists" text="Lists" />
      <ButtonNav url="/profile" text="Profile" />
    </nav>
  );
}

export function ButtonNav({ text, url }: { text: string; url: string }) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={`font-medium text-sm text-[#bebebe] hover:text-[#F4F4F4] transition-colors duration-150 cursor-pointer px-4 py-1.5 rounded-full ${
        isActive ? "bg-[#3E3E3E]" : "bg-transparent"
      }`}
    >
      {text}
    </Link>
  );
}
