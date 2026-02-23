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
import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";

const TOTAL_STEPS = 3;

export default function CreateSortieActivity() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleClose = () => {
    setOpen(false);
    setStep(1);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setStep(1);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter une sortie</Button>
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

            {step === 1 && (
              <>
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
                <DataActivityLists />
              </>
            )}

            {/* Simple Etape 2 */}
            {step === 2 && (
              <>
                <FormGroup name="date" label="Date" type="date" />
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
                />
              </>
            )}

            {/* Simple Etape 3 */}
            {step === 3 && (
              <>
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
              </>
            )}
          </div>

          <DialogFooter className="flex flex-row gap-2">
            {step > 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
              >
                Précédent
              </Button>
            )}
            {step < TOTAL_STEPS ? (
              <Button type="button" onClick={() => setStep((s) => s + 1)}>
                Suivant
              </Button>
            ) : (
              <>
                <DialogClose asChild>
                  <Button type="button" variant="ghost" onClick={handleClose}>
                    Annuler
                  </Button>
                </DialogClose>
                <Button type="button">Enregistrer</Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
