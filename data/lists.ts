import {
  Footprints,
  Heart,
  Hourglass,
  LucideIcon,
  Navigation,
  TentTree,
} from "lucide-react";

export type ListColor =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "orange";

export interface List {
  id: number;
  color: ListColor;
  name: string;
  icon: LucideIcon;
  type: "Privé" | "Public";
  url?: string;
  elements?: number;
}

export const lists: List[] = [
  {
    id: 1,
    color: "blue",
    name: "Randonnées",
    icon: Footprints,
    type: "Public",
    url: "/lists/randonnees",
    elements: 14,
  },
  {
    id: 2,
    color: "orange",
    name: "A faire",
    icon: Hourglass,
    type: "Privé",
    elements: 42,
  },
  {
    id: 3,
    color: "green",
    name: "Bivouac",
    icon: TentTree,
    type: "Privé",
    elements: 8,
  },
  {
    id: 4,
    color: "purple",
    name: "Position",
    icon: Navigation,
    type: "Privé",
    elements: 38,
  },
  {
    id: 5,
    color: "red",
    name: "Favoris",
    icon: Heart,
    type: "Privé",
    elements: 18,
  },
];
