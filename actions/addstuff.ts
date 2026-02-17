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
  const image = (formData.get("image") as string) || null;
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category = formData.get("category") as string; // <--- NE PAS OUBLIER
  const url = formData.get("url") as string;
  const weight = parseInt(formData.get("weight") as string) || 0;

  // 3. Insertion SQL (Ajout de la colonne category)
  const id = crypto.randomUUID();
  const statement = db.prepare(`
    INSERT INTO stuff (id, userId, image, name, brand, category, url, weight)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  statement.run(id, session.user.id, image, name, brand, category, url, weight);

  revalidatePath("/sz-app/stuff");
}

export async function deleteStuff(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Non autorisé");

  // On supprime l'objet UNIQUEMENT s'il appartient à l'utilisateur connecté
  const statement = db.prepare(`
    DELETE FROM stuff 
    WHERE id = ? AND userId = ?
  `);

  statement.run(id, session.user.id);

  revalidatePath("/sz-app/stuff");
}
