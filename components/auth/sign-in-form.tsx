"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignInForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      setMessage(error.message ?? "Une erreur est survenue.");
    } else {
      setMessage("Connecté !");
      // Rediriger vers la page de dashboard après la connexion
      window.location.href = "/dashboard";
    }
    setLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Se connecter</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Connectez-vous pour accéder à votre compte et profiter de toutes les
            fonctionnalités de notre application.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
            />
          </Field>
          <Field className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <a
                href="/forgot-password"
                className="text-sm underline underline-offset-4"
              >
                Mot de passe oublié ?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>

          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </form>

        <FieldSeparator>Ou Connectez-vous</FieldSeparator>
        <Field>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => authClient.signIn.social({ provider: "discord" })}
            >
              Discord
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => authClient.signIn.social({ provider: "google" })}
            >
              Google
            </Button>
          </div>

          <FieldDescription className="text-center">
            Vous n&apos;avez pas de compte?{" "}
            <a href="/sign-up" className="underline underline-offset-4">
              S&apos;inscrire
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}
