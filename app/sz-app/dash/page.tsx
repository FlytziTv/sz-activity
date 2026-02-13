"use client";

import Header from "@/components/sz/header";
import { YearProgressWidget } from "@/components/Widget/YearWidget";

export default function Dash() {
  return (
    <>
      <Header />
      <main className="pt-16.5 px-2 bg-[#F2F2F2]">
        <div
          className="grid grid-cols-10 grid-rows-4 gap-2 w-full"
          style={{ aspectRatio: "10 / 4" }}
        >
          <YearProgressWidget />
          <div className="col-span-2 row-span-1 bg-blue-500 rounded-2xl py-3 px-4">
            2×1
          </div>
          <div className="col-span-1 row-span-1 bg-green-500 rounded-2xl py-3 px-4">
            1×1
          </div>
        </div>
      </main>
    </>
  );
}
