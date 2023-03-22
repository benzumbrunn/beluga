import config from 'config';

import { getTweetIdByTxid, storeProcessedTxid, updateLastProcessed } from "../src/store/database";
import { dexSwapIsOverThreshold } from "./process/dexSwapIsOverThreshold";
import { extractDexSwaps } from "./process/extractSwaps";
import { getCoinPrices, getTokenPrices } from './query/dfcApi';
import { formatTweet } from './twitter/formatTweet';
import { tweet } from './twitter/tweet';

const watchIntervalInSeconds: number = config.get('watchIntervalInSeconds');

const whaleWatch = async (): Promise<void> => {
  const swaps = await extractDexSwaps();
  console.log(swaps.length);

  if (swaps.length === 0) {
    console.log('No new swaps');
    return;
  }

  const dfcTokenPricesInUsd = await getTokenPrices();
  const coinPricesInUsd = await getCoinPrices();
  const prices = { ...dfcTokenPricesInUsd, ...coinPricesInUsd };

  swaps.forEach(async swap => {
    const usdValue = await dexSwapIsOverThreshold(swap, prices);

    const { timestamp, id } = swap;

    if (!usdValue) {
      // swap below noteworthy threshold
      await updateLastProcessed(Number(swap.timestamp), id);
      return;
    }

    const tweetIdFromTxid = await getTweetIdByTxid(id);
    if (tweetIdFromTxid) {
      // txid already processed via tweet
      console.log('Swap already processed via tweet', id);
      await updateLastProcessed(Number(timestamp), id);
      return;
    }

    const formattedTweet = formatTweet(swap, usdValue);
    const newTweetId = await tweet(formattedTweet);
    console.log(formattedTweet);

    await storeProcessedTxid(id, newTweetId);
    await updateLastProcessed(Number(timestamp), id);
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
