import BigNumber from "bignumber.js";
import { formatTweet } from "../twitter/formatTweet";
import { tweet } from "../twitter/tweet";
import { SubgraphSwap } from "../types/SubgraphSwap";

const swap: SubgraphSwap = {
  id: "160c3b4b53716784838ab779fafa4f2a622fa41ee58336e0dc2d86aedbc5eb5a",
  timestamp: "1647661211",
  from: {
    amount: "4.21405588",
    symbol: "DFI"
  },
  to: {
    amount: "15.62054188",
    symbol: "DUSD"
  }
};

const sendTestTweet = async () => {
  const formattedTestTweet = formatTweet(swap, new BigNumber(1000000));
  const tweetId = await tweet(formattedTestTweet);
  console.log(formattedTestTweet);
  console.log(tweetId);
}

sendTestTweet().catch(e => console.error(e));
