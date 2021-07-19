import axios from "axios";
import { Swap } from "../types/Swap";

const getLatestSwapTransactions = async (id: string, limit = '100'): Promise<Swap[]> => {
  try {
    const response = await axios.get(`https://api.defichain.io/v1/getswaptransaction?id=${id}&network=mainnet&skip=0&limit=${limit}`);
    return response.data.data
  } catch (err) {
    console.error(err.response.statusText);
    throw new Error(err.response.statusText);
  }
}

export {
  getLatestSwapTransactions,
}
