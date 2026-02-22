"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "../buttons/LogoutButton";
import { Bug, LucideIcon, UserRound, ExternalLink } from "lucide-react";

interface User {
  name: string;
  image?: string | null | undefined;
}

// Fonction pour générer les initiales à partir du nom de l'utilisateur
const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase(); // Ex: "Alexis De Jesus" -> "AD"
  }
  return name.slice(0, 2).toUpperCase(); // Fallback si un seul nom
};

export default function UserProfile({ user }: { user: User }) {
  const initials = getInitials(user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-8 w-8 relative flex items-center justify-center border border-[#333] rounded-full overflow-hidden hover:border-[#555] transition-colors bg-[#1a1a1a]">
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
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Actions icon={UserRound} link="/sz-app/profile" text="Profile" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Actions icon={ExternalLink} link="/sz-app/github" text="Github" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Actions icon={Bug} link="/sz-app/dash" text="Support" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Actions({
  icon,
  link,
  text,
}: {
  icon: LucideIcon;
  link: string;
  text: string;
}) {
  const Icon = icon;

  return (
    <Link href={link} className="flex flex-row gap-2 items-center">
      <Icon size={14} className="text-black " />
      {text}
    </Link>
  );
}
