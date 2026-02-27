"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../../ui/button";
import { addStuff } from "@/actions/stuff";
import { FormGroup } from "../../default/form/FormGroup";
import ImgUpload from "../../default/form/content/ImgUpload";
import SelectStuff from "./content/SelectStuff";

export default function StuffForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <form
          action={async (formData) => {
            await addStuff(formData);
            onOpenChange(false); // Ferme le dialogue après l'ajout
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

            <FormGroup
              name="name"
              label="Nom"
              type="text"
              placeholder="Ex: Sac à dos 40L"
            />

            <FormGroup
              name="brand"
              label="Marque"
              type="text"
              placeholder="Ex: Osprey"
            />

            <SelectStuff />

            <FormGroup
              name="url"
              label="Lien (URL)"
              type="url"
              placeholder="https://..."
            />

            <FormGroup
              name="weight"
              label="Poids (g)"
              type="number"
              placeholder="Ex: 850"
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
