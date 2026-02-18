"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addStuff(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Tu dois être connecté");

  const image = (formData.get("image") as string) || null;
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category = formData.get("category") as string;
  const url = formData.get("url") as string;
  const weight = parseInt(formData.get("weight") as string) || 0;

  const id = crypto.randomUUID();

  // On utilise await db.execute pour LibSQL
  await db.execute({
    sql: `INSERT INTO stuff (id, userId, image, name, brand, category, url, weight)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [id, session.user.id, image, name, brand, category, url, weight],
  });

  revalidatePath("/sz-app/stuff");
}

export async function deleteStuff(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Non autorisé");

  await db.execute({
    sql: `DELETE FROM stuff WHERE id = ? AND userId = ?`,
    args: [id, session.user.id],
  });

  revalidatePath("/sz-app/stuff");
}

export async function updateStuff(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Non autorisé");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category = formData.get("category") as string;
  const url = formData.get("url") as string;
  const weight = parseInt(formData.get("weight") as string) || 0;
  const image = (formData.get("image") as string) || null;

  await db.execute({
    sql: `UPDATE stuff 
          SET name = ?, brand = ?, category = ?, url = ?, weight = ?, image = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ? AND userId = ?`,
    args: [name, brand, category, url, weight, image, id, session.user.id],
  });

  revalidatePath("/sz-app/stuff");
}
