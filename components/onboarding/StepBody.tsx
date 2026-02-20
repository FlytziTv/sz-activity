// components/onboarding/StepBody.tsx
"use client";

import { OnboardingData } from "@/app/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
}

export default function StepBody({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <h1 className="text-2xl font-semibold text-center">
        Questionnaire de création
      </h1>
      <div>
        <h2 className="text-xl font-semibold">Quelques infos sur toi</h2>
        <p className="text-sm text-[#6F6F6F] mt-1">
          Pour personnaliser tes recommandations d&apos;équipement et de charge.
        </p>
      </div>

      {/* Corpulence */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold">Corpulence</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="weight">Poids (kg)</Label>
            <Input
              id="weight"
              type="number"
              min="30"
              max="200"
              placeholder="70"
              value={data.weight ?? ""}
              onChange={(e) =>
                onChange({ weight: parseInt(e.target.value) || null })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="height">Taille (cm)</Label>
            <Input
              id="height"
              type="number"
              min="120"
              max="250"
              placeholder="175"
              value={data.height ?? ""}
              onChange={(e) =>
                onChange({ height: parseInt(e.target.value) || null })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="shoeSize">Pointure</Label>
            <Input
              id="shoeSize"
              type="number"
              min="30"
              max="60"
              placeholder="42"
              value={data.shoeSize ?? ""}
              onChange={(e) =>
                onChange({ shoeSize: parseInt(e.target.value) || null })
              }
            />
          </div>
        </div>
      </div>

      {/* Objectifs annuels */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold">Objectifs annuels</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="distanceGoal">Distance (km/an)</Label>
            <Input
              id="distanceGoal"
              type="number"
              placeholder="500"
              value={data.annualDistanceGoal ?? ""}
              onChange={(e) =>
                onChange({
                  annualDistanceGoal: parseInt(e.target.value) || null,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="activitiesGoal">Sorties par an</Label>
            <Input
              id="activitiesGoal"
              type="number"
              placeholder="20"
              value={data.annualActivitiesGoal ?? ""}
              onChange={(e) =>
                onChange({
                  annualActivitiesGoal: parseInt(e.target.value) || null,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
