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

  // 2. Extraction des données (Ajout de category ici)
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category = formData.get("category") as string; // <--- NE PAS OUBLIER
  const url = formData.get("url") as string;
  const weight = parseInt(formData.get("weight") as string) || 0;

  // 3. Insertion SQL (Ajout de la colonne category)
  const id = crypto.randomUUID();
  const statement = db.prepare(`
    INSERT INTO stuff (id, userId, name, brand, category, url, weight)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  statement.run(id, session.user.id, name, brand, category, url, weight);

  revalidatePath("/sz-app/stuff");
}
