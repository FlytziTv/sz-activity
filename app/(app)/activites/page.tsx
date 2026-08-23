import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NewHikeButton } from "@/components/hikes/newHike-button";
import HikeCard from "@/components/hikes/hike-card";

export default async function ActivitesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const hikes = await prisma.hike.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6 bg-border/20 py-16 px-8 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <h2 className="text-xl font-semibold">Mes randos</h2>
          <p className="text-sm text-muted-foreground">
            {hikes.length} rando{hikes.length > 1 ? "s" : ""}
          </p>
        </div>
        <NewHikeButton />
      </div>

      {hikes.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucune rando pour l&apos;instant.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {hikes.map((hike) => (
            <HikeCard key={hike.id} hike={hike} />
          ))}
        </ul>
      )}
    </div>
  );
}
