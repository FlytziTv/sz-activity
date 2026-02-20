"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { userProfiles } from "@/lib/schema";
import { headers } from "next/headers";
import { OnboardingData } from "@/app/page";

export async function saveOnboardingProfile(data: OnboardingData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Non autorisé");

  await db.insert(userProfiles).values({
    userId: session.user.id,
    level: data.level || null,
    frequency: data.frequency || null,
    preferredRouteType: data.preferredRouteType.join(",") || null,
    country: data.country || null,
    region: data.region || null,
    objectives: data.objectives.join(",") || null,
    weight: data.weight,
    height: data.height,
    shoeSize: data.shoeSize,
    annualDistanceGoal: data.annualDistanceGoal,
    annualActivitiesGoal: data.annualActivitiesGoal,
    onboardingCompleted: true,
  });
}
