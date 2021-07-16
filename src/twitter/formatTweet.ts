import BigNumber from "bignumber.js";
import { Swap } from "../types/Swap";

const formatTweet = (swap: Swap, usdValue: BigNumber): string => {
  const infoMsg = `${new BigNumber(swap.baseTokenAmount).toFormat()} #${swap.baseTokenSymbol} swapped to ${new BigNumber(swap.quoteTokenAmount).toFormat()} #${swap.quoteTokenSymbol}`;
  const valueMsg = `\nValue: ${usdValue.toFormat()} USD`;
  const txidMsg = `\n\n${swap.txid}`
  return infoMsg.concat(valueMsg).concat(txidMsg);
}

export {
  formatTweet,
};
