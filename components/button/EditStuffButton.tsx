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

import { Pencil } from "lucide-react";
import { updateStuff } from "@/actions/stuff";
import { useState } from "react";
import { FormGroup } from "../form/FormGroup";
import ImgUpload from "../form/stuff/ImgUpload";
import SelectStuff from "../form/stuff/SelectStuff";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface StuffItem {
  id: string;
  name: string;
  brand?: string;
  category: string;
  weight?: number;
  url?: string;
  image?: string;
}

export default function EditStuff({ item }: { item: StuffItem }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group px-1.5 py-1 hover:bg-black/10 w-full rounded-sm text-black text-sm flex items-center gap-2 hover:text-black transition-colors duration-300">
          <Pencil
            size={16}
            className="text-black group-hover:text-black transition-colors duration-300"
          />
          <p className="text-xs mt-1">Modifier</p>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <form
          action={async (formData) => {
            try {
              await updateStuff(formData);
              setOpen(false);
              toast.success("Modification sauvegardée");
            } catch (error) {
              toast.error("Erreur lors de la sauvegarde");
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Ajouter un équipement</DialogTitle>
            <DialogDescription>
              Remplissez les champs ci-dessous pour ajouter un nouvel
              équipement.
            </DialogDescription>
          </DialogHeader>

          {/* Champ caché pour envoyer l'ID à l'action */}
          <input type="hidden" name="id" value={item.id} />

          <div className="grid gap-4 py-4">
            <ImgUpload />

            <FormGroup
              name="name"
              label="Nom"
              type="text"
              defaultValue={item.name}
            />

            <FormGroup
              name="brand"
              label="Marque"
              type="text"
              defaultValue={item.brand || ""}
            />

            <SelectStuff defaultValue={item.category} />
            <FormGroup
              name="url"
              label="Lien (URL)"
              type="url"
              defaultValue={item.url || ""}
            />

            <FormGroup
              name="weight"
              label="Poids (g)"
              type="number"
              defaultValue={item.weight || 0}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                onClick={() => toast.error("Modification annulée")}
              >
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit">Sauvegarder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
