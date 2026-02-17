"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button } from "../ui/button";
import Link from "next/link";
import { FormGroup } from "./FormGroup";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // État pour le chargement

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: provider,
        callbackURL: "/sz-app/dash",
      });

      if (error) {
        console.error(`Erreur connexion ${provider}:`, error);
        alert(error.message);
      }
    } catch (err) {
      console.error("Erreur fatale:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    // Validation basique
    if (!email || !password || !firstName) {
      console.error("Erreur de validation: Champs manquants");
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    console.log("Tentative d'inscription pour:", email);

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: `${firstName} ${lastName}`.trim(),
      callbackURL: "/sz-app/dash",
    });

    if (error) {
      // Log détaillé de l'erreur côté client
      console.error("Erreur lors de l'inscription Better Auth:", {
        message: error.message,
        status: error.status,
        code: error.code,
      });
      alert(`Erreur: ${error.message}`);
      setLoading(false);
    } else {
      console.log("Succès ! Utilisateur créé et connecté:", data);
      // La redirection vers callbackURL est gérée par Better Auth
    }
  };

  return (
    <div className="bg-[#FFFFFF] flex relative rounded-4xl p-4 justify-center ">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col gap-0 items-center justify-center">
          <h2 className="text-2xl font-semibold">Création du compte</h2>
          <p className="text-md font-medium text-center text-[#6F6F6F]">
            Saisissez vos données personnelles pour créer votre compte.
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
            handleSignUp();
          }}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-row gap-4">
            <FormGroup
              name="firstName"
              label="Prénom"
              type="text"
              placeholder="Entrez votre prénom"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormGroup
              name="lastName"
              label="Nom"
              type="text"
              placeholder="Entrez votre nom"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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
              {loading ? "Création en cours..." : "Créer un compte"}
            </Button>
            <p className="text-sm text-black ">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/sz-app/login"
                className="hover:underline transition-transform duration-200"
              >
                Connectez-vous ici.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
