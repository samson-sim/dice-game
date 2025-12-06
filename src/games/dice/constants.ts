export const quickCoefficients = [
  { id: "half", label: "1/2" },
  { id: "double", label: "2x" },
  { id: "max", label: "MAX" },
] as const;

export const littleQuickAmounts = [0.001, 0.01, 0.1, 0.5];
export const bigQuickAmounts = [1, 5, 10, 50];

export const rangeModes = ["below", "above", "inside", "outside"] as const;

export const DEFAULT_HOUSE_EDGE = 0.02;

export const QUICK_AMOUNTS_BALANCE_THRESHOLD = 1;

export const MIN_CHANCE = 0.01;
export const MAX_CHANCE = 97.01;
