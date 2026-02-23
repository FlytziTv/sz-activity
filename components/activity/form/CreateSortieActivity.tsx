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
import { addUserActivity } from "@/actions/userActivity";

const TOTAL_STEPS = 3;

export default function CreateSortieActivity() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  // State étape 1
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");

  // State étape 2
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [elevation, setElevation] = useState("");
  const [elevationUnit, setElevationUnit] = useState("m");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("min");
  const [difficulty, setDifficulty] = useState("moyen");

  // State étape 3
  const [hike, setHike] = useState("");

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setTitle("");
    setDescription("");
    setVisibility("public");
    setDate("");
    setDistance("");
    setElevation("");
    setDuration("");
    setHike("");
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("visibility", visibility);
    formData.set("date", date);
    formData.set("distance", distance);
    formData.set("distanceUnit", distanceUnit);
    formData.set("elevation", elevation);
    formData.set("elevationUnit", elevationUnit);
    formData.set("duration", duration);
    formData.set("durationUnit", durationUnit);
    formData.set("difficulty", difficulty);
    formData.set("hike", hike);

    await addUserActivity(formData);
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
        <Button variant="outline">Ajouter une sortie</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Nouvelle sortie</DialogTitle>
          <DialogDescription>
            Remplissez les champs ci-dessous pour créer une nouvelle sortie.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {step === 1 && (
            <>
              <FormGroup
                name="title"
                label="Titre de la sortie"
                type="text"
                placeholder="Ex: Marche nocturne"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormGroupChildren name="description" label="Description">
                <Textarea
                  placeholder="Ex: Une marche nocturne au lac pour observer les étoiles."
                  className="resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroupChildren>
              <VisibilityLists
                defaultValue={visibility}
                onChange={setVisibility}
              />
              <DataActivityLists />
            </>
          )}

          {step === 2 && (
            <>
              <FormGroup
                name="date"
                label="Date"
                type="date"
                defaultValue={date}
                onChange={(e) => setDate(e.target.value)}
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
              <DataCreateDistance
                name="elevation"
                label="Dénivelé"
                type="number"
                placeholder="Ex: 800"
                defaultValueInput={elevation}
                defaultValueSelect={elevationUnit}
                onChange={(e) => setElevation(e.target.value)}
                onSelectChange={setElevationUnit}
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

          {step === 3 && (
            <>
              <FormGroup
                name="hike"
                label="Lier à une randonnée (optionnel)"
                type="text"
                placeholder="Ex: 4fazfjdfd"
                require={false}
                defaultValue={hike}
                onChange={(e) => setHike(e.target.value)}
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
              <Button type="button" onClick={handleSubmit}>
                Enregistrer
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
