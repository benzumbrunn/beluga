import { Swap } from "../types/Swap";
import { getLatestSwapTransactions } from "../query/dfcApi";

const POOL_IDS = [
  '4', // ETH
  '5', // BTC
  '6', // USDT
  '8', // DOGE
  '10', // LTC
  '12', // BCH
];

const extractDexSwaps = async (lastProcessedBlock?: number): Promise<Swap[]> => {

  const swaps = await Promise.all(POOL_IDS.map(id => {
    return getLatestSwapTransactions(id, '100');
  }));

  const sortedSwaps = new Array<Swap>().concat(...swaps).sort((a, b) => a.blockHeight - b.blockHeight);
  const swapsAfterLastProcessed = lastProcessedBlock ? sortedSwaps.filter(s => s.blockHeight > lastProcessedBlock) : sortedSwaps;
  return swapsAfterLastProcessed
}

export {
  extractDexSwaps,
}
