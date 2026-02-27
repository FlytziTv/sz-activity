import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { stuff } from "@/lib/schema";
import { headers } from "next/headers";
import { eq, desc } from "drizzle-orm";
import StuffCard from "@/components/stuffs/cards/StuffCard";
export const dynamic = "force-dynamic";

async function getStuff() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return [];

  return await db
    .select()
    .from(stuff)
    .where(eq(stuff.userId, session.user.id))
    .orderBy(desc(stuff.createdAt));
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
          weight={item.weight ?? 0}
          url={item.url ?? ""}
          image={item.image ?? ""}
        />
      ))}
    </div>
  );
}
