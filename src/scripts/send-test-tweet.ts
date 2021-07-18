import BigNumber from "bignumber.js";
import { formatTweet } from "../twitter/formatTweet";
import { tweet } from "../twitter/tweet";
import { Swap } from "../types/Swap";

const swap: Swap = {
  baseTokenAmount: 100,
  quoteTokenAmount: 1000000,
  _id: '123',
  blockHeight: 1234,
  blockTime: 'test time',
  txid: '349853453450',
  txType: 'Swap',
  poolId: '5',
  baseTokenSymbol: 'TEST',
  quoteTokenSymbol: 'DFI',
  __v: 0,
};

const sendTestTweet = async () => {
  const formattedTestTweet = formatTweet(swap, new BigNumber(1000000));
  const tweetId = await tweet(formattedTestTweet);
  console.log(formattedTestTweet);
  console.log(tweetId);
}

sendTestTweet().catch(e => console.error(e));
