"use client";

import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

const etapes = [
  { id: 1, title: "Questionnaire de création" },
  { id: 2, title: "Création de compte" },
  { id: 3, title: "Nous rejoindre" },
];

export default function HomePage() {
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
      {/* <div className="bg-[#FFFFFF] flex flex-col relative rounded-4xl p-4 justify-between">
        <header className="flex flex-row items-center justify-center gap-2">
          <div className="h-1.5 w-10 rounded-full bg-[#000000]" />
          <div className="h-1.5 w-10 rounded-full bg-[#E8E8E8]" />
          <div className="h-1.5 w-10 rounded-full bg-[#E8E8E8]" />
          <div className="h-1.5 w-10 rounded-full bg-[#E8E8E8]" />
          <div className="h-1.5 w-10 rounded-full bg-[#E8E8E8]" />
        </header>

        <footer className="flex flex-row items-center justify-center gap-2 w-full">
          <button className="text-center w-full p-2 bg-[#F6F6F6] hover:bg-transparent text-[#000000] font-medium rounded-2xl transition-colors duration-300 cursor-pointer">
            Étapes précédente
          </button>
          <button className="text-center w-full p-2 bg-[#000000] hover:bg-[#000000]/75 text-[#FFFFFF] font-medium rounded-2xl transition-colors duration-300 cursor-pointer">
            Étapes suivante
          </button>
        </footer>
      </div> */}

      <div className="bg-[#FFFFFF] flex relative rounded-4xl p-4 justify-center ">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-0 items-center justify-center">
            <h2 className="text-2xl font-semibold">Création du compte</h2>
            <p className="text-md font-medium text-center text-[#6F6F6F]">
              Saisissez vos données personnelles pour créer votre compte.
            </p>
          </div>

          <div className="flex flex-row gap-2 w-full">
            <button className="w-full border border-[#9B9B9B] rounded-lg hover:bg-[#9B9B9B]/20 py-2 flex flex-row items-center justify-center gap-2 transition-colors duration-300">
              <GoogleIcon size={16} /> Google
            </button>
            <button className="w-full border border-[#9B9B9B] rounded-lg hover:bg-[#9B9B9B]/20 py-2 flex flex-row items-center justify-center gap-2 transition-colors duration-300">
              <GithubIcon size={16} />
              Github
            </button>
          </div>

          <div className="w-full flex flex-row gap-2 items-center justify-center">
            <div className="h-0.5 w-full bg-linear-65 from-transparent to-[#9B9B9B] rounded-full" />
            <p className="text-center">ou</p>
            <div className="h-0.5 w-full bg-linear-65 from-[#9B9B9B] to-transparent rounded-full" />
          </div>

          <form action="" className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <FormGroup
                name="firstName"
                label="Prénom"
                type="text"
                placeholder="Entrez votre prénom"
              />
              <FormGroup
                name="lastName"
                label="Nom"
                type="text"
                placeholder="Entrez votre nom"
              />
            </div>

            <FormGroup
              name="email"
              label="Email"
              type="email"
              placeholder="Entrez votre email"
            />

            <FormGroup
              name="password"
              label="Mot de passe"
              type="password"
              placeholder="Entrez votre mot de passe"
            />
          </form>
          <button
            type="submit"
            className="w-full py-2 bg-[#000000] hover:bg-[#000000]/75 text-[#FFFFFF] font-medium rounded-lg transition-colors duration-300 cursor-pointer"
          >
            Créer un compte
          </button>
        </div>
      </div>
    </main>
  );
}

export function FormGroup({
  name,
  label,
  type,
  placeholder,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
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
        className="py-2 px-3 bg-[#F7F7F7] rounded-lg text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-[#000000]/50 transition-colors duration-300"
      />
    </div>
  );
}
