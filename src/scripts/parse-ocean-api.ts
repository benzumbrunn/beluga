import { SmartBuffer } from 'smart-buffer';
import { WhaleApiClient } from '@defichain/whale-api-client';
import { DfTx, OP_DEFI_TX, toOPCodes } from '@defichain/jellyfish-transaction'
import { TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'

const parseOceanApi = async () => {
  const api = new WhaleApiClient({
    version: 'v0',
    network: 'mainnet',
    url: 'https://ocean.defichain.com'
  })

  /*
  const pair = await api.poolpairs.get('5');
  console.log(pair);

  const vouts = await api.transactions.getVouts('c1fc9e1a88a13442ccc925b6c908daf139b5a0a0ff7fedcf8989ce7cf1073443');
  console.log(vouts);

  const tx = await api.transactions.get('c1fc9e1a88a13442ccc925b6c908daf139b5a0a0ff7fedcf8989ce7cf1073443');
  console.log(tx);
  */
  const vouts = await api.transactions.getVouts('c1fc9e1a88a13442ccc925b6c908daf139b5a0a0ff7fedcf8989ce7cf1073443');
  console.log(vouts);

  const dftx = getDfTx(vouts);
  console.log(dftx);
}

function getDfTx(vouts: TransactionVout[]): DfTx<any> | undefined {
  const hex = vouts[0].script.hex
  const buffer = SmartBuffer.fromBuffer(Buffer.from(hex, 'hex'))
  const stack = toOPCodes(buffer)

  if (stack.length !== 2 || stack[1].type !== 'OP_DEFI_TX') {
    return undefined
  }

  return (stack[1] as OP_DEFI_TX).tx;
}

parseOceanApi().catch(e => console.error(e));
