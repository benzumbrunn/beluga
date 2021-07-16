import BigNumber from 'bignumber.js';
import config from 'config';
import { Swap } from "../types/Swap";

const usdThreshold: number = config.get('usdThreshold');

const dexSwapIsOverThreshold = async (swap: Swap, dfiUsdPrice: number): Promise<BigNumber | null> => {
  const dfiAmount = getDfiAmount(swap);

  const usdValue = dfiAmount * dfiUsdPrice;

  if (usdValue && usdValue >= usdThreshold) {
    return new BigNumber(usdValue).decimalPlaces(0, BigNumber.ROUND_DOWN);
  }

  return null;
}

const getDfiAmount = (swap: Swap) => {
  if (swap.baseTokenSymbol === 'DFI') {
    return swap.baseTokenAmount;
  }
  if (swap.quoteTokenSymbol === 'DFI') {
    return swap.quoteTokenAmount;
  }
  throw new Error(`None of the symbols are DFI: ${JSON.stringify(swap)}`);
}

export {
  dexSwapIsOverThreshold,
}
