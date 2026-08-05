"use client";

import { useActionState } from "react";
import { submitHikeBilan } from "@/lib/actions/hikes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { HIKE_ITEM_STATUS_AFTER_LABELS } from "@/lib/labels";

type BilanHikeItem = {
  id: string;
  quantity: number;
  item: { name: string };
  statusSplits: { id: string; status: string; quantity: number }[];
};

export function HikeBilan({
  hikeId,
  hikeItems,
  actualDistance,
  actualDuration,
  actualElevation,
}: {
  hikeId: string;
  hikeItems: BilanHikeItem[];
  actualDistance: number | null;
  actualDuration: number | null;
  actualElevation: number | null;
}) {
  const submitBilanWithHikeId = submitHikeBilan.bind(null, hikeId);
  const [state, formAction, pending] = useActionState(
    submitBilanWithHikeId,
    null,
  );

  const validated =
    actualDistance !== null || actualDuration !== null || actualElevation !== null;

  return (
    <div className="grid grid-cols-[400px_1fr] gap-6">
      <Card>
        <CardHeader className="gap-0">
          <CardTitle>Stats de la rando</CardTitle>
          <CardDescription>
            {validated
              ? "Bilan validé."
              : "Entrez les stats réelles de la sortie."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {validated ? (
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Distance</dt>
                <dd>{actualDistance !== null ? `${actualDistance} km` : "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Durée</dt>
                <dd>{actualDuration !== null ? `${actualDuration} min` : "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Dénivelé</dt>
                <dd>
                  {actualElevation !== null ? `${actualElevation} m` : "—"}
                </dd>
              </div>
            </dl>
          ) : (
            <form action={formAction}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="actualDistance">
                    Distance (km)
                  </FieldLabel>
                  <Input
                    id="actualDistance"
                    name="actualDistance"
                    type="number"
                    step="0.1"
                    min={0}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="actualDuration">
                    Durée (minutes)
                  </FieldLabel>
                  <Input
                    id="actualDuration"
                    name="actualDuration"
                    type="number"
                    step="1"
                    min={0}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="actualElevation">
                    Dénivelé (m)
                  </FieldLabel>
                  <Input
                    id="actualElevation"
                    name="actualElevation"
                    type="number"
                    step="1"
                    min={0}
                  />
                </Field>
                {state && "error" in state && (
                  <FieldError>{state.error}</FieldError>
                )}
                <Button type="submit" disabled={pending}>
                  {pending ? "Validation..." : "Valider le bilan"}
                </Button>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>

      {hikeItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bilan du matos</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-4 gap-4">
            {hikeItems.map((hikeItem) => {
              const splitTotal = hikeItem.statusSplits.reduce(
                (total, split) => total + split.quantity,
                0,
              );
              const remaining = hikeItem.quantity - splitTotal;
              return (
                <Card key={hikeItem.id} className="rounded-lg px-3 py-2">
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
                            className="text-sm text-muted-foreground"
                          >
                            {split.quantity}{" "}
                            {HIKE_ITEM_STATUS_AFTER_LABELS[split.status] ??
                              split.status}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
