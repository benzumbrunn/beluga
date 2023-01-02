import BigNumber from "bignumber.js";
import { formatTweet } from "../twitter/formatTweet";
import { tweet } from "../twitter/tweet";
import { OceanSwap } from "../types/OceanSwap";

const swap: OceanSwap = {
  id: "160c3b4b53716784838ab779fafa4f2a622fa41ee58336e0dc2d86aedbc5eb5a",
  timestamp: "1647661211",
  fromAmount: "4.21405588",
  fromSymbol: "DFI",
  toAmount: "15.62054188",
  toSymbol: "DUSD"
};

const sendTestTweet = async () => {
  const formattedTestTweet = formatTweet(swap, new BigNumber(1000000));
  const tweetId = await tweet(formattedTestTweet);
  console.log(formattedTestTweet);
  console.log(tweetId);
}

sendTestTweet().catch(e => console.error(e));
