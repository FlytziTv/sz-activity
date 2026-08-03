"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { closeDialog, openDialog } from "@/lib/global/dialog-store";
import { ItemForm } from "./item-form";

type Category = { id: string; name: string };
type Brand = { id: string; name: string };
type Item = {
  id: string;
  name: string;
  weight: number | null;
  quantity: number;
  categoryId: string | null;
  imageUrl: string | null;
  brand: Brand | null;
  waterCapacityLiters: number | null;
};

export function EditItemButton({
  item,
  categories,
  brands,
}: {
  item: Item;
  categories: Category[];
  brands: Brand[];
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={() =>
        openDialog(
          <ItemForm
            item={item}
            categories={categories}
            brands={brands}
            onSuccess={closeDialog}
          />,
          {
            title: `Modifier ${item.name}`,
            description:
              "Laisse le champ photo vide pour garder l'image actuelle.",
          },
        )
      }
    >
      <Pencil />
    </Button>
  );
}
