"use client";

import { OnboardingData } from "@/app/page";
import { QuestionComp, ResponseComp } from "@/components/default/styles/Select";

const levels = [
  {
    value: "Futur debutant",
    label: "Futur débutant",
    description: "Je souhaite commencer la randonnée",
  },
  {
    value: "debutant",
    label: "Débutant",
    description: "Je commence la randonnée",
  },
  {
    value: "intermediaire",
    label: "Intermédiaire",
    description: "Je randonne régulièrement",
  },
  { value: "expert", label: "Expert", description: "Je repousse mes limites" },
];

const frequencies = [
  {
    value: "jamais",
    label: "Jamais",
    description: "Je n'ai jamais randonné",
  },
  {
    value: "occasionnel",
    label: "Occasionnel",
    description: "Quelques fois par an",
  },
  { value: "regulier", label: "Régulier", description: "1 à 2 fois par mois" },
  { value: "intensif", label: "Intensif", description: "Chaque semaine" },
];

interface Props {
  data: OnboardingData;
  onChange: (fields: Partial<OnboardingData>) => void;
}

export default function StepLevel({ onChange }: Props) {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <h1 className="text-2xl font-semibold text-center">
        Questionnaire de création
      </h1>

      <QuestionComp
        titre="Quel est ton niveau de randonnée ?"
        description="Cela nous permettra de personnaliser les suggestions"
        onValueChange={(value) => onChange({ level: value })}
      >
        {levels.map((l) => (
          <ResponseComp
            key={l.value}
            label={l.label}
            description={l.description}
          />
        ))}
      </QuestionComp>

      <QuestionComp
        titre="À quelle fréquence tu randonnes ?"
        description="Cela nous permettra de personnaliser les suggestions"
        onValueChange={(value) => onChange({ frequency: value })}
      >
        {frequencies.map((l) => (
          <ResponseComp
            key={l.value}
            label={l.label}
            description={l.description}
          />
        ))}
      </QuestionComp>
    </div>
  );
}
