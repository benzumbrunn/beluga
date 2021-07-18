import { SHRIMP, FISH, DOLPHIN, SHARK, WHALE } from "../twitter/getEmojiFromValue";
import { tweet } from "../twitter/tweet";

const sendTestTweet = async () => {
  const msg = SHRIMP + FISH + DOLPHIN + SHARK + WHALE;
  const tweetId = await tweet(msg);
  console.log(msg);
  console.log(tweetId);
}

sendTestTweet().catch(e => console.error(e));
