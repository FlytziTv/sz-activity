"use client";

import Header from "@/components/sz/header";
import ActivityCard from "@/components/cards/ActivityCard";
import { activities } from "@/data/activities";

export default function Activity() {
  return (
    <>
      <Header />
      <main className="pt-16.5 px-2">
        <div className="grid grid-cols-5 gap-2 ">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </main>
    </>
  );
}
