"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { addStuff } from "@/actions/stuff";
import { useState } from "react";
import { FormGroup } from "../FormGroup";
import ImgUpload from "./ImgUpload";
import SelectStuff from "./SelectStuff";

export default function EditStuffForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter un équipement</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <form
          action={async (formData) => {
            await addStuff(formData);
            setOpen(false); // Ferme le dialogue après l'ajout
          }}
        >
          <DialogHeader>
            <DialogTitle>Ajouter un équipement</DialogTitle>
            <DialogDescription>
              Remplissez les champs ci-dessous pour ajouter un nouvel
              équipement.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <ImgUpload />

            <FormGroup name="name" label="Nom" type="text" defaultValue="" />

            <FormGroup
              name="brand"
              label="Marque"
              type="text"
              defaultValue=""
            />

            <SelectStuff />

            <FormGroup
              name="url"
              label="Lien (URL)"
              type="url"
              defaultValue=""
            />

            <FormGroup
              name="weight"
              label="Poids (g)"
              type="number"
              defaultValue=""
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
