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
    // limitation: can only fetch 20 entries for now. If more needed, use paging 
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

// const getCoinPrices = async (): Promise<({ [x: string]: string })> => {
const getCoinPrices = async (): Promise<({ [x: string]: string })> => {
  const coinNameToId: { [x: string]: string } = {
    'bitcoin': 'BTC', 
    'ethereum': 'ETH',
    'dogecoin': 'DOGE',
    'usd-coin': 'USDC',
    'tether': 'USDT',
    'bitcoin-cash': 'BCH',
    'litecoin': 'LTC',
    'defichain': 'DFI',
    'euro-coin': 'EUROC',
    'decentralized-usd': 'DUSD',
  };

  const coinIds = [
    'bitcoin', 'ethereum', 'dogecoin',
    'usd-coin', 'tether', 'bitcoin-cash',
    'litecoin', 'defichain', 'euro-coin',
    'decentralized-usd',
  ].join('%2C');

  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`);

  const coinPrices: { [x: string]: { usd: number} } = response.data;
  return Object.entries(coinPrices).reduce((acc: { [x: string]: string }, cum) => {
    acc[coinNameToId[cum[0]]] = cum[1].usd.toString();
    return acc;
}, {});
}

export {
  getOceanPoolPairs,
  getTokenPrices,
  getOceanSwaps,
  getCoinPrices,
}
