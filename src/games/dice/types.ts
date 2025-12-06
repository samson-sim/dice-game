export interface QuickKoefficient {
  id: "half" | "double" | "max";
  label: string;
}

export type RangeMode = "inside" | "outside" | "below" | "above";

export interface RangeState {
  mode: RangeMode;
  inside: [number, number];
  below: number;
  above: number;
}

export interface WinInterval {
  from: number;
  to: number;
}

export interface DiceRollResult {
  id: string;
  rolled: number;
  win: boolean;
  betAmount: number;
  payout: number;
  winAmount: number;
  balanceAfter: number;
}

export interface DiceState {
  currentBet: number;
  balance: number;
  range: RangeState;
  chance: number;
  multiplier: number;
  payout: number;
  isRolling: boolean;
  history: DiceRollResult[];
  error: string | null;
}
