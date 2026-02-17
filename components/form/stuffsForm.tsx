"use client";

import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { addStuff } from "@/actions/addstuff";
import { useState } from "react";

const categories = [
  // --- Vêtements ---
  { title: "Chaussures", value: "chaussures" },
  { title: "Vêtement de pluie", value: "vetement_pluie" },
  { title: "Couche isolee", value: "couche_isolee" },
  { title: "Bas", value: "bas" },
  { title: "Sous couche", value: "sous_couche" },

  // --- Portage & Couchage ---
  { title: "Sac à dos", value: "sac_a_dos" },
  { title: "Tente", value: "tente" },
  { title: "Couchage", value: "couchage" },
  { title: "Matelas", value: "matelas" },

  // --- Cuisine & Hydratation ---
  { title: "Cuisine", value: "cuisine" },
  { title: "Hydratation", value: "hydratation" },
  { title: "Alimentation", value: "alimentation" },

  // --- Technique & Accessoires ---
  { title: "Éclairage", value: "eclairage" },
  { title: "Hygiène", value: "hygiene" },
  { title: "Orientation", value: "orientation" },
  { title: "Accessoire", value: "accessoire" },
];

export default function StuffForm() {
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
            <FieldGroup>
              <FieldLabel htmlFor="name">Nom</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Sac à dos 40L"
                required
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="brand">Marque</FieldLabel>
              <Input id="brand" name="brand" placeholder="Ex: Osprey" />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="category">Catégorie</FieldLabel>
              {/* Le Select de Shadcn a besoin d'un input caché pour fonctionner avec les formulaires natifs */}
              <Select name="category" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="url">Lien (URL)</FieldLabel>
              <Input id="url" name="url" type="url" placeholder="https://..." />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="weight">Poids (g)</FieldLabel>
              <Input
                id="weight"
                name="weight"
                type="number"
                placeholder="Ex: 850"
              />
            </FieldGroup>
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
