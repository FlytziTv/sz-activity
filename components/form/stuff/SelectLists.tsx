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

import {
  Footprints,
  Heart,
  Hourglass,
  LucideIcon,
  Navigation,
  TentTree,
  Asterisk,
} from "lucide-react";

const type = [
  { title: "Privé", value: "private" },
  { title: "Public", value: "public" },
];

export default function SelectListsStatue({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <FieldGroup>
      <FieldLabel htmlFor="category">Type</FieldLabel>
      <Select
        name="category"
        defaultValue={defaultValue}
        key={defaultValue}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir un type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {type.map((cat) => (
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

const colorList = [
  { name: "Default", value: "#D2D2D2" },
  { name: "Rouge", value: "#ff0000" },
  { name: "Vert", value: "#00c950" },
  { name: "Bleu", value: "#2b7fff" },
  { name: "Jaune", value: "#ffff00" },
  { name: "Orange", value: "#ff6900" },
  { name: "Cyan", value: "#00ffff" },
  { name: "Violet", value: "#ad46ff" },
];

export function SelectListsColor({
  defaultValue,
  onValueChange,
}: {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <FieldGroup>
      <FieldLabel htmlFor="color">Couleur</FieldLabel>
      <Select
        name="color"
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        key={defaultValue}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir une couleur" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {colorList.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                <div
                  className="w-4 h-4 rounded-sm inline-block"
                  style={{ backgroundColor: cat.value }}
                />
                {cat.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FieldGroup>
  );
}

export const IconList = [
  { name: "Default", value: Asterisk },
  { name: "Empreintes", value: Footprints },
  { name: "Cœur", value: Heart },
  { name: "Sablier", value: Hourglass },
  { name: "Navigation", value: Navigation },
  { name: "Tente", value: TentTree },
];

export function SelectListsIcon({
  defaultValue,
  onValueChange,
}: {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <FieldGroup>
      <FieldLabel htmlFor="icon">Icône</FieldLabel>
      <Select
        name="icon"
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        key={defaultValue}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir une icône" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {IconList.map((cat) => (
              <SelectItem key={cat.name} value={cat.name}>
                <cat.value size={18} className="inline-block mr-2" />
                {cat.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FieldGroup>
  );
}
