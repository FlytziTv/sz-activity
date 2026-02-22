"use client";

import { OnboardingData } from "@/app/page";

import { Input } from "@/components/ui/input";
import {
  QuestionMultiComp,
  ResponseComp,
} from "@/components/default/styles/Select";

const countries = [
  { value: "france", label: "France" },
  { value: "espagne", label: "Espagne" },
  { value: "italie", label: "Italie" },
  { value: "suisse", label: "Suisse" },
  { value: "autre", label: "Autre" },
];

interface Props {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
}

export default function StepRegion({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <h1 className="text-2xl font-semibold text-center">
        Questionnaire de création
      </h1>

      <QuestionMultiComp
        titre="Dans quels pays tu randonnais ?"
        description="Plusieurs choix possibles"
        className="grid-cols-3"
        onValueChange={(values) => onChange({ country: values.join(",") })}
      >
        {countries.map((country) => (
          <ResponseComp key={country.value} label={country.label} />
        ))}
      </QuestionMultiComp>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Région</h3>
        <p className="text-sm text-[#6F6F6F] -mt-1">
          Ex: Alpes, Pyrénées, Vosges...
        </p>
        <Input
          placeholder="Entrez votre région"
          value={data.region}
          onChange={(e) => onChange({ region: e.target.value })}
        />
      </div>
    </div>
  );
}
