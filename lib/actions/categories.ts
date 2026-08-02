"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type CategoryFormState = { error: string } | null;

export async function createCategory(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Tu dois être connecté." };
  }

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { error: "Le nom est obligatoire." };
  }

  const existing = await prisma.category.findFirst({
    where: { name, OR: [{ userId: null }, { userId: session.user.id }] },
    select: { id: true },
  });
  if (existing) {
    return { error: "Cette catégorie existe déjà." };
  }

  await prisma.category.create({
    data: { name, userId: session.user.id },
  });

  revalidatePath("/items/manage");
  revalidatePath("/items");
  return null;
}

export async function deleteCategory(categoryId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Tu dois être connecté.");
  }

  await prisma.category.deleteMany({
    where: { id: categoryId, userId: session.user.id },
  });

  revalidatePath("/items/manage");
  revalidatePath("/items");
}
