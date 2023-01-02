import BigNumber from "bignumber.js";
import { OceanSwap } from "../types/OceanSwap";
import { getEmojiFromValue } from "./getEmojiFromValue";

const formatTweet = (swap: OceanSwap, usdValue: BigNumber): string => {
  const emoji = getEmojiFromValue(usdValue);
  const infoMsg = `${new BigNumber(swap.fromAmount).toFormat()} $${swap.fromSymbol} swapped to ${new BigNumber(swap.toAmount).toFormat()} $${swap.toSymbol}`;
  const valueMsg = `\n${emoji} Value: ${usdValue.toFormat()} USD`;
  const txidMsg = `\n\n${swap.id}`
  return infoMsg.concat(valueMsg).concat(txidMsg);
}

export {
  formatTweet,
};
