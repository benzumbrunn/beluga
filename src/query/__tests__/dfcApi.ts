import { 
  getOceanPoolPairs, 
  getOceanSwaps, 
  getTokenPrices 
} from "../dfcApi";

test('extract swaps from ocean API', async () => {
  const res = await getOceanSwaps(['5'], 3);

  expect(res.length).toBe(3);
}, 10000);

test('extract pool pairs from ocean API', async () => {
  const res = await getOceanPoolPairs();

  expect(res.length).toBeGreaterThan(60);
}, 10000);

test('extract DFC DEX token prices', async () => {
  const res = await getTokenPrices();
  const twtrPrice = res['TWTR'];

  expect(twtrPrice).toBeDefined();
}, 10000);
