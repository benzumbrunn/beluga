import axios from "axios";
import { PriceTicker } from "../types/Price";
import { SubgraphSwap, SubgraphSwapsResponse } from "../types/SubgraphSwap";

const getSubgraphSwaps = async (entriesToFetch = 300): Promise<SubgraphSwap[]> => {
  const swaps = [];

  try {
    // 30 entries are the max for this endpoint, so fetch until desired number is reached
    let lastResponseData: SubgraphSwapsResponse | null = null;
    for (let i = 0; i < entriesToFetch; i += 30) {
      const params = lastResponseData ? `?next=${(lastResponseData as SubgraphSwapsResponse).page!.next}` : '';
      const response = await axios.get(`https://api.defichain.com/v1/getsubgraphswaps${params}`);
      const responseData: SubgraphSwapsResponse = response.data;
      swaps.push(...responseData.data.swaps);
      lastResponseData = responseData;
    }
    return swaps;
  } catch (err) {
    console.error(err.response.statusText);
    throw new Error(err.response.statusText);
  }
}

const getTokenPrices = async (): Promise<({[x: string]: string})> => {
  try {
    const response = await axios.get(`https://ocean.defichain.com/v0/mainnet/prices`);
    const data: PriceTicker[] = response.data.data;
    return data.reduce((acc: any, curr: any) => {
      acc[curr.price.token] = curr.price.aggregated.amount;
      return acc;
    }, {});
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export {
  getSubgraphSwaps,
  getTokenPrices,
}
