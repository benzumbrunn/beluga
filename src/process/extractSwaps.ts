import config from 'config';
import { getSubgraphSwaps } from "../query/dfcApi";
import { SubgraphSwap } from "../types/SubgraphSwap";

const numberOfSwapsToFetch: number = config.get('numberOfSwapsToFetch');

const extractDexSwaps = async (): Promise<SubgraphSwap[]> => {

  const swaps = await getSubgraphSwaps(numberOfSwapsToFetch);
  return swaps;
}

export {
  extractDexSwaps,
}
