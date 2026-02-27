"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SZLogo } from "../icons/logo";
import UserProfile from "./UserProfile";
import Add from "./add";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { text: "Accueil", url: "/sz-app/dash" },
  { text: "Activité", url: "/sz-app/activity" },
  { text: "Exploration", url: "/sz-app/exploration" },
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 right-0 left-0 p-2 z-50">
      <header className="w-full p-2 grid grid-cols-2 md:grid-cols-3 bg-[#090909] border rounded-xl">
        {/* Logo */}
        <div className="flex items-center justify-start">
          <SZLogo size={32} color="#FFFFFF" />
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex flex-row items-center justify-center gap-2">
          {navItems.map((item) => (
            <ButtonNav key={item.url} url={item.url} text={item.text} />
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 transition-transform duration-200">
          <Add />
          <UserProfile user={user} />
          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center h-8 w-8 border border-[#333] rounded-full bg-[#1a1a1a] text-[#bebebe] hover:border-[#555] transition-colors"
          >
            {menuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden mt-1 bg-[#090909] border rounded-xl p-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <ButtonNav
              key={item.url}
              url={item.url}
              text={item.text}
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ButtonNav({
  text,
  url,
  onClick,
}: {
  text: string;
  url: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(url);

  return (
    <Link
      href={url}
      onClick={onClick}
      className={`font-medium text-sm hover:text-[#F4F4F4] hover:bg-[#535353]/60 transition-colors duration-250 cursor-pointer px-4 py-1.5 rounded-sm ${
        isActive
          ? "bg-[#333333] text-[#FAFAFA]"
          : "text-[#bebebe] bg-transparent border-transparent"
      }`}
    >
      {text}
    </Link>
  );
}
