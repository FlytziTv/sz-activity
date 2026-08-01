"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { closeDialog, openDialog } from "@/lib/global/dialog-store";
import { ItemForm } from "./item-form";

type Category = { id: string; name: string };
type Item = {
  id: string;
  name: string;
  weight: number;
  quantity: number;
  categoryId: string | null;
  imageUrl: string | null;
};

export function EditItemButton({
  item,
  categories,
}: {
  item: Item;
  categories: Category[];
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() =>
        openDialog(
          <ItemForm item={item} categories={categories} onSuccess={closeDialog} />,
          {
            title: `Modifier ${item.name}`,
            description: "Laisse le champ photo vide pour garder l'image actuelle.",
          }
        )
      }
    >
      <Pencil />
    </Button>
  );
}
