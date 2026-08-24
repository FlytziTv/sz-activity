"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { confirm } from "@/lib/global/alert-dialog-store";
import { deleteHike } from "@/lib/actions/hikes";

export function DeleteHikeButton({ hikeId, hikeName }: { hikeId: string; hikeName: string }) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    const confirmed = await confirm({
      title: `Supprimer ${hikeName} ?`,
      description: "Cette action est irréversible.",
      confirmLabel: "Supprimer",
      variant: "destructive",
    });
    if (!confirmed) return;

    setPending(true);
    await deleteHike(hikeId);
    setPending(false);
  }

  return (
    <Button type="button" variant="ghost" size="icon-sm" disabled={pending} onClick={handleClick}>
      <Trash2 />
    </Button>
  );
}
