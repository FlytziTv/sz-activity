"use client";

import Weight from "@/components/items/weight";
import { YearProgressWidget } from "@/components/Widget/YearWidget";

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
      <div className="col-span-3 row-span-4 bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-4 flex flex-col justify-between">
        {/* Header */}
        <div className="flex flex-row items-center justify-between">
          <h5 className="text-black text-base font-semibold">Stats</h5>
          <p className="text-black text-sm font-medium"></p>
        </div>
      </div>
    </div>
  );
}
