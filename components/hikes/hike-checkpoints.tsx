"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import {
  createCheckPoint,
  deleteCheckPoint,
  completeHike,
} from "@/lib/actions/hikes";
import { confirm } from "@/lib/global/alert-dialog-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import ItemCheckPointCard from "../items/item-checkpoint-card";

type CheckPoint = {
  id: string;
  label: string | null;
  note: string | null;
  createdAt: Date;
};

export type ReviewHikeItem = {
  id: string;
  statusAfter: string | null;
  item: { name: string };
};

export function HikeCheckpoints({
  hikeId,
  hikeStatus,
  checkPoints,
  hikeItems,
}: {
  hikeId: string;
  hikeStatus: string;
  checkPoints: CheckPoint[];
  hikeItems: ReviewHikeItem[];
}) {
  const router = useRouter();
  const createCheckPointWithHikeId = createCheckPoint.bind(null, hikeId);
  const [state, formAction, pending] = useActionState(
    createCheckPointWithHikeId,
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);
  const [completeError, setCompleteError] = useState<string | null>(null);

  const canEdit = hikeStatus === "IN_PROGRESS";

  async function handleDelete(checkPoint: CheckPoint) {
    const confirmed = await confirm({
      title: `Supprimer "${checkPoint.label ?? "ce check-point"}" ?`,
      description: "Cette action est irréversible.",
      confirmLabel: "Supprimer",
      variant: "destructive",
    });
    if (!confirmed) return;

    setDeletingId(checkPoint.id);
    await deleteCheckPoint(checkPoint.id);
    setDeletingId(null);
    router.refresh();
  }

  async function handleComplete() {
    setCompleteError(null);
    setCompleting(true);
    const result = await completeHike(hikeId);
    setCompleting(false);
    if ("error" in result) {
      setCompleteError(result.error);
      return;
    }
    router.push(`/activites/${hikeId}?step=bilan`);
  }

  return (
    <div className="flex flex-col gap-4">
      {canEdit && (
        <div className="flex items-center justify-end">
          <Button type="button" onClick={handleComplete} disabled={completing}>
            {completing ? "Clôture..." : "Terminer la rando"}
          </Button>
        </div>
      )}

      {completeError && (
        <p className="text-sm font-medium text-destructive">{completeError}</p>
      )}

      {canEdit && (
        <form action={formAction} className="grid grid-cols-[400px_1fr] gap-6">
          <Card>
            <CardHeader className="gap-0">
              <CardTitle>Ajouter un check-point</CardTitle>
              <CardDescription>
                Entrez les détails du check-point ci-dessous.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <FieldGroup>
                <Field orientation="responsive">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="checkpoint-label">Label</FieldLabel>
                      <Input
                        id="checkpoint-label"
                        name="label"
                        placeholder="Pause déjeuner"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="checkpoint-note">Note</FieldLabel>
                      <Textarea
                        id="checkpoint-note"
                        name="note"
                        className="resize-none max-h-24 h-24"
                        placeholder="Rien oublié par terre, tout est bon"
                      />
                    </Field>
                  </FieldGroup>
                </Field>
                {state && "error" in state && (
                  <FieldError>{state.error}</FieldError>
                )}
                <Button type="submit" disabled={pending}>
                  {pending ? "Ajout..." : "Ajouter un check-point"}
                </Button>
              </FieldGroup>
            </CardContent>
          </Card>

          {hikeItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>État du matos</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-4">
                {hikeItems.map((hikeItem) => (
                  <ItemCheckPointCard key={hikeItem.id} hikeItem={hikeItem} />
                ))}
              </CardContent>
            </Card>
          )}
        </form>
      )}

      {checkPoints.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucun check-point pour l&apos;instant.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {checkPoints.map((checkPoint) => (
            <li key={checkPoint.id}>
              <Card size="sm">
                <CardContent className="flex items-center gap-3">
                  <div className="flex flex-1 min-w-0 flex-col">
                    <span className="truncate font-medium">
                      {checkPoint.label ?? "Check-point"}
                    </span>
                    {checkPoint.note && (
                      <span className="text-sm text-muted-foreground">
                        {checkPoint.note}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(checkPoint.createdAt).toLocaleTimeString(
                        "fr-FR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </span>
                  </div>
                  {canEdit && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={deletingId === checkPoint.id}
                      onClick={() => handleDelete(checkPoint)}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
