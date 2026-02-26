import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProfile, getUserStats } from "@/lib/queries/profile";
import ProfileView from "@/components/profile/ProfileView";

export default async function MyProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sz-app/login");

  const [profile, stats] = await Promise.all([
    getUserProfile(session.user.id),
    getUserStats(session.user.id),
  ]);

  if (!profile) redirect("/sz-app/login");

  return <ProfileView profile={profile} stats={stats} isOwner={true} />;
}
