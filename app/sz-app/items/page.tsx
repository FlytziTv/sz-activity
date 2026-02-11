import HeaderPhone from "@/components/sz/headerPhone";
import Image from "next/image";
import Link from "next/link";
// import { SquareArrowOutUpRight } from "lucide-react";
// import Link from "next/link";

const fakeItems = [
  {
    img: "https://cdn.dam.salomon.com/b78b22a9-a540-4089-989e-b31b00b817b3/L49138400/PNG-2000px-max-72dpi.png?width=2000&fit=cover&optimize=low&bg-color=ffffff&format=pjpg",
    name: "QUEST 5 GORE TEX",
    marque: "Salomon",
    type: "Chaussure",
    url: "https://www.salomon.com/fr-fr/product/quest-5-gore-tex-li8737/L49138400",
  },
  {
    img: "https://contents.mediadecathlon.com/p2784836/k$11922a30790906a31c804f1652c4701e/sq/matelas-gonflable-de-trekking-taille-l-180-x-52cm-mt500.jpg?format=auto&f=1200x1200",
    name: "MT500",
    marque: "SIMOND",
    type: "Matelas de sol",
    url: "https://www.decathlon.fr/p/matelas-gonflable-de-trekking-taille-l-180-x-52cm-mt500/_/R-p-189392?mc=8799965&c=incolore",
  },
  {
    img: "https://contents.mediadecathlon.com/p3054186/k$fa815c962d0bc60084748cfe081675ac/sq/tente-tarp-de-trekking-1-place-ultra-legere-et-ultra-compacte-mt900.jpg?format=auto&f=1200x1200",
    name: "MT900",
    marque: "SIMOND",
    type: "Tente",
    url: "https://www.decathlon.fr/p/tente-tarp-de-trekking-1-place-ultra-legere-et-ultra-compacte-mt900/_/R-p-343262?mc=8968612&c=noir_gris",
  },
  {
    img: "https://contents.mediadecathlon.com/p2585159/k$d4976fdfcecf843f126f11b6183f431f/sq/sac-de-couchage-de-trekking-5c-mt500.jpg?format=auto&f=240x240",
    name: "MT500 5°C",
    marque: "SIMOND",
    type: "Sac de couchage",
    url: "https://www.decathlon.fr/p/sac-de-couchage-de-trekking-5degc-mt500/_/R-p-346446?mc=8799899&c=noir",
  },
];

export default function Items() {
  return (
    <div className="flex w-full flex-col p-4 items-center justify-center font-sans ">
      <HeaderPhone />
      <div className="grid grid-cols-2 sm:grid-cols-8 gap-2 w-full">
        {fakeItems.map((item, index) => (
          <Link
            href={item.url}
            target="_blank"
            key={index}
            className="flex flex-col gap-2 w-full bg-[#060606] p-2 border-2 border-[#121212] hover:border-white rounded-2xl relative transition-colors cursor-pointer duration-400"
          >
            <div className="relative aspect-square rounded-lg w-full">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col gap-0">
              <h1 className="text-sm font-bold">{item.name}</h1>
              <h3 className="text-sm font-normal text-white/60">
                {item.marque}
              </h3>
              <p className="text-sm font-light text-white/40">{item.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
