"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { userActivities, userActivityStuff } from "@/lib/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addUserActivity(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Non autorisé");

  const dateStr = formData.get("date") as string;

  // Distance → toujours en km
  const distanceValue = parseFloat(formData.get("distance") as string) || null;
  const distanceUnit = formData.get("distanceUnit") as string;
  const distanceKm = distanceValue
    ? distanceUnit === "m"
      ? distanceValue / 1000
      : distanceValue
    : null;

  // Durée → toujours en minutes
  const durationValue = parseInt(formData.get("duration") as string) || null;
  const durationUnit = formData.get("durationUnit") as string;
  const durationMin = durationValue
    ? durationUnit === "h"
      ? durationValue * 60
      : durationValue
    : null;

  // Dénivelés → toujours en mètres
  const toMeters = (name: string, unitName: string) => {
    const value = parseInt(formData.get(name) as string) || null;
    const unit = formData.get(unitName) as string;
    return value ? (unit === "km" ? value * 1000 : value) : null;
  };

  const insertedActivity = await db
    .insert(userActivities)
    .values({
      userId: session.user.id,
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      date: dateStr ? new Date(dateStr) : new Date(),
      activityType:
        (formData.get(
          "activityType",
        ) as typeof userActivities.$inferInsert.activityType) || "randonnee",
      duration: durationMin,
      distance: distanceKm,
      elevationGain: toMeters("elevation", "elevationUnit"),
      elevationLoss: toMeters("elevationLoss", "elevationLossUnit"),
      location: (formData.get("location") as string) || null,
      startTime: (formData.get("startTime") as string) || null,
      endTime: (formData.get("endTime") as string) || null,
      caloriesBurned:
        parseInt(formData.get("caloriesBurned") as string) || null,
      avgHeartRate: parseInt(formData.get("avgHeartRate") as string) || null,
      effort: (formData.get("effort") as string) || null,
      isPublic: formData.get("visibility") === "public",
      hikeId: (formData.get("hike") as string) || null,
    })
    .returning();

  const stuffIds = formData.getAll("stuffs") as string[];
  if (stuffIds.length > 0) {
    await db.insert(userActivityStuff).values(
      stuffIds.map((stuffId) => ({
        userActivityId: insertedActivity[0].id,
        stuffId,
      })),
    );
  }

  revalidatePath("/sz-app/dash");
}
