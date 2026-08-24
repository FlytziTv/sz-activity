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

export function SignUpForm({ className }: { className?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await authClient.signUp.email({ name, email, password });

    if (error) {
      setMessage(error.message ?? "Une erreur est survenue.");
    } else {
      setMessage("Compte créé. Vérifie ta boîte mail pour confirmer ton adresse.");
    }
    setLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Inscrivez-vous pour accéder à votre compte et profiter de toutes les
            fonctionnalités de notre application.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="name">Nom</FieldLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              required
            />
          </Field>
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
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <Input
              id="password"
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Création..." : "S'inscrire"}
          </Button>

          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </form>

        <FieldSeparator>Ou inscrivez-vous avec</FieldSeparator>
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
            Vous avez déjà un compte?{" "}
            <a href="/sign-in" className="underline underline-offset-4">
              Se connecter
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}
