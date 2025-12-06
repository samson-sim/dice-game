"use client";

import { FC } from "react";
import { useDiceStore } from "@/src/store/dice/diceStore";
import { RangeSliderView } from "../RangeSliderView";
import { useRangeSlider } from "../hooks/useRangeSlider";
import { MAX_CHANCE, MIN_CHANCE } from "../../constants";
import { useGameSounds } from "../../hooks";

export const RangeSliderInput: FC = () => {
  const { range, setRange, history } = useDiceStore();

  const lastRoll = history[0];

  const { onSliderChange, ...restSliderProps } = useRangeSlider({
    min: MIN_CHANCE,
    max: MAX_CHANCE,
    value: range,
    onChange: setRange,
    lastRoll,
  });

  const { playScroll, ...restGameSoundsProps } = useGameSounds({ lastRoll });

  const handleSliderChange = (value: number | number[]) => {
    onSliderChange(value);
    playScroll();
  };

  return (
    <RangeSliderView
      onSliderChange={handleSliderChange}
      {...restSliderProps}
      {...restGameSoundsProps}
    />
  );
};
