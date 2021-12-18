import BigNumber from 'bignumber.js';
import config from 'config';
import { Swap } from "../types/Swap";

const usdThreshold: number = config.get('usdThreshold');

const dexSwapIsOverThreshold = async (swap: Swap, dfiUsdPrice: number): Promise<BigNumber | null> => {
  const usdValue = getUsdValue(swap, dfiUsdPrice);

  if (usdValue && usdValue >= usdThreshold) {
    return new BigNumber(usdValue).decimalPlaces(2, BigNumber.ROUND_DOWN);
  }

  return null;
}

const getUsdValue = (swap: Swap, dfiUsdPrice: number) => {
  if (swap.baseTokenSymbol === 'DUSD') {
    return swap.baseTokenAmount;
  }
  if (swap.quoteTokenSymbol === 'DUSD') {
    return swap.quoteTokenAmount;
  }
  if (swap.baseTokenSymbol === 'DFI') {
    return swap.baseTokenAmount * dfiUsdPrice;
  }
  if (swap.quoteTokenSymbol === 'DFI') {
    return swap.quoteTokenAmount * dfiUsdPrice;
  }
  throw new Error(`None of the symbols are DFI or DUSD: ${JSON.stringify(swap)}`);
}

export {
  dexSwapIsOverThreshold,
}
