import { getUsdCoinPriceForDfi } from "../coinPrices";

test('extract DEX swaps from API, excluding processed blocks', async () => {
  const res = await getUsdCoinPriceForDfi();

  expect(res).toBeDefined();
});
