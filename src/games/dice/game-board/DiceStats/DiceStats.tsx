"use client";

import { Box, InputAdornment, Typography } from "@mui/material";
import { MAX_MULTIPLIER, MIN_MULTIPLIER } from "@/src/store/dice/diceMath";
import { useDiceStore } from "@/src/store/dice/diceStore";
import { NumberField } from "../../NumberField";
import { MAX_CHANCE, MIN_CHANCE } from "../../constants";

const EndAdornment = ({ label }: { label: string }) => (
  <InputAdornment position="end">
    <Typography sx={{ fontWeight: 700, color: "#fff" }}>{label}</Typography>
  </InputAdornment>
);

export const DiceStats = () => {
  const { multiplier, chance, setMultiplier, setChance } = useDiceStore();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "100%",
          padding: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <NumberField
          id="multiplier"
          label="Виплата"
          min={MIN_MULTIPLIER}
          max={MAX_MULTIPLIER}
          onChange={setMultiplier}
          value={multiplier}
          slotProps={{
            input: {
              endAdornment: <EndAdornment label="x" />,
            },
          }}
        />
        <NumberField
          id="chance"
          label="Шанс"
          min={MIN_CHANCE}
          max={MAX_CHANCE}
          onChange={setChance}
          value={chance}
          slotProps={{
            input: {
              endAdornment: <EndAdornment label="%" />,
            },
          }}
        />
      </Box>
    </Box>
  );
};
