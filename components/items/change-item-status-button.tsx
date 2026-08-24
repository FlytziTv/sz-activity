"use client";

import { Button } from "@/components/ui/button";
import { closeDialog, openDialog } from "@/lib/global/dialog-store";
import { ChangeItemStatusFlow } from "./change-item-status-flow";

type PickerItem = {
  id: string;
  name: string;
  quantity: number;
  status: string;
};

export function ChangeItemStatusButton({ items }: { items: PickerItem[] }) {
  return (
    <Button
      variant="outline"
      onClick={() =>
        openDialog(
          <ChangeItemStatusFlow items={items} onSuccess={closeDialog} />,
          {
            title: "Nouveau statut",
            description:
              "Choisis un item, la quantité concernée, puis le nouveau statut.",
          },
        )
      }
    >
      Nouveau statut
    </Button>
  );
}
