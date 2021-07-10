import axios from "axios";
import { Swap } from "../types/Swap";

const getLatestSwapTransactions = async (): Promise<Swap[]> => {
  return (await axios.get('https://api.defichain.io/v1/getswaptransaction?id=5&network=mainnet&skip=0&limit=10')).data.data;
}

export {
  getLatestSwapTransactions,
}
