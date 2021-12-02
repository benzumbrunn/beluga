import { Swap } from "../types/Swap";
import { getLatestSwapTransactions } from "../query/dfcApi";

const POOL_IDS = [
  '4', // ETH-DFI
  '5', // BTC-DFI
  '6', // USDT-DFI
  '8', // DOGE-DFI
  '10', // LTC-DFI
  '12', // BCH-DFI
  '14', // USDT-DFI
  '17', // DUSD-DFI
  '18', // TSLA-DUSD
  '25', // GME-DUSD
  '32', // GOOGL-DUSD
  '33', // BABA-DUSD
  '35', // PLTR-DUSD
  '36', // AAPL-DUSD
  '38', // SPY-DUSD
  '39', // QQQ-DUSD
  '40', // PDBC-DUSD
  '41', // VNQ-DUSD
  '42', // ARKK-DUSD
  '43', // GLD-DUSD
  '44', // URTH-DUSD
  '45', // TLT-DUSD
  '46', // SLV-DUSD
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
