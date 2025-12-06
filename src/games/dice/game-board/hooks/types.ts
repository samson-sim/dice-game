import type { DiceRollResult, RangeState } from "../../types";

export interface UseRangeSliderProps {
  min: number;
  max: number;
  value: RangeState;
  step?: number;
  initialState?: Partial<RangeState>;
  lastRoll?: DiceRollResult;
  onChange?: (state: RangeState) => void;
}
