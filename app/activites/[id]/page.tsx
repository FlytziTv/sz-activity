import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { HikeItemPicker } from "@/components/hikes/hike-item-picker";
import { Badge } from "@/components/ui/badge";
import { HIKE_STATUS_LABELS } from "@/lib/labels";

export default async function HikeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const { id } = await params;

  const hike = await prisma.hike.findFirst({
    where: { id, userId: session.user.id },
    include: { items: true },
  });
  if (!hike) {
    notFound();
  }

  const items = await prisma.item.findMany({
    where: { userId: session.user.id },
    include: { category: true },
    orderBy: { name: "asc" },
  });

  const initialSelection = Object.fromEntries(
    hike.items.map((hikeItem) => [hikeItem.itemId, hikeItem.quantity]),
  );

  return (
    <div className="flex flex-col gap-6 bg-border/20 py-16 px-8 min-h-screen">
      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">{hike.name}</h2>
          <Badge variant="outline">{HIKE_STATUS_LABELS[hike.status]}</Badge>
        </div>
        {hike.location && (
          <p className="text-sm text-muted-foreground">{hike.location}</p>
        )}
      </div>

      <HikeItemPicker
        hikeId={hike.id}
        items={items}
        initialSelection={initialSelection}
      />
    </div>
  );
}
