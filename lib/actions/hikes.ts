"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type CreateHikeState = { error: string } | { hikeId: string };

export async function createHike(
  _prevState: CreateHikeState | null,
  formData: FormData
): Promise<CreateHikeState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Tu dois être connecté." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const rawDate = String(formData.get("date") ?? "").trim();

  if (!name) {
    return { error: "Le nom est obligatoire." };
  }

  const hike = await prisma.hike.create({
    data: {
      name,
      location: location || null,
      date: rawDate ? new Date(rawDate) : null,
      userId: session.user.id,
    },
  });

  revalidatePath("/activites");
  return { hikeId: hike.id };
}

export async function deleteHike(hikeId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Tu dois être connecté.");
  }

  await prisma.hike.deleteMany({
    where: { id: hikeId, userId: session.user.id },
  });

  revalidatePath("/activites");
}

export type UpdateHikeItemsState = { error: string } | { success: true };

export async function updateHikeItems(
  hikeId: string,
  selections: { itemId: string; quantity: number }[]
): Promise<UpdateHikeItemsState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Tu dois être connecté." };
  }

  const hike = await prisma.hike.findFirst({
    where: { id: hikeId, userId: session.user.id },
  });
  if (!hike) {
    return { error: "Rando introuvable." };
  }

  const itemIds = selections.map((s) => s.itemId);
  const ownedItemsCount = await prisma.item.count({
    where: { id: { in: itemIds }, userId: session.user.id },
  });
  if (ownedItemsCount !== itemIds.length) {
    return { error: "Sélection invalide." };
  }

  const items = await prisma.item.findMany({
    where: { id: { in: itemIds } },
    select: { id: true, weight: true },
  });
  const weightByItemId = new Map(items.map((i) => [i.id, i.weight]));
  const plannedWeight = selections.reduce(
    (total, s) => total + (weightByItemId.get(s.itemId) ?? 0) * s.quantity,
    0
  );

  await prisma.$transaction([
    prisma.hikeItem.deleteMany({
      where: { hikeId, itemId: { notIn: itemIds } },
    }),
    ...selections.map((s) =>
      prisma.hikeItem.upsert({
        where: { hikeId_itemId: { hikeId, itemId: s.itemId } },
        update: { quantity: s.quantity },
        create: {
          hikeId,
          itemId: s.itemId,
          quantity: s.quantity,
          planned: true,
        },
      })
    ),
    prisma.hike.update({
      where: { id: hikeId },
      data: {
        plannedWeight,
        status: selections.length > 0 ? "PREPARING" : "DRAFT",
      },
    }),
  ]);

  revalidatePath(`/activites/${hikeId}`);
  return { success: true };
}
