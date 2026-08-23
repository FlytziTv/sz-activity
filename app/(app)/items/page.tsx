import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NewItemButton } from "@/components/items/newItem-button";
import { ChangeItemStatusButton } from "@/components/items/change-item-status-button";
import ItemCard from "@/components/items/item-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const { category: selectedCategory } = await searchParams;
  const userId = session.user.id;

  const itemWhere =
    selectedCategory === "none"
      ? { userId, categoryId: null }
      : selectedCategory
        ? { userId, categoryId: selectedCategory }
        : { userId };

  const [items, categories, brands, counts, totalCount, allItems] =
    await Promise.all([
      prisma.item.findMany({
        where: itemWhere,
        include: { category: true, brand: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany({
        where: { OR: [{ userId: null }, { userId }] },
        orderBy: { name: "asc" },
      }),
      prisma.brand.findMany({
        where: { OR: [{ userId: null }, { userId }] },
        orderBy: { name: "asc" },
      }),
      prisma.item.groupBy({
        by: ["categoryId"],
        where: { userId },
        _count: { _all: true },
      }),
      prisma.item.count({ where: { userId } }),
      prisma.item.findMany({
        where: { userId },
        select: { id: true, name: true, quantity: true, status: true },
        orderBy: { name: "asc" },
      }),
    ]);

  const countByCategory = new Map(
    counts.map((c) => [c.categoryId, c._count._all]),
  );

  const filters = [
    { key: undefined, label: "Tous", count: totalCount },
    ...categories.map((category) => ({
      key: category.id,
      label: category.name,
      count: countByCategory.get(category.id) ?? 0,
    })),
    {
      key: "none",
      label: "Sans catégorie",
      count: countByCategory.get(null) ?? 0,
    },
  ];

  return (
    <div className="flex flex-col gap-8 bg-border/20 py-16 px-8 min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0">
            <h2 className="text-xl font-semibold">Mon inventaire</h2>
            <p className="text-sm text-muted-foreground">
              {items.length} item{items.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/items/manage"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Gérer catégories & marques
            </Link>
            <ChangeItemStatusButton items={allItems} />
            <NewItemButton categories={categories} brands={brands} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = (filter.key ?? "") === (selectedCategory ?? "");
            return (
              <Link
                key={filter.key ?? "all"}
                href={filter.key ? `/items?category=${filter.key}` : "/items"}
                className={cn(
                  buttonVariants({
                    variant: isActive ? "default" : "outline",
                  }),
                )}
              >
                {filter.label}
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className="px-1.5"
                >
                  {filter.count}
                </Badge>
              </Link>
            );
          })}
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun item{" "}
            {selectedCategory ? "dans cette catégorie" : "pour l'instant"}.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
