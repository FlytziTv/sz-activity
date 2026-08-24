"use client";

import { Button } from "@/components/ui/button";
import { closeDialog, openDialog } from "@/lib/global/dialog-store";
import { ItemForm } from "./item-form";

type Category = { id: string; name: string };
type Brand = { id: string; name: string };

export function NewItemButton({
  categories,
  brands,
}: {
  categories: Category[];
  brands: Brand[];
}) {
  return (
    <Button
      onClick={() =>
        openDialog(
          <ItemForm categories={categories} brands={brands} onSuccess={closeDialog} />,
          {
            title: "Nouvel équipement",
            description: "Ajoutez un nouvel équipement à votre inventaire.",
          },
        )
      }
    >
      Nouvel équipement
    </Button>
  );
}
