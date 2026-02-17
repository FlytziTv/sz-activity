"use client";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function SelectStuff() {
  return (
    <FieldGroup>
      <FieldLabel htmlFor="category">Catégorie</FieldLabel>
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
  );
}
