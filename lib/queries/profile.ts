import { db } from "@/lib/db";
import { users, activities, stuff } from "@/lib/schema";
import { eq, desc, sum, count } from "drizzle-orm";

export async function getUserProfile(userId: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user[0]) return null;
  return user[0];
}

export async function getUserStats(userId: string) {
  const result = await db
    .select({
      totalActivities: count(activities.id),
      totalDistance: sum(activities.distance),
      totalElevation: sum(activities.elevationGain),
      totalDuration: sum(activities.duration),
    })
    .from(activities)
    .where(eq(activities.userId, userId));

  return result[0];
}

export async function getUserActivities(userId: string, isOwner: boolean) {
  return await db
    .select()
    .from(activities)
    .where(
      isOwner ? eq(activities.userId, userId) : eq(activities.isPublic, true), // si visiteur → que les publiques
    )
    .orderBy(desc(activities.createdAt));
}

export async function getUserStuff(userId: string) {
  return await db.select().from(stuff).where(eq(stuff.userId, userId));
}
