import { getLastProcessedBlock, getTweetIdByTxid, storeProcessedTxid, updateLastProcessed } from "../src/store/database";
import { dexSwapIsOverThreshold } from "./process/dexSwapIsOverThreshold";
import { extractDexSwaps } from "./process/extractSwaps";
import { getUsdCoinPriceForDfi } from "./query/coinPrices";
import { tweet } from '../src/twitter/twitter';

const whaleWatch = async (): Promise<void> => {
  const lastProcessedBlock = await getLastProcessedBlock();

  const swaps = await extractDexSwaps(lastProcessedBlock);

  if (swaps.length === 0) {
    console.log('No new swaps');
    return;
  }

  const dfiUsdPrice = await getUsdCoinPriceForDfi();

  swaps.forEach(async swap => {
    const usdValue = await dexSwapIsOverThreshold(swap, dfiUsdPrice);

    const { blockHeight, txid } = swap;

    if (!usdValue) {
      // swap below noteworthy threshold
      console.log('Swap below noteworthy threshold', txid);
      await updateLastProcessed(swap.blockHeight, txid);
      return;
    }

    const tweetIdFromTxid = await getTweetIdByTxid(txid);
    if (tweetIdFromTxid) {
      // txid already processed via tweet
      await updateLastProcessed(blockHeight, txid);
      return;
    }

    const { baseTokenSymbol, baseTokenAmount, quoteTokenSymbol, quoteTokenAmount } = swap;

    const infoMsg = `${baseTokenAmount} #${baseTokenSymbol} swapped to ${quoteTokenAmount} #${quoteTokenSymbol}`;
    const valueMsg = `\nValue: ${usdValue} USD`;
    const txidMsg = `\n\n${txid}`
    const message = infoMsg.concat(valueMsg).concat(txidMsg);
    const newTweetId = await tweet(message);
    console.log(message);

    await storeProcessedTxid(txid, newTweetId);
    await updateLastProcessed(blockHeight, txid);
  });
}

const loopWhaleWatch = (): void => {
  setInterval(async () => {
    try {
      await whaleWatch();
    } catch (error) {
      console.error(error);
    }
  }, 10 * 1000); // every 10 seconds
};

export {
  loopWhaleWatch,
}
