"use client";
import { List } from "@/data/lists";
import KeyValue from "../sz/KeyValue";

const colorVariants = {
  red: "bg-red-500/40 border-red-500/30 text-black/60",
  blue: "bg-blue-500/40 border-blue-500/30 text-black/60",
  green: "bg-green-500/40 border-green-500/30 text-black/60",
  yellow: "bg-yellow-500/40 border-yellow-500/30 text-black/60",
  purple: "bg-purple-500/40 border-purple-500/30 text-black/60",
  orange: "bg-orange-500/40 border-orange-500/30 text-black/60",
} as const;

export default function ListsCard({ lists }: { lists: List }) {
  const Icon = lists.icon;

  return (
    <div className="bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-2 flex flex-row gap-2 ">
      <div
        className={`h-full relative aspect-square rounded-lg shrink-0 border flex justify-center items-center min-h-35 ${colorVariants[lists.color]}`}
      >
        <Icon size={30} />
      </div>

      <div className="bg-[#DCDCDC] rounded-lg p-2 w-full flex flex-col items-start gap-2">
        <KeyValue label="Nom" value={lists.name} />
        <KeyValue label="Éléments" value={lists.elements} />
        <KeyValue label="Type" value={lists.type} />
      </div>
    </div>
  );
}
