"use client";

import {
  DataCreateDificulty,
  DataCreateDistance,
  DataCreateTime,
} from "@/components/activity/form/content/DataCreateActivity";
import DataActivityLists from "@/components/activity/lists/DataActivityLists";
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
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

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
              {/* Etape 1 */}
              {/* <FormGroup
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
              <DataActivityLists />*/}

              {/* Simple Etape 2 */}
              {/* <FormGroup name="date" label="Date" type="date" />
              <DataCreateDistance
                name="distance"
                label="Distance"
                type="number"
                placeholder="Ex: 12.5"
                defaultValueSelect="km"
              />

              <DataCreateDistance
                name="elevation"
                label="Dénivelé"
                type="number"
                placeholder="Ex: 800"
                defaultValueSelect="m"
              />

              <DataCreateTime
                name="duration"
                label="Durée"
                type="number"
                placeholder="Ex: 240"
                defaultValueSelect="min"
              />

              <DataCreateDificulty
                name="difficulty"
                label="Difficulté"
                type="text"
                defaultValueSelect="moyen"
              /> */}

              {/* Simple Etape 3 */}
              <FormGroup
                name="hike"
                label="Lier à une randonnée (optionnel)"
                type="text"
                placeholder="Ex: 4fazfjdfd"
                require={false}
              />

              <FormGroupChildren
                name="stuffs"
                label="Matériel utilisé (optionnel)"
              >
                <Select disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisissez le matériel utilisé" />
                  </SelectTrigger>
                </Select>
              </FormGroupChildren>
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
