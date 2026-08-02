"use client";

import { Button } from "@/components/ui/button";
import { openDialog } from "@/lib/global/dialog-store";
import { HikeForm } from "./hike-form";

export function NewHikeButton() {
  return (
    <Button
      onClick={() =>
        openDialog(<HikeForm />, {
          title: "Nouvelle rando",
          description: "Donne un nom et un lieu à ta prochaine sortie.",
        })
      }
    >
      Nouvelle rando
    </Button>
  );
}
