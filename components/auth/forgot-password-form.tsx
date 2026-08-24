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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    if (error) {
      setMessage(error.message ?? "Une erreur est survenue.");
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  if (sent) {
    return (
      <div className={cn("flex flex-col gap-4 text-center", className)}>
        <h1 className="text-2xl font-bold">Vérifie tes emails</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Si un compte existe pour {email}, un lien de réinitialisation vient
          d&apos;être envoyé.
        </p>
        <a
          href="/sign-in"
          className="text-sm underline underline-offset-4"
        >
          Retour à la connexion
        </a>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Entre ton email, on t&apos;envoie un lien pour le réinitialiser.
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
          <Button type="submit" disabled={loading}>
            {loading ? "Envoi..." : "Envoyer le lien"}
          </Button>

          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </form>

        <FieldDescription className="text-center">
          <a href="/sign-in" className="underline underline-offset-4">
            Retour à la connexion
          </a>
        </FieldDescription>
      </FieldGroup>
    </div>
  );
}
