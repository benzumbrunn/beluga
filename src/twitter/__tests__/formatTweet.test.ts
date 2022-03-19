import BigNumber from "bignumber.js";
import { SubgraphSwap } from "../../types/SubgraphSwap";

import { formatTweet } from "../formatTweet";

test('Build correct string from swap to send to twitter', async () => {
  const swap: SubgraphSwap = {
    id: "160c3b4b53716784838ab779fafa4f2a622fa41ee58336e0dc2d86aedbc5eb5a",
    timestamp: "1647661211",
    from: {
      amount: "4.21405588",
      symbol: "DFI"
    },
    to: {
      amount: "15.62054188",
      symbol: "DUSD"
    }
  };

  const usdValue = new BigNumber(123456.789);

  const res = formatTweet(swap, usdValue);

  expect(res).toStrictEqual(`4.21405588 $DFI swapped to 15.62054188 $DUSD
🐟 Value: 123,456.789 USD

160c3b4b53716784838ab779fafa4f2a622fa41ee58336e0dc2d86aedbc5eb5a`);
});
