import { getLastProcessedBlock, updateLastProcessed } from "./src/store/database";
import { extractDexSwaps } from "./src/defichain/extract";

export const run = async (): Promise<void> => {

  const lastProcessedBlock = await getLastProcessedBlock();

  const swaps = await extractDexSwaps(lastProcessedBlock);

  swaps.forEach(async swap => {
    const { blockHeight, txid } = swap;
    await updateLastProcessed(blockHeight, txid);
  });
}

run().catch(e => console.error(e)).then(() => {
  console.log('beluga started');
})
