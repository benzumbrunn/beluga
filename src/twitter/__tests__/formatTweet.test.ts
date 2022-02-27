import BigNumber from "bignumber.js";

import { Swap } from "../../types/Swap";
import { formatTweet } from "../formatTweet";

test('Build correct string from swap to send to twitter', async () => {
  const swap: Swap = {
    baseTokenAmount: 1.32145234,
    quoteTokenAmount: 98462.12398987,
    _id: '123',
    blockHeight: 1234,
    blockTime: 'test time',
    txid: '349853453450',
    txType: 'Swap',
    poolId: '5',
    baseTokenSymbol: 'BTC',
    quoteTokenSymbol: 'DFI',
    __v: 0,
  };

  const usdValue = new BigNumber(123456.789);

  const res = formatTweet(swap, usdValue);

  expect(res).toStrictEqual(`1.32145234 $BTC swapped to 98,462.12398987 $DFI
🐟 Value: 123,456.789 USD

349853453450`);
});
