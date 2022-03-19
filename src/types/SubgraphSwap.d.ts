export interface SubgraphSwapsResponse {
  data: {
    swaps: SubgraphSwap[]
  }
  page?: {
    next: string
  }
}

export interface SubgraphSwap {
  id: string
  timestamp: string
  from: SubgraphSwapFromTo
  to: SubgraphSwapFromTo
}

export interface SubgraphSwapFromTo {
  amount: string
  symbol: string
}