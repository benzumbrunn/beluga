import BigNumber from "bignumber.js";
import { Swap } from "../types/Swap";
import { getEmojiFromValue } from "./getEmojiFromValue";

const formatTweet = (swap: Swap, usdValue: BigNumber): string => {
  const emoji = getEmojiFromValue(usdValue);
  const infoMsg = `${new BigNumber(swap.baseTokenAmount).toFormat()} $${swap.baseTokenSymbol} swapped to ${new BigNumber(swap.quoteTokenAmount).toFormat()} $${swap.quoteTokenSymbol}`;
  const valueMsg = `\n${emoji} Value: ${usdValue.toFormat()} USD`;
  const txidMsg = `\n\nhttps://defiscan.live/transactions/${swap.txid}`
  return infoMsg.concat(valueMsg).concat(txidMsg);
}

export {
  formatTweet,
};
