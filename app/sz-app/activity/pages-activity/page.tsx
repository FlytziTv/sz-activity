import { activities } from "@/data/activities";
import {
  Car,
  ChartArea,
  CircleArrowDown,
  CircleArrowUp,
  Clock,
  Earth,
  Flag,
  FlagTriangleRight,
  Heart,
  Images,
  LucideIcon,
  MapPinned,
  Maximize2,
  Mountain,
  Play,
  Ruler,
  Share2,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

const colorDifficulty = {
  Facile: "bg-green-500",
  Modérée: "bg-yellow-500",
  Difficile: "bg-orange-500",
  Ardu: "bg-red-500",
} as const;

const dataInfos = {
  // Caractéristiques principales de l'effort
  Principal: [
    {
      icons: Mountain,
      label: "Activité",
      value: "Randonnée Pédestre",
    },
    { icons: Ruler, label: "Distance", value: "9,68 km" },
    {
      icons: Clock,
      label: "Durée moyenne",
      value: "5h 05",
    },
    {
      icons: ChartArea,
      label: "Difficulté ",
      value: "Difficile",
    },
  ],

  // Profil technique du terrain
  Technique: [
    {
      icons: TrendingUp,
      label: "Dénivelé positif",
      value: "+ 800 m",
    },
    {
      icons: TrendingDown,
      label: "Dénivelé négatif",
      value: "- 720 m",
    },
    {
      icons: CircleArrowUp,
      label: "Point haut",
      value: "1 815 m",
    },
    {
      icons: CircleArrowDown,
      label: "Point bas",
      value: "1 025 m",
    },
  ],

  // Localisation géographique
  Localisation: [
    { icons: Earth, label: "Pays", value: "France" },
    {
      icons: MapPinned,
      label: "Régions",
      value: "Pyrénées, Massif des Trois-Seigneurs",
    },
  ],

  // Coordonnées de navigation
  Coordonnées: [
    {
      icons: Flag,
      label: "Point de départ",
      value: "N 42.840324°",
    },
    {
      icons: FlagTriangleRight,
      label: "Point d'arrivée",
      value: "E 1.485189°",
    },
  ],
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl w-full m-auto p-4 bg-[#E8E8E8] border border-[#DBDBDB] rounded-3xl">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-semibold text-3xl">
            {activities[0].name} - {activities[0].loc}
          </h2>

          <div className="flex flex-row gap-1 items-center justify-center h-9">
            <ButtonActions icon={Heart} />
            <ButtonActions icon={Share2} />
            <ButtonActions icon={Car} />
          </div>
        </div>
        <div className="flex flex-row gap-3.5 items-center">
          <div className="flex flex-row gap-1.5 items-center">
            <Star size={14} fill="black" />
            <p className="text-black text-[13px] font-medium">
              {activities[0].notes} (
              <span className="text-black hover:text-black/70 font-normal hover:underline underline-offset-2 transition-color duration-150 cursor-pointer ">
                {activities[0].avis} avis
              </span>
              )
            </p>
          </div>

          <div className="w-0.5 h-0.5 rounded-full bg-[#8d8d8d]" />

          <div className="flex flex-row gap-1.5 items-center">
            <div
              className={`w-2 h-2 rounded-full ${colorDifficulty[activities[0].difficulty]}`}
            />
            <p className="text-black hover:text-black/70 text-[13px] font-normal hover:underline underline-offset-2 transition-color duration-150 cursor-pointer ">
              {activities[0].difficulty}
            </p>
          </div>

          <div className="w-0.5 h-0.5 rounded-full bg-[#8d8d8d]" />

          <p className="text-black hover:text-black/70 text-[13px] font-normal hover:underline underline-offset-2 transition-color duration-150 cursor-pointer ">
            {activities[0].loc}
          </p>
        </div>
        <p className="text-black text-sm">{activities[0].description}</p>
      </div>
      <div className="grid grid-cols-6 grid-rows-2 w-full gap-2 aspect-16/5">
        <div className="col-span-4 row-span-2 rounded-l-2xl relative">
          <Image
            src={activities[0].banner}
            alt={activities[0].name}
            fill
            className="object-cover rounded-l-lg absolute"
          />
          <div className="absolute bottom-4 left-4 flex flex-row gap-2 items-center justify-center">
            <button className="bg-white hover:bg-gray-200 text-black text-sm font-semibold p-3 rounded-full transition-colors duration-150 cursor-pointer ">
              <Play fill="black" size={18} />
            </button>
            <button className="bg-black/40 hover:bg-white text-white hover:text-black text-sm font-semibold p-3 rounded-full border border-white flex flex-row gap-2 items-center transition-colors duration-150 cursor-pointer ">
              <Images size={18} />
              {activities[0].numberPhotos} photos
            </button>
          </div>
        </div>
        <div className="col-span-2 row-span-1 rounded-r-2xl relative">
          <Image
            src={activities[0].image?.[0] || ""}
            alt={activities[0].name}
            fill
            className="object-cover rounded-tr-lg absolute"
          />
        </div>
        <div className="bg-[#FFFFFF] col-span-2 row-span-1 rounded-br-lg relative">
          <button className="absolute bottom-4 left-4  bg-white hover:bg-gray-200 text-black text-sm font-semibold p-3 rounded-full transition-colors duration-150 cursor-pointer ">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-[#FFFFFF] border border-[#D2D2D2] rounded-lg">
        <div className="flex flex-row w-full px-3 py-2 bg-[#DCDCDC] border-b border-[#D2D2D2]">
          <h3 className="text-black font-semibold text-xl">Fiche technique</h3>
        </div>

        <div className="grid grid-cols-3 p-3 gap-2 w-full  border-b border-[#D2D2D2]">
          <StatsFiche label="Création" value="13 ferv. 2026" />
          <StatsFiche label="Type" value={activities[0].type} />
          <StatsFiche label="Dernier avis" value="14 févr. 2026" />
        </div>

        <div className="grid grid-cols-2 gap-4 p-3 w-full ">
          {Object.entries(dataInfos).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-2 rounded-lg ">
              <h3 className="text-black font-semibold">{category}</h3>
              <div className="flex flex-col gap-1">
                {items.map((info) => (
                  <DataFiche
                    key={info.label}
                    label={info.label}
                    value={info.value}
                    icon={info.icons}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ButtonActions({ icon }: { icon: LucideIcon }) {
  const Icon = icon;

  return (
    <button className="rounded-full bg-[#DCDCDC] hover:bg-[#000000]/15 h-full aspect-square flex items-center justify-center transition-colors duration-150 ">
      <Icon size={16} />
    </button>
  );
}

export function StatsFiche({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="flex flex-col gap-0 p-4 items-center justify-center bg-[#E8E8E8] rounded-lg">
      <h4 className="text-sm font-semibold text-black">{label}</h4>
      <p className="text-sm font-normal text-gray-500">{value || "-"}</p>
    </div>
  );
}

export function DataFiche({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  const Icon = icon;
  return (
    <div className="flex flex-row gap-2 items-center justify-start">
      <Icon size={16} />
      <h4 className="text-sm font-semibold text-black">
        {label}
        {" : "}
        <span className="text-sm font-normal text-gray-500">
          {value || "-"}
        </span>
      </h4>
    </div>
  );
}
