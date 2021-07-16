import config from 'config';

import { getLastProcessedBlock, getTweetIdByTxid, storeProcessedTxid, updateLastProcessed } from "../src/store/database";
import { dexSwapIsOverThreshold } from "./process/dexSwapIsOverThreshold";
import { extractDexSwaps } from "./process/extractSwaps";
import { getUsdCoinPriceForDfi } from "./query/coinPrices";
import { formatTweet } from './twitter/formatTweet';
import { tweet } from './twitter/tweet';

const watchIntervalInSeconds: number = config.get('watchIntervalInSeconds');

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

    const formattedTweet = formatTweet(swap, usdValue);
    const newTweetId = await tweet(formattedTweet);
    console.log(formattedTweet);

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
  }, watchIntervalInSeconds * 1000);
};

export {
  loopWhaleWatch,
}
