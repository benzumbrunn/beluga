import levelup from 'levelup';
import leveldown from 'leveldown';

const db = levelup(leveldown('./processed'));

const storeProcessedTxid = async (txid: string, tweetId: string): Promise<void> => {
  await db.put(txid, tweetId);
}

const getTweetIdByTxid = async (txid: string): Promise<string | undefined> => {
  try {
    const tweetId = await db.get(txid);
    return tweetId.valueOf().toString();
  } catch (error) {
    return undefined;
  }
}

const updateLastProcessed = async (blockHeight: number, txid: string): Promise<void> => {
  await db.put('last-processed-blockheight', blockHeight.toString());
  await db.put('last-processed-txid', txid);
}

const getLastProcessedBlock = async (): Promise<number | undefined> => {
  try {
    const lastProcessedBlockHeight = await db.get('last-processed-blockheight');
    return Number(lastProcessedBlockHeight);
  } catch (error) {
    return undefined;
  }
}

const dumpLeveldb = (): void => {
  db.createKeyStream().on('data', async (data) => {
    const value = await db.get(data);
    console.log(`${data}: ${value}`);
  });
}

export {
  storeProcessedTxid,
  getTweetIdByTxid,
  dumpLeveldb,
  updateLastProcessed,
  getLastProcessedBlock,
}
