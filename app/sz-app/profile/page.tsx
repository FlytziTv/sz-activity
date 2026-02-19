import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  getUserProfile,
  getUserStats,
  getUserActivities,
  getUserStuff,
} from "@/lib/queries/profile";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

// Fonction pour générer les initiales à partir du nom de l'utilisateur
const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase(); // Ex: "Alexis De Jesus" -> "AD"
  }
  return name.slice(0, 2).toUpperCase(); // Fallback si un seul nom
};

export default async function MyProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sz-app/login");

  const [profile, stats, userActivities, userStuff] = await Promise.all([
    getUserProfile(session.user.id),
    getUserStats(session.user.id),
    getUserActivities(session.user.id, true),
    getUserStuff(session.user.id),
  ]);

  if (!profile) redirect("/sz-app/login");

  const banner =
    "https://mapetiterando.fr/wp-content/uploads/2023/04/lac-doo-une-randonnee-unique-pour-les-amoureux-de-la-nature.jpg";

  const initials = getInitials(profile.name);

  return (
    <div className="flex flex-col gap-4 max-w-7xl w-full m-auto p-4 bg-[#E8E8E8] border border-[#DBDBDB] rounded-3xl">
      <div className="w-full relative h-50">
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <Image
            src={banner}
            alt={profile.name}
            fill
            className="absolute object-cover object-center rounded-lg"
          />
          <p className="absolute bottom-1 right-2 text-white font-light text-sm">
            Stats de 2026
          </p>
          <div className="absolute grid grid-cols-3 gap-4 h-50 w-full p-8 px-50 ">
            <div className="bg-black/50 h-full rounded-2xl flex flex-col justify-center items-center text-white">
              <h5 className="text-4xl font-semibold">
                {stats?.totalActivities || 14}
              </h5>
              <span className="text-sm">Randonnées éffectuées</span>
            </div>
            <div className="bg-black/50 h-full rounded-2xl flex flex-col justify-center items-center text-white">
              <h5 className="text-4xl font-semibold">
                {stats?.totalDistance || 1500} km
              </h5>
              <span className="text-sm">Distance parcourue</span>
            </div>
            <div className="bg-black/50 h-full rounded-2xl flex flex-col justify-center items-center text-white">
              <h5 className="text-4xl font-semibold">
                {stats?.totalDuration || 5200} min
              </h5>
              <span className="text-sm">Temps de randonnée</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-row gap-4 absolute -bottom-20 px-4 ">
          <div className=" border-4 border-white rounded-full">
            {profile.image ? (
              <Image
                src={profile.image}
                alt={profile.name}
                width={160}
                height={160}
                className="rounded-full"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold">
                {initials}
              </div>
            )}
          </div>
          <div className="grid grid-rows-2 gap-5 w-full">
            <div></div>
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-row items-center gap-1">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <BadgeCheck size={20} fill="black" className="text-white" />
              </div>
              <p className="text-sm text-gray-600">Triel-sur-seine, France</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-21">
        <nav className="border-b border-[#DBDBDB] w-full flex flex-row items-center justify-start gap-10 px-4">
          <p className="font-medium border-b border-transparent px-2 hover:border-[#000000] cursor-pointer transition-colors duration-150">
            Activités
          </p>
          <p className="font-medium border-b border-transparent px-2 hover:border-[#000000] cursor-pointer transition-colors duration-150">
            Listes
          </p>
          <p className="font-medium border-b border-transparent px-2 hover:border-[#000000] cursor-pointer transition-colors duration-150">
            Équipement
          </p>
          <p className="font-medium border-b border-transparent px-2 hover:border-[#000000] cursor-pointer transition-colors duration-150">
            Stats & Récompenses
          </p>
        </nav>
      </div>
    </div>
  );
}
