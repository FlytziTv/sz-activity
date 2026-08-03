export const HYDRATION_CATEGORY_NAME = "Hydratation";

const GRAMS_PER_LITER_WATER = 1000;

export function getEffectiveWeight(item: {
  weight: number | null;
  waterCapacityLiters: number | null;
}): number {
  return (item.weight ?? 0) + (item.waterCapacityLiters ?? 0) * GRAMS_PER_LITER_WATER;
}
