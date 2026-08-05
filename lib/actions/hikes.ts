"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getEffectiveWeight } from "@/lib/item-weight";

export type CreateHikeState = { error: string } | { hikeId: string };

export async function createHike(
  _prevState: CreateHikeState | null,
  formData: FormData,
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
  selections: { itemId: string; quantity: number }[],
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
    select: {
      id: true,
      name: true,
      weight: true,
      quantity: true,
      waterCapacityLiters: true,
    },
  });
  const itemsById = new Map(items.map((i) => [i.id, i]));

  for (const selection of selections) {
    if (!Number.isInteger(selection.quantity) || selection.quantity < 1) {
      return { error: "Quantité invalide." };
    }
    const item = itemsById.get(selection.itemId);
    if (item && selection.quantity > item.quantity) {
      return {
        error: `Tu n'as que ${item.quantity} "${item.name}" en stock (tu en as sélectionné ${selection.quantity}).`,
      };
    }
  }

  const plannedWeight = selections.reduce((total, s) => {
    const item = itemsById.get(s.itemId);
    return total + (item ? getEffectiveWeight(item) * s.quantity : 0);
  }, 0);

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
      }),
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

export async function toggleHikeItemConfirmed(hikeItemId: string, confirmed: boolean) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Tu dois être connecté.");
  }

  const hikeItem = await prisma.hikeItem.findFirst({
    where: { id: hikeItemId, hike: { userId: session.user.id } },
    select: { hikeId: true },
  });
  if (!hikeItem) {
    throw new Error("Item de rando introuvable.");
  }

  await prisma.hikeItem.update({
    where: { id: hikeItemId },
    data: { confirmed },
  });

  revalidatePath(`/activites/${hikeItem.hikeId}`);
}

export type StartHikeState = { error: string } | { success: true };

export async function startHike(hikeId: string): Promise<StartHikeState> {
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
  if (hike.status !== "PREPARING") {
    return { error: "Cette rando n'est pas en préparation." };
  }

  await prisma.hike.update({
    where: { id: hikeId },
    data: { status: "IN_PROGRESS" },
  });

  revalidatePath(`/activites/${hikeId}`);
  revalidatePath("/activites");
  return { success: true };
}

export type CreateCheckPointState = { error: string } | { success: true };

export async function createCheckPoint(
  hikeId: string,
  _prevState: CreateCheckPointState | null,
  formData: FormData,
): Promise<CreateCheckPointState> {
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
  if (hike.status !== "IN_PROGRESS") {
    return { error: "Cette rando n'est pas en cours." };
  }

  const label = String(formData.get("label") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (!label) {
    return { error: "Le label est obligatoire." };
  }

  await prisma.checkPoint.create({
    data: { hikeId, label, note: note || null },
  });

  revalidatePath(`/activites/${hikeId}`);
  return { success: true };
}

export async function deleteCheckPoint(checkPointId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Tu dois être connecté.");
  }

  const checkPoint = await prisma.checkPoint.findFirst({
    where: { id: checkPointId, hike: { userId: session.user.id } },
    select: { hikeId: true },
  });
  if (!checkPoint) {
    throw new Error("Check-point introuvable.");
  }

  await prisma.checkPoint.delete({ where: { id: checkPointId } });

  revalidatePath(`/activites/${checkPoint.hikeId}`);
}

export type CompleteHikeState = { error: string } | { success: true };

export async function completeHike(hikeId: string): Promise<CompleteHikeState> {
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
  if (hike.status !== "IN_PROGRESS") {
    return { error: "Cette rando n'est pas en cours." };
  }

  await prisma.hike.update({
    where: { id: hikeId },
    data: { status: "COMPLETED" },
  });

  revalidatePath(`/activites/${hikeId}`);
  revalidatePath("/activites");
  return { success: true };
}

const SPLIT_STATUSES = ["LOST", "DAMAGED", "CONSUMED"] as const;
type SplitStatus = (typeof SPLIT_STATUSES)[number];

export type CreateStatusSplitState = { error: string } | { success: true };

export async function createStatusSplit(
  hikeItemId: string,
  status: SplitStatus,
  quantity: number,
): Promise<CreateStatusSplitState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Tu dois être connecté." };
  }

  if (!SPLIT_STATUSES.includes(status)) {
    return { error: "Statut invalide." };
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { error: "Quantité invalide." };
  }

  const hikeItem = await prisma.hikeItem.findFirst({
    where: { id: hikeItemId, hike: { userId: session.user.id } },
    include: { statusSplits: true, hike: { select: { id: true, status: true } } },
  });
  if (!hikeItem) {
    return { error: "Item de rando introuvable." };
  }
  if (hikeItem.hike.status !== "IN_PROGRESS") {
    return { error: "Cette rando n'est pas en cours." };
  }

  const alreadySplit = hikeItem.statusSplits.reduce(
    (total, split) => total + split.quantity,
    0,
  );
  const remaining = hikeItem.quantity - alreadySplit;
  if (quantity > remaining) {
    return { error: `Il ne reste que ${remaining} exemplaire(s) disponible(s).` };
  }

  await prisma.hikeItemStatusSplit.create({
    data: { hikeItemId, status, quantity },
  });

  revalidatePath(`/activites/${hikeItem.hike.id}`);
  return { success: true };
}

export async function deleteStatusSplit(splitId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Tu dois être connecté.");
  }

  const split = await prisma.hikeItemStatusSplit.findFirst({
    where: { id: splitId, hikeItem: { hike: { userId: session.user.id } } },
    select: { hikeItem: { select: { hikeId: true } } },
  });
  if (!split) {
    throw new Error("Élément introuvable.");
  }

  await prisma.hikeItemStatusSplit.delete({ where: { id: splitId } });

  revalidatePath(`/activites/${split.hikeItem.hikeId}`);
}
