"use client";

import { useMemo, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { updateHikeItems } from "@/lib/actions/hikes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ItemSelectCard, type Item } from "../items/item-select-card";
import Link from "next/link";
import { ITEM_HIKE_STATUS_LABELS } from "@/lib/labels";
import { getEffectiveWeight } from "@/lib/item-weight";

interface HikeItemPickerProps {
  hikeId: string;
  items: Item[];
  initialSelection: Record<string, number>;
}

export function HikeItemPicker({
  hikeId,
  items,
  initialSelection,
}: HikeItemPickerProps) {
  const [selection, setSelection] =
    useState<Record<string, number>>(initialSelection);
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calcul du poids total en grammes
  const totalWeight = useMemo(
    () =>
      items.reduce((total, item) => {
        const qty = selection[item.id];
        if (!qty) return total;
        const effectiveWeight = getEffectiveWeight({
          weight: item.weight,
          waterCapacityLiters: item.waterCapacityLiters ?? null,
        });
        return total + effectiveWeight * qty;
      }, 0),
    [items, selection],
  );

  // Éléments sélectionnés nécessitant de l'attention
  const flaggedItems = useMemo(
    () => items.filter((item) => selection[item.id] && item.status !== "OK"),
    [items, selection],
  );

  function toggle(item: Item, checked: boolean) {
    setSaved(false);
    setError(null);
    setSelection((prev) => {
      const next = { ...prev };
      if (checked) {
        next[item.id] = prev[item.id] ?? 1;
      } else {
        delete next[item.id];
      }
      return next;
    });
  }

  function setQuantity(itemId: string, quantity: number) {
    setSaved(false);
    setError(null);
    setSelection((prev) => ({ ...prev, [itemId]: quantity }));
  }

  async function handleSave() {
    setPending(true);
    setSaved(false);
    setError(null);

    const selections = Object.entries(selection).map(([itemId, quantity]) => ({
      itemId,
      quantity,
    }));

    try {
      const result = await updateHikeItems(hikeId, selections);
      if (result && "error" in result) {
        setError(
          typeof result.error === "string"
            ? result.error
            : "Une erreur est survenue lors de la sauvegarde.",
        );
      } else {
        setSaved(true);
      }
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Entête avec Poids et Bouton d'action */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-semibold">
          Poids du sac : {(totalWeight / 1000).toFixed(2)} kg ({totalWeight} g)
        </span>
        <Button type="button" onClick={handleSave} disabled={pending}>
          {pending
            ? "Enregistrement..."
            : saved
              ? "Enregistré !"
              : "Enregistrer la sélection"}
        </Button>
      </div>

      {/* Message d'erreur en cas d'échec de sauvegarde */}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      {/* Alerte pour les objets endommagés / perdus */}
      {flaggedItems.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="flex items-start gap-2 text-sm text-destructive px-4">
            <TriangleAlert className="size-4 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-medium">
                Certains items sélectionnés ont besoin d&apos;attention :
              </span>
              <ul className="list-disc pl-4 space-y-0.5">
                {flaggedItems.map((item) => (
                  <li key={item.id}>
                    <strong>{item.name}</strong> —{" "}
                    {ITEM_HIKE_STATUS_LABELS[item.status] ?? item.status}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des équipements */}
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Ton inventaire est vide, ajoute des items avant de préparer une rando.
          <Link href="/inventaire" className="text-primary hover:underline">
            Gérer mon inventaire
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-7 gap-2">
          {items.map((item) => (
            <ItemSelectCard
              key={item.id}
              item={item}
              selection={selection}
              toggle={toggle}
              setQuantity={setQuantity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
