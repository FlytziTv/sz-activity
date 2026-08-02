"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createHike } from "@/lib/actions/hikes";
import { closeDialog } from "@/lib/global/dialog-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";

export function HikeForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await createHike(null, formData);
    setPending(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    closeDialog();
    router.push(`/activites/${result.hikeId}`);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="hike-name">Nom</FieldLabel>
          <Input id="hike-name" name="name" placeholder="Lac d'Ancy" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="hike-location">Lieu</FieldLabel>
          <Input id="hike-location" name="location" placeholder="Massif des Vosges" />
        </Field>

        <Field>
          <FieldLabel htmlFor="hike-date">Date</FieldLabel>
          <Input id="hike-date" name="date" type="date" />
        </Field>

        {error && <FieldError>{error}</FieldError>}

        <Button type="submit" disabled={pending}>
          {pending ? "Création..." : "Créer la rando"}
        </Button>
      </FieldGroup>
    </form>
  );
}
