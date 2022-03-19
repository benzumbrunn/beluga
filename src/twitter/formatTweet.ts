import BigNumber from "bignumber.js";
import { SubgraphSwap } from "../types/SubgraphSwap";
import { getEmojiFromValue } from "./getEmojiFromValue";

const formatTweet = (swap: SubgraphSwap, usdValue: BigNumber): string => {
  const emoji = getEmojiFromValue(usdValue);
  const infoMsg = `${new BigNumber(swap.from.amount).toFormat()} $${swap.from.symbol} swapped to ${new BigNumber(swap.to.amount).toFormat()} $${swap.to.symbol}`;
  const valueMsg = `\n${emoji} Value: ${usdValue.toFormat()} USD`;
  const txidMsg = `\n\n${swap.id}`
  return infoMsg.concat(valueMsg).concat(txidMsg);
}

export {
  formatTweet,
};
