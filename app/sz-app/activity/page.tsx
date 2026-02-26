import { db } from "@/lib/db";
import { desc } from "drizzle-orm";
import ActivityCard from "@/components/activity/cards/ActivityCard";
import { activity, userActivities } from "@/lib/schema";
import MyActivityCard from "@/components/activity/cards/MyActivityCard";

async function getActivities() {
  return await db.select().from(activity).orderBy(desc(activity.createdAt));
}

async function getUserActivities() {
  return await db
    .select()
    .from(userActivities)
    .orderBy(desc(userActivities.createdAt));
}

export default async function ActivityPage() {
  const activities = await getActivities();
  const useractivities = await getUserActivities();

  return (
    <div className="grid grid-cols-5 gap-2 ">
      {activities.length === 0 ? (
        <p className="text-gray-500 col-span-5">
          Aucune activité pour l&apos;instant.
        </p>
      ) : (
        activities.map((item) => <ActivityCard key={item.id} activity={item} />)
      )}

      {useractivities.length === 0 ? (
        <p className="text-gray-500 col-span-5">
          Aucune activité utilisateur pour l&apos;instant.
        </p>
      ) : (
        useractivities.map((item) => (
          <MyActivityCard key={item.id} userActivities={item} />
        ))
      )}
    </div>
  );
}
