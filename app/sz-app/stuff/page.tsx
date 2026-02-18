import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import StuffCard from "@/components/cards/StuffCard";
import StuffForm from "@/components/form/stuffsForm";

interface StuffItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  weight: number;
  url: string;
  image: string;
}

async function getStuff() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return [];

  // Changement ici : .execute() au lieu de .prepare().all()
  const result = await db.execute({
    sql: `SELECT * FROM stuff WHERE userId = ? ORDER BY created_at DESC`,
    args: [session.user.id],
  });

  // Les données LibSQL sont dans result.rows
  // On les caste en StuffItem[] pour TypeScript
  return result.rows as unknown as StuffItem[];
}

export default async function Stuff() {
  const items = await getStuff();

  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((item) => (
        <StuffCard
          key={item.id}
          id={item.id}
          name={item.name}
          brand={item.brand}
          category={item.category}
          weight={item.weight}
          url={item.url}
          image={item.image}
        />
      ))}
      <StuffForm />
    </div>
  );
}
