export type ListDifficulty = "Facile" | "Modérée" | "Difficile" | "Ardu";

export type Activity = {
  id: number;
  name: string;
  loc: string;
  country: string;
  difficulty: ListDifficulty;
  banner: string;
  stats: {
    label: string;
    value: string;
  }[];

  // --------
  notes?: number;
  avis?: number;
  type?: string;
  description?: string;
  numberPhotos?: number;
  image?: string[];
};

export const activities: Activity[] = [
  {
    id: 1,
    name: "Lac d'Oô",
    loc: "Haute-Garonne",
    country: "France",
    difficulty: "Facile",
    banner:
      "https://mapetiterando.fr/wp-content/uploads/2023/04/lac-doo-une-randonnee-unique-pour-les-amoureux-de-la-nature.jpg",
    stats: [
      { label: "Distance", value: "3 km" },
      { label: "Dénivelé", value: "200 m" },
      { label: "Durée", value: "1h30" },
    ],

    notes: 4.5,
    avis: 530,
    type: "Boucle",
    numberPhotos: 120,
    description:
      "Le sentier suit une partie du célèbre GR10. La montée est régulière, serpentant à travers une forêt de hêtres qui offre une ombre salvatrice en été. L'arrivée au lac est spectaculaire : on débouche sur un cirque montagneux où trône une cascade monumentale de 275 mètres de haut qui se jette directement dans les eaux bleu-vert du lac.",
    image: [
      "https://www.maisondelarando.com/wp-content/uploads/2020/11/Randonnee-autour-du-lac-dOo-dans-les-Pyrenees.jpg",
    ],
  },
  {
    id: 2,
    name: "Les crêtes du Vercors",
    loc: "Vercors",
    country: "France",
    difficulty: "Modérée",
    banner:
      "https://mapetiterando.fr/wp-content/uploads/2025/12/vercors-alpine-ridge-trail-panorama-750x536.webp",
    stats: [
      { label: "Distance", value: "5 km" },
      { label: "Dénivelé", value: "350 m" },
      { label: "Durée", value: "2h00" },
    ],
  },
];
