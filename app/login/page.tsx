"use client";

import Login from "@/components/form/Login";

export default function LoginPage() {
  return (
    <main className="p-4 grid grid-cols-2 gap-4 h-screen">
      <div className="bg-[url('/bg-esc-carre.png')] bg-cover bg-center bg-no-repeat grid grid-rows-2 relative rounded-4xl gap-4 p-4"></div>

      <Login />
    </main>
  );
}
