"use client";

import Header from "@/components/sz/header";
import { Heart } from "lucide-react";
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

          <div className="bg-white rounded-4xl p-2">
            <div className="relative w-full aspect-video">
              <Image
                src="https://mapetiterando.fr/wp-content/uploads/2023/04/lac-doo-une-randonnee-unique-pour-les-amoureux-de-la-nature.jpg"
                alt="Lac d’Oô, Haute-Garonne"
                fill
                className=" object-cover rounded-3xl"
              />

              <div className="absolute top-2 right-2 flex flex-row justify-between left-2 rounded-2xl">
                <p className="text-sm font-medium text-white bg-black/40 px-2 py-1 rounded-2xl">
                  Facile
                </p>
                <div className="flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
                  <Heart size={16} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2 bg-white rounded-2xl">
              <div className="flex flex-col items-center justify-center gap-0">
                <h4 className="text-sm font-semibold text-gray-900">
                  Lac d’Oô
                </h4>
                <p className="text-xs rounded-sm text-gray-500">
                  Pyrénées, Haute-Garonne
                </p>
              </div>
              <div className="h-0.5 bg-black/5 mx-5" />
              <div className="grid grid-cols-3">
                <DataActivity value="3 km" label="Distance" />
                <DataActivity value="200 m" label="Dénivelé" />
                <DataActivity value="1h30" label="Durée" />
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-4xl p-2 h-120">
            <div className="relative w-full h-full">
              <Image
                src="https://mapetiterando.fr/wp-content/uploads/2023/04/lac-doo-une-randonnee-unique-pour-les-amoureux-de-la-nature.jpg"
                alt="Lac d’Oô, Haute-Garonne"
                fill
                className=" object-cover rounded-3xl"
              />

              <div className="absolute top-2 right-2 flex flex-row justify-between left-2 rounded-2xl">
                <p className="text-sm font-medium text-white bg-black/40 px-2 py-1 rounded-2xl">
                  Facile
                </p>
                <div className="flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
                  <Heart size={16} />
                </div>
              </div>

              <div className="absolute bottom-2 right-2 flex flex-col gap-2 left-2 p-2 bg-white rounded-2xl">
                <div className="flex flex-col items-center justify-center gap-0">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Lac d’Oô
                  </h4>
                  <p className="text-xs rounded-sm text-gray-500">
                    Pyrénées, Haute-Garonne
                  </p>
                </div>
                <div className="h-0.5 bg-black/5 mx-5" />
                <div className="grid grid-cols-3">
                  <DataActivity value="3 km" label="Distance" />
                  <DataActivity value="200 m" label="Dénivelé" />
                  <DataActivity value="1h30" label="Durée" />
                </div>
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
    <div className="flex flex-col gap-0 items-center justify-center">
      <p className="font-semibold text-base">{value}</p>
      <h5 className="text-xs text-gray-500">{label}</h5>
    </div>
  );
}
