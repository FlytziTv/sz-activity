"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { activity } from "@/lib/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addActivity(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Non autorisé");

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
  const toMeters = (name: string) => {
    const value = parseInt(formData.get(name) as string) || null;
    const unit = formData.get(`${name}Unit`) as string;
    return value ? (unit === "km" ? value * 1000 : value) : null;
  };

  // Coordonnées GPS
  const parseCoords = (value: string) => {
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  };

  const startPoint = formData.get("start_point") as string;
  const endPoint = formData.get("end_point") as string;

  await db.insert(activity).values({
    createdByUserId: session.user.id,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    activityType: (formData.get("type") as any) || "randonnee",
    difficulty: (formData.get("difficulty") as any) || "moyen",
    distance: distanceKm,
    duration: durationMin,
    elevationGain: toMeters("denivele_positif"),
    elevationLoss: toMeters("denivele_negatif"),
    highestPoint: toMeters("points_haut"),
    lowestPoint: toMeters("points_bas"),
    country: (formData.get("country") as string) || null,
    region: (formData.get("region") as string) || null,
    startLat: parseCoords(startPoint.split(",")[0]),
    startLng: parseCoords(startPoint.split(",")[1]),
    endLat: parseCoords(endPoint.split(",")[0]),
    endLng: parseCoords(endPoint.split(",")[1]),
  });

  revalidatePath("/sz-app/dash");
}
