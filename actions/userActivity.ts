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

  // Dénivelé → toujours en mètres
  const elevationValue = parseInt(formData.get("elevation") as string) || null;
  const elevationUnit = formData.get("elevationUnit") as string; // "m" ou "km"
  const elevationM = elevationValue
    ? elevationUnit === "km"
      ? elevationValue * 1000
      : elevationValue
    : null;

  const activity = await db
    .insert(userActivities)
    .values({
      userId: session.user.id,
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      date: dateStr ? new Date(dateStr) : new Date(),
      duration: durationMin,
      distance: distanceKm,
      elevationGain: elevationM,
      isPublic: formData.get("visibility") === "public",
      hikeId: (formData.get("hike") as string) || null,
    })
    .returning();

  const stuffIds = formData.getAll("stuffs") as string[];
  if (stuffIds.length > 0) {
    await db.insert(userActivityStuff).values(
      stuffIds.map((stuffId) => ({
        userActivityId: activity[0].id,
        stuffId,
      })),
    );
  }

  revalidatePath("/sz-app/dash");
}
