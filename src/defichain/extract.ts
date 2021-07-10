import { Swap } from "../types/Swap";
import { getLatestSwapTransactions } from "./dfc-api";

const extractDexSwaps = async (lastProcessedBlock?: number): Promise<Swap[]> => {
  const swaps = await getLatestSwapTransactions();
  const sortedSwaps = swaps.sort((a, b) => a.blockHeight - b.blockHeight);
  const swapsAfterLastProcessed = lastProcessedBlock ? sortedSwaps.filter(s => s.blockHeight > lastProcessedBlock) : sortedSwaps;
  return swapsAfterLastProcessed
}

export {
  extractDexSwaps,
}
