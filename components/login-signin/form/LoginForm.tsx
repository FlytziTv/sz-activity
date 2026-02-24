"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GithubIcon } from "@/components/default/icons/GithubIcon";
import { GoogleIcon } from "@/components/default/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormGroup } from "@/components/default/form/FormGroup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/sz-app/dash",
      });
      if (error) {
        alert(error.message);
        setLoading(false);
      }
      // Si succès → redirection automatique, pas besoin de setLoading(false)
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/sz-app/dash",
    });

    if (error) {
      alert(`Erreur: ${error.message}`);
      setLoading(false);
    }
    // Si succès, Better Auth gère la redirection
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 relative w-lg">
      <div className="flex flex-col gap-0 items-center justify-center">
        <h2 className="text-2xl font-semibold">Connexion à votre compte</h2>
        <p className="text-md font-medium text-center text-[#6F6F6F]">
          Saisissez vos données personnelles pour vous connecter.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full">
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => handleSocialSignIn("google")}
          className="w-full"
        >
          <GoogleIcon size={16} /> Google
        </Button>
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => handleSocialSignIn("github")}
          className="w-full"
        >
          <GithubIcon size={16} /> GitHub
        </Button>
      </div>

      <div className="w-full flex flex-row gap-2 items-center justify-center">
        <div className="h-0.5 w-full bg-linear-65 from-transparent to-[#9B9B9B] rounded-full" />
        <p className="text-center">ou</p>
        <div className="h-0.5 w-full bg-linear-65 from-[#9B9B9B] to-transparent rounded-full" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="flex flex-col gap-4 w-full"
      >
        <FormGroup
          name="email"
          label="Email"
          type="email"
          placeholder="Entrez votre email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormGroup
          name="password"
          label="Mot de passe"
          type="password"
          placeholder="Entrez votre mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </div>
      </form>
    </div>
  );
}
