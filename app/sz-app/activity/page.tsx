"use client";

import ActivityCard from "@/components/cards/ActivityCard";
import { activities } from "@/data/activities";

export default function Activity() {
  return (
    <div className="grid grid-cols-5 gap-2 ">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
