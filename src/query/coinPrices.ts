import axios from "axios";

const getUsdCoinPriceForDfi = async (): Promise<number> => {
  const { data }  = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=defichain&vs_currencies=usd');
  return data.defichain.usd;
}

export {
  getUsdCoinPriceForDfi,
}
