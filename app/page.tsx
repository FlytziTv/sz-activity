"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

const etapes = [
  { id: 1, title: "Questionnaire de création" },
  { id: 2, title: "Création de compte" },
  { id: 3, title: "Nous rejoindre" },
];

export default function HomePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // État pour le chargement

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
    <main className="p-4 grid grid-cols-2 gap-4 h-screen">
      <div className="bg-[url('/bg-esc-carre.png')] bg-cover bg-center bg-no-repeat grid grid-rows-2 relative rounded-4xl gap-4 p-4">
        <div className="w-full -row-start-2 flex flex-col gap-2 items-center justify-end pb-5">
          <h1 className="text-3xl font-bold text-center text-white ">
            Bienvenue sur ESC Life
          </h1>
          <p className="font-medium text-center text-base text-[#989898]">
            Prêt à vous échapper de votre routine ?
          </p>
          <div className="flex flex-col mt-2 gap-1 w-85">
            {etapes.map((etape) => (
              <div
                key={etape.id}
                className="flex flex-row items-center gap-6 py-3 px-5 bg-[#E8E8E8]/10 rounded-2xl"
              >
                <p className="flex items-center justify-center text-sm text-[#E8E8E8] text-center w-8 h-8 rounded-full bg-[#E8E8E8]/20">
                  {etape.id}
                </p>
                <p className="text-white text-base">{etape.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] flex relative rounded-4xl p-4 justify-center ">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-0 items-center justify-center">
            <h2 className="text-2xl font-semibold">Création du compte</h2>
            <p className="text-md font-medium text-center text-[#6F6F6F]">
              Saisissez vos données personnelles pour créer votre compte.
            </p>
          </div>

          <div className="flex flex-row gap-2 w-full">
            <button
              onClick={() => console.log("Connexion Google non configurée")}
              className="w-full border border-[#9B9B9B] rounded-lg hover:bg-[#9B9B9B]/20 py-2 flex flex-row items-center justify-center gap-2 transition-colors duration-300 pointer-events-auto cursor-pointer"
            >
              <GoogleIcon size={16} /> Google
            </button>
            <button
              onClick={() => console.log("Connexion Github non configurée")}
              className="w-full border border-[#9B9B9B] rounded-lg hover:bg-[#9B9B9B]/20 py-2 flex flex-row items-center justify-center gap-2 transition-colors duration-300 pointer-events-auto cursor-pointer"
            >
              <GithubIcon size={16} />
              Github
            </button>
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
            className="flex flex-col gap-4"
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-4 bg-[#000000] hover:bg-[#000000]/75 text-[#FFFFFF] font-medium rounded-lg transition-colors duration-300 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Création en cours..." : "Créer un compte"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

// ... Ton FormGroup reste identique

export function FormGroup({
  name,
  label,
  type,
  placeholder,
  onChange,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium text-base">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={onChange}
        className="py-2 px-3 bg-[#F7F7F7] rounded-lg text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-[#000000]/50 transition-colors duration-300"
      />
    </div>
  );
}
