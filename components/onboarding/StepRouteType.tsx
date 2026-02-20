// components/onboarding/StepRouteType.tsx
"use client";

import { QuestionMultiComp, ResponseComp } from "../sz/SzSelect";
import { OnboardingData } from "@/app/page";

const routeTypes = [
  {
    value: "boucle",
    label: "Boucle",
    description: "Je reviens à mon point de départ",
  },
  {
    value: "aller_retour",
    label: "Aller-retour",
    description: "Je fais le même chemin à l'aller et au retour",
  },
  {
    value: "point_a_point",
    label: "Point à point",
    description: "Je vais d'un point A à un point B",
  },
  { value: "trail", label: "Trail", description: "Je cours en montagne" },
  {
    value: "via_ferrata",
    label: "Via ferrata",
    description: "Je grimpe avec des équipements fixes",
  },
  {
    value: "raquettes",
    label: "Raquettes",
    description: "Je randonne en hiver",
  },
  {
    value: "ski_de_rando",
    label: "Ski de rando",
    description: "Je skie hors piste",
  },
];

interface Props {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
}

export default function StepRouteType({ onChange }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <h1 className="text-2xl font-semibold text-center">
        Questionnaire de création
      </h1>
      <QuestionMultiComp
        titre="Quel type de randonnée tu préfères ?"
        description="Tu peux en choisir plusieurs."
        onValueChange={(values) => onChange({ preferredRouteType: values })}
      >
        {routeTypes.map((r) => (
          <ResponseComp
            key={r.value}
            label={r.label}
            description={r.description}
          />
        ))}
      </QuestionMultiComp>
    </div>
  );
}
