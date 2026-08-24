"use client";

import { useActionState, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import { confirm } from "@/lib/global/alert-dialog-store";

type Entry = { id: string; name: string; userId: string | null };
type FormState = { error: string } | null;

export function ManageList({
  items,
  createAction,
  deleteAction,
  placeholder,
  name,
}: {
  items: Entry[];
  createAction: (
    prevState: FormState,
    formData: FormData,
  ) => Promise<FormState>;
  deleteAction: (id: string) => Promise<void>;
  placeholder: string;
  name: string;
}) {
  const [state, formAction, pending] = useActionState(createAction, null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(item: Entry) {
    const confirmed = await confirm({
      title: `Supprimer ${item.name} ?`,
      description: "Les items existants ne seront plus reliés à cette entrée.",
      confirmLabel: "Supprimer",
      variant: "destructive",
    });
    if (!confirmed) return;

    setDeletingId(item.id);
    await deleteAction(item.id);
    setDeletingId(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <form action={formAction} className="flex flex-col gap-2">
        <Field orientation="horizontal" className="gap-2">
          <Input
            className="w-full"
            name="name"
            placeholder={placeholder}
            required
          />
          <Button
            className="px-3 cursor-pointer"
            type="submit"
            disabled={pending}
          >
            {pending ? "Ajout..." : "Ajouter"}
          </Button>
        </Field>
        {state?.error && <FieldError>{state.error}</FieldError>}
      </form>

      <div className="w-full flex flex-col gap-2">
        <h3 className="text-lg font-semibold">
          {name} par défaut (
          {items.filter((item) => item.userId === null).length})
        </h3>
        <ul className="flex flex-wrap flex-row gap-2">
          {items
            .filter((item) => item.userId === null)
            .map((item) => (
              <li key={item.id}>
                <Card size="sm" className="py-1.5">
                  <CardContent className="flex items-center gap-2">
                    <span>{item.name}</span>
                  </CardContent>
                </Card>
              </li>
            ))}
        </ul>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h3 className="text-lg font-semibold">
          {name} personnalisées (
          {items.filter((item) => item.userId !== null).length})
        </h3>
        <ul className="flex flex-wrap flex-row gap-2">
          {items
            .filter((item) => item.userId !== null)
            .map((item) => (
              <li key={item.id}>
                <Card size="sm" className="py-1.5">
                  <CardContent className="flex items-center gap-2">
                    <span>{item.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={deletingId === item.id}
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 />
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
