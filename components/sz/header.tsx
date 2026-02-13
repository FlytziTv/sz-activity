"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SZLogo } from "../icons/logo";
import Image from "next/image";

const navItems = [
  { text: "Accueil", url: "/sz-app/dash" },
  { text: "Activité", url: "/sz-app/activity" },
  { text: "Explore", url: "/sz-app/map" },
  { text: "Listes", url: "/sz-app/lists" },
  { text: "Équipement", url: "/sz-app/stuff" },
];

export default function Header() {
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
        <div className="flex items-center justify-end">
          {/* <button className="font-medium text-sm hover:text-[#F4F4F4] hover:bg-[#535353]/60 transition-colors duration-250 cursor-pointer px-4 py-1.5 rounded-sm text-[#bebebe] bg-transparent border-transparent">
            Se connecter
          </button> */}
          <Link
            href="/sz-app/profile"
            className="h-full relative aspect-square"
          >
            <Image
              src="https://i.pinimg.com/736x/d4/42/9d/d4429d024e17ba90cd7da6356cc2be01.jpg"
              alt="Profile"
              fill
              className="absolute object-cover rounded-full aspect-square"
            />
          </Link>
        </div>
      </header>
    </div>
  );
}

export function ButtonNav({ text, url }: { text: string; url: string }) {
  const pathname = usePathname();
  const isActive = pathname === url;

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
