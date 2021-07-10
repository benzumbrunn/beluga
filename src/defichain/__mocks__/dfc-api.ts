import { Swap } from "../../types/Swap";

const getLatestSwapTransactions = async (): Promise<Swap[]> => {
  return [{
    baseTokenAmount: 37,
    quoteTokenAmount: 0.00242664,
    _id: '60e9bfd2741f8d0019bb1df7',
    blockHeight: 998530,
    blockTime: '2021-07-10T15:46:14.000Z',
    txid: 'ffbd9300b9f294f2f17b601492cb37199c712a7084650610ee85450bb9c56502',
    txType: 'PoolSwap',
    poolId: '5',
    baseTokenSymbol: 'DFI',
    quoteTokenSymbol: 'BTC',
    __v: 0
  },
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
  }];
}

export {
  getLatestSwapTransactions,
}
