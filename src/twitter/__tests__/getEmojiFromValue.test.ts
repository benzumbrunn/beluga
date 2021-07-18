import BigNumber from "bignumber.js";

import { getEmojiFromValue, SHRIMP, FISH, DOLPHIN, SHARK, WHALE } from "../getEmojiFromValue";

test('Return correct emoji based on passed value', async () => {
  const shrimp = getEmojiFromValue(new BigNumber(50000));
  const fish = getEmojiFromValue(new BigNumber(100000));
  const dolphin = getEmojiFromValue(new BigNumber(200000));
  const shark = getEmojiFromValue(new BigNumber(500000));
  const whale = getEmojiFromValue(new BigNumber(1000000));

  expect(shrimp).toStrictEqual(SHRIMP);
  expect(fish).toStrictEqual(FISH);
  expect(dolphin).toStrictEqual(DOLPHIN);
  expect(shark).toStrictEqual(SHARK);
  expect(whale).toStrictEqual(WHALE);
});
