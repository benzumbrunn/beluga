import { OceanSwap } from "../../types/OceanSwap";
import { dexSwapIsOverThreshold } from "../dexSwapIsOverThreshold";

const swap: OceanSwap = {
  id: "160c3b4b53716784838ab779fafa4f2a622fa41ee58336e0dc2d86aedbc5eb5a",
  timestamp: "1647661211",
  fromAmount: "1000",
  fromSymbol: "TWTR",
  toAmount: "100000",
  toSymbol: "DUSD"
};

test('check if dex swap is over USD threshold', async () => {
  const tokenPricesInUsd = {
    TWTR: '100',
  };

  const res = await dexSwapIsOverThreshold(swap, tokenPricesInUsd);

  expect(Number(res)).toBe(100000);
});
