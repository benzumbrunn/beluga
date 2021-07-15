import { extractDexSwaps } from "../extractSwaps";

jest.mock('../../query/dfc-api')

test('extract DEX swaps from API, excluding processed blocks', async () => {
  const res = await extractDexSwaps(998530);

  expect(res).toStrictEqual([
      {
        baseTokenAmount: 50,
        quoteTokenAmount: 0.00327923,
        _id: '60e9c0e8ed4a810019b0c6d3',
        blockHeight: 998540,
        blockTime: '2021-07-10T15:50:45.000Z',
        txid: 'f50c192d84489955737ad93773505cb4f3ea24b8f8b300954731b53113effed6',
        txType: 'PoolSwap',
        poolId: '5',
        baseTokenSymbol: 'DFI',
        quoteTokenSymbol: 'BTC',
        __v: 0
      },
    ]);
});
