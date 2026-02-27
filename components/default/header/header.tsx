"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SZLogo } from "../icons/logo";
import UserProfile from "./UserProfile";
import Add from "./add";

const navItems = [
  { text: "Accueil", url: "/sz-app/dash" },
  { text: "Activité", url: "/sz-app/activity" },
  { text: "Explore", url: "/sz-app/explore" },
  { text: "Listes", url: "/sz-app/lists" },
  { text: "Équipement", url: "/sz-app/stuff" },
];

interface HeaderProps {
  user: {
    name: string;
    image?: string | null | undefined;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <div className="fixed top-0 right-0 left-0 p-2">
      <header className="w-full p-2 grid grid-cols-3 bg-[#090909] border rounded-xl">
        <div className="flex items-center justify-start">
          <SZLogo size={32} color="#FFFFFF" />
        </div>
        <nav className="flex flex-row items-center justify-center gap-2 ">
          {navItems.map((item) => (
            <ButtonNav key={item.url} url={item.url} text={item.text} />
          ))}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <Add />
          <UserProfile user={user} />
        </div>
      </header>
    </div>
  );
}

export function ButtonNav({ text, url }: { text: string; url: string }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(url);

  return (
    <Link
      href={url}
      className={` font-medium text-sm hover:text-[#F4F4F4] hover:bg-[#535353]/60 transition-colors duration-250 cursor-pointer px-4 py-1.5 rounded-sm ${
        isActive
          ? "bg-[#333333] text-[#FAFAFA] "
          : "text-[#bebebe] bg-transparent border-transparent"
      }`}
    >
      {text}
    </Link>
  );
}
