"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { changeItemStatus } from "@/lib/actions/items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { ITEM_HIKE_STATUS_LABELS } from "@/lib/labels";

const SPLITTABLE_STATUSES = ["DAMAGED", "LOST", "TO_REPLACE"] as const;
type SplittableStatus = (typeof SPLITTABLE_STATUSES)[number];

type PickerItem = {
  id: string;
  name: string;
  quantity: number;
  status: string;
};

export function ChangeItemStatusFlow({
  items,
  onSuccess,
}: {
  items: PickerItem[];
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<PickerItem | null>(null);
  const [status, setStatus] = useState<SplittableStatus>("DAMAGED");
  const [quantity, setQuantity] = useState(1);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleSubmit() {
    if (!selected) return;
    setError(null);
    setPending(true);
    const result = await changeItemStatus(selected.id, status, quantity);
    setPending(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    router.refresh();
    onSuccess();
  }

  if (!selected) {
    return (
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Rechercher un item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex max-h-80 flex-col gap-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun item trouvé.
            </p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelected(item);
                  setQuantity(1);
                  setStatus("DAMAGED");
                  setError(null);
                }}
                className="flex items-center justify-between gap-2 rounded-lg border border-input px-3 py-2 text-left text-sm hover:bg-muted"
              >
                <span className="truncate">{item.name}</span>
                <span className="text-muted-foreground">× {item.quantity}</span>
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <FieldGroup>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-fit"
        onClick={() => setSelected(null)}
      >
        ← Retour à la liste
      </Button>

      <Field>
        <FieldLabel>{selected.name}</FieldLabel>
        <p className="text-sm text-muted-foreground">
          {selected.quantity} en stock actuellement.
        </p>
      </Field>

      <Field orientation="responsive">
        <Field>
          <FieldLabel htmlFor="split-quantity">Quantité concernée</FieldLabel>
          <Input
            id="split-quantity"
            type="number"
            min={1}
            max={selected.quantity}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              const clamped = isNaN(val) || val < 1 ? 1 : val;
              setQuantity(Math.min(clamped, selected.quantity));
            }}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="split-status">Nouveau statut</FieldLabel>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as SplittableStatus)}
          >
            <SelectTrigger id="split-status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SPLITTABLE_STATUSES.map((value) => (
                  <SelectItem key={value} value={value}>
                    {ITEM_HIKE_STATUS_LABELS[value] ?? value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </Field>

      {error && <FieldError>{error}</FieldError>}

      <Button type="button" onClick={handleSubmit} disabled={pending}>
        {pending ? "Enregistrement..." : "Confirmer"}
      </Button>
    </FieldGroup>
  );
}
