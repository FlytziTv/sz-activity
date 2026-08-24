"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { createStatusSplit, deleteStatusSplit } from "@/lib/actions/hikes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HIKE_ITEM_STATUS_AFTER_LABELS } from "@/lib/labels";
import type { ReviewHikeItem } from "../hikes/hike-checkpoints";

const SPLITTABLE_STATUSES = ["LOST", "DAMAGED", "CONSUMED"] as const;
type SplittableStatus = (typeof SPLITTABLE_STATUSES)[number];

export default function ItemCheckPointCard({
  hikeItem,
  canEdit,
}: {
  hikeItem: ReviewHikeItem;
  canEdit: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<SplittableStatus>("LOST");
  const [quantity, setQuantity] = useState(1);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const remaining =
    hikeItem.quantity -
    hikeItem.statusSplits.reduce((total, split) => total + split.quantity, 0);

  async function handleAddSplit() {
    setError(null);
    setPending(true);
    const result = await createStatusSplit(hikeItem.id, status, quantity);
    setPending(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setQuantity(1);
    router.refresh();
  }

  async function handleDeleteSplit(splitId: string) {
    setDeletingId(splitId);
    await deleteStatusSplit(splitId);
    setDeletingId(null);
    router.refresh();
  }

  return (
    <Card className="rounded-lg px-3 py-2">
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium">
            {hikeItem.item.name}
          </span>
          <Badge variant="outline">{remaining} OK</Badge>
        </div>

        {hikeItem.statusSplits.length > 0 && (
          <ul className="flex flex-col gap-1">
            {hikeItem.statusSplits.map((split) => (
              <li
                key={split.id}
                className="flex items-center justify-between gap-2 text-sm text-muted-foreground"
              >
                <span>
                  {split.quantity}{" "}
                  {HIKE_ITEM_STATUS_AFTER_LABELS[split.status] ?? split.status}
                </span>
                {canEdit && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={deletingId === split.id}
                    onClick={() => handleDeleteSplit(split.id)}
                  >
                    <X className="size-3.5" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}

        {canEdit && remaining > 0 && (
          <div className="flex items-center gap-2">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as SplittableStatus)}
            >
              <SelectTrigger size="sm" className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  {SPLITTABLE_STATUSES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {HIKE_ITEM_STATUS_AFTER_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="number"
              min={1}
              max={remaining}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                const clamped = isNaN(val) || val < 1 ? 1 : val;
                setQuantity(Math.min(clamped, remaining));
              }}
              className="w-16"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleAddSplit}
              disabled={pending}
            >
              +
            </Button>
          </div>
        )}

        {error && <p className="text-xs text-destructive">{error}</p>}
      </CardContent>
    </Card>
  );
}
