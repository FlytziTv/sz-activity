"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bookmark,
  LayoutDashboard,
  Map,
  TrendingUp,
  UserRound,
  LucideIcon,
} from "lucide-react";

const size_icons = 20;

export default function HeaderPhone() {
  const navLinks = [
    { url: "/sz-app/dash", text: "Accueil", icon: LayoutDashboard },
    { url: "/sz-app/save", text: "Saved", icon: Bookmark },
    { url: "/sz-app/map", text: "Map", icon: Map },
    { url: "/sz-app/activity", text: "Activity", icon: TrendingUp },
    { url: "/sz-app/profile", text: "Profile", icon: UserRound },
  ];

  return (
    <nav className="absolute bottom-0 right-0 left-0 flex flex-row items-center justify-around py-4">
      {navLinks.map((link) => (
        <ButtonNav
          key={link.url}
          url={link.url}
          text={link.text}
          icon={link.icon}
        />
      ))}
    </nav>
  );
}

export function ButtonNav({
  text,
  url,
  icon: Icon,
}: {
  text: string;
  url: string;
  icon: LucideIcon;
}) {
  const pathname = usePathname();
  const isActive = pathname === url;
  return (
    <Link href={url} className="group flex flex-col items-center gap-1">
      <Icon
        size={size_icons}
        className={` group-hover:text-[#F8F8FA] transition-colors ${
          isActive ? "text-[#F8F8FA]" : "text-[#535355]"
        }`}
      />
      <p
        className={`text-xs group-hover:text-[#F8F8FA] transition-colors ${isActive ? "text-[#F8F8FA]" : "text-[#535355]"}`}
      >
        {text}
      </p>
    </Link>
  );
}
