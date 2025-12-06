import type { RangeMode, RangeState, DiceState } from "@/src/games/dice/types";

export interface DiceStore extends DiceState {
  setBetAmount: (value: number) => void;
  setRange: (range: RangeState) => void;
  setRangeMode: (mode: RangeMode) => void;
  setBalance: (balance: number) => void;
  applyQuickCoef: (id: string) => void;
  setMultiplier: (value: number) => void;
  setChance: (value: number) => void;
  roll: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}
