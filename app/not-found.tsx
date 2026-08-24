import Link from "next/link";
import { Logo } from "@/public/icons/Logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <Logo size={40} />
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">
          Cette page n&apos;existe pas ou plus.
        </p>
      </div>
      <Link href="/dashboard">
        <Button>Retour au dashboard</Button>
      </Link>
    </div>
  );
}
