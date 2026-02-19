"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { lists } from "@/lib/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";

export async function addList(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Tu dois être connecté");

  await db.insert(lists).values({
    userId: session.user.id,
    name: formData.get("name") as string,
    icon: formData.get("icon") as string,
    color: formData.get("color") as string,
    visibility: formData.get("category") as string,
  });

  revalidatePath("/sz-app/lists");
}

export async function deleteList(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Non autorisé");

  await db
    .delete(lists)
    .where(and(eq(lists.id, id), eq(lists.userId, session.user.id)));

  revalidatePath("/sz-app/lists");
}

export async function updateList(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Non autorisé");

  const id = formData.get("id") as string;

  await db
    .update(lists)
    .set({
      name: formData.get("name") as string,
      icon: formData.get("icon") as string,
      color: formData.get("color") as string,
      visibility: formData.get("category") as string,
      updatedAt: new Date(),
    })
    .where(and(eq(lists.id, id), eq(lists.userId, session.user.id)));

  revalidatePath("/sz-app/lists");
}
