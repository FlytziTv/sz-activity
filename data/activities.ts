export type Activity = {
  id: number;
  name: string;
  loc: string;
  difficulty: string;
  image: string;
  stats: {
    label: string;
    value: string;
  }[];
};

export const activities: Activity[] = [
  {
    id: 1,
    name: "Lac d'Oô",
    loc: "Haute-Garonne, France",
    difficulty: "Facile",
    image:
      "https://mapetiterando.fr/wp-content/uploads/2023/04/lac-doo-une-randonnee-unique-pour-les-amoureux-de-la-nature.jpg",
    stats: [
      { label: "Distance", value: "3 km" },
      { label: "Dénivelé", value: "200 m" },
      { label: "Durée", value: "1h30" },
    ],
  },
  {
    id: 2,
    name: "Les crêtes du Vercors",
    loc: "Vercors, France",
    difficulty: "Moyen",
    image:
      "https://mapetiterando.fr/wp-content/uploads/2025/12/vercors-alpine-ridge-trail-panorama-750x536.webp",
    stats: [
      { label: "Distance", value: "5 km" },
      { label: "Dénivelé", value: "350 m" },
      { label: "Durée", value: "2h00" },
    ],
  },
];
