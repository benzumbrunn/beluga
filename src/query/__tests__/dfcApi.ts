import { getSubgraphSwaps, getTokenPrices } from "../dfcApi";

test('extract swaps from defichain subgraph API', async () => {
  const res = await getSubgraphSwaps(60);

  expect(res.length).toBe(60);
}, 10000);

test('extract DFC DEX token prices', async () => {
  const res = await getTokenPrices();
  const twtrPrice = res['TWTR'];

  expect(twtrPrice).toBeDefined();
}, 10000);
