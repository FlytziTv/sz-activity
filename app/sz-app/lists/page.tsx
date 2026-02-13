"use client";

import ListsCard from "@/components/cards/ListsCard";
import Header from "@/components/sz/header";
import { lists } from "@/data/lists";

export default function Lists() {
  return (
    <>
      <Header />
      <main className="pt-16.5 px-2">
        <h1 className="text-black text-2xl font-semibold mb-2">Mes listes</h1>
        <div className="grid grid-cols-5 gap-2 ">
          {lists.map((list) => (
            <ListsCard key={list.id} lists={list} />
          ))}
        </div>
      </main>
    </>
  );
}
