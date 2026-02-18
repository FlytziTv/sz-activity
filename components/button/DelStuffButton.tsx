"use client";

import { deleteStuff } from "@/actions/stuff";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DelStuffProps {
  itemId: string;
}

export default function DelStuff({ itemId }: DelStuffProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteStuff(itemId);
      toast.success("Équipement supprimé");
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={isDeleting}
          onClick={(e) => e.stopPropagation()}
          className="group px-1.5 py-1 hover:bg-destructive/10 w-full rounded-sm text-black text-sm flex items-center gap-2 hover:text-destructive transition-colors duration-300"
        >
          <Trash2
            size={16}
            className="text-black group-hover:text-destructive transition-colors duration-300"
          />
          <p className="text-xs mt-1">Supprimer</p>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer cet équipement ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement cet
            équipement de votre inventaire.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
