"use client";

import { FC } from "react";
import { Button, Paper } from "@mui/material";
import { useDiceStore } from "@/src/store/dice/diceStore";
import { BetInput } from "../BetInput";
import { RangeModeSelector } from "../RangeModeSelector";
import {
  bigQuickAmounts,
  littleQuickAmounts,
  QUICK_AMOUNTS_BALANCE_THRESHOLD,
  quickCoefficients,
} from "../../constants";

export const BetPanel: FC = () => {
  const {
    currentBet,
    range: { mode },
    balance,
    payout,
    setBetAmount,
    setRangeMode,
    applyQuickCoef,
    roll,
    isRolling,
    error,
  } = useDiceStore();

  const quickAmounts =
    balance > QUICK_AMOUNTS_BALANCE_THRESHOLD
      ? bigQuickAmounts
      : littleQuickAmounts;

  return (
    <Paper
      component="aside"
      aria-label="Bet panel"
      elevation={4}
      sx={{
        p: { xs: 2, sm: 2.5 },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 3 },
        borderRadius: 2,
        maxWidth: { xs: "none", md: 360 },
      }}
    >
      <BetInput
        label="Сума"
        id="dice-bet"
        value={currentBet}
        onChange={setBetAmount}
        onSelectKoefficient={applyQuickCoef}
        approxAmount={balance}
        quickAmounts={quickAmounts}
        quickCoefficients={quickCoefficients}
        error={error}
      />
      <BetInput label="Сума виграшу" id="dice-payout" value={payout} disabled />
      <RangeModeSelector mode={mode} onChange={setRangeMode} />
      <Button variant="contained" onClick={roll} disabled={isRolling} fullWidth>
        Ставка
      </Button>
    </Paper>
  );
};
