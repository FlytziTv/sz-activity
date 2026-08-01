"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  useAlertDialogStore,
  confirmYes,
  confirmNo,
} from "@/lib/global/alert-dialog-store";
import { cn } from "@/lib/utils";

export function GlobalAlertDialog() {
  const { isOpen, options } = useAlertDialogStore();

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) confirmNo(); // fermeture via Echap/clic extérieur = annulation
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {options.title ?? "Êtes-vous sûr ?"}
          </AlertDialogTitle>
          {options.description && (
            <AlertDialogDescription>
              {options.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={confirmNo}>
            {options.cancelLabel ?? "Annuler"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmYes}
            className={cn(
              options.variant === "destructive" &&
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            )}
          >
            {options.confirmLabel ?? "Confirmer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
