"use client";

import { OnboardingData } from "@/app/page";
import {
  QuestionMultiComp,
  ResponseComp,
} from "@/components/default/styles/Select";

const objectives = [
  {
    value: "se_depasser",
    label: "Se dépasser",
    description: "Repousser mes limites physiques",
  },
  {
    value: "decouvrir",
    label: "Découvrir",
    description: "Explorer de nouveaux paysages",
  },
  {
    value: "se_ressourcer",
    label: "Se ressourcer",
    description: "Déconnecter et profiter de la nature",
  },
  {
    value: "partager",
    label: "Partager",
    description: "Randonner en groupe et créer des liens",
  },
  {
    value: "performer",
    label: "Performer",
    description: "Améliorer mes chronos et stats",
  },
  {
    value: "journaliser",
    label: "Journaliser",
    description: "Garder une trace de mes aventures",
  },
];

interface Props {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
}

export default function StepObjectives({ onChange }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <h1 className="text-2xl font-semibold text-center">
        Questionnaire de création
      </h1>

      <QuestionMultiComp
        titre="Quels sont tes objectifs principaux en randonnée ?"
        description="Plusieurs choix possibles"
        className="grid-cols-2"
        onValueChange={(values) => onChange({ objectives: values })}
      >
        {objectives.map((o) => (
          <ResponseComp
            key={o.value}
            label={o.label}
            description={o.description}
          />
        ))}
      </QuestionMultiComp>
    </div>
  );
}
