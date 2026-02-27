import { db } from "@/lib/db";
import { desc } from "drizzle-orm";
import { userActivities } from "@/lib/schema";
import MyActivityCard from "@/components/activity/cards/MyActivityCard";

async function getUserActivities() {
  return await db
    .select()
    .from(userActivities)
    .orderBy(desc(userActivities.createdAt));
}

export default async function ActivityPage() {
  const useractivities = await getUserActivities();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 ">
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
