import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCategory, deleteCategory } from "@/lib/actions/categories";
import { createBrand, deleteBrand } from "@/lib/actions/brands";
import { ManageList } from "@/components/settings/manage-list";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function ManageItemsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const userId = session.user.id;

  const [categories, brands] = await Promise.all([
    prisma.category.findMany({
      where: { OR: [{ userId: null }, { userId }] },
      orderBy: { name: "asc" },
    }),
    prisma.brand.findMany({
      where: { OR: [{ userId: null }, { userId }] },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-col gap-6 bg-border/20 py-16 px-8 min-h-screen">
      <div className="flex flex-col gap-0">
        <h2 className="text-xl font-semibold">Catégories & marques</h2>
        <p className="text-sm text-muted-foreground">
          Gère tes catégories et marques pour mieux organiser ton inventaire.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Catégories</CardTitle>
            <CardDescription>
              Gère tes catégories pour mieux organiser ton inventaire.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ManageList
              name="Catégories"
              items={categories}
              createAction={createCategory}
              deleteAction={deleteCategory}
              placeholder="Nouvelle catégorie"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marques</CardTitle>
            <CardDescription>
              Gère tes marques pour mieux organiser ton inventaire.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ManageList
              name="Marques"
              items={brands}
              createAction={createBrand}
              deleteAction={deleteBrand}
              placeholder="Nouvelle marque"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
