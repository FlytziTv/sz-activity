import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import NavBar from "@/components/layout/navbar";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { StatCard } from "@/components/dashboard/stat-card";
import RecentHikes from "@/components/dashboard/recenthike";
import ItemsStats from "@/components/dashboard/itemsStats";
import NextHike from "@/components/dashboard/nexthike";

function formatDuration(minutes: number | null) {
  if (!minutes) return "0h";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest > 0 ? `${hours}h${String(rest).padStart(2, "0")}` : `${hours}h`;
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const userId = session.user.id;

  const [
    hikeAgg,
    upcomingHike,
    recentHikes,
    itemStatusGroups,
    itemQuantityAgg,
  ] = await Promise.all([
    prisma.hike.aggregate({
      where: { userId, status: "COMPLETED" },
      _sum: {
        actualDistance: true,
        actualDuration: true,
        actualElevation: true,
      },
      _count: true,
    }),
    prisma.hike.findFirst({
      where: {
        userId,
        status: { not: "COMPLETED" },
        date: { gte: new Date(new Date().toDateString()) },
      },
      orderBy: { date: "asc" },
    }),
    prisma.hike.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.item.groupBy({
      by: ["status"],
      where: { userId },
      _count: { _all: true },
    }),
    prisma.item.aggregate({
      where: { userId },
      _sum: { quantity: true },
    }),
  ]);

  const itemsNeedingAttention = itemStatusGroups
    .filter((group) => group.status !== "OK")
    .reduce((total, group) => total + group._count._all, 0);

  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-8 bg-border/20 py-16 px-8 min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0">
            <h2 className="text-xl font-semibold">
              Salut {session.user.name.split(" ")[0]}
            </h2>
            <p className="text-sm text-muted-foreground">
              Voici un résumé de ton activité.
            </p>
          </div>
          <SignOutButton />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard label="Randos terminées" value={hikeAgg._count} />
          <StatCard
            label="Distance parcourue"
            value={`${hikeAgg._sum.actualDistance ?? 0} km`}
          />
          <StatCard
            label="Dénivelé cumulé"
            value={`${hikeAgg._sum.actualElevation ?? 0} m D+`}
          />
          <StatCard
            label="Temps sur les sentiers"
            value={formatDuration(hikeAgg._sum.actualDuration)}
          />{" "}
          <StatCard
            label="Nombre d'équipements"
            value={`${itemQuantityAgg._sum.quantity ?? 0}`}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <NextHike upcomingHike={upcomingHike} />

          <ItemsStats
            itemQuantityAgg={itemQuantityAgg}
            itemsNeedingAttention={itemsNeedingAttention}
          />
        </div>

        <RecentHikes recentHikes={recentHikes} />
      </div>
    </>
  );
}
