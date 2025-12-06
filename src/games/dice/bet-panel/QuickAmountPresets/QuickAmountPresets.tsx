"use client";

import { FC } from "react";
import { Button, Grid2, SxProps } from "@mui/material";

interface QuickAmountPresetsProps {
  presets: number[];
  onSelect: (value: number) => void;
  sx: SxProps;
}

export const QuickAmountPresets: FC<QuickAmountPresetsProps> = ({
  presets,
  onSelect,
  sx,
}) => {
  const presetsCount = presets.length;
  if (!presetsCount) return null;

  return (
    <Grid2 container columnSpacing={1} sx={sx}>
      {presets.map((preset) => (
        <Grid2 key={preset} size={{ xs: 12 / presetsCount }}>
          <Button
            onClick={() => onSelect(preset)}
            variant="outlined"
            size="small"
            fullWidth
          >
            {preset}
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};
