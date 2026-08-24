import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { SignOutButton } from "@/components/auth/sign-out-button";

const PROVIDER_LABELS: Record<string, string> = {
  credential: "Email / mot de passe",
  discord: "Discord",
  google: "Google",
};

function getInitials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const accounts = await prisma.account.findMany({
    where: { userId: session.user.id },
    select: { providerId: true },
  });

  const hasPassword = accounts.some(
    (account) => account.providerId === "credential",
  );

  return (
    <div className="flex flex-col gap-8 bg-border/20 py-16 px-8 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <h2 className="text-xl font-semibold">Mon profil</h2>
          <p className="text-sm text-muted-foreground">
            Gère tes informations de compte.
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compte</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={session.user.image ?? undefined} />
                <AvatarFallback>
                  {getInitials(session.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <span className="font-medium">{session.user.name}</span>
                <span className="text-sm text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">
                Méthodes de connexion
              </span>
              <div className="flex flex-wrap gap-1">
                {accounts.map((account) => (
                  <Badge key={account.providerId} variant="outline">
                    {PROVIDER_LABELS[account.providerId] ?? account.providerId}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {hasPassword && (
          <Card>
            <CardHeader>
              <CardTitle>Changer le mot de passe</CardTitle>
            </CardHeader>
            <CardContent>
              <ChangePasswordForm />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
