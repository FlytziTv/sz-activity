"use client";

import Weight from "@/components/dashboard/Widget/weight";
import { YearProgressWidget } from "@/components/dashboard/Widget/YearWidget";

export default function Dash() {
  return (
    <div
      className="grid grid-cols-10 grid-rows-4 gap-2 w-full"
      style={{ aspectRatio: "10 / 4" }}
    >
      <YearProgressWidget />
      <div className="col-span-2 row-span-1 bg-blue-500 rounded-2xl py-3 px-4">
        2×1
      </div>
      {/* <div className="col-span-2 row-span-1 bg-blue-500 rounded-2xl py-3 px-4">
        2×1
      </div> */}
      <Weight />
      <div className="col-span-3 row-span-4 bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-4 flex flex-col gap-2">
        {/* Header */}

        <h1 className="text-black font-semibold">Vos objectifs</h1>

        <div className="flex flex-row gap-2 w-full bg-[#FFFFFF] border border-[#D2D2D2] rounded-lg py-2 px-3">
          <h1 className="text-black font-medium">Objectif n°1</h1>
        </div>
      </div>
    </div>
  );
}
