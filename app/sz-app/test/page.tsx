"use client";

import CreateSortieActivity from "@/components/activity/form/CreateSortieActivity";
import CreateActivity from "@/components/activity/form/CreateActivty";

export default function Dash() {
  return (
    <div className="flex flex-row gap-2">
      {/* Nouvelle sortie */}

      <CreateSortieActivity />

      {/* Nouvelle Activiter */}
      <CreateActivity />
    </div>
  );
}
