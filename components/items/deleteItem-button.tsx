"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { confirm } from "@/lib/global/alert-dialog-store";
import { deleteItem } from "@/lib/actions/items";

export function DeleteItemButton({
  itemId,
  itemName,
}: {
  itemId: string;
  itemName: string;
}) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    const confirmed = await confirm({
      title: `Supprimer ${itemName} ?`,
      description: "Cette action est irréversible.",
      confirmLabel: "Supprimer",
      variant: "destructive",
    });
    if (!confirmed) return;

    setPending(true);
    await deleteItem(itemId);
    setPending(false);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      disabled={pending}
      onClick={handleClick}
    >
      <Trash2 />
    </Button>
  );
}
