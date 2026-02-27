import { db } from "@/lib/db";
import { desc } from "drizzle-orm";
import ActivityCard from "@/components/activity/cards/ActivityCard";
import { activity } from "@/lib/schema";

async function getActivities() {
  return await db.select().from(activity).orderBy(desc(activity.createdAt));
}

export default async function Explore() {
  const activities = await getActivities();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 ">
      {activities.length === 0 ? (
        <p className="text-gray-500 col-span-5">
          Aucune activité pour l&apos;instant.
        </p>
      ) : (
        activities.map((item) => <ActivityCard key={item.id} activity={item} />)
      )}
    </div>
  );
}
