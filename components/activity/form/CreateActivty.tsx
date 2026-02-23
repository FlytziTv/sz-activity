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
  ActivityType,
  DataCreateDificulty,
  DataCreateDistance,
  DataCreateTime,
} from "@/components/activity/form/content/DataCreateActivity";
import { addActivity } from "@/actions/activity";

const TOTAL_STEPS = 5;

export default function CreateActivity() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  // State étape 1
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // State étape 2
  const [type, setType] = useState("");
  const [distance, setDistance] = useState("km");
  const [duration, setDuration] = useState("min");
  const [difficulty, setDifficulty] = useState("moyen");

  // State étape 3
  const [denivele_positif, setDenivelePositif] = useState("");
  const [denivele_negatif, setDeniveleNegatif] = useState("");
  const [points_haut, setPointsHaut] = useState("");
  const [points_bas, setPointsBas] = useState("");

  // State étape 4
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  // State étape 5
  const [start_point, setStartPoint] = useState("");
  const [end_point, setEndPoint] = useState("");

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return !!title && !!location && !!description;
      case 2:
        return !!type && !!distance && !!duration && !!difficulty;
      case 3:
        return (
          !!denivele_positif &&
          !!denivele_negatif &&
          !!points_haut &&
          !!points_bas
        );
      case 4:
        return !!country && !!region;
      case 5:
        return !!start_point && !!end_point;
      default:
        return true;
    }
  };

  const next = () => {
    if (!canProceed()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setTitle("");
    setLocation("");
    setDescription("");
    setType("");
    setDistance("km");
    setDuration("min");
    setDifficulty("moyen");
    setDenivelePositif("");
    setDeniveleNegatif("");
    setPointsHaut("");
    setPointsBas("");
    setCountry("");
    setRegion("");
    setStartPoint("");
    setEndPoint("");
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.set("title", title);
    formData.set("location", location);
    formData.set("description", description);
    formData.set("type", type);
    formData.set("distance", distance);
    formData.set("duration", duration);
    formData.set("difficulty", difficulty);
    formData.set("denivele_positif", denivele_positif);
    formData.set("denivele_negatif", denivele_negatif);
    formData.set("points_haut", points_haut);
    formData.set("points_bas", points_bas);
    formData.set("country", country);
    formData.set("region", region);
    formData.set("start_point", start_point);
    formData.set("end_point", end_point);

    await addActivity(formData);
    handleClose();
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
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormGroup
                  name="location"
                  label="Lieu"
                  type="text"
                  placeholder="Ex: Lac de la Selle"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <FormGroupChildren name="description" label="Description">
                  <Textarea
                    placeholder="Ex: Une marche nocturne au lac pour observer les étoiles."
                    className="resize-none"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroupChildren>
              </>
            )}

            {/* Etape 2 */}

            {step === 2 && (
              <>
                <ActivityType
                  name="type"
                  label="Type d'activité"
                  onSelectChange={setType}
                />
                <DataCreateDistance
                  name="distance"
                  label="Distance"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueSelect="km"
                  onChange={(e) => setDistance(e.target.value)}
                />

                <DataCreateTime
                  name="duration"
                  label="Durée"
                  type="number"
                  placeholder="Ex: 240"
                  defaultValueSelect="min"
                  onChange={(e) => setDuration(e.target.value)}
                />
                <DataCreateDificulty
                  name="difficulty"
                  label="Difficulté"
                  defaultValueSelect="facile"
                  onSelectChange={setDifficulty}
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
                  onChange={(e) => setDenivelePositif(e.target.value)}
                />
                <DataCreateDistance
                  name="denivele_negatif"
                  label="Dénivelé négatif"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueSelect="m"
                  onChange={(e) => setDeniveleNegatif(e.target.value)}
                />

                <DataCreateDistance
                  name="points_haut"
                  label="Points haut"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueSelect="m"
                  onChange={(e) => setPointsHaut(e.target.value)}
                />
                <DataCreateDistance
                  name="points_bas"
                  label="Points bas"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueSelect="m"
                  onChange={(e) => setPointsBas(e.target.value)}
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
                  onChange={(e) => setCountry(e.target.value)}
                />
                <FormGroup
                  name="region"
                  label="Région"
                  type="text"
                  placeholder="Ex: Île-de-France, Provence-Alpes-Côte d'Azur..."
                  onChange={(e) => setRegion(e.target.value)}
                />
              </>
            )}

            {/* Etape 5 */}
            {step === 5 && (
              <>
                <FormGroup
                  name="start_point"
                  label="Point de départ"
                  type="text"
                  placeholder="Ex: N 42.840324°, E 1.234567°"
                  onChange={(e) => setStartPoint(e.target.value)}
                />
                <FormGroup
                  name="end_point"
                  label="Point d'arrivée"
                  type="text"
                  placeholder="Ex: N 42.840324°, E 1.234567°"
                  onChange={(e) => setEndPoint(e.target.value)}
                />
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
              <Button
                type="button"
                onClick={next}
                disabled={!canProceed()}
                className="disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Suivant
              </Button>
            ) : (
              <>
                <DialogClose asChild>
                  <Button type="button" variant="ghost" onClick={handleClose}>
                    Annuler
                  </Button>
                </DialogClose>
                <Button type="button" onClick={handleSubmit}>
                  Enregistrer
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
