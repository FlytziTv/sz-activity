"use client";

import Header from "@/components/sz/header";
import Image from "next/image";

export default function Activity() {
  return (
    <>
      <Header />
      <main className="pt-14.5 px-1">
        <div className="grid grid-cols-5 gap-2 ">
          {/* <div className="flex flex-col gap-2 p-2 rounded-4xl bg-[#FFFFFF]">
            <div className="relative rounded-lg h-50 ">
              <Image
                src="https://cdn.generationvoyage.fr/2021/04/shutterstock_1089483044-630x420.jpg"
                alt="Lac d’Oô, Haute-Garonne"
                fill
                className=" object-cover rounded-3xl"
              />

              <div className="absolute bottom-0 right-0 left-0 z-10 flex items-center justify-between p-4">
                <div className="flex flex-col gap-0">
                  <h4 className="text-sm font-semibold text-white">
                    Lac d’Oô, Haute-Garonne
                  </h4>
                  <p className="text-xs text-white/80">
                    Pyrénées, Haute-Garonne
                  </p>
                </div>
                <button className="text-sm font-semibold text-white bg-white/50 px-3 py-1 rounded-lg">
                  Directions
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-0 items-start">
                <h5 className="text-sm font-semibold">Facile</h5>
                <p className="text-xs text-gray-500">11 février 2025</p>
              </div>
              <div className="h-0.5 rounded-2xl w-full bg-gray-100" />
              <div className="grid grid-cols-3 gap-2">
                <DataActivity value="3 km" label="Distance" />
                <DataActivity value="200 m" label="Dénivelé" />
                <DataActivity value="1h30" label="Durée" />
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </>
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
    <div className="flex flex-col gap-0">
      <p className="font-semibold text-base">{value}</p>
      <h5 className="text-xs text-gray-500">{label}</h5>
    </div>
  );
}
