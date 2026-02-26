import { getUserProfile, getUserStats } from "@/lib/queries/profile";
import ProfileView from "@/components/profile/ProfileView";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const [profile, stats] = await Promise.all([
    getUserProfile(id),
    getUserStats(id),
  ]);

  if (!profile) notFound();

  const isOwner = session?.user.id === id;

  return <ProfileView profile={profile} stats={stats} isOwner={isOwner} />;
}
