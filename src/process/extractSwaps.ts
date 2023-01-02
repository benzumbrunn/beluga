import config from 'config';
import { getOceanPoolPairs, getOceanSwaps } from "../query/dfcApi";
import { OceanSwap } from '../types/OceanSwap';

const numberOfSwapsToFetch: number = config.get('numberOfSwapsToFetch');

const extractDexSwaps = async (): Promise<OceanSwap[]> => {

  const pools = await getOceanPoolPairs();
  const swaps = await getOceanSwaps(pools, numberOfSwapsToFetch);
  return swaps;
}

export {
  extractDexSwaps,
}
