import { db } from "@/lib/db";
import { users, userActivities, stuff } from "@/lib/schema";
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
      totalActivities: count(userActivities.id),
      totalDistance: sum(userActivities.distance),
      totalElevation: sum(userActivities.elevationGain),
      totalDuration: sum(userActivities.duration),
    })
    .from(userActivities)
    .where(eq(userActivities.userId, userId));

  return result[0];
}

export async function getUserActivities(userId: string, isOwner: boolean) {
  return await db
    .select()
    .from(userActivities)
    .where(
      isOwner
        ? eq(userActivities.userId, userId)
        : eq(userActivities.isPublic, true), // si visiteur → que les publiques
    )
    .orderBy(desc(userActivities.createdAt));
}

export async function getUserStuff(userId: string) {
  return await db.select().from(stuff).where(eq(stuff.userId, userId));
}
