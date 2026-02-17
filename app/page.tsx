"use client";

import Login from "@/components/form/Login";
import SignUp from "@/components/form/Signup";

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

      {/* <SignUp /> */}
      <Login />
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
