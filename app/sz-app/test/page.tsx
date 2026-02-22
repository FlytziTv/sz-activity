"use client";

import {
  FormGroup,
  FormGroupChildren,
} from "@/components/default/form/FormGroup";
import VisibilityLists from "@/components/default/lists/VisibilityLists";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function Dash() {
  return (
    <div className="flex flex-row gap-2">
      {/* Nouvelle sortie */}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ajouter une liste</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <form>
            <DialogHeader>
              <DialogTitle>Nouvelle sortie</DialogTitle>
              <DialogDescription>
                Remplissez les champs ci-dessous pour créer une nouvelle sortie.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormGroup
                name="title"
                label="Titre de la sortie"
                type="text"
                placeholder="Ex: Marche nocturne"
              />
              <FormGroupChildren name="description" label="Description">
                <Textarea
                  placeholder="Ex: Une marche nocturne au lac pour observer les étoiles."
                  className="resize-none"
                />
              </FormGroupChildren>

              <VisibilityLists />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Annuler
                </Button>
              </DialogClose>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Nouvelle Activiter */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ajouter une activité</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <form>
            <DialogHeader>
              <DialogTitle>Nouvelle activité</DialogTitle>
              <DialogDescription>
                Remplissez les champs ci-dessous pour créer une nouvelle
                activité.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormGroup
                name="title"
                label="Titre de l'activité"
                type="text"
                placeholder="Ex: Marche nocturne"
              />
              <FormGroupChildren name="description" label="Description">
                <Textarea
                  placeholder="Ex: Une marche nocturne au lac pour observer les étoiles."
                  className="resize-none"
                />
              </FormGroupChildren>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Annuler
                </Button>
              </DialogClose>
              <Button type="submit">Suivant</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
