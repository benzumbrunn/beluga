import levelup from 'levelup';
import leveldown from 'leveldown';

const db = levelup(leveldown('./processed'));

const updateLastProcessed = async (blockHeight: number, txid: string): Promise<void> => {
  await db.put('last-processed-blockheight', blockHeight.toString());
  await db.put('last-processed-txid', txid);
}

const getLastProcessedBlock = async (): Promise<number> => {
  return Number(await db.get('last-processed-blockheight'));
}

const dumpLeveldb = (): void => {
  db.createKeyStream().on('data', async (data) => {
    const value = await db.get(data);
    console.log(`${data}: ${value}`);
  });
}

export {
  dumpLeveldb,
  updateLastProcessed,
  getLastProcessedBlock,
}
