export type StuffType =
  // --- Vêtements (Layering) ---
  | "chaussures"
  | "vetement_pluie" // Vestes hardshell, ponchos
  | "couche_isolee" // Doudounes, polaires
  | "bas" // Pantalons, shorts
  | "sous_couche" // T-shirts techniques, mérinos

  // --- Portage & Couchage ---
  | "sac_a_dos"
  | "tente"
  | "couchage" // Sac de couchage, liner
  | "matelas"

  // --- Cuisine & Hydratation ---
  | "cuisine" // Réchaud, popote
  | "hydratation" // Gourdes, filtres à eau
  | "alimentation" // Lyophilisés, barres

  // --- Technique & Accessoires ---
  | "eclairage" // Frontales, lanternes
  | "hygiene" // Trousse de secours, pelle, savon
  | "orientation" // GPS, boussole, carte
  | "accessoire"; // Bâtons, couteaux, powerbank

export interface Stuff {
  id: number;
  image: string;
  name: string;
  brand: string;
  type: StuffType;
  url: string;
  weight?: number; // Poids en grammes (essentiel pour le bivouac !)
}

export const stuffs: Stuff[] = [
  {
    id: 1,
    image:
      "https://cdn.dam.salomon.com/b78b22a9-a540-4089-989e-b31b00b817b3/L49138400/PNG-2000px-max-72dpi.png?width=2000&fit=cover&optimize=low&bg-color=ffffff&format=pjpg",
    name: "QUEST 5 GORE-TEX",
    brand: "Salomon",
    type: "chaussures",
    url: "https://www.salomon.com/fr-fr/product/quest-5-gore-tex-li8737/L49138400",
    weight: 1310,
  },
  {
    id: 2,
    image:
      "https://contents.mediadecathlon.com/p2784836/k$11922a30790906a31c804f1652c4701e/sq/matelas-gonflable-de-trekking-taille-l-180-x-52cm-mt500.jpg?format=auto&f=1200x1200",
    name: "MT500 Air L",
    brand: "Forclaz",
    type: "matelas",
    url: "https://www.decathlon.fr/p/matelas-gonflable-de-trekking-taille-l-180-x-52cm-mt500/_/R-p-189392?mc=8799965&c=incolore",
    weight: 585,
  },
  {
    id: 3,
    image:
      "https://contents.mediadecathlon.com/p3054186/k$fa815c962d0bc60084748cfe081675ac/sq/tente-tarp-de-trekking-1-place-ultra-legere-et-ultra-compacte-mt900.jpg?format=auto&f=1200x1200",
    name: "MT900 Tarp 1P",
    brand: "Forclaz",
    type: "tente",
    url: "https://www.decathlon.fr/p/tente-tarp-de-trekking-1-place-ultra-legere-et-ultra-compacte-mt900/_/R-p-343262?mc=8968612&c=noir_gris",
    weight: 930,
  },
  {
    id: 4,
    image:
      "https://contents.mediadecathlon.com/p2585159/k$d4976fdfcecf843f126f11b6183f431f/sq/sac-de-couchage-de-trekking-5c-mt500.jpg?format=auto&f=240x240",
    name: "MT500 5°C Synthétique",
    brand: "Forclaz",
    type: "couchage",
    url: "https://www.decathlon.fr/p/sac-de-couchage-de-trekking-5degc-mt500/_/R-p-346446?mc=8799899&c=noir",
    weight: 1200,
  },
];
