import { faker } from "@faker-js/faker";
import type { RollDiceRequest, RollDiceResponse } from "./dice.types";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const rollDiceApi = async (
  _payload: RollDiceRequest
): Promise<RollDiceResponse> => {
  await sleep(faker.number.int({ min: 250, max: 600 }));

  const rolled = faker.number.float({
    min: 0,
    max: 100,
    multipleOf: 0.01,
  });

  return {
    id: faker.string.uuid(),
    rolled: Number(rolled.toFixed(2)),
  };
};
