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

  // On récupère uniquement le matériel de l'utilisateur connecté
  const allStuff = db
    .prepare(
      `
    SELECT * FROM stuff 
    WHERE userId = ? 
    ORDER BY created_at DESC
  `,
    )
    .all(session.user.id) as StuffItem[];

  return allStuff;
}

export default async function Stuff() {
  const items = await getStuff();

  return (
    <>
      <div className="grid grid-cols-4 gap-2 ">
        {items.map((item: StuffItem) => (
          <StuffCard
            key={item.id}
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
    </>
  );
}
