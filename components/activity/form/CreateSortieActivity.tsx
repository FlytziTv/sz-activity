"use client";

import {
  DataCreateDificulty,
  DataCreateDistance,
  DataCreateTime,
  ActivityType,
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

const TOTAL_STEPS = 4;

export default function CreateSortieActivity() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  // State étape 1
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [activityType, setActivityType] = useState("randonnee");
  const [location, setLocation] = useState("");

  // State étape 2
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [elevation, setElevation] = useState("");
  const [elevationUnit, setElevationUnit] = useState("m");
  const [elevationLoss, setElevationLoss] = useState("");
  const [elevationLossUnit, setElevationLossUnit] = useState("m");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("min");
  const [difficulty, setDifficulty] = useState("moyen");
  const [effort, setEffort] = useState("moyen");

  // State étape 3
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [avgHeartRate, setAvgHeartRate] = useState("");

  // State étape 4
  const [hike, setHike] = useState("");

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setTitle("");
    setDescription("");
    setVisibility("public");
    setActivityType("randonnee");
    setLocation("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setDistance("");
    setElevation("");
    setElevationLoss("");
    setDuration("");
    setDifficulty("moyen");
    setEffort("moyen");
    setCaloriesBurned("");
    setAvgHeartRate("");
    setHike("");
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    // Étape 1
    formData.set("title", title);
    formData.set("description", description);
    formData.set("visibility", visibility);
    formData.set("activityType", activityType);
    formData.set("location", location);
    // Étape 2
    formData.set("date", date);
    formData.set("startTime", startTime);
    formData.set("endTime", endTime);
    formData.set("distance", distance);
    formData.set("distanceUnit", distanceUnit);
    formData.set("elevation", elevation);
    formData.set("elevationUnit", elevationUnit);
    formData.set("elevationLoss", elevationLoss);
    formData.set("elevationLossUnit", elevationLossUnit);
    formData.set("duration", duration);
    formData.set("durationUnit", durationUnit);
    formData.set("difficulty", difficulty);
    formData.set("effort", effort);
    // Étape 3
    formData.set("caloriesBurned", caloriesBurned);
    formData.set("avgHeartRate", avgHeartRate);
    // Étape 4
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
            Étape {step} sur {TOTAL_STEPS}
          </DialogDescription>
        </DialogHeader>

        {/* Barre de progression */}
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i + 1 <= step ? "bg-black" : "bg-[#E8E8E8]"}`}
            />
          ))}
        </div>

        <div className="grid gap-4 py-4">
          {/* Étape 1 - Infos générales */}
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
              <FormGroup
                name="location"
                label="Lieu"
                type="text"
                placeholder="Ex: Lac de la Selle"
                defaultValue={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <FormGroupChildren name="description" label="Description">
                <Textarea
                  placeholder="Ex: Une marche nocturne au lac..."
                  className="resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroupChildren>
              <ActivityType
                name="activityType"
                label="Type d'activité"
                onSelectChange={setActivityType}
              />
              <VisibilityLists
                defaultValue={visibility}
                onChange={setVisibility}
              />
              <DataActivityLists />
            </>
          )}

          {/* Étape 2 - Stats */}
          {step === 2 && (
            <>
              <FormGroup
                name="date"
                label="Date"
                type="date"
                defaultValue={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormGroup
                  name="startTime"
                  label="Heure début"
                  type="time"
                  defaultValue={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <FormGroup
                  name="endTime"
                  label="Heure fin"
                  type="time"
                  defaultValue={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
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
                label="Dénivelé +"
                type="number"
                placeholder="Ex: 800"
                defaultValueInput={elevation}
                defaultValueSelect={elevationUnit}
                onChange={(e) => setElevation(e.target.value)}
                onSelectChange={setElevationUnit}
              />
              <DataCreateDistance
                name="elevationLoss"
                label="Dénivelé -"
                type="number"
                placeholder="Ex: 600"
                defaultValueInput={elevationLoss}
                defaultValueSelect={elevationLossUnit}
                onChange={(e) => setElevationLoss(e.target.value)}
                onSelectChange={setElevationLossUnit}
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
              <DataCreateDificulty
                name="effort"
                label="Effort ressenti"
                defaultValueSelect={effort}
                onSelectChange={setEffort}
              />
            </>
          )}

          {/* Étape 3 - Extras */}
          {step === 3 && (
            <>
              <FormGroup
                name="caloriesBurned"
                label="Calories brûlées (kcal)"
                type="number"
                placeholder="Ex: 320"
                defaultValue={caloriesBurned}
                onChange={(e) => setCaloriesBurned(e.target.value)}
                require={false}
              />
              <FormGroup
                name="avgHeartRate"
                label="FC Moyenne (bpm)"
                type="number"
                placeholder="Ex: 120"
                defaultValue={avgHeartRate}
                onChange={(e) => setAvgHeartRate(e.target.value)}
                require={false}
              />
            </>
          )}

          {/* Étape 4 - Liens */}
          {step === 4 && (
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
