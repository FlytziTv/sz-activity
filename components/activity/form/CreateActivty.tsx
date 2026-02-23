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
  Multipos,
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
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("min");
  const [difficulty, setDifficulty] = useState("moyen");

  // State étape 3
  const [elevationPositif, setElevationPositif] = useState("");
  const [elevationUnitPositif, setElevationUnitPositif] = useState("m");
  const [elevationNegative, setElevationNegative] = useState("");
  const [elevationNegativeUnit, setElevationNegativeUnit] = useState("m");
  const [pointTop, setPointTop] = useState("");
  const [pointTopUnit, setPointTopUnit] = useState("m");
  const [pointBottom, setPointBottom] = useState("");
  const [pointBottomUnit, setPointBottomUnit] = useState("m");

  // State étape 4
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  // State étape 5
  const [start_point1, setStartPoint1] = useState("");
  const [start_point2, setStartPoint2] = useState("");
  const [end_point1, setEndPoint1] = useState("");
  const [end_point2, setEndPoint2] = useState("");

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return !!title && !!location && !!description;
      case 2:
        return !!type && !!distance && !!duration && !!difficulty;
      case 3:
        return (
          !!elevationPositif &&
          !!elevationNegative &&
          !!pointTop &&
          !!pointBottom
        );
      case 4:
        return !!country && !!region;
      case 5:
        return !!start_point1 && !!start_point2 && !!end_point1 && !!end_point2;
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
    // State 1
    setTitle("");
    setLocation("");
    setDescription("");
    // State 2
    setType("");
    setDistance("");
    setDistanceUnit("km");
    setDuration("");
    setDurationUnit("min");
    setDifficulty("moyen");
    // State 3
    setElevationPositif("");
    setElevationUnitPositif("m");
    setElevationNegative("");
    setElevationNegativeUnit("m");
    setPointTop("");
    setPointTopUnit("m");
    setPointBottom("");
    setPointBottomUnit("m");
    // State 4
    setCountry("");
    setRegion("");
    // State 5
    setStartPoint1("");
    setStartPoint2("");
    setEndPoint1("");
    setEndPoint2("");
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    // state 1
    formData.set("title", title);
    formData.set("location", location);
    formData.set("description", description);
    formData.set("type", type);

    // state 2
    formData.set("distance", distance);
    formData.set("distance_unit", distanceUnit);
    formData.set("duration", duration);
    formData.set("duration_unit", durationUnit);
    formData.set("difficulty", difficulty);

    // state 3
    formData.set("denivele_positif", elevationPositif);
    formData.set("denivele_positif_unit", elevationUnitPositif);
    formData.set("denivele_negatif", elevationNegative);
    formData.set("denivele_negatif_unit", elevationNegativeUnit);
    formData.set("points_haut", pointTop);
    formData.set("points_haut_unit", pointTopUnit);
    formData.set("points_bas", pointBottom);
    formData.set("points_bas_unit", pointBottomUnit);

    // state 4
    formData.set("country", country);
    formData.set("region", region);

    // state 5
    formData.set("start_point", `${start_point1},${start_point2}`);
    formData.set("end_point", `${end_point1},${end_point2}`);

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
                  defaultValueInput={distance}
                  defaultValueSelect={distanceUnit}
                  onChange={(e) => setDistance(e.target.value)}
                  onSelectChange={setDistanceUnit}
                />

                <DataCreateTime
                  name="duration"
                  label="Durée"
                  type="number"
                  placeholder="Ex: 240"
                  defaultValueInput={duration}
                  defaultValueSelect={durationUnit}
                  onChange={(e) => setDuration(e.target.value)}
                  onSelectChange={setDurationUnit}
                />
                <DataCreateDificulty
                  name="difficulty"
                  label="Difficulté"
                  defaultValueSelect={difficulty}
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
                  defaultValueInput={elevationPositif}
                  defaultValueSelect={elevationUnitPositif}
                  onChange={(e) => setElevationPositif(e.target.value)}
                  onSelectChange={setElevationUnitPositif}
                />
                <DataCreateDistance
                  name="denivele_negatif"
                  label="Dénivelé négatif"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueInput={elevationNegative}
                  defaultValueSelect={elevationNegativeUnit}
                  onChange={(e) => setElevationNegative(e.target.value)}
                  onSelectChange={setElevationNegativeUnit}
                />

                <DataCreateDistance
                  name="points_haut"
                  label="Points haut"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueInput={pointTop}
                  defaultValueSelect={pointTopUnit}
                  onChange={(e) => setPointTop(e.target.value)}
                  onSelectChange={setPointTopUnit}
                />
                <DataCreateDistance
                  name="points_bas"
                  label="Points bas"
                  type="number"
                  placeholder="Ex: 12.5"
                  defaultValueInput={pointBottom}
                  defaultValueSelect={pointBottomUnit}
                  onChange={(e) => setPointBottom(e.target.value)}
                  onSelectChange={setPointBottomUnit}
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
                <Multipos
                  name="start_point"
                  label="Point de départ"
                  type="text"
                  placeholder1="Latitude"
                  placeholder2="Longitude"
                  onChange1={(e) => setStartPoint1(e.target.value)}
                  onChange2={(e) => setStartPoint2(e.target.value)}
                />

                <Multipos
                  name="end_point"
                  label="Point d'arrivée"
                  type="text"
                  placeholder1="Latitude"
                  placeholder2="Longitude"
                  onChange1={(e) => setEndPoint1(e.target.value)}
                  onChange2={(e) => setEndPoint2(e.target.value)}
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
