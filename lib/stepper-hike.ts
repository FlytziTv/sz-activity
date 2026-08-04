export type HikeStepKey = "selection" | "preparation" | "en-rando" | "bilan";

export const LABEL_STEPS: { key: HikeStepKey; label: string }[] = [
  { key: "selection", label: "Sélection" },
  { key: "preparation", label: "Préparation" },
  { key: "en-rando", label: "En rando" },
  { key: "bilan", label: "Bilan" },
];

export const DEFAULT_STEP_BY_STATUS: Record<string, HikeStepKey> = {
  DRAFT: "selection",
  PREPARING: "preparation",
  IN_PROGRESS: "en-rando",
  COMPLETED: "bilan",
};

export const COMPLETED_STEPS_BY_STATUS: Record<string, number> = {
  DRAFT: 0,
  PREPARING: 1,
  IN_PROGRESS: 2,
  COMPLETED: 4,
};

export const STEP_KEYS: HikeStepKey[] = [
  "selection",
  "preparation",
  "en-rando",
  "bilan",
];
