"use client";

import SignUp from "@/components/login-signin/form/SignupForm";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-4 grid grid-cols-2 gap-4 h-screen bg-[#F2F2F2]">
      <div className="hidden md:flex bg-[url('/bg-esc-carre.png')] bg-cover bg-center bg-no-repeat rounded-4xl" />

      <div className="bg-[#E8E8E8] border border-[#DBDBDB] flex flex-col relative rounded-4xl p-4 gap-4 col-span-2 md:col-span-1">
        <main className=" flex items-center justify-center bg-[#FFFFFF] border border-[#D2D2D2] rounded-2xl p-4 h-full">
          <SignUp />
        </main>

        <footer className="flex flex-col gap-4 w-full bg-[#DCDCDC] rounded-2xl p-4">
          <p className="text-sm text-center text-black">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/login"
              className="underline hover:text-[#000000]/65 transition-colors duration-250"
            >
              Connectez-vous ici.
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
