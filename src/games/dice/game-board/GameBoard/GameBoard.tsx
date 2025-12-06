"use client";

import { Box } from "@mui/material";

import { useDiceStore } from "@/src/store/dice/diceStore";
import { DiceStats } from "../DiceStats";
import { BetHistory } from "../BetHistory";
import { RangeSliderInput } from "../RangeSliderInput";

export const GameBoard = () => {
  const { history } = useDiceStore();

  return (
    <Box
      component="section"
      aria-label="Game board"
      sx={{
        width: "100%",
        flex: 1,
        minWidth: 0,
        minHeight: { xs: 450, md: 600 },
        py: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <BetHistory items={history} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RangeSliderInput />
      </Box>
      <DiceStats />
    </Box>
  );
};
