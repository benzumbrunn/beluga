import BigNumber from 'bignumber.js';
import config from 'config';
import { SubgraphSwap } from '../types/SubgraphSwap';

const usdThreshold: number = config.get('usdThreshold');

const dexSwapIsOverThreshold = async (swap: SubgraphSwap, tokenPricesInUsd: {[x: string]: string}): Promise<BigNumber | null> => {
  const usdPrice = tokenPricesInUsd[swap.from.symbol];
  const usdValue = new BigNumber(usdPrice).multipliedBy(swap.from.amount);

  if (usdValue && Number(usdValue) >= usdThreshold) {
    return new BigNumber(usdValue).decimalPlaces(2, BigNumber.ROUND_DOWN);
  }

  return null;
}

export {
  dexSwapIsOverThreshold,
}
