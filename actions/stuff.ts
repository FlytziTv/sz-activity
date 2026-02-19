"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { stuff } from "@/lib/schema";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";

export async function addStuff(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Tu dois être connecté");

  await db.insert(stuff).values({
    userId: session.user.id,
    image: (formData.get("image") as string) || null,
    name: formData.get("name") as string,
    brand: formData.get("brand") as string,
    category: formData.get("category") as string,
    url: formData.get("url") as string,
    weight: parseInt(formData.get("weight") as string) || 0,
  });

  revalidatePath("/sz-app/stuff");
}

export async function deleteStuff(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Non autorisé");

  await db
    .delete(stuff)
    .where(and(eq(stuff.id, id), eq(stuff.userId, session.user.id)));

  revalidatePath("/sz-app/stuff");
}

export async function updateStuff(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Non autorisé");

  const id = formData.get("id") as string;

  await db
    .update(stuff)
    .set({
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      category: formData.get("category") as string,
      url: formData.get("url") as string,
      weight: parseInt(formData.get("weight") as string) || 0,
      image: (formData.get("image") as string) || null,
      updatedAt: new Date(),
    })
    .where(and(eq(stuff.id, id), eq(stuff.userId, session.user.id)));

  revalidatePath("/sz-app/stuff");
}
