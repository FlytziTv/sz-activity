import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full flex-col p-4 items-center justify-center font-sans bg-[url('/bg-esc.png')] bg-cover bg-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white text-center">
          Bienvenue sur ESC Life
        </h1>
        <p className="text-[#989898] text-center font-medium text-base">
          Prêt à vous échapper de votre routine ? Répondez à un court
          questionnaire pour créer votre profil.
        </p>
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <Link
            href="/sz-app/dash"
            className="bg-white w-full text-center py-3 text-black font-bold text-lg rounded-xl"
          >
            Commencer
          </Link>
          <p className="text-[#B3B3B3] text-sm ">
            Vous avez déjà un compte ?{" "}
            <a href="/sz-app/quiz" className="underline">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
