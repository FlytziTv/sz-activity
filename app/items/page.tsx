import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NewItemButton } from "@/components/items/newItem-button";
import ItemCard from "@/components/items/item-card";

export default async function ItemsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const [items, categories, brands] = await Promise.all([
    prisma.item.findMany({
      where: { userId: session.user.id },
      include: { category: true, brand: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      where: { OR: [{ userId: null }, { userId: session.user.id }] },
      orderBy: { name: "asc" },
    }),
    prisma.brand.findMany({
      where: { OR: [{ userId: null }, { userId: session.user.id }] },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-col gap-8 bg-border py-16 px-8 min-h-screen">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Mon inventaire ({items.length})
          </h2>
          <NewItemButton categories={categories} brands={brands} />
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun item pour l&apos;instant.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                categories={categories}
                brands={brands}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
