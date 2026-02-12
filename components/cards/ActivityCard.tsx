import { Heart } from "lucide-react";
import Image from "next/image";
import type { Activity } from "@/data/activities";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="bg-white rounded-4xl p-2 drop-shadow-xl/10">
      <div className="relative w-full aspect-video">
        <Image
          src={activity.image}
          alt={`${activity.name}, ${activity.loc}`}
          fill
          className="object-cover rounded-3xl"
        />

        <div className="absolute top-2 right-2 flex flex-row justify-between left-2 rounded-2xl">
          <p className="text-sm font-medium text-white bg-black/40 px-2 py-1 rounded-2xl">
            {activity.difficulty}
          </p>
          <div className="flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
            <Heart size={16} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2 bg-white rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-0">
          <h4 className="text-sm font-semibold text-gray-900">
            {activity.name}
          </h4>
          <p className="text-xs rounded-sm text-gray-500">{activity.loc}</p>
        </div>
        <div className="h-0.5 bg-black/5 mx-5" />
        <div className="grid grid-cols-3">
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
