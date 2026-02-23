"use client";

import {
  FormGroup,
  FormGroupChildren,
} from "@/components/default/form/FormGroup";
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

import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import {
  DataCreateDificulty,
  DataCreateDistance,
  DataCreateTime,
} from "@/components/activity/form/content/DataCreateActivity";

const TOTAL_STEPS = 5;

export default function CreateActivity() {
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
        <Button variant="outline">Ajouter une activité</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <form>
          <DialogHeader>
            <DialogTitle>Nouvelle activité</DialogTitle>
            <DialogDescription>
              Remplissez les champs ci-dessous pour créer une nouvelle activité.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Etape 1 */}
            {step === 1 && (
              <>
                <FormGroup
                  name="title"
                  label="Titre de l'activité"
                  type="text"
                  placeholder="Ex: Marche nocturne"
                />
                <FormGroup
                  name="location"
                  label="Lieu"
                  type="text"
                  placeholder="Ex: Lac de la Selle"
                />
                <FormGroupChildren name="description" label="Description">
                  <Textarea
                    placeholder="Ex: Une marche nocturne au lac pour observer les étoiles."
                    className="resize-none"
                  />
                </FormGroupChildren>
              </>
            )}

            {/* Etape 2 */}

            {step === 2 && (
              <>
                <FormGroup
                  name="type"
                  label="Type d'activité"
                  type="text"
                  placeholder="Ex: Marche, Vélo, Kayak..."
                />
                <DataCreateDistance
                  name="distance"
                  label="Distance"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueSelect="km"
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
                  defaultValueSelect="facile"
                />
              </>
            )}

            {/* Etape 3 */}

            {step === 3 && (
              <>
                <DataCreateDistance
                  name="denivele_positif"
                  label="Dénivelé positif"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueSelect="m"
                />
                <DataCreateDistance
                  name="denivele_negatif"
                  label="Dénivelé négatif"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueSelect="m"
                />

                <DataCreateDistance
                  name="points_haut"
                  label="Points haut"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueSelect="m"
                />
                <DataCreateDistance
                  name="points_bas"
                  label="Points bas"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueSelect="m"
                />
              </>
            )}

            {/* Etape 4 */}

            {step === 4 && (
              <>
                <FormGroup
                  name="country"
                  label="Pays"
                  type="text"
                  placeholder="Ex: France, Espagne, Italie..."
                />
                <FormGroup
                  name="region"
                  label="Région"
                  type="text"
                  placeholder="Ex: Île-de-France, Provence-Alpes-Côte d'Azur..."
                />
              </>
            )}

            {/* Etape 5 */}
            {step === 5 && (
              <div>
                <FormGroup
                  name="start_point"
                  label="Point de départ"
                  type="text"
                  placeholder="Ex: N 42.840324°, E 1.234567°"
                />
                <FormGroup
                  name="end_point"
                  label="Point d'arrivée"
                  type="text"
                  placeholder="Ex: N 42.840324°, E 1.234567°"
                />
              </div>
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
