"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { clamp } from "@/src/games/dice";
import { rollDiceApi } from "@/src/api/mocks/dice/dice";
import {
  recalcForRange,
  isWin,
  getNextRange,
  calcChanceFromMultiplier,
} from "./diceMath";
import type { RangeState, DiceState } from "@/src/games/dice/types";
import type { DiceStore } from "./DiceStore.types";

const defaultRange: RangeState = {
  mode: "below",
  inside: [0, 50],
  below: 50,
  above: 50,
};

const initialState: DiceState = {
  currentBet: 0,
  balance: 100,
  range: defaultRange,
  ...recalcForRange(0, defaultRange),
  isRolling: false,
  history: [],
  error: null,
};

export const useDiceStore = create<DiceStore>()(
  immer((set, get) => ({
    ...initialState,

    setBetAmount: (value) =>
      set((state) => {
        const bet = clamp(Number.isNaN(value) ? 0 : value, 0, state.balance);

        state.currentBet = Number(bet.toFixed(3));

        const { chance, payout, multiplier } = recalcForRange(
          state.currentBet,
          state.range
        );

        state.chance = chance;
        state.multiplier = multiplier;
        state.payout = payout;
      }),

    setRange: (range) =>
      set((state) => {
        state.range = range;

        const { chance, payout, multiplier } = recalcForRange(
          state.currentBet,
          state.range
        );

        state.chance = chance;
        state.multiplier = multiplier;
        state.payout = payout;
      }),

    setRangeMode: (mode) =>
      set((state) => {
        const prevRange = state.range;
        const newRange = { ...prevRange, mode };

        switch (mode) {
          case "below":
            if (prevRange.mode === "above") {
              newRange.below = 100 - prevRange.above;
            } else if (
              prevRange.mode === "inside" ||
              prevRange.mode === "outside"
            ) {
              newRange.below = prevRange.inside[0];
            }
            break;

          case "above":
            if (prevRange.mode === "below") {
              newRange.above = 100 - prevRange.below;
            } else if (
              prevRange.mode === "inside" ||
              prevRange.mode === "outside"
            ) {
              newRange.above = prevRange.inside[1];
            }
            break;

          case "inside":
            if (prevRange.mode === "below") {
              newRange.inside = [0, prevRange.below];
            } else if (prevRange.mode === "above") {
              newRange.inside = [prevRange.above, 100];
            }
            break;

          case "outside":
            prevRange.inside = [...prevRange.inside];
            break;
        }

        state.range = newRange;

        const { chance, payout, multiplier } = recalcForRange(
          state.currentBet,
          state.range
        );

        state.chance = chance;
        state.multiplier = multiplier;
        state.payout = payout;
      }),

    setBalance: (balance: number) =>
      set((state) => {
        state.balance = Math.max(0, balance);

        if (state.currentBet > state.balance) {
          state.currentBet = state.balance;
        }
      }),

    applyQuickCoef: (id) =>
      set((state) => {
        let bet = state.currentBet;

        switch (id) {
          case "half":
            bet /= 2;
            break;
          case "double":
            bet *= 2;
            break;
          case "max":
            bet = state.balance;
            break;
        }

        state.currentBet = clamp(bet, 0, state.balance);

        const { chance, payout, multiplier } = recalcForRange(
          state.currentBet,
          state.range
        );

        state.chance = chance;
        state.multiplier = multiplier;
        state.payout = payout;
      }),

    setMultiplier: (newMultiplier) =>
      set((state) => {
        const chancePercent = calcChanceFromMultiplier(newMultiplier) * 100;

        const nextRange = getNextRange(state.range, chancePercent);

        const { chance, multiplier, payout } = recalcForRange(
          state.currentBet,
          nextRange
        );

        state.range = nextRange;
        state.chance = chance;
        state.multiplier = multiplier;
        state.payout = payout;
      }),

    setChance: (newChance) =>
      set((state) => {
        const nextRange = getNextRange(state.range, newChance);

        const { chance, multiplier, payout } = recalcForRange(
          state.currentBet,
          nextRange
        );

        state.range = nextRange;
        state.chance = chance;
        state.multiplier = multiplier;
        state.payout = payout;
      }),

    clearError: () =>
      set((state) => {
        state.error = null;
      }),

    reset: () => set(() => initialState),

    roll: async () => {
      const state = get();

      const { currentBet, balance, isRolling, payout, range, multiplier } =
        state;

      if (isRolling) return;
      if (currentBet <= 0) {
        set((draft) => {
          draft.error = "Сума ставки має бути більшою за 0";
        });
        return;
      }
      if (currentBet > balance) {
        set((draft) => {
          draft.error = "Недостатньо коштів на балансі";
        });
        return;
      }

      set((draft) => {
        draft.isRolling = true;
        draft.error = null;
      });

      try {
        const { id, rolled } = await rollDiceApi({
          betAmount: currentBet,
        });

        const isWinRoll = isWin(rolled, range);

        const winAmount = isWinRoll ? currentBet * multiplier : 0;

        set((draft) => {
          const before = draft.balance;
          draft.balance = Number((before - currentBet + winAmount).toFixed(6));

          const historyItem = {
            id,
            rolled,
            win: isWinRoll,
            betAmount: currentBet,
            payout,
            winAmount,
            balanceAfter: draft.balance,
          };

          draft.history.unshift(historyItem);
          draft.history = draft.history.slice(0, 20);
          draft.isRolling = false;
        });
      } catch (e) {
        console.error(e);
        set((draft) => {
          draft.isRolling = false;
          draft.error = "Щось пішло не так. Спробуйте ще раз.";
        });
      }
    },
  }))
);
