import {
  clamp,
  DEFAULT_HOUSE_EDGE,
  MAX_CHANCE,
  MIN_CHANCE,
  RangeState,
} from "../../games/dice";

export const isWin = (roll: number, range: RangeState): boolean => {
  const [aRaw, bRaw] = range.inside;
  const a = Math.min(aRaw, bRaw);
  const b = Math.max(aRaw, bRaw);

  switch (range.mode) {
    case "inside":
      return roll >= a && roll <= b;
    case "outside":
      return roll <= a || roll >= b;
    case "below":
      return roll <= range.below;
    case "above":
      return roll >= range.above;
    default:
      return false;
  }
};

export const calcChance = (range: RangeState): number => {
  const [aRaw, bRaw] = range.inside;
  const a = Math.min(aRaw, bRaw);
  const b = Math.max(aRaw, bRaw);

  switch (range.mode) {
    case "inside":
      return (b - a) / 100;
    case "outside":
      return (a + (100 - b)) / 100;
    case "below":
      return range.below / 100;
    case "above":
      return (100 - range.above) / 100;
    default:
      return 0;
  }
};

export const calcMultiplier = (
  range: RangeState,
  houseEdge = DEFAULT_HOUSE_EDGE
) => {
  const p = calcChance(range);
  if (p <= 0) return 0;
  return (1 - houseEdge) / p;
};

export const calcChanceFromMultiplier = (
  multiplier: number,
  houseEdge = DEFAULT_HOUSE_EDGE
) => {
  if (multiplier <= 0) return 0;
  return (1 - houseEdge) / multiplier;
};

export const calcPayout = (
  betAmount: number,
  range: RangeState,
  houseEdge = DEFAULT_HOUSE_EDGE
) => betAmount * calcMultiplier(range, houseEdge);

export const recalcForRange = (bet: number, range: RangeState) => {
  const chance = calcChance(range);
  const multiplier = calcMultiplier(range);
  const potential = bet > 0 ? calcPayout(bet, range) : 0;

  return {
    chance: +(chance * 100).toFixed(2),
    multiplier: +multiplier.toFixed(4),
    payout: +potential.toFixed(4),
  };
};

export const getNextRange = (
  prev: RangeState,
  chancePercent: number
): RangeState => {
  const chanceClamped = clamp(chancePercent, MIN_CHANCE, MAX_CHANCE);
  const pWidth = chanceClamped;

  const next: RangeState = { ...prev };

  switch (prev.mode) {
    case "below": {
      next.below = pWidth;
      return next;
    }

    case "above": {
      next.above = 100 - pWidth;
      return next;
    }

    case "inside": {
      const [a0, b0] = prev.inside;
      const prevCenter = (a0 + b0) / 2 || 50;
      const half = pWidth / 2;

      let a = prevCenter - half;
      let b = prevCenter + half;

      if (a < 0) {
        a = 0;
        b = pWidth;
      }
      if (b > 100) {
        b = 100;
        a = 100 - pWidth;
      }

      next.inside = [a, b];
      return next;
    }

    case "outside": {
      const gapWidth = 100 - pWidth;

      const [a0, b0] = prev.inside;
      const prevGapCenter = (a0 + b0) / 2 || 50;
      const halfGap = gapWidth / 2;

      let gapA = prevGapCenter - halfGap;
      let gapB = prevGapCenter + halfGap;

      if (gapA < 0) {
        gapA = 0;
        gapB = gapWidth;
      }
      if (gapB > 100) {
        gapB = 100;
        gapA = 100 - gapWidth;
      }

      next.inside = [gapA, gapB];
      return next;
    }

    default:
      return next;
  }
};

export const MIN_MULTIPLIER = calcChanceFromMultiplier(MAX_CHANCE) * 100;
export const MAX_MULTIPLIER = calcChanceFromMultiplier(MIN_CHANCE) * 100;
