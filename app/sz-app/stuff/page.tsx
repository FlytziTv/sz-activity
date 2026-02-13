"use client";

import StuffCard from "@/components/cards/StuffCard";
import Header from "@/components/sz/header";
import { stuffs } from "@/data/stuffs";

export default function Stuff() {
  return (
    <>
      <Header />
      <main className="pt-16.5 px-2 bg-[#F2F2F2]">
        <div className="grid grid-cols-4 gap-2 ">
          {stuffs.map((stuff) => (
            <StuffCard key={stuff.id} stuff={stuff} />
          ))}
        </div>
      </main>
    </>
  );
}
