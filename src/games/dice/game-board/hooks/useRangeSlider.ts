import { useEffect, useMemo, useState } from "react";
import type { RangeState, WinInterval } from "../../types";
import type { UseRangeSliderProps } from "./types";
import { clamp } from "../../helpers";

export const useRangeSlider = (props: UseRangeSliderProps) => {
  const {
    min,
    max,
    step = 0.01,
    value: externalState,
    lastRoll,
    onChange,
  } = props;

  const [draftState, setDraftState] = useState(externalState);

  useEffect(() => {
    if (externalState) {
      setDraftState(externalState);
    }
  }, [externalState]);

  const sliderValue = useMemo<number | number[]>(() => {
    const { mode, inside, below, above } = draftState;

    if (mode === "inside" || mode === "outside") {
      const [a, b] = inside;
      const center = (a + b) / 2;
      return [a, center, b];
    }

    if (mode === "below") return below;
    if (mode === "above") return above;

    return inside;
  }, [draftState]);

  const winIntervals: WinInterval[] = useMemo(() => {
    const [aRaw, bRaw] = draftState.inside;
    const a = Math.min(aRaw, bRaw);
    const b = Math.max(aRaw, bRaw);

    switch (draftState.mode) {
      case "inside":
        return [{ from: a, to: b }];
      case "outside":
        return [
          { from: min, to: a },
          { from: b, to: max },
        ];
      case "below":
        return [{ from: min, to: draftState.below }];
      case "above":
        return [{ from: draftState.above, to: max }];
      default:
        return [];
    }
  }, [draftState, min, max]);

  const emitChange = (next: Partial<RangeState>) => {
    setDraftState((prev) => ({ ...prev, ...next }));
  };

  const moveInterval = (center: number) => {
    const [a, b] = draftState.inside;
    const half = (b - a) / 2;

    let newA = center - half;
    let newB = center + half;

    if (newA < min) {
      newA = min;
      newB = newA + half * 2;
    }
    if (newB > max) {
      newB = max;
      newA = newB - half * 2;
    }

    emitChange({ inside: [newA, newB] });
  };

  const onSliderChange = (value: number | number[]) => {
    if (draftState.mode === "inside" || draftState.mode === "outside") {
      const [left, center, right] = value as number[];

      if (left !== draftState.inside[0]) {
        const clampedLeft = clamp(left, min, draftState.inside[1] - step);
        emitChange({
          inside: [clampedLeft, draftState.inside[1]],
        });
        return;
      }

      if (right !== draftState.inside[1]) {
        const clampedRight = clamp(right, draftState.inside[0] + step, max);
        emitChange({
          inside: [draftState.inside[0], clampedRight],
        });
        return;
      }

      const currentCenter = (draftState.inside[0] + draftState.inside[1]) / 2;
      if (center !== currentCenter) {
        moveInterval(center);
        return;
      }
    }

    if (!Array.isArray(value)) {
      if (draftState.mode === "below") emitChange({ below: value });
      if (draftState.mode === "above") emitChange({ above: value });
    }
  };

  const onSliderChangeCommitted = () => {
    onChange?.(draftState);
  };

  const { rolled = 50, win = null } = lastRoll || {};

  return {
    min,
    max,
    mode: draftState.mode,
    sliderValue,
    winIntervals,
    onSliderChange,
    onSliderChangeCommitted,
    markerLeftPercent: rolled,
    markerLabel: rolled,
    isLastWin: win,
  };
};
