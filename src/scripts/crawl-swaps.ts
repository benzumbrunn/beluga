import { dexSwapIsOverThreshold } from "../process/dexSwapIsOverThreshold";
import { getCoinPrices, getOceanSwaps, getTokenPrices } from "../query/dfcApi";

const crawlSwaps = async () => {
  const swaps = await getOceanSwaps(['5'], 40);
  console.log(swaps.length);

  const dfcTokenPricesInUsd = await getTokenPrices();
  const coinPricesInUsd = await getCoinPrices();
  const prices = { ...dfcTokenPricesInUsd, ...coinPricesInUsd };

  swaps.forEach(async swap => {
    const usdValue = await dexSwapIsOverThreshold(swap, prices);

    const { id,  } = swap;

    if (!usdValue) {
      return;
    }

    console.log(id, usdValue.toFixed(2));
  });
}

crawlSwaps().catch(e => console.error(e));
