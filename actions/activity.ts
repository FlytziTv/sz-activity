"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { activity } from "@/lib/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addActivity(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Non autorisé");

  // Convertir distance en km
  const distanceValue = parseFloat(formData.get("distance") as string) || null;
  const distanceUnit = formData.get("distance_unit") as string;
  const distanceKm = distanceValue
    ? distanceUnit === "m"
      ? distanceValue / 1000
      : distanceValue
    : null;

  // Convertir durée en minutes
  const durationValue = parseInt(formData.get("duration") as string) || null;
  const durationUnit = formData.get("duration_unit") as string;
  const durationMin = durationValue
    ? durationUnit === "h"
      ? durationValue * 60
      : durationValue
    : null;

  // Fonction pour convertir les dénivelés et points en mètres
  const toMeters = (name: string) => {
    const value = parseInt(formData.get(name) as string) || null;
    const unit = formData.get(`${name}_unit`) as string;
    return value ? (unit === "km" ? value * 1000 : value) : null;
  };

  // Fonction pour parser les coordonnées
  const parseCoords = (coordString: string, index: number) => {
    if (!coordString) return null;
    const parts = coordString.split(",");
    const val = parts[index]?.trim();
    if (!val) return null;
    const cleaned = val.replace(/[^0-9.-]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  };

  const startPoint = formData.get("start_point") as string;
  const endPoint = formData.get("end_point") as string;

  // Insérer l'activité dans la base de données
  await db.insert(activity).values({
    createdByUserId: session.user.id,
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    description: (formData.get("description") as string) || null,
    activityType:
      (formData.get("type") as typeof activity.$inferInsert.activityType) ||
      "randonnee",
    difficulty:
      (formData.get("difficulty") as typeof activity.$inferInsert.difficulty) ||
      "moyen",
    distance: distanceKm,
    duration: durationMin,
    elevationGain: toMeters("denivele_positif"),
    elevationLoss: toMeters("denivele_negatif"),
    highestPoint: toMeters("points_haut"),
    lowestPoint: toMeters("points_bas"),
    country: formData.get("country") as string,
    region: formData.get("region") as string,
    startLat: parseCoords(startPoint, 0),
    startLng: parseCoords(startPoint, 1),
    endLat: parseCoords(endPoint, 0),
    endLng: parseCoords(endPoint, 1),
  });

  revalidatePath("/sz-app/dash");
}
