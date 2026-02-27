import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  userProfiles,
  userActivities,
  userActivityStuff,
  stuff,
  activity,
} from "@/lib/schema";
import { eq, desc, sum, count, and } from "drizzle-orm";

async function getDashboardData(userId: string) {
  const [
    profile,
    stats,
    recentActivities,
    nextActivity,
    topStuff,
    activitiesCreated,
    totalStuffCount,
  ] = await Promise.all([
    // 1. Profil
    db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId))
      .limit(1),

    // 2. Stats globales
    db
      .select({
        totalActivities: count(userActivities.id),
        totalDistance: sum(userActivities.distance),
        totalElevation: sum(userActivities.elevationGain),
        totalDuration: sum(userActivities.duration),
      })
      .from(userActivities)
      .where(eq(userActivities.userId, userId)),

    // 3. Sorties récentes
    db
      .select()
      .from(userActivities)
      .where(eq(userActivities.userId, userId))
      .orderBy(desc(userActivities.createdAt))
      .limit(3),

    // 4. Prochaine sortie planifiée
    db
      .select()
      .from(userActivities)
      .where(
        and(
          eq(userActivities.userId, userId),
          eq(userActivities.status, "planned"),
        ),
      )
      .orderBy(userActivities.date)
      .limit(1),

    // 5. Stuff le plus utilisé
    db
      .select({
        stuffId: userActivityStuff.stuffId,
        name: stuff.name,
        brand: stuff.brand,
        category: stuff.category,
        usageCount: count(userActivityStuff.stuffId),
      })
      .from(userActivityStuff)
      .innerJoin(
        userActivities,
        eq(userActivityStuff.userActivityId, userActivities.id),
      )
      .innerJoin(stuff, eq(userActivityStuff.stuffId, stuff.id))
      .where(eq(userActivities.userId, userId))
      .groupBy(
        userActivityStuff.stuffId,
        stuff.name,
        stuff.brand,
        stuff.category,
      )
      .orderBy(desc(count(userActivityStuff.stuffId)))
      .limit(3),

    // 6. Activités créées
    db
      .select({ count: count(activity.id) })
      .from(activity)
      .where(eq(activity.createdByUserId, userId)),

    // 7. Nombre de stuffs
    db
      .select({ count: count(stuff.id) })
      .from(stuff)
      .where(eq(stuff.userId, userId)),
  ]);

  return {
    profile: profile[0],
    stats: stats[0],
    recentActivities,
    nextActivity: nextActivity[0],
    topStuff,
    activitiesCreated: activitiesCreated[0],
    totalStuffCount: totalStuffCount[0],
  };
}

export default async function DashPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const {
    profile,
    stats,
    nextActivity,
    topStuff,
    activitiesCreated,
    totalStuffCount,
  } = await getDashboardData(session.user.id);

  const totalKm = Math.round(Number(stats?.totalDistance ?? 0));
  const totalElevation = Math.round(Number(stats?.totalElevation ?? 0));
  const totalHours = Math.round(Number(stats?.totalDuration ?? 0) / 60);
  const totalActivities = Number(stats?.totalActivities ?? 0);

  const totalActivitiesCreate = Number(activitiesCreated?.count ?? 0);
  const totalStuff = Number(totalStuffCount?.count ?? 0);

  const distanceGoal = profile?.annualDistanceGoal ?? 0;
  const activitiesGoal = profile?.annualActivitiesGoal ?? 0;
  const distanceProgress = distanceGoal
    ? Math.min(Math.round((totalKm / distanceGoal) * 100), 100)
    : 0;
  const activitiesProgress = activitiesGoal
    ? Math.min(Math.round((totalActivities / activitiesGoal) * 100), 100)
    : 0;

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bonjour {session.user.name} 👋</h1>
          <p className="text-sm text-[#6F6F6F]">
            Voici un résumé de tes aventures
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="col-span-1 flex flex-col gap-2 bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-4">
        <h2 className="font-semibold">Quelques statistiques</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 ">
          <StatCard label="Kilomètres" value={`${totalKm} km`} />
          <StatCard label="Dénivelé" value={`${totalElevation} m`} />
          <StatCard label="Heures" value={`${totalHours} h`} />
          <StatCard label="Sorties" value={`${totalActivities}`} />
          <StatCard
            label="Activités Crées"
            value={`${totalActivitiesCreate}`}
          />
          <StatCard label="Équipements" value={`${totalStuff}`} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Objectifs */}
        {/* <div className="col-span-1 flex flex-col gap-3 bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-4">
          <h2 className="font-semibold">Objectifs annuels</h2>
          {distanceGoal > 0 ? (
            <ProgressBar
              label="Distance"
              current={totalKm}
              goal={distanceGoal}
              unit="km"
              progress={distanceProgress}
            />
          ) : (
            <p className="text-sm text-[#6F6F6F]">
              Aucun objectif de distance défini.
            </p>
          )}
          {activitiesGoal > 0 ? (
            <ProgressBar
              label="Sorties"
              current={totalActivities}
              goal={activitiesGoal}
              unit="sorties"
              progress={activitiesProgress}
            />
          ) : (
            <p className="text-sm text-[#6F6F6F]">
              Aucun objectif de sorties défini.
            </p>
          )}
        </div> */}

        {/* Prochaine sortie */}
        {/* <div className="col-span-1 flex flex-col gap-3 bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-4">
          <h2 className="font-semibold">Prochaine sortie</h2>
          {nextActivity ? (
            <div className="flex flex-col gap-1">
              <p className="font-medium">{nextActivity.title}</p>
              <p className="text-sm text-[#6F6F6F]">
                {new Date(nextActivity.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
              {nextActivity.distance && (
                <p className="text-sm">{nextActivity.distance} km</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-[#6F6F6F]">Aucune sortie planifiée.</p>
          )}
        </div> */}

        {/* Équipement le plus utilisé */}
        {/* <div className="col-span-1 flex flex-col gap-3 bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-4">
          <h2 className="font-semibold">Équipement favori</h2>
          {topStuff.length > 0 ? (
            <div className="flex flex-col gap-2">
              {topStuff.map((item) => (
                <div
                  key={item.stuffId}
                  className="flex flex-row items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-[#6F6F6F]">{item.brand}</p>
                  </div>
                  <p className="text-xs text-[#6F6F6F]">{item.usageCount}x</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#6F6F6F]">Aucun équipement utilisé.</p>
          )}
        </div> */}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 bg-[#FFFFFF] rounded-lg p-2">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-[#6F6F6F]">{label}</p>
    </div>
  );
}

function ProgressBar({
  label,
  current,
  goal,
  unit,
  progress,
}: {
  label: string;
  current: number;
  goal: number;
  unit: string;
  progress: number;
}) {
  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex flex-row items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-[#6F6F6F]">
          {current} / {goal} {unit}
        </p>
      </div>
      <div className="h-2 w-full bg-[#DCDCDC] rounded-full">
        <div
          className="h-2 bg-black rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-[#6F6F6F] text-right">{progress}%</p>
    </div>
  );
}
