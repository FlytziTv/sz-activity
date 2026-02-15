import Image from "next/image";
import type { Activity } from "@/data/activities";
import { Heart } from "lucide-react";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-2 flex flex-col gap-2">
      <div className="relative w-full aspect-video rounded-2xl ">
        <Image
          src={activity.banner}
          alt={`${activity.name}, ${activity.loc}`}
          fill
          className="object-cover rounded-lg "
        />

        <button className="absolute top-2 right-2 flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
          <Heart size={16} />
        </button>
      </div>
      <div className="bg-[#FFFFFF] border border-[#D2D2D2] rounded-lg p-2 w-full flex flex-col items-center gap-2">
        <div className="flex flex-col items-center justify-center gap-0">
          <h4 className="text-sm font-semibold text-gray-900">
            {activity.name}
          </h4>
          <p className="text-xs rounded-sm text-gray-500">{activity.loc}</p>
        </div>
        <div className="h-0.5 bg-[#EAEAEA] w-[90%] rounded-lg" />
        <div className="grid grid-cols-3 w-full">
          {activity.stats.map((stat, index) => (
            <DataActivity key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DataActivity({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-0 items-center justify-center">
      <p className="font-semibold text-base">{value}</p>
      <h5 className="text-xs text-gray-500">{label}</h5>
    </div>
  );
}

// Version 2 vertical
{
  /* <div className="bg-white rounded-4xl p-2 h-120">
  <div className="relative w-full h-full">
    <Image
      src="https://mapetiterando.fr/wp-content/uploads/2023/04/lac-doo-une-randonnee-unique-pour-les-amoureux-de-la-nature.jpg"
      alt="Lac d’Oô, Haute-Garonne"
      fill
      className=" object-cover rounded-3xl"
    />

    <div className="absolute top-2 right-2 flex flex-row justify-between left-2 rounded-2xl">
      <p className="text-sm font-medium text-white bg-black/40 px-2 py-1 rounded-2xl">
        Facile
      </p>
      <div className="flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
        <Heart size={16} />
      </div>
    </div>

    <div className="absolute bottom-2 right-2 flex flex-col gap-2 left-2 p-2 bg-white rounded-2xl">
      <div className="flex flex-col items-center justify-center gap-0">
        <h4 className="text-sm font-semibold text-gray-900">Lac d’Oô</h4>
        <p className="text-xs rounded-sm text-gray-500">
          Pyrénées, Haute-Garonne
        </p>
      </div>
      <div className="h-0.5 bg-black/5 mx-5" />
      <div className="grid grid-cols-3">
        <DataActivity value="3 km" label="Distance" />
        <DataActivity value="200 m" label="Dénivelé" />
        <DataActivity value="1h30" label="Durée" />
      </div>
    </div>
  </div>
</div>; */
}
