"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type BrandFormState = { error: string } | null;

export async function createBrand(
  _prevState: BrandFormState,
  formData: FormData
): Promise<BrandFormState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Tu dois être connecté." };
  }

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { error: "Le nom est obligatoire." };
  }

  const existing = await prisma.brand.findFirst({
    where: { name, OR: [{ userId: null }, { userId: session.user.id }] },
    select: { id: true },
  });
  if (existing) {
    return { error: "Cette marque existe déjà." };
  }

  await prisma.brand.create({
    data: { name, userId: session.user.id },
  });

  revalidatePath("/items/manage");
  revalidatePath("/items");
  return null;
}

export async function deleteBrand(brandId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Tu dois être connecté.");
  }

  await prisma.brand.deleteMany({
    where: { id: brandId, userId: session.user.id },
  });

  revalidatePath("/items/manage");
  revalidatePath("/items");
}
