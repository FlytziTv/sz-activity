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

interface HeaderProps {
  user: {
    name: string;
    image?: string | null;
  };
}

// Fonction pour générer les initiales à partir du nom de l'utilisateur
const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase(); // Ex: "Alexis De Jesus" -> "AD"
  }
  return name.slice(0, 2).toUpperCase(); // Fallback si un seul nom
};

export default function Header({ user }: HeaderProps) {
  const initials = getInitials(user.name);

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
          <Link
            href="/sz-app/profile"
            className="h-8 w-8 relative flex items-center justify-center border border-[#333] rounded-full overflow-hidden hover:border-[#555] transition-colors bg-[#1a1a1a]"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-[10px] font-bold text-[#bebebe]">
                {initials}
              </span>
            )}
          </Link>
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
