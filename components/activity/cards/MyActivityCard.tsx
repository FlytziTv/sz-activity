import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataActivity } from "./ActivityCard";
import { Button } from "@/components/ui/button";
import {
  Footprints,
  Navigation,
  Clock,
  Ruler,
  TrendingUp,
  TrendingDown,
  Flame,
  Heart,
} from "lucide-react";
import { userActivities } from "@/lib/schema";

type UserActivityType = typeof userActivities.$inferSelect;

export default function MyActivityCard({
  userActivities: item,
}: {
  userActivities: UserActivityType;
}) {
  // Formater la date de l'activité
  const date = new Date(item.date);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const details = [
    {
      id: 1,
      name: "time",
      value: item.duration ?? "-",
      label: "Durée",
      unit: "min",
      icon: Clock,
    },
    {
      id: 2,
      name: "distance",
      value: item.distance ?? "-",
      label: "Distance",
      unit: "km",
      icon: Ruler,
    },
    {
      id: 3,
      name: "elevationGain",
      value: item.elevationGain ?? "-",
      label: "Dénivelé +",
      unit: "m",
      icon: TrendingUp,
    },
    {
      id: 4,
      name: "elevationLoss",
      value: item.elevationLoss ?? "-",
      label: "Dénivelé -",
      unit: "m",
      icon: TrendingDown,
    },
    {
      id: 5,
      name: "caloriesBurned",
      value: item.caloriesBurned ?? "-",
      label: "Calories",
      unit: "kcal",
      icon: Flame,
    },
    {
      id: 6,
      name: "AvgHeartRate",
      value: item.avgHeartRate ?? "-",
      label: "FC Moyenne",
      unit: "bpm",
      icon: Heart,
    },
  ];

  const colorEffort = {
    facile: { className: "bg-green-500", value: 1 },
    moyen: { className: "bg-yellow-500", value: 2 },
    difficile: { className: "bg-orange-500", value: 3 },
    expert: { className: "bg-red-500", value: 4 },
  } as const;

  const diffKey = item.effort?.toLowerCase() as keyof typeof colorEffort;
  const badgeColor = colorEffort[diffKey] || "bg-gray-500";

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-[#FFFFFF] border border-[#D2D2D2] rounded-lg p-2 w-full flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-0">
            <h4 className="text-sm font-semibold text-gray-900">
              {item.title}
            </h4>
            <p className="text-xs rounded-sm text-gray-500">{item.location}</p>
          </div>
          <div className="h-0.5 bg-[#EAEAEA] w-[90%] rounded-lg" />
          <div className="grid grid-cols-3 w-full">
            <DataActivity
              value={`${item.distance ?? "-"} km`}
              label="Distance"
            />
            <DataActivity
              value={`${details.find((d) => d.name === "elevationGain")?.value ?? "-"} m`}
              label="Dénivelé"
            />
            <DataActivity
              value={`${details.find((d) => d.name === "time")?.value ?? "-"} min`}
              label="Durée"
            />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold capitalize">
            {formattedDate}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Résumé activité */}
          <div className="flex flex-row items-center gap-4">
            <div className="h-full aspect-square rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
              <Footprints size={28} className="text-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.activityType}</p>
              <div className="flex flex-row gap-3 text-xs text-gray-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {item.startTime} – {item.endTime}
                </span>
                <span className="flex items-center gap-1">
                  <Navigation size={11} /> {item.location}
                </span>
              </div>
            </div>
          </div>

          {/* Stats détaillées */}
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-black">Détails</h2>
            <div className="grid grid-cols-2 gap-2">
              {details.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={detail.id}
                    className="flex flex-row items-center gap-2 bg-[#F5F5F5] rounded-xl p-2"
                  >
                    <div className="h-8 w-8 rounded-lg bg-white border border-[#E8E8E8] flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-gray-600" />
                    </div>
                    <div className="flex flex-col gap-0">
                      <p className="text-xs text-gray-500">{detail.label}</p>
                      <p className="text-sm font-semibold">
                        {detail.value} {detail.unit}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Effort */}
          <div className="flex flex-row items-center justify-between bg-[#F5F5F5] rounded-xl p-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-xs text-gray-500">Niveau d&apos;effort</p>
              <p className="text-sm font-semibold">{item.effort}</p>
            </div>
            <div className="flex flex-row gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-6 rounded-full transition-colors ${badgeColor}`}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Fermer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
