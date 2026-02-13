"use client";

import StuffCard from "@/components/cards/StuffCard";
import { stuffs } from "@/data/stuffs";

export default function Stuff() {
  return (
    <div className="grid grid-cols-4 gap-2 ">
      {stuffs.map((stuff) => (
        <StuffCard key={stuff.id} stuff={stuff} />
      ))}
    </div>
  );
}
