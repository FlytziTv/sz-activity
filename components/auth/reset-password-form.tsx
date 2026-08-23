"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ResetPasswordForm({
  token,
  className,
}: {
  token: string | null;
  className?: string;
}) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!token) {
      setMessage("Lien invalide ou expiré.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const { error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    setLoading(false);

    if (error) {
      setMessage(error.message ?? "Une erreur est survenue.");
    } else {
      router.push("/sign-in");
    }
  }

  if (!token) {
    return (
      <div className={cn("flex flex-col gap-4 text-center", className)}>
        <h1 className="text-2xl font-bold">Lien invalide</h1>
        <p className="text-sm text-muted-foreground">
          Ce lien de réinitialisation est invalide ou a expiré.
        </p>
        <a
          href="/forgot-password"
          className="text-sm underline underline-offset-4"
        >
          Redemander un lien
        </a>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Nouveau mot de passe</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="password">Nouveau mot de passe</FieldLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              minLength={8}
              required
            />
          </Field>
          <Field className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="confirmPassword">
              Confirme le mot de passe
            </FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              minLength={8}
              required
            />
          </Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Enregistrement..." : "Réinitialiser le mot de passe"}
          </Button>

          {message && (
            <p className="text-sm text-destructive">{message}</p>
          )}
        </form>
      </FieldGroup>
    </div>
  );
}
