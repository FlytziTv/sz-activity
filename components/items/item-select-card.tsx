"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ITEM_HIKE_STATUS_LABELS } from "@/lib/labels";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { getEffectiveWeight } from "@/lib/item-weight";

export type Item = {
  id: string;
  name: string;
  imageUrl: string | null;
  weight: number | null;
  quantity: number;
  status: string;
  category?: {
    name: string;
  } | null;
  waterCapacityLiters?: number | null;
};

interface ItemSelectCardProps {
  item: Item;
  selection: Record<string, number>;
  toggle: (item: Item, checked: boolean) => void;
  setQuantity: (itemId: string, quantity: number) => void;
}

export function ItemSelectCard({
  item,
  selection,
  toggle,
  setQuantity,
}: ItemSelectCardProps) {
  const checked = item.id in selection;

  return (
    <Card
      size="sm"
      className={cn("transition-colors", checked ? "ring-black/50" : "")}
    >
      <CardContent className="flex flex-col gap-3 px-3">
        <div className="relative overflow-hidden rounded-md w-full aspect-[4/3] bg-muted">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="160px"
              className="rounded-md object-cover"
            />
          ) : (
            <div className="flex w-full aspect-[4/3] items-center justify-center rounded-md">
              <ImageOff className="size-8 text-muted-foreground" />
            </div>
          )}

          {item.status !== "OK" && (
            <Badge
              variant="destructive"
              className="absolute bottom-2 right-2 text-xs"
            >
              {ITEM_HIKE_STATUS_LABELS[item.status] ?? item.status}
            </Badge>
          )}

          <Badge className="absolute top-2 left-2 text-xs">
            {item.quantity}
          </Badge>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-1 min-w-0 flex-col cursor-pointer select-none">
            <span className="truncate text-base font-medium">{item.name}</span>
            <span className="text-sm text-muted-foreground">
              {item.category?.name ?? "Sans catégorie"} ·{" "}
              {getEffectiveWeight({
                weight: item.weight,
                waterCapacityLiters: item.waterCapacityLiters ?? null,
              })}{" "}
              g
              {item.waterCapacityLiters != null &&
                ` (${item.weight ?? 0} g + ${item.waterCapacityLiters} L)`}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="h-8 w-fit min-w-0 rounded-lg border border-input bg-transparent flex items-center px-2.5 py-1">
              <Checkbox
                id={`item-${item.id}`}
                checked={checked}
                onCheckedChange={(checked) => toggle(item, checked === true)}
                className="size-4 rounded border-gray-300 accent-primary cursor-pointer"
              />
            </div>

            {checked && (
              <Input
                type="number"
                min={1}
                max={item.quantity}
                step={1}
                value={selection[item.id] ?? 1}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  const clamped = isNaN(val) || val < 1 ? 1 : val;
                  setQuantity(item.id, Math.min(clamped, item.quantity));
                }}
                className="w-15"
                aria-label={`Quantité pour ${item.name}`}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
