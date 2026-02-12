"use client";

import Header from "@/components/sz/header";
import {
  Footprints,
  Lock,
  LockOpen,
  Navigation,
  Pickaxe,
  TentTree,
} from "lucide-react";

export default function Lists() {
  return (
    <>
      <Header />
      <main className="pt-16.5 px-2">
        <h1 className="text-black text-2xl font-semibold mb-2">Mes listes</h1>
        <div className="grid grid-cols-5 gap-2">
          <div className="relative bg-white drop-shadow-xl/10 w-full aspect-video   rounded-2xl p-2 flex flex-col items-center justify-center">
            <div className="absolute top-2 left-2 flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
              <LockOpen size={16} />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="aspect-square bg-red-400/50 border border-red-400 flex justify-center items-center p-4 rounded-full">
                <Footprints size={30} />
              </div>
              <h1 className="text-lg font-semibold">Randonnées</h1>
            </div>
          </div>

          <div className="relative bg-white drop-shadow-xl/10 w-full aspect-video   rounded-2xl p-2 flex flex-col items-center justify-center">
            <div className="absolute top-2 left-2 flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
              <Lock size={16} />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="aspect-square bg-red-400/50 border border-red-400 flex justify-center items-center p-4 rounded-full">
                <Footprints size={30} />
              </div>
              <h1 className="text-lg font-semibold">Randonnées a faire</h1>
            </div>
          </div>

          <div className="relative bg-white drop-shadow-xl/10 w-full aspect-video   rounded-2xl p-2 flex flex-col items-center justify-center">
            <div className="absolute top-2 left-2 flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
              <Lock size={16} />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="aspect-square bg-red-400/50 border border-red-400 flex justify-center items-center p-4 rounded-full">
                <Pickaxe size={30} />
              </div>
              <h1 className="text-lg font-semibold">Équipement</h1>
            </div>
          </div>

          <div className="relative bg-white drop-shadow-xl/10 w-full aspect-video   rounded-2xl p-2 flex flex-col items-center justify-center">
            <div className="absolute top-2 left-2 flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
              <Lock size={16} />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="aspect-square bg-red-400/50 border border-red-400 flex justify-center items-center p-4 rounded-full">
                <TentTree size={30} />
              </div>
              <h1 className="text-lg font-semibold">Bivouac</h1>
            </div>
          </div>

          <div className="relative bg-white drop-shadow-xl/10 w-full aspect-video   rounded-2xl p-2 flex flex-col items-center justify-center">
            <div className="absolute top-2 left-2 flex items-center justify-center text-white bg-black/40 h-7 w-7 rounded-2xl">
              <Lock size={16} />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="aspect-square bg-red-400/50 border border-red-400 flex justify-center items-center p-4 rounded-full">
                <Navigation size={30} />
              </div>
              <h1 className="text-lg font-semibold">Position</h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
