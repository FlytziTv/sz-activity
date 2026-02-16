import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Header from "@/components/sz/header";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si pas de session, on redirige une seule fois pour tout le dossier
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Header />
      <main className="pt-16.5 px-2">{children}</main>
    </>
  );
}
