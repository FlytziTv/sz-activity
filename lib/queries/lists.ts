import { db } from "@/lib/db";
import { lists, listActivities } from "@/lib/schema";
import { eq, count } from "drizzle-orm";

export async function getUserLists(userId: string) {
  return await db
    .select({
      id: lists.id,
      name: lists.name,
      icon: lists.icon,
      color: lists.color,
      visibility: lists.visibility,
      createdAt: lists.createdAt,
      activityCount: count(listActivities.id),
    })
    .from(lists)
    .leftJoin(listActivities, eq(lists.id, listActivities.listId))
    .where(eq(lists.userId, userId))
    .groupBy(lists.id)
    .orderBy(lists.createdAt);
}
