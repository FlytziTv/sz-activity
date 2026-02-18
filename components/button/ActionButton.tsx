"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import EditStuff from "./EditStuffButton";
import DelStuff from "./DelStuffButton";

interface StuffItem {
  id: string;
  name: string;
  brand?: string;
  category: string;
  weight?: number;
  url?: string;
  image?: string;
}

export default function ActionButton({ item }: { item: StuffItem }) {
  const [isDeleting] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"icon-sm"}
          className="hover:bg-black/10 focus-visible:ring-2"
        >
          <EllipsisVertical
            size={16}
            className={isDeleting ? "animate-pulse" : ""}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="p-0"
            onSelect={(e) => e.preventDefault()}
          >
            <EditStuff item={item} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-0"
            onSelect={(e) => e.preventDefault()}
          >
            <DelStuff itemId={item.id} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
