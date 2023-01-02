import axios from "axios";
import { OceanSwap, OceanSwapResponse } from "../types/OceanSwap";
import { PriceTicker } from "../types/Price";

const getOceanPoolPairs = async (): Promise<string[]> => {
  const response: { data: { data: [{ id: string }] } } = await axios.get('https://ocean.defichain.com/v0/mainnet/poolpairs?size=200');
  return response.data.data.map(pair => pair.id);
}

const getOceanSwaps = async (pools: string[], numberOfSwapsToFetch: number): Promise<OceanSwap[]> => {
  const allSwaps: OceanSwap[] = [];
  for (const pool of pools) {
    // limitaion: can only fetch 20 entries for now. If more needed, use paging 
    const response = await axios.get(`https://ocean.defichain.com/v0/mainnet/poolpairs/${pool}/swaps/verbose?size=${numberOfSwapsToFetch}`);
    const data: OceanSwapResponse = response.data.data;
    for (const swap of data) {
      if (swap.to) { // not pending anymore
        allSwaps.push({
          id: swap.txid,
          timestamp: String(swap.block.time),
          fromSymbol: swap.from.symbol,
          fromAmount: swap.from.amount,
          toSymbol: swap.to.symbol,
          toAmount: swap.to.amount,
        });
      }
    }
  }
  return allSwaps;
}

const getTokenPrices = async (): Promise<({ [x: string]: string })> => {
  try {
    const response = await axios.get(`https://ocean.defichain.com/v0/mainnet/prices`);
    const data: PriceTicker[] = response.data.data;
    return data.reduce((acc: any, curr: any) => {
      acc[curr.price.token] = curr.price.aggregated.amount;
      return acc;
    }, {});
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}

export {
  getOceanPoolPairs,
  getTokenPrices,
  getOceanSwaps,
}
