"use client";

import ListsCard from "@/components/cards/ListsCard";
import { lists } from "@/data/lists";

export default function Lists() {
  return (
    <div className="grid grid-cols-5 gap-2 ">
      {lists.map((list) => (
        <ListsCard key={list.id} lists={list} />
      ))}
    </div>
  );
}
