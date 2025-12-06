"use client";

import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { DiceRollResult } from "../../types";

interface BetHistoryProps {
  items: DiceRollResult[];
  maxVisible?: number;
}

export const BetHistory: FC<BetHistoryProps> = ({ items, maxVisible = 25 }) => {
  const sliced = items.slice(0, maxVisible);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        justifyContent: "flex-end",
        overflow: "hidden",
        minHeight: 36,
      }}
    >
      {sliced.map(({ id, win, rolled }) => (
        <Box
          key={id}
          sx={{
            flex: "0 0 auto",
            minWidth: 72,
            height: 36,
            borderRadius: 1.5,
            bgcolor: win ? "success.main" : "background.paper",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 1.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: win ? "#fff" : "text.secondary",
            }}
          >
            {rolled.toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
