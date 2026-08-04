"use client";

import { useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleHikeItemConfirmed, startHike } from "@/lib/actions/hikes";
import { Button } from "@/components/ui/button";
import { ItemConfirmCard, type ConfirmItem } from "../items/item-select-card";

type HikeItem = {
  id: string;
  quantity: number;
  confirmed: boolean;
  item: ConfirmItem;
};

export function HikeConfirmChecklist({
  hikeId,
  hikeStatus,
  hikeItems,
}: {
  hikeId: string;
  hikeStatus: string;
  hikeItems: HikeItem[];
}) {
  const router = useRouter();
  const [optimisticItems, setOptimisticConfirmed] = useOptimistic(
    hikeItems,
    (state, { id, confirmed }: { id: string; confirmed: boolean }) =>
      state.map((hikeItem) =>
        hikeItem.id === id ? { ...hikeItem, confirmed } : hikeItem,
      ),
  );
  const [, startTransition] = useTransition();
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmedCount = optimisticItems.filter((hi) => hi.confirmed).length;
  const canEdit = hikeStatus === "PREPARING";

  function handleToggle(hikeItem: HikeItem, confirmed: boolean) {
    setError(null);
    startTransition(async () => {
      setOptimisticConfirmed({ id: hikeItem.id, confirmed });
      try {
        await toggleHikeItemConfirmed(hikeItem.id, confirmed);
      } catch {
        setError("Impossible de mettre à jour cet item.");
      } finally {
        router.refresh();
      }
    });
  }

  async function handleStart() {
    setStarting(true);
    setError(null);
    const result = await startHike(hikeId);
    setStarting(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-semibold">
          Sac confirmé : {confirmedCount}/{optimisticItems.length}
        </span>
        {canEdit && (
          <Button type="button" onClick={handleStart} disabled={starting}>
            {starting ? "Départ..." : "C'est parti !"}
          </Button>
        )}
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      <div className="grid grid-cols-7 gap-2">
        {optimisticItems.map((hikeItem) => (
          <ItemConfirmCard
            key={hikeItem.id}
            item={hikeItem.item}
            quantity={hikeItem.quantity}
            confirmed={hikeItem.confirmed}
            disabled={!canEdit}
            onToggle={(confirmed) => handleToggle(hikeItem, confirmed)}
          />
        ))}
      </div>
    </div>
  );
}
