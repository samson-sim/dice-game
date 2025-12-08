"use client";

import { FC } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { DiceMarker } from "../DiceMarker";
import type { RangeMode, WinInterval } from "../../types";

export interface RangeSliderViewProps {
  min: number;
  max: number;
  mode: RangeMode;
  sliderValue: number | number[];
  winIntervals: WinInterval[];
  onSliderChange: (value: number | number[]) => void;
  onSliderChangeCommitted: () => void;
  onMoveEnd: () => void;
  onMoveStart: () => void;
  onBounceEnd: () => void;
  markerLeftPercent: number;
  markerLabel: number;
  isLastWin?: boolean | null;
  isBouncing?: boolean;
}

export const RangeSliderView: FC<RangeSliderViewProps> = ({
  min,
  max,
  sliderValue,
  winIntervals,
  onSliderChange,
  onSliderChangeCommitted,
  onMoveEnd,
  onMoveStart,
  onBounceEnd,
  markerLeftPercent,
  markerLabel,
  isLastWin,
  isBouncing,
}) => {
  const range = max - min;

  return (
    <Box width="100%">
      <Box
        sx={{
          borderRadius: 999,
          bgcolor: "background.paper",
          px: 4,
        }}
      >
        <Box position="relative" width="100%">
          <DiceMarker
            label={markerLabel}
            left={markerLeftPercent}
            isWin={isLastWin}
            isBouncing={isBouncing}
            onMoveEnd={onMoveEnd}
            onMoveStart={onMoveStart}
            onBounceEnd={onBounceEnd}
          />

          <Box
            sx={{
              position: "absolute",
              left: "8px",
              right: "8px",
              top: "50%",
              height: 12,
              transform: "translateY(-50%)",
              borderRadius: 999,
              bgcolor: "warning.light",
              outline: "6px solid",
              outlineColor: "divider",
            }}
          />

          {winIntervals.map((w, i) => {
            const left = ((w.from - min) / range) * 100;
            const right = ((w.to - min) / range) * 100;
            const width = right - left;

            return (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  top: "50%",
                  height: 12,
                  transform: "translateY(-50%)",
                  borderRadius: 999,
                  bgcolor: "success.light",
                  left: `calc(8px + ${left}%)`,
                  width: `calc(${width}% - 16px)`,
                }}
              />
            );
          })}

          <Slider
            min={min}
            max={max}
            value={sliderValue}
            onChange={(_, value) => onSliderChange(value as number[])}
            onChangeCommitted={onSliderChangeCommitted}
            step={0.01}
            disableSwap
            valueLabelDisplay="auto"
            valueLabelFormat={(v) =>
              typeof v === "number" ? v.toFixed(2) : ""
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: { xs: 1, md: 2 },
          px: 4,
        }}
      >
        {[0, 25, 50, 75, 100].map((v) => (
          <Typography
            key={v}
            variant="caption"
            color="text.secondary"
            width={30}
            textAlign="center"
          >
            {v}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
