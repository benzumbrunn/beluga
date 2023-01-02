import BigNumber from 'bignumber.js';
import config from 'config';
import { OceanSwap } from '../types/OceanSwap';

const usdThreshold: number = config.get('usdThreshold');

const dexSwapIsOverThreshold = async (swap: OceanSwap, tokenPricesInUsd: {[x: string]: string}): Promise<BigNumber | null> => {
  const usdPrice = tokenPricesInUsd[swap.fromSymbol];
  const usdValue = new BigNumber(usdPrice).multipliedBy(swap.fromAmount);

  if (usdValue && Number(usdValue) >= usdThreshold) {
    return new BigNumber(usdValue).decimalPlaces(2, BigNumber.ROUND_DOWN);
  }

  return null;
}

export {
  dexSwapIsOverThreshold,
}
