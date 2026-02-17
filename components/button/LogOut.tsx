"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
    setIsPending(false);
  };

  return (
    <button
      onClick={handleLogout}
      className="group text-black text-sm flex items-center gap-2 hover:text-destructive transition-colors duration-150"
    >
      {isPending ? (
        <Loader2
          size={14}
          className="text-black group-hover:text-destructive transition-colors duration-150"
        />
      ) : (
        <LogOut
          size={14}
          className="text-black group-hover:text-destructive transition-colors duration-150"
        />
      )}
      Déconnexion
    </button>
  );
}
