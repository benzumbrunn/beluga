import BigNumber from "bignumber.js";

export const SHRIMP = '🦐'; // 50k
export const FISH = '🐟'; // 100k
export const DOLPHIN = '🐬'; // 200k
export const SHARK = '🦈'; // 500k
export const WHALE = '🐋'; // 1mil

export const getEmojiFromValue = (usdValue: BigNumber): string => {
  if (usdValue.isGreaterThanOrEqualTo(1000000)) {
    return WHALE;
  }
  if (usdValue.isGreaterThanOrEqualTo(500000)) {
    return SHARK;
  }
  if (usdValue.isGreaterThanOrEqualTo(200000)) {
    return DOLPHIN;
  }
  if (usdValue.isGreaterThanOrEqualTo(100000)) {
    return FISH;
  }
  return SHRIMP;
}
