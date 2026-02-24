import { db } from "@/lib/db";
import { activity, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
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

async function getActivity(id: string) {
  const result = await db
    .select({
      id: activity.id,
      title: activity.title,
      location: activity.location,
      description: activity.description,
      bannerImage: activity.bannerImage,
      activityType: activity.activityType,
      routeType: activity.routeType,
      difficulty: activity.difficulty,
      distance: activity.distance,
      duration: activity.duration,
      elevationGain: activity.elevationGain,
      elevationLoss: activity.elevationLoss,
      highestPoint: activity.highestPoint,
      lowestPoint: activity.lowestPoint,
      country: activity.country,
      region: activity.region,
      startLat: activity.startLat,
      startLng: activity.startLng,
      endLat: activity.endLat,
      endLng: activity.endLng,
      averageRating: activity.averageRating,
      totalReviews: activity.totalReviews,
      createdAt: activity.createdAt,
      createdByUserId: activity.createdByUserId,
      creatorName: users.name,
    })
    .from(activity)
    .leftJoin(users, eq(activity.createdByUserId, users.id))
    .where(eq(activity.id, id))
    .limit(1);
  if (!result[0]) notFound();
  return result[0];
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await getActivity(id);

  const colorDifficulty = {
    facile: "bg-green-500",
    moyen: "bg-yellow-500",
    difficile: "bg-orange-500",
    expert: "bg-red-500",
  } as const;

  const dataInfos = {
    // Caractéristiques principales de l'effort
    Principal: [
      {
        icons: Mountain,
        label: "Activité",
        value: item.activityType,
      },
      {
        icons: Ruler,
        label: "Distance",
        value: item.distance ? `${item.distance} km` : "-",
      },
      {
        icons: Clock,
        label: "Durée moyenne",
        value: item.duration ? `${item.duration} min` : "-",
      },
      {
        icons: ChartArea,
        label: "Difficulté ",
        value: item.difficulty,
      },
    ],

    // Profil technique du terrain
    Technique: [
      {
        icons: TrendingUp,
        label: "Dénivelé positif",
        value: item.elevationGain ? `+ ${item.elevationGain} m` : "-",
      },
      {
        icons: TrendingDown,
        label: "Dénivelé négatif",
        value: item.elevationLoss ? `- ${item.elevationLoss} m` : "-",
      },
      {
        icons: CircleArrowUp,
        label: "Point haut",
        value: item.highestPoint ? `${item.highestPoint} m` : "-",
      },
      {
        icons: CircleArrowDown,
        label: "Point bas",
        value: item.lowestPoint ? `${item.lowestPoint} m` : "-",
      },
    ],

    // Localisation géographique
    Localisation: [
      { icons: Earth, label: "Pays", value: item.country ?? "-" },
      { icons: MapPinned, label: "Région", value: item.region ?? "-" },
    ],

    // Coordonnées de navigation
    Coordonnées: [
      {
        icons: Flag,
        label: "Point de départ",
        value: item.startLat ? `N ${item.startLat}°` : "-",
      },
      {
        icons: FlagTriangleRight,
        label: "Point d'arrivée",
        value: item.endLng ? `E ${item.endLng}°` : "-",
      },
    ],
  };

  const diffKey =
    item.difficulty?.toLowerCase() as keyof typeof colorDifficulty;
  const badgeColor = colorDifficulty[diffKey] || "bg-gray-500";

  return (
    <div className="flex flex-col gap-4 max-w-7xl w-full m-auto p-4 bg-[#E8E8E8] border border-[#DBDBDB] rounded-3xl">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-semibold text-3xl">
            {item.title} - {item.location}
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
              {item.averageRating ?? 0} (
              <span className="text-black hover:text-black/70 font-normal hover:underline underline-offset-2 transition-color duration-150 cursor-pointer ">
                {item.totalReviews ?? 0} avis
              </span>
              )
            </p>
          </div>

          <div className="w-0.5 h-0.5 rounded-full bg-[#8d8d8d]" />

          <div className="flex flex-row gap-1.5 items-center">
            <div className={`w-2 h-2 rounded-full ${badgeColor}`} />
            <p className="text-black hover:text-black/70 text-[13px] font-normal hover:underline underline-offset-2 transition-color duration-150 cursor-pointer ">
              {item.difficulty}
            </p>
          </div>

          <div className="w-0.5 h-0.5 rounded-full bg-[#8d8d8d]" />

          <p className="text-black hover:text-black/70 text-[13px] font-normal hover:underline underline-offset-2 transition-color duration-150 cursor-pointer ">
            {item.location}
          </p>
        </div>
        <p className="text-black text-sm">{item.description}</p>
      </div>
      <div className="grid grid-cols-6 grid-rows-2 w-full gap-2 aspect-16/5">
        <div className="col-span-4 row-span-2 rounded-l-2xl relative">
          <Image
            src={item.bannerImage || "/no-img-activity.png"}
            alt={item.title}
            fill
            className="object-cover rounded-l-lg absolute"
          />

          <div className="absolute bottom-4 left-4 flex flex-row gap-2 items-center justify-center">
            <button className="bg-white hover:bg-gray-200 text-black text-sm font-semibold p-3 rounded-full transition-colors duration-150 cursor-pointer ">
              <Play fill="black" size={18} />
            </button>
            <button className="bg-black/40 hover:bg-white text-white hover:text-black text-sm font-semibold p-3 rounded-full border border-white flex flex-row gap-2 items-center transition-colors duration-150 cursor-pointer ">
              <Images size={18} />2 photos
            </button>
          </div>
        </div>
        <div className="col-span-2 row-span-1 rounded-r-2xl relative">
          <Image
            src={item.bannerImage || "/no-img-activity.png"}
            alt={item.title}
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
          <StatsFiche
            label="Création"
            value={new Date(item.createdAt).toLocaleDateString("fr-FR")}
          />
          <StatsFiche label="Type" value={item.routeType} />
          <StatsFiche label="Crée par" value={item.creatorName || "-"} />
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
