import axios from "axios";
import { Swap } from "../types/Swap";

const getLatestSwapTransactions = async (id: string, limit = '100'): Promise<Swap[]> => {
  return (await axios.get(`https://api.defichain.io/v1/getswaptransaction?id=${id}&network=mainnet&skip=0&limit=${limit}`)).data.data;
}

export {
  getLatestSwapTransactions,
}
