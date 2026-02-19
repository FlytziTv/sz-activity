import {
  Asterisk,
  Footprints,
  Heart,
  Hourglass,
  Navigation,
  TentTree,
  LucideIcon,
} from "lucide-react";
import KeyValue from "../sz/KeyValue";

const IconMap: Record<string, LucideIcon> = {
  Default: Asterisk,
  Empreintes: Footprints,
  Cœur: Heart,
  Sablier: Hourglass,
  Navigation: Navigation,
  Tente: TentTree,
};

interface ListCardProps {
  list: {
    id: string;
    name: string;
    icon: string;
    color: string;
    visibility: string;
    activityCount: number;
  };
}

export default function ListsCard({ list }: ListCardProps) {
  const Icon = IconMap[list.icon] ?? Asterisk;

  return (
    <div className="bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-2 flex flex-row gap-2">
      <div
        className="h-full relative aspect-square rounded-lg shrink-0 border flex justify-center items-center min-h-35"
        style={{
          backgroundColor: `${list.color}66`,
          borderColor: `${list.color}4D`,
          color: "rgba(0,0,0,0.6)",
        }}
      >
        <Icon size={30} />
      </div>

      <div className="bg-[#DCDCDC] rounded-lg p-2 w-full flex flex-col items-start gap-2">
        <KeyValue label="Nom" value={list.name} />
        <KeyValue label="Éléments" value={list.activityCount} />
        <KeyValue
          label="Type"
          value={list.visibility === "public" ? "Public" : "Privé"}
        />
      </div>
    </div>
  );
}
