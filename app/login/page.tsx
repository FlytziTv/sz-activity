"use client";

import Login from "@/components/login-signin/form/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="p-4 grid grid-cols-2 gap-4 h-screen bg-[#F2F2F2]">
      <div className="bg-[url('/bg-esc-carre.png')] bg-cover bg-center bg-no-repeat rounded-4xl" />

      <div className="bg-[#E8E8E8] border border-[#DBDBDB] flex flex-col relative rounded-4xl p-4 gap-4">
        <main className=" flex items-center justify-center bg-[#FFFFFF] border border-[#D2D2D2] rounded-2xl p-4 h-full">
          <Login />
        </main>

        <footer className="flex flex-col gap-4 w-full bg-[#DCDCDC] rounded-2xl p-4">
          <p className="text-sm text-center text-black">
            Vous n&apos;avez pas encore de compte ?{" "}
            <Link
              href="/"
              className="underline hover:text-[#000000]/65 transition-colors duration-250"
            >
              Créez-en un ici.
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
