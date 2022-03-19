export interface PriceTicker {
  id: string
  sort: string
  price: PriceFeed
}

export interface PriceFeed {
  id: string
  key: string
  sort: string

  token: string
  currency: string

  aggregated: {
    amount: string
    weightage: number
    oracles: {
      active: number
      total: number
    }
  }

  block: {
    hash: string
    height: number
    time: number
    medianTime: number
  }
}
