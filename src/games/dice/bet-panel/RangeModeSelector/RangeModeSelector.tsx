"use client";

import { FC } from "react";
import { Box, Button, InputLabel } from "@mui/material";
import { AboveIcon, BelowIcon, InsideIcon, OutsideIcon } from "@/src/icons";
import { rangeModes } from "../../constants";
import { RangeMode } from "../../types";

interface RangeModeSelectorProps {
  mode: RangeMode;
  onChange: (mode: RangeMode) => void;
}

const getRangeIcon = (mode: RangeMode) => {
  switch (mode) {
    case "below":
      return <BelowIcon />;
    case "above":
      return <AboveIcon />;
    case "inside":
      return <InsideIcon />;
    case "outside":
      return <OutsideIcon />;
  }
};

export const RangeModeSelector: FC<RangeModeSelectorProps> = ({
  mode,
  onChange,
}) => {
  return (
    <Box component="section" aria-label="Select mode">
      <InputLabel sx={{ mb: 1 }}>Тип режиму</InputLabel>
      <Box sx={{ display: "flex", gap: 1 }}>
        {rangeModes.map((m) => (
          <Button
            key={m}
            variant={m === mode ? "outlined" : "text"}
            size="small"
            onClick={() => onChange(m)}
            sx={{
              flex: 1,
              borderRadius: 1.5,
              borderColor: m === mode ? "#27df8a" : "transparent",
              bgcolor: "#363c3f",
            }}
          >
            {getRangeIcon(m)}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
